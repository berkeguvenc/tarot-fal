"use server";

import prisma from "@/lib/prisma";
import { bookingFormSchema } from "@/schemas/booking-schema";
import { revalidatePath } from "next/cache";

export async function getAvailableSlots(dateInput: Date | string) {
  try {
    const selectedDate = new Date(dateInput);
    if (isNaN(selectedDate.getTime())) {
      throw new Error("error_invalid_date");
    }

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Veritabanındaki tüm saat dilimlerini çek
    const allSlots = await prisma.timeSlot.findMany({
      orderBy: {
        startTime: "asc",
      },
    });

    // 2. Seçilen tarihteki onay bekleyen veya onaylanan randevuları çek
    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
      select: {
        timeSlotId: true,
      },
    });

    const bookedSlotIds = new Set(bookedAppointments.map((app) => app.timeSlotId));

    // 3. Müsaitlik durumunu dinamik güncelle
    const slots = allSlots.map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isAvailable: slot.isAvailable && !bookedSlotIds.has(slot.id),
    }));

    return { success: true, slots };
  } catch (error: any) {
    console.error("Saat dilimleri yüklenirken hata oluştu:", error);
    return { success: false, error: error.message || "error_load_slots" };
  }
}

export async function createAppointment(data: any) {
  try {
    const validation = bookingFormSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        error: "error_invalid_form",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      date,
      timeSlotId,
      birthDate,
      birthTime,
      birthPlace,
    } = validation.data;

    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);

    const startOfDay = new Date(appointmentDate);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Double Check: Seçilen saat o gün için dolu mu?
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        timeSlotId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
    });

    if (existingAppointment) {
      return {
        success: false,
        error: "error_slot_taken",
      };
    }

    // Astroloji/Fal bilgileri
    const parsedBirthDate = (serviceType === "Astroloji Haritası" || serviceType === "Detaylı Tarot") && birthDate
      ? new Date(birthDate)
      : null;
    const finalBirthTime = (serviceType === "Astroloji Haritası" || serviceType === "Detaylı Tarot")
      ? birthTime || null
      : null;
    const finalBirthPlace = (serviceType === "Astroloji Haritası" || serviceType === "Detaylı Tarot")
      ? birthPlace || null
      : null;

    // Randevuyu oluştur
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        timeSlotId,
        customerName,
        customerEmail,
        customerPhone,
        serviceType,
        birthDate: parsedBirthDate,
        birthTime: finalBirthTime,
        birthPlace: finalBirthPlace,
        status: "PENDING",
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/appointments");

    return { success: true, appointment };
  } catch (error: any) {
    console.error("Randevu oluşturulurken hata oluştu:", error);
    return { success: false, error: error.message || "error_booking_failed" };
  }
}
