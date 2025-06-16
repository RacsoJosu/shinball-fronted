import { Button } from "./button";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importa el idioma español
import { CalendarIcon } from "lucide-react";
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
          className={cn(
            "w-full rounded-lg justify-start items-center mt-0 py-3.5 text-black text-left focus-within:border-2 focus-within:border-[#6fafdad8] hover:bg-gray-100 bg-gray-50 shadow-none border-1 font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
