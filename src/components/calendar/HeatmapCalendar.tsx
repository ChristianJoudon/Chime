import { motion }            from 'framer-motion';
import { DayPicker }          from 'react-day-picker';
import type { AvailabilityMap } from '../../types/service';
import 'react-day-picker/dist/style.css';

interface HeatmapCalendarProps {
  availability : AvailabilityMap;         // { 'YYYY-MM-DD': openCount }
  onSelectDate : (date: Date) => void;
}

/* ------------------------------------------------------------------ */
/* helper -> returns tailwind bg-class based on free-slot count       */
/* ------------------------------------------------------------------ */
function getDayClassName(date: Date, map: AvailabilityMap) {
  const key      = date.toISOString().slice(0, 10);
  const open     = map[key];              // undefined → day not in data
  if (open === undefined) return 'bg-gray-200/40 cursor-not-allowed';

  if (open === 0)      return 'bg-coral-300 text-coral-900'; // fully booked
  if (open <= 2)       return 'bg-yellow-200 text-yellow-900';
  if (open <= 4)       return 'bg-lime-200  text-lime-900';
  /* 5+ slots ----------------------------------------------*/
  return 'bg-mint-200  text-mint-800';
}

export function HeatmapCalendar({ availability, onSelectDate }: HeatmapCalendarProps) {
  /* naive “June 2025” demo days — replace with real month walker */
  const daysInMonth = Array.from({ length: 30 },
      (_, i) => new Date(2025, 5 /* June */, i + 1));

  return (
      <motion.div
          className="glass-panel-deep p-6 rounded-3xl shadow-xl w-full max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        {/* header — you probably already have prettier buttons ------------- */}
        <div className="w-full mb-4 bg-mint-500 text-white rounded-t-2xl
                      py-3 px-6 flex items-center justify-between">
          <button>◀</button><h2 className="text-xl font-semibold">June 2025</h2><button>▶</button>
        </div>

        {/* weekday row ----------------------------------------------------- */}
        <div className="grid grid-cols-7 text-center bg-mint-100 text-mint-700
                      font-semibold uppercase text-sm py-1 rounded-t-md">
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(wd => <div key={wd}>{wd}</div>)}
        </div>

        {/* day cells ------------------------------------------------------- */}
        <div className="grid grid-cols-7 gap-2 mt-2">
          {daysInMonth.map((date, idx) => {
            const cls = getDayClassName(date, availability);
            const disabled = cls.includes('cursor-not-allowed');
            return (
                <motion.div
                    key={idx}
                    className={`${cls} backdrop-blur-[2px] border border-white/30
                         rounded-md w-10 h-10 flex items-center justify-center
                         ${disabled ? '' : 'cursor-pointer'}`}
                    whileHover={disabled ? {} : { scale: 1.06 }}
                    onClick={() => !disabled && onSelectDate(date)}
                >
                  {idx + 1}
                </motion.div>
            );
          })}
        </div>

        {/* legend ---------------------------------------------------------- */}
        <div className="flex justify-around items-center mt-4 text-sm">
          <Legend swatch="bg-mint-200"  label="5+ slots" />
          <Legend swatch="bg-lime-200"  label="3–4 slots" />
          <Legend swatch="bg-yellow-200" label="1–2 slots" />
          <Legend swatch="bg-coral-300" label="Sold out" />
        </div>
      </motion.div>
  );
}

/* tiny legend helper */
const Legend = ({ swatch, label }: { swatch: string; label: string }) => (
    <div className="flex items-center space-x-1">
      <span className={`block w-4 h-4 ${swatch} rounded`}></span>
      <span>{label}</span>
    </div>
);