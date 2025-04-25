import { Dispatch, SetStateAction, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect } from 'react';

import { onValue, ref } from 'firebase/database';
import { db } from './cons/firebase';
import SelectActionCard from './components/card';
import { Box, Button, TextField } from '@mui/material';
import TimePickerValue from './components/timeSelect';
import MonthlyEvent from './events/monthlyEvent';
import ResponsiveDatePickers from './components/calendar';
import { writeUserData } from './cons/functions';
import { EventCalendar } from './types';


createRoot(document.getElementById('root')!).render(
  
  <StrictMode>

    <FirebaseData/>
  </StrictMode>,
)
function FirebaseData() {
  const [data, setData] = useState<EventCalendar[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [display, setDisplay] = useState('home');
  useEffect(() => {
    readData(setData,setLoading);
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <DateEvents/>
      <SelectActionCard cards={data}/>
    </Box>

  );
}
function DateEvents(){
  const [eventType, setEventType] = useState<string>('special');
  const [event, setEvent] = useState<EventCalendar>({
        id:null,
        start:'2022-04-17T15:30',
         end: '2022-04-17T15:30',
         eventType:'SPECIAL',
          weeks:[], 
          image:null,
          title:''});
  return(
  <div>
    
    <Button type="submit" variant="contained" color="primary" onClick={()=>{setEvent({...event, eventType:'MONTHLY'});setEventType('monthly')}}>
            Montly Event
    </Button>
    <Button type="submit" variant="contained" color="primary" onClick={()=>{setEvent({...event, eventType:'SPECIAL'});setEventType('special')}}>
            Special Event
    </Button>
    <EnterTitle event={event} setEvent={setEvent}/>
 <ResponsiveDatePickers event={event} setEvent={setEvent}/>
    { eventType === 'monthly'&&        <MonthlyEvent event={event} setEvent={setEvent}/>}
    <TimePickerValue event={event} setEvent={setEvent}/>
    <Button type="submit" variant="contained" color="primary" onClick={()=>writeUserData(event)}>
            Submit
    </Button>
  </div>
  )
}
function readData(setData: any,setLoading: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }) {
  const userRef = ref(db, 'dates/');
  onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      const dates: any[] = []
      keys.forEach(key => {
        const date = data[key];
        date['id'] = key;
        dates.push(date)
      });
      setData(dates)
      setLoading(false);
      
  });
}
function EnterTitle({event, setEvent} : {event: EventCalendar, setEvent: Dispatch<SetStateAction<EventCalendar>>}){
  return (
    <Box
    component="form"
    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        value={event.title}
        onChange={(e)=>setEvent({...event,title: e.target.value })}
      />

    </div>

  </Box>
  )
}
