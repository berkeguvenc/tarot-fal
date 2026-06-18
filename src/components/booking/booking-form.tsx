"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema, BookingFormValues } from "@/schemas/booking-schema";
import { Button } from "@/components/ui/button";

export function BookingForm() {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      serviceType: "Tarot Falı",
      date: new Date(),
      timeSlotId: "dummy-slot-id", // Şimdilik dummy slot
      birthDate: "",
      birthTime: "",
      birthPlace: "",
    },
  });

  const serviceType = form.watch("serviceType");
  const isAstrology = serviceType === "Astroloji Haritası" || serviceType === "Detaylı Tarot";

  function onSubmit(data: BookingFormValues) {
    console.log("Form verileri:", data);
    // TODO: API'ye gönderilecek
  }

  const inputClass = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground";
  const labelClass = "text-sm font-medium leading-none text-muted-foreground mb-2 block";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>İsim Soyisim</label>
          <input
            {...form.register("customerName")}
            className={inputClass}
            placeholder="Mistik Gezgin"
          />
          {form.formState.errors.customerName && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Telefon Numarası</label>
          <input
            {...form.register("customerPhone")}
            className={inputClass}
            placeholder="+90 555 555 5555"
          />
          {form.formState.errors.customerPhone && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.customerPhone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Hizmet Türü</label>
        <select
          {...form.register("serviceType")}
          className={inputClass}
        >
          <option value="Tarot Falı">Tarot Falı</option>
          <option value="El Falı">El Falı</option>
          <option value="Kahve Falı">Kahve Falı</option>
          <option value="Astroloji Haritası">Astroloji Haritası</option>
          <option value="Detaylı Tarot">Detaylı Tarot</option>
        </select>
      </div>

      {isAstrology && (
        <div className="grid gap-4 sm:grid-cols-3 animate-in fade-in zoom-in duration-300">
          <div>
            <label className={labelClass}>Doğum Tarihi</label>
            <input
              type="date"
              {...form.register("birthDate")}
              className={inputClass}
            />
            {form.formState.errors.birthDate && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.birthDate.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Doğum Saati</label>
            <input
              type="time"
              {...form.register("birthTime")}
              className={inputClass}
            />
            {form.formState.errors.birthTime && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.birthTime.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Doğum Yeri</label>
            <input
              {...form.register("birthPlace")}
              className={inputClass}
              placeholder="İl / İlçe"
            />
            {form.formState.errors.birthPlace && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.birthPlace.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Şimdilik timeSlotId için gizli bir input veya dummy veri bırakıyoruz */}
      <input type="hidden" {...form.register("timeSlotId")} value="dummy-slot-id" />
      
      <Button type="submit" className="w-full text-lg h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-serif">
        Randevu Talebi Oluştur
      </Button>
    </form>
  );
}