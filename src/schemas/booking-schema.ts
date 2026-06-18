// tarot-fal/src/schemas/booking-schema.ts
import { z } from "zod";

export const bookingFormSchema = z.object({
  customerName: z.string().min(2, "İsim gereklidir."),
  customerPhone: z.string().min(10, "Telefon gereklidir."),
  serviceType: z.enum([
    "Tarot Falı",
    "El Falı",
    "Kahve Falı",
    "Astroloji Haritası",
    "Detaylı Tarot",
  ]),
  date: z.coerce.date(),
  timeSlotId: z.string().min(1, "Saat seçimi zorunludur."),
  
  // Astroloji/Fal alanları (varsayılan opsiyonel)
  birthDate: z.string().optional(),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
}).superRefine((data, ctx) => {
  // Eğer servis tipi "Astroloji Haritası" veya "Detaylı Tarot" ise doğum bilgileri zorunludur
  if (data.serviceType === "Astroloji Haritası" || data.serviceType === "Detaylı Tarot") {
    if (!data.birthDate || data.birthDate.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Astroloji analizi için Doğum Tarihi zorunludur.",
        path: ["birthDate"],
      });
    }
    if (!data.birthTime || data.birthTime.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Astroloji analizi için Doğum Saati zorunludur.",
        path: ["birthTime"],
      });
    }
    if (!data.birthPlace || data.birthPlace.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Astroloji analizi için Doğum Yeri zorunludur.",
        path: ["birthPlace"],
      });
    }
  }
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
