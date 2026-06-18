"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBookingFormSchema, BookingFormValues } from "@/schemas/booking-schema";
import { createAppointment } from "@/app/actions/booking";
import DatePicker from "./date-picker";
import SlotSelector from "./slot-selector";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  Calendar as CalendarIcon,
  Sparkles,
  User,
  Info,
  ChevronRight,
  ChevronLeft,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookingForm() {
  const { t } = useTranslation();
  const [step, setStep] = React.useState(1);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const [successDetails, setSuccessDetails] = React.useState<any>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(getBookingFormSchema(t)),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceType: "Tarot Falı",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      notes: "",
    },
  });

  const selectedDate = watch("date");
  const selectedSlotId = watch("timeSlotId");
  const selectedServiceType = watch("serviceType");

  const isAstrology = selectedServiceType === "Astroloji Haritası" || selectedServiceType === "Detaylı Tarot";

  const nextStep = async () => {
    setServerError(null);
    if (step === 1) {
      const isDateValid = await trigger("date");
      const isSlotValid = await trigger("timeSlotId");
      if (isDateValid && isSlotValid) setStep(2);
    } else if (step === 2) {
      const isServiceValid = await trigger("serviceType");
      if (isAstrology) {
        const isBDateValid = await trigger("birthDate");
        const isBTimeValid = await trigger("birthTime");
        const isBPlaceValid = await trigger("birthPlace");
        if (isServiceValid && isBDateValid && isBTimeValid && isBPlaceValid) setStep(3);
      } else {
        if (isServiceValid) setStep(3);
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = await createAppointment(data);
      if (response.success) {
        setSuccessDetails(response.appointment);
        setIsSuccessOpen(true);
        reset();
        setStep(1);
      } else {
        setServerError(t(response.error || "error_booking_failed"));
      }
    } catch (err) {
      setServerError(t("error_network"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { number: 1, name: t("step_1"), icon: CalendarIcon },
    { number: 2, name: t("step_2"), icon: Sparkles },
    { number: 3, name: t("step_3"), icon: User },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-card border border-border/80 shadow-lg rounded-3xl p-6 sm:p-8">
      {/* Progress Tracker */}
      <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-6">
        {stepsList.map((s, idx) => {
          const Icon = s.icon;
          const isActive = step === s.number;
          const isCompleted = step > s.number;

          return (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center space-y-2 flex-1">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all duration-300",
                    isActive
                      ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20 scale-110"
                      : isCompleted
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span
                  className={cn(
                    "text-xs font-bold hidden sm:inline-block font-serif",
                    isActive ? "text-primary font-bold" : "text-muted-foreground"
                  )}
                >
                  {s.name}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-colors duration-500",
                    step > s.number ? "bg-primary/40" : "bg-border/60"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {serverError && (
        <div className="mb-6 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-2">
          <Info className="h-5 w-5 shrink-0" />
          <p>{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* STEP 1: Date & Time Slot Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onSelect={(d) => {
                        field.onChange(d);
                        setValue("timeSlotId", ""); // Reset slot on date change
                      }}
                    />
                  )}
                />
                {errors.date && (
                  <p className="mt-2 text-xs text-destructive text-center">{errors.date.message}</p>
                )}
              </div>

              <div className="border border-border/40 p-4 rounded-2xl bg-secondary/10 self-stretch flex flex-col justify-center">
                {selectedDate ? (
                  <Controller
                    control={control}
                    name="timeSlotId"
                    render={({ field }) => (
                      <SlotSelector
                        selectedDate={selectedDate}
                        selectedSlotId={field.value}
                        onSelectSlot={field.onChange}
                      />
                    )}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground/35 mb-3" />
                    <p className="text-sm font-semibold font-serif">{t("select_date_prompt")}</p>
                  </div>
                )}
                {errors.timeSlotId && (
                  <p className="mt-2 text-xs text-destructive text-center">{errors.timeSlotId.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border/30">
              <Button
                type="button"
                onClick={nextStep}
                disabled={!selectedDate || !selectedSlotId}
                className="gap-1.5 shadow-sm shadow-primary/25 cursor-pointer"
              >
                {t("btn_next")} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Service & Birth Information */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Service Type Selection (Visual Cards) */}
            <div className="space-y-2">
              <span className="text-sm font-bold text-foreground block font-serif">
                {t("label_service")}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    type: "Tarot Falı" as const,
                    title: t("service_tarot_name"),
                    desc: t("service_tarot_desc"),
                  },
                  {
                    type: "El Falı" as const,
                    title: t("service_palm_name"),
                    desc: t("service_palm_desc"),
                  },
                  {
                    type: "Kahve Falı" as const,
                    title: t("service_coffee_name"),
                    desc: t("service_coffee_desc"),
                  },
                  {
                    type: "Astroloji Haritası" as const,
                    title: t("service_astrology_name"),
                    desc: t("service_astrology_desc"),
                  },
                  {
                    type: "Detaylı Tarot" as const,
                    title: t("service_detailed_tarot_name"),
                    desc: t("service_detailed_tarot_desc"),
                  },
                ].map((s) => (
                  <button
                    key={s.type}
                    type="button"
                    onClick={() => {
                      setValue("serviceType", s.type, { shouldValidate: true });
                      // Reset birth details if switching to non-astrology
                      if (s.type !== "Astroloji Haritası" && s.type !== "Detaylı Tarot") {
                        setValue("birthDate", "");
                        setValue("birthTime", "");
                        setValue("birthPlace", "");
                      }
                    }}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-32",
                      selectedServiceType === s.type
                        ? "bg-primary/5 border-primary ring-2 ring-primary/20 scale-102"
                        : "bg-background border-border hover:bg-muted"
                    )}
                  >
                    <span className="font-bold text-sm text-foreground block mb-1 font-serif">
                      {s.title}
                    </span>
                    <span className="text-xs text-muted-foreground leading-normal block">
                      {s.desc}
                    </span>
                  </button>
                ))}
              </div>
              {errors.serviceType && (
                <p className="text-xs text-destructive">{errors.serviceType.message}</p>
              )}
            </div>

            {/* Astrology Details (Conditional) */}
            {isAstrology && (
              <div className="grid gap-4 sm:grid-cols-3 border border-border/40 p-4 rounded-2xl bg-secondary/5 animate-in fade-in zoom-in duration-300">
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1 block">{t("label_birthdate")}</label>
                  <input
                    type="date"
                    {...register("birthDate")}
                    className="w-full h-10 px-3 border border-border rounded-xl bg-background text-sm font-medium focus-visible:outline-none focus-visible:border-primary transition-all text-foreground"
                  />
                  {errors.birthDate && (
                    <p className="text-xs text-destructive mt-1">{errors.birthDate.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1 block">{t("label_birthtime")}</label>
                  <input
                    type="time"
                    {...register("birthTime")}
                    className="w-full h-10 px-3 border border-border rounded-xl bg-background text-sm font-medium focus-visible:outline-none focus-visible:border-primary transition-all text-foreground"
                  />
                  {errors.birthTime && (
                    <p className="text-xs text-destructive mt-1">{errors.birthTime.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1 block">{t("label_birthplace")}</label>
                  <input
                    type="text"
                    placeholder={t("placeholder_birthplace")}
                    {...register("birthPlace")}
                    className="w-full h-10 px-3 border border-border rounded-xl bg-background text-sm font-medium focus-visible:outline-none focus-visible:border-primary transition-all text-foreground"
                  />
                  {errors.birthPlace && (
                    <p className="text-xs text-destructive mt-1">{errors.birthPlace.message}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-border/30">
              <Button type="button" variant="outline" onClick={prevStep} className="gap-1.5 cursor-pointer">
                <ChevronLeft className="h-4 w-4" /> {t("btn_back")}
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={!selectedServiceType}
                className="gap-1.5 cursor-pointer"
              >
                {t("btn_next")} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Customer Details & Notes */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Customer Name */}
            <div className="space-y-2">
              <label htmlFor="customerName" className="text-sm font-bold text-foreground block font-serif">
                {t("label_owner_name")}
              </label>
              <input
                id="customerName"
                type="text"
                placeholder={t("placeholder_owner_name")}
                {...register("customerName")}
                className="w-full h-11 px-4 border border-border rounded-xl bg-background text-sm font-medium focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-foreground"
              />
              {errors.customerName && (
                <p className="text-xs text-destructive">{errors.customerName.message}</p>
              )}
            </div>

            {/* Customer Email */}
            <div className="space-y-2">
              <label htmlFor="customerEmail" className="text-sm font-bold text-foreground block font-serif">
                {t("label_owner_email")}
              </label>
              <input
                id="customerEmail"
                type="email"
                placeholder={t("placeholder_owner_email")}
                {...register("customerEmail")}
                className="w-full h-11 px-4 border border-border rounded-xl bg-background text-sm font-medium focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-foreground"
              />
              {errors.customerEmail && (
                <p className="text-xs text-destructive">{errors.customerEmail.message}</p>
              )}
            </div>

            {/* Customer Phone */}
            <div className="space-y-2">
              <label htmlFor="customerPhone" className="text-sm font-bold text-foreground block font-serif">
                {t("label_owner_phone")}
              </label>
              <input
                id="customerPhone"
                type="tel"
                placeholder={t("placeholder_owner_phone")}
                {...register("customerPhone")}
                className="w-full h-11 px-4 border border-border rounded-xl bg-background text-sm font-medium focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-foreground"
              />
              {errors.customerPhone && (
                <p className="text-xs text-destructive">{errors.customerPhone.message}</p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-bold text-foreground block font-serif">
                {t("label_notes")}
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder={t("placeholder_notes")}
                {...register("notes")}
                className="w-full p-3 border border-border rounded-xl bg-background text-sm font-medium focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all resize-none text-foreground"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-border/30">
              <Button type="button" variant="outline" onClick={prevStep} className="gap-1.5 cursor-pointer">
                <ChevronLeft className="h-4 w-4" /> {t("btn_back")}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-1.5 cursor-pointer shadow-sm shadow-primary/25">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    {t("btn_submitting")}
                  </>
                ) : (
                  <>{t("btn_submit")}</>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
              <CheckCircle className="h-8 w-8" />
            </div>
            <DialogTitle className="text-xl font-bold font-serif">{t("success_title")}</DialogTitle>
            <DialogDescription className="text-sm font-medium text-muted-foreground">
              {t("success_desc")}
            </DialogDescription>
          </DialogHeader>

          {successDetails && (
            <div className="bg-secondary/20 border border-border/40 rounded-2xl p-4 my-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold font-serif">{t("success_owner_pet")}</span>
                <span className="font-bold">{successDetails.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold font-serif">{t("success_service")}</span>
                <span className="font-bold">
                  {t(`service_${
                    successDetails.serviceType === "Tarot Falı" ? "tarot" :
                    successDetails.serviceType === "El Falı" ? "palm" :
                    successDetails.serviceType === "Kahve Falı" ? "coffee" :
                    successDetails.serviceType === "Astroloji Haritası" ? "astrology" : "detailed_tarot"
                  }_name`)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold font-serif">{t("success_date")}</span>
                <span className="font-bold">
                  {new Date(successDetails.date).toLocaleDateString(t("locale") === "en" ? "en-US" : "tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setIsSuccessOpen(false)} className="w-full sm:w-auto cursor-pointer">
              {t("btn_close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}