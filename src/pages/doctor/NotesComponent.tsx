import React, { useState } from 'react';
import { IonInput, IonButton, IonList, IonItem } from '@ionic/react';

const NotesComponent: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [note, setNote] = useState<string>('');

  const addNote = () => {
    setNotes([...notes, note]);
    setNote('');
  };

  return (
    <div>
      <h3>Notes</h3>
      <IonInput
        value={note}
        onIonChange={(e) => setNote(e.detail.value!)}
        placeholder="Add a note"
      />
      <IonButton onClick={addNote} expand="full" color="primary">
        Add Note
      </IonButton>
      <IonList>
        {notes.map((note, index) => (
          <IonItem key={index}>{note}</IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default NotesComponent;