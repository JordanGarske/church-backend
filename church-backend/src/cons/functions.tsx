import { push, ref, remove } from "firebase/database";
import { db } from "./firebase";
import { EventCalendar } from "../types";

export function writeUserData(date: EventCalendar) {
    push(ref(db, 'dates/' ), { 
      ...date, 
      start: new Date(date.start).toString(), 
      end: new Date(date.end).toString() 
    });

}
export function deleteDate(date: EventCalendar){
  remove(ref(db, 'dates/'+ date.id ) );

}