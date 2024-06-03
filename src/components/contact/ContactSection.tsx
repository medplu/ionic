import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonGrid, IonRow, IonCol } from '@ionic/react';
import { logoFacebook, logoInstagram, logoLinkedin,  callOutline, mailOutline, searchOutline } from 'ionicons/icons';
import './contact.css';

const ContactSection: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton href="#" className="social-icon" fill="outline">
                <IonIcon icon={logoFacebook} />
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton href="https://x.com/MedplusCloud?t=nmVy5C-GbOnxIJLkO38A8w&s=09" className="social-icon" fill="outline">
                <IonIcon icon={logoLinkedin} />
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton href="https://www.instagram.com/medplus.cloud?utm_source=qr&igsh=YXc2bXk4OXBxenE3" className="social-icon" fill="outline">
                <IonIcon icon={logoInstagram} />
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton href="https://www.linkedin.com/in/medplus-health-34b635308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-icon" fill="outline">
                <IonIcon icon={logoLinkedin} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
      <IonToolbar>
        <IonButtons slot="start">
          <IonItem lines="full">
            <IonButton>
              <IonIcon icon={callOutline} />
              <IonLabel style={{ marginLeft: '5px' }}>0792755901</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem lines="full">
            <IonButton>
              <IonIcon icon={mailOutline} />
              <IonLabel style={{ marginLeft: '5px', textTransform: 'none' }}>medpluscollaborate@gmail.com</IonLabel>
            </IonButton>
          </IonItem>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon icon={searchOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default ContactSection;