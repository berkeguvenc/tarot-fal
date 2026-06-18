"use client";

import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "react-i18next";

type DatePickerProps = {
  selected?: Date;
  onSelect: (date: Date) => void;
};

export default function DatePicker({ selected, onSelect }: DatePickerProps) {
  const { t } = useTranslation();
  
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    maxDate.setHours(23, 59, 59, 999);

    return date < today || date > maxDate;
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <p className="mb-3 text-sm font-semibold text-muted-foreground text-center">
        {t("date_picker_prompt")}
      </p>
      <Calendar
        selected={selected}
        onSelect={onSelect}
        disabled={isDateDisabled}
        className="shadow-sm"
      />
    </div>
  );
}
