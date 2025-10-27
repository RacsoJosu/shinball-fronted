import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parseISO, subDays } from "date-fns";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// --- Datos simulados ---
const chartData = Array.from({ length: 90 }, (_, i) => {
  const date = subDays(new Date("2024-06-30"), 89 - i);
  return {
    date: format(date, "yyyy-MM-dd"),
    reservas: Math.floor(100 + Math.random() * 400),
    usuarios: Math.floor(50 + Math.random() * 250),
  };
});

const chartConfig = {
  reservas: {
    label: "Reservas",
    color: "var(--chart-1)",
  },
  usuarios: {
    label: "Usuarios registrados",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    const referenceDate = parseISO("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = subDays(referenceDate, daysToSubtract);
    return chartData.filter((item) => parseISO(item.date) >= startDate);
  }, [timeRange]);

  return (
    <Card className="pt-0 col-span-1 sm:col-span-2 lg:col-span-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Actividad general</CardTitle>
          <CardDescription>
            Tendencia de reservas y nuevos usuarios en el último periodo
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Seleccionar rango"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 días
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 días
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillReservas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-reservas)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-reservas)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillUsuarios" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-usuarios)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-usuarios)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => format(parseISO(value), "MMM d")}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => format(parseISO(value), "MMM d, yyyy")}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="reservas"
              type="natural"
              fill="url(#fillReservas)"
              stroke="var(--color-reservas)"
              stackId="a"
            />
            <Area
              dataKey="usuarios"
              type="natural"
              fill="url(#fillUsuarios)"
              stroke="var(--color-usuarios)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
