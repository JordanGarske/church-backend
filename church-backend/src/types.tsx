
export type EventCalendar = {
  id: number|null;
  start: string;
  end: string;
  eventType: string;
  weeks: Array<Number>;
  image:string | null;
  title: string;
}