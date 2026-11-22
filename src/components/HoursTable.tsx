"use client";

import { schedule } from "@/data/site";
import { formatShifts, restaurantNow } from "@/lib/schedule";
import { useHydrated } from "@/lib/useHydrated";

/** Tabla de horarios; resalta el día de hoy (hora de Lima). */
export function HoursTable() {
  const hydrated = useHydrated();
  const today = hydrated ? restaurantNow().getDay() : null;

  return (
    <table className="w-full text-[0.97rem]">
      <caption className="sr-only">Horario de atención</caption>
      <tbody>
        {schedule.map((day) => {
          const isToday = day.day === today;
          return (
            <tr key={day.day} className="border-b border-noche/10 last:border-0">
              <th scope="row" className={`py-2.5 pr-4 text-left font-medium ${isToday ? "text-terracota" : ""}`}>
                {day.label}
                {isToday && <span className="ml-2 text-[0.8rem] font-semibold">(hoy)</span>}
              </th>
              <td className={`py-2.5 text-right tabular-nums ${day.shifts.length ? "text-noche/80" : "text-arcilla"}`}>
                {formatShifts(day)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
