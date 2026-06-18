"use client";

import * as React from "react";
import { getAvailableSlots } from "@/app/actions/booking";
import { cn } from "@/lib/utils";
import { Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

type SlotSelectorProps = {
  selectedDate: Date;
  selectedSlotId?: string;
  onSelectSlot: (slotId: string) => void;
};

type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export default function SlotSelector({
  selectedDate,
  selectedSlotId,
  onSelectSlot,
}: SlotSelectorProps) {
  const { t } = useTranslation();
  const [slots, setSlots] = React.useState<Slot[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    async function loadSlots() {
      setLoading(true);
      setError(null);
      try {
        const response = await getAvailableSlots(selectedDate);
        if (!active) return;

        if (response.success && response.slots) {
          setSlots(response.slots);
        } else {
          setError(response.error || t("error_load_slots"));
        }
      } catch (err: any) {
        if (active) {
          setError(t("error_network"));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadSlots();

    return () => {
      active = false;
    };
  }, [selectedDate, t]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground font-serif">{t("loading_slots")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-xl">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground font-medium">
        {t("no_slots_found")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground justify-center">
        <Clock className="h-4 w-4 text-primary" />
        <span>{t("select_slot_prompt")}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedSlotId === slot.id;
          const isDisabled = !slot.isAvailable;

          return (
            <button
              key={slot.id}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectSlot(slot.id)}
              className={cn(
                "py-3 px-4 border rounded-xl text-center text-sm font-semibold transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30 scale-102 font-bold"
                  : isDisabled
                  ? "bg-secondary/20 text-muted-foreground border-border opacity-40 line-through cursor-not-allowed"
                  : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5 hover:scale-102"
              )}
            >
              <span className="text-sm font-bold">{slot.startTime} - {slot.endTime}</span>
              <span className="text-[10px] opacity-80 font-medium">
                {slot.isAvailable ? t("slot_available") : t("slot_booked")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
