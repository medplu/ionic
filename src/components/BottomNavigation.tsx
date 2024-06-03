import React from 'react';
import { IonFooter, IonToolbar, IonButtons, IonButton, IonIcon, IonBadge } from '@ionic/react';
import { notificationsOutline, walletOutline, settingsOutline, personCircleOutline } from 'ionicons/icons';

interface BottomNavigationProps {
  onIconClick: (icon: string) => void;
  newAppointmentsCount: number;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onIconClick, newAppointmentsCount }) => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => onIconClick('appointments')}>
            <IonIcon icon={notificationsOutline} />
            {newAppointmentsCount > 0 && (
              <IonBadge color="danger">{newAppointmentsCount}</IonBadge>
            )}
            Appointments
          </IonButton>
          <IonButton>
            <IonIcon icon={walletOutline} />
            Accounts
          </IonButton>
          <IonButton>
            <IonIcon icon={settingsOutline} />
            Settings
          </IonButton>
          <IonButton>
            <IonIcon icon={personCircleOutline} />
            Profile
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};

export default BottomNavigation;