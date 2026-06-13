import { z } from "zod";

export const bookingFormSchema = z.object({
    customerName: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
    customerEmail: z.string().email("Geçerli bir e-posta adresi giriniz."),
    customerPhone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
    notes: z.string().optional(),
    serviceType: z.string().min(1, "Lütfen bir hizmet seçiniz."),
    timeSlotId: z.string().min(1, "Lütfen bir saat dilimi seçiniz."),

    // ÇÖZÜM BURADA: 
    // 1. required_error yerine Zod'un beklediği 'message' parametresini kullandık.
    // 2. Formdan gelen tarih verisi string olursa diye coerce (dönüştürücü) ekledik.
    date: z.coerce.date({
        message: "Lütfen geçerli bir tarih seçiniz.",
    }),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;