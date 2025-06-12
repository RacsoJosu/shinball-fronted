import { Button } from "@/shared/components/button";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type DatePickerProps = {
  date: Date | undefined;
  handleDateChange: (selectedDate: Date | undefined) => void;
} & PropsWithChildren;
export function DatePickerForm({ handleDateChange, date }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(
            "w-full rounded-lg justify-start items-center mt-0 py-3 text-black text-left focus-within:border-2 focus-within:border-[#6fafdad8] hover:bg-gray-100 bg-gray-50 shadow-none border-1 font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-7" />
          {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-full p-0">
        <Calendar
          className="w-full
          "
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          locale={es}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
