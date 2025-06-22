/* --------------------------------------------------------------------------
 *  sampleAvailability.ts – one-week demo data (single-capacity slots)
 *
 *  • 7  DailyAvailability objects   (Mon 02-Jun-2025 → Sun 08-Jun-2025)
 *  • 30-min slots from 09:00 to 16:30
 *  • 1 capacity per slot → label only shows when taken
 *
 *  Import where needed:
 *     import { sampleAvailability } from '../../data/sampleAvailability';
 * ------------------------------------------------------------------------- */

import type { DailyAvailability } from '../types/calendar'

/* helper – “HH:MM AM/PM” */
function fmt (h: number, m: number): string {
    const hh = h % 12 === 0 ? 12 : h % 12
    const mm = m.toString().padStart(2, '0')
    const suf = h < 12 ? 'AM' : 'PM'
    return `${hh}:${mm} ${suf}`
}

/* build one day’s worth of 30-minute slots */
function buildSlots (): DailyAvailability['slots'] {
    const daySlots = []
    for (let h = 9; h < 17; h++) {
        for (let m = 0; m < 60; m += 30) {
            const available = Math.random() < 0.3        // 30 % open
            daySlots.push({
                id:  `t${h}${m === 0 ? '00' : '30'}`,
                timeLabel: fmt(h, m),
                available,
                label: available
                    ? ''                                       // show nothing if open
                    : Math.random() < 0.5 ? 'SOLD OUT' : 'Wait-list'
            })
        }
    }
    return daySlots
}

/* seven consecutive days starting Mon 02-Jun-2025 */
export const sampleAvailability: DailyAvailability[] = (() => {
    const week: DailyAvailability[] = []
    const base = new Date(2025, 5, 2)                 // month index = 5 (June)

    for (let i = 0; i < 7; i++) {
        const date = new Date(base)
        date.setDate(base.getDate() + i)
        week.push({ date, slots: buildSlots() })
    }
    return week
})()
