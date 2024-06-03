import React, { useState } from 'react';
import { IonInput, IonList, IonItem } from '@ionic/react';

const PatientSearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [patients, setPatients] = useState<string[]>(['John Doe', 'Jane Smith', 'Alice Johnson']);

  const filteredPatients = patients.filter(patient =>
    patient.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h3>Patient Search</h3>
      <IonInput
        value={query}
        onIonChange={(e) => setQuery(e.detail.value!)}
        placeholder="Search patients"
      />
      <IonList>
        {filteredPatients.map((patient, index) => (
          <IonItem key={index}>{patient}</IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default PatientSearchComponent;