import { IonButton, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonImg, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import { Action } from '../components/Action';
import styles from './Tab1.module.css';

const Home = () => {
	
	return (
		<IonPage className={styles.homepage}>
  <IonHeader>
    <IonImg src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1715100266/ueycdq8etsxr1kjyhnqf.jpg" />
  </IonHeader>
  <IonContent fullscreen>
    <div className={styles.getStarted}>
      <IonGrid>
        <IonRow className={`ion-text-center ion-justify-content-center ${styles.heading}`}>
          <IonCol size="11" className={styles.headingText}>
            <IonCardTitle>Join millions of other people discovering their creative side</IonCardTitle>
          </IonCol>
        </IonRow>
        <IonRow className={`ion-text-center ion-justify-content-center`}>
          <IonRouterLink routerLink="/signup" className={styles.customLink}>
            <IonCol size="11">
              <IonButton className={`${styles.getStartedButton} ${styles.customButton}`}>Get started &rarr;</IonButton>
            </IonCol>
          </IonRouterLink>
        </IonRow>
      </IonGrid>
    </div>
  </IonContent>
  <IonFooter>
    <IonGrid>
      <Action message="Already got an account?" text="Login" link="/login" />
    </IonGrid>
  </IonFooter>
</IonPage>
	);
};

export default Home;