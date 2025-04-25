import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { EventCalendar } from '../types';

export default function TimePickerValue({event, setEvent} : {event: EventCalendar, setEvent: React.Dispatch<React.SetStateAction<EventCalendar>>}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        <TimePicker
          label="Uncontrolled picker"
          defaultValue={dayjs(event.start)}
          onChange={(newValue) =>setEvent({...event, start: newValue}) }
        />
        <TimePicker
          label="Controlled picker"
          value={dayjs(event.end)}
          onChange={(newValue) =>setEvent({...event, end: newValue})}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}