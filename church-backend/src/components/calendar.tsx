import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { EventCalendar } from '../types';

export default function ResponsiveDatePickers({event, setEvent}:{event:EventCalendar, setEvent:React.Dispatch<React.SetStateAction<EventCalendar>>}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker defaultValue={dayjs(event.start)} onChange={(newValue) =>setEvent({event, end: newValue})}/>
    </LocalizationProvider>
  );
}