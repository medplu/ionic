import React, { useState } from 'react';
import axios from 'axios';
import { IonButton, IonInput, IonLabel, IonSelect, IonSelectOption, IonDatetime } from '@ionic/react';

interface Slot {
  startTime: string;
  endTime: string;
  place: string;
}

interface CreateScheduleProps {
  doctorId: string;
}

const CreateSchedule: React.FC<CreateScheduleProps> = ({ doctorId }) => {
  const [day, setDay] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [slots, setSlots] = useState<Slot[]>([{ startTime: '', endTime: '', place: '' }]);

  const handleSlotChange = (index: number, field: keyof Slot, value: string) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const addSlot = () => {
    setSlots([...slots, { startTime: '', endTime: '', place: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/schedules/${doctorId}`, { day, date, slots });
      alert('Schedule created successfully');
    } catch (error) {
      console.error('Failed to create schedule:', error);
      alert('Failed to create schedule. Please try again.');
    }
  };

  return (
    <div className=" bg-gray-100 text-slate-900 p-4 rounded-lg shadow">
      <h2 className="text-lg text-slate-900 font-semibold mb-4">Create Schedule</h2>
      <form onSubmit={handleSubmit}>
        <IonLabel>Day:</IonLabel>
        <IonSelect value={day} onIonChange={e => setDay(e.detail.value)} required>
          <IonSelectOption value="">Select Day</IonSelectOption>
          <IonSelectOption value="Monday">Monday</IonSelectOption>
          <IonSelectOption value="Tuesday">Tuesday</IonSelectOption>
          <IonSelectOption value="Wednesday">Wednesday</IonSelectOption>
          <IonSelectOption value="Thursday">Thursday</IonSelectOption>
          <IonSelectOption value="Friday">Friday</IonSelectOption>
        </IonSelect>
        <IonLabel>Date:</IonLabel>
        <IonDatetime displayFormat="YYYY-MM-DD" value={date} onIonChange={e => setDate(e.detail.value)} required></IonDatetime>
        {slots.map((slot, index) => (
          <div key={index}>
            <IonLabel>Time Slot:</IonLabel>
            <IonInput type="text" value={slot.startTime} onIonChange={e => handleSlotChange(index, 'startTime', e.detail.value)} placeholder="Start Time (HH:mm)" required></IonInput>
            <IonInput type="text" value={slot.endTime} onIonChange={e => handleSlotChange(index, 'endTime', e.detail.value)} placeholder="End Time (HH:mm)" required></IonInput>
            <IonInput type="text" value={slot.place} onIonChange={e => handleSlotChange(index, 'place', e.detail.value)} placeholder="Place" required></IonInput>
          </div>
        ))}
        <IonButton expand="full" onClick={addSlot}>Add Slot</IonButton>
        <IonButton expand="full" type="submit">Create Schedule</IonButton>
      </form>
    </div>
  );
};

export default CreateSchedule;