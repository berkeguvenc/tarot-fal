"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export type CalendarProps = {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
};

export function Calendar({
  className,
  selected,
  onSelect,
  disabled,
}: CalendarProps) {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  let dayOfWeek = firstDayOfMonth.getDay();
  // Pazar 0'dır, onu 6 yapalım (Pazartesi'yi 0 yapmak için)
  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  const emptyDays = Array.from({ length: dayOfWeek });

  const monthNames = [
    t("month_january"), t("month_february"), t("month_march"), t("month_april"),
    t("month_may"), t("month_june"), t("month_july"), t("month_august"),
    t("month_september"), t("month_october"), t("month_november"), t("month_december")
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className={cn("p-4 bg-card border border-border/80 rounded-2xl w-full max-w-[350px] shadow-md", className)}>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-sm font-semibold text-foreground font-serif">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground pb-2">
        <span>{t("day_mon")}</span>
        <span>{t("day_tue")}</span>
        <span>{t("day_wed")}</span>
        <span>{t("day_thu")}</span>
        <span>{t("day_fri")}</span>
        <span>{t("day_sat")}</span>
        <span>{t("day_sun")}</span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {days.map((date) => {
          const isSelected = selected && selected.toDateString() === date.toDateString();
          const isDisabled = disabled && disabled(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect && onSelect(date)}
              className={cn(
                "h-9 w-9 rounded-xl text-sm transition-all flex items-center justify-center font-medium cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/30 scale-105"
                  : "hover:bg-muted hover:text-foreground text-foreground",
                isDisabled && "opacity-35 pointer-events-none line-through"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
