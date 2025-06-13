/* ---------- booking workflow ---------- */
export { default as BookingFlow }          from './src/components/booking/BookingFlow';
export { default as ConfirmationPrompt }   from './src/components/booking/ConfirmationPrompt';
export { default as ConfirmationPage }     from './src/components/booking/ConfirmationPage';
export { default as DetailsForm }          from './src/components/booking/DetailsForm';
export { default as Payment }              from './src/components/booking/Payment';

/* ---------- calendar / dates ---------- */
export { default as CalendarView }         from './src/components/calendar/CalendarView';
export { HeatmapCalendar }                 from './src/components/calendar/HeatmapCalendar';
export { WeeklyAgenda }                    from './src/components/calendar/WeeklyAgenda';
export { default as SlotModal }            from './src/components/calendar/SlotModal';

/* ---------- services catalog ---------- */
export { ServiceAccordion }               from './src/components/services/ServiceAccordion';
export { ServiceCard }                    from './src/components/services/ServiceCard';
export { ServiceGrid }                    from './src/components/services/ServiceGrid';
export { default as ServiceList }         from './src/components/services/ServiceList';
export { ServicesHeader }                 from './src/components/services/ServicesHeader';
export { WhatYouNeed }                    from './src/components/services/WhatYouNeed';

/* ---------- shared layout ---------- */
export { default as Header }               from './src/components/layout/Header';
export { HeroTitle }                       from './src/components/layout/HeroTitle';
export { Tabs }                            from './src/components/layout/Tabs';

/* ---------- UI atoms ---------- */
export { default as BackButton }           from './src/components/ui/BackButton';
export { ContinueButton }                  from './src/components/ui/ContinueButton';
export { SuccessToast }                    from './src/components/ui/SuccessToast';

/* ---------- shell (embeddable widget) ---------- */
export { default as WidgetShell }          from './src/components/shell/WidgetShell';