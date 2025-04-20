import { Button } from "@/shared/components/button";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PropsWithChildren } from "react";

type DatePickerProps = {
  date: Date | undefined;
  handleDateChange: (
    selectedDate: Date | undefined,
  ) => void;
} & PropsWithChildren
export function DatePickerForm({handleDateChange, date}: DatePickerProps) {


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(
            "w-full justify-start items-center text-black text-left focus-within:border-2 focus-within:border-[#6fafdad8] hover:bg-gray-100 bg-gray-50 shadow-none border-2 font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>Selecciona una fecha</span>
          )}
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
