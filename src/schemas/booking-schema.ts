// tarot-fal/src/schemas/booking-schema.ts
import { z } from "zod";

export const bookingFormSchema = z.object({
  customerName: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  customerEmail: z.string().email("Geçerli bir e-posta adresi giriniz."),
  customerPhone: z.string().min(10, "Telefon numarası en az 10 hane olmalıdır."),
  serviceType: z.enum([
    "Tarot Falı",
    "El Falı",
    "Kahve Falı",
    "Astroloji Haritası",
    "Detaylı Tarot",
  ]),
  date: z.coerce.date(),
  timeSlotId: z.string().min(1, "Saat seçimi zorunludur."),
  birthDate: z.string().optional(),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
}).superRefine((data, ctx) => {
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

export const getBookingFormSchema = (t: (key: string) => string) => z.object({
  customerName: z.string().min(2, t("validation_name_min")),
  customerEmail: z.string().email(t("validation_email_invalid")),
  customerPhone: z.string().min(10, t("validation_phone_min")),
  serviceType: z.enum([
    "Tarot Falı",
    "El Falı",
    "Kahve Falı",
    "Astroloji Haritası",
    "Detaylı Tarot",
  ]),
  date: z.date({ message: t("validation_date_required") }),
  timeSlotId: z.string().min(1, t("validation_timeslot_required")),
  birthDate: z.string().optional(),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.serviceType === "Astroloji Haritası" || data.serviceType === "Detaylı Tarot") {
    if (!data.birthDate || data.birthDate.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("validation_birthdate_required"),
        path: ["birthDate"],
      });
    }
    if (!data.birthTime || data.birthTime.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("validation_birthtime_required"),
        path: ["birthTime"],
      });
    }
    if (!data.birthPlace || data.birthPlace.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("validation_birthplace_required"),
        path: ["birthPlace"],
      });
    }
  }
});
