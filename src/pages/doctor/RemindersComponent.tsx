import React, { useState } from 'react';
import { IonInput, IonButton, IonList, IonItem, IonDatetime } from '@ionic/react';

interface Reminder {
  reminder: string;
  date: string;
}

const RemindersComponent: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminder, setReminder] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString());

  const addReminder = () => {
    setReminders([...reminders, { reminder, date }]);
    setReminder('');
    setDate(new Date().toISOString());
  };

  return (
    <div>
      <h3>Reminders</h3>
      <IonInput
        value={reminder}
        onIonChange={(e) => setReminder(e.detail.value!)}
        placeholder="Add a reminder"
      />
      <IonDatetime
        displayFormat="MM DD YYYY"
        value={date}
        onIonChange={(e) => setDate(e.detail.value!)}
      />
      <IonButton onClick={addReminder} expand="full" color="primary">
        Add Reminder
      </IonButton>
      <IonList>
        {reminders.map((rem, index) => (
          <IonItem key={index}>
            {rem.reminder} - {new Date(rem.date).toLocaleDateString()}
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default RemindersComponent;