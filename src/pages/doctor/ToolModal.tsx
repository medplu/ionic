import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import NotesComponent from './NotesComponent';
import CalendarComponent from './CalendarComponent';
import RemindersComponent from './RemindersComponent';
import PatientSearchComponent from './PatientsSearchComponent';

interface ToolModalProps {
  tool: 'Notes' | 'Calendar' | 'Reminders' | 'Patient Search';
  onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  const renderToolContent = () => {
    switch (tool) {
      case 'Notes':
        return <NotesComponent />;
      case 'Calendar':
        return <CalendarComponent />;
      case 'Reminders':
        return <RemindersComponent />;
      case 'Patient Search':
        return <PatientSearchComponent />;
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{tool}</IonTitle>
          <IonButton slot="end" onClick={onClose}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {renderToolContent()}
      </IonContent>
    </IonPage>
  );
};

export default ToolModal;