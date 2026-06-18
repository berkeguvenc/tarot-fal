// tarot-fal/src/schemas/booking-schema.ts
import { z } from "zod";

export const bookingFormSchema = z.object({
  customerName: z.string().min(2, "İsim gereklidir."),
  customerPhone: z.string().min(10, "Telefon gereklidir."),
  birthDate: z.string().min(4, "Doğum tarihi (Astroloji/Fal için önemli)"), // YENİ EKLENEN ALAN
  serviceType: z.enum([
    "Tarot Falı",
    "El Falı",
    "Kahve Falı",
    "Astroloji Haritası",
  ]),
  date: z.coerce.date(),
  timeSlotId: z.string(),
});
