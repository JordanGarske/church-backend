import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { EventCalendar } from '../types';

const WeekCheckboxes = ({event, setEvent} : {event: EventCalendar, setEvent: any}) => {
  console.log(event)
  const handleChange = (e:any) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setEvent({...event, weeks: [...event.weeks, value]});
    } else {
      setEvent({...event, weeks: event.weeks.filter((v) => v !== value)});
    }
  };
  
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value={0}
            checked={event.weeks.includes(0)}
            onChange={handleChange}
          />
        }
        label="Week 1"
      />
      <FormControlLabel
        control={
          <Checkbox
            value={1}
            checked={event.weeks.includes(1)}
            onChange={handleChange}
          />
        }
        label="Week 2"
      />
      <FormControlLabel
        control={
          <Checkbox
            value={2}
            checked={event.weeks.includes(2)}
            onChange={handleChange}
          />
        }
        label="Week 3"
      />
      <FormControlLabel
        control={
          <Checkbox
            value={3}
            checked={event.weeks.includes(3)}
            onChange={handleChange}
          />
        }
        label="Week 4"
      />
      <div>Selected Weeks: {JSON.stringify(event)}</div>
    </FormGroup>
  );
};

export default WeekCheckboxes;
