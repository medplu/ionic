import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  IonButton,
  IonButtons,
  IonModal,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import styles from "./Home.module.scss";
import {
  star,
  arrowBackOutline,
  arrowForward,
  ellipsisHorizontal,
  personAddOutline,
  imageOutline,
  bookmarkOutline,
} from "ionicons/icons";
import NewBookingFormModal from "../components/NewBookingFormModal";

const Home = ({ authUser, userId }: { authUser: any, userId: string }) => {
  const [showBio, setShowBio] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const { doctorId } = useParams<{ doctorId: string }>();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`/api/schedules/${doctorId}`);
        setSchedules(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${doctorId}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDoctor();
    fetchSchedules();
  }, [doctorId]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSlotSelection = (day, startTime, endTime) => {
	setSelectedSlot({ doctorId: doctor._id, day, startTime, endTime });
	setDoctor(prevDoctor => {
	  const updatedDoctor = { ...prevDoctor };
	  updatedDoctor.schedule[day] = updatedDoctor.schedule[day].map(slot => 
		slot.startTime === startTime && slot.endTime === endTime ? { ...slot, isBooked: true } : slot
	  );
	  return updatedDoctor;
	});
	setShowModal(true);
  };

  return (
    <IonPage className={styles.home}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light">
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="light">
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={styles.topHeader}></div>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonCard className={styles.profileHeader}>
                <IonCardContent>
                  <IonRow>
                    <IonCol size="4">
                      {doctor && (
                        <img
                          src={doctor.image}
                          alt="avatar"
                          className={styles.avatar}
                        />
                      )}
                    </IonCol>
                    <IonCol size="8">
                      <IonRow className={styles.profileInfo}>
                        <IonCol size="12">
                          <IonText color="dark" className={styles.profileName}>
                            <p>{doctor ? doctor.name : "Loading..."}</p>
                          </IonText>
                          <IonText color="medium">
                            <p>{doctor ? doctor.specialties : "Loading..."}</p>
                          </IonText>
                        </IonCol>
                      </IonRow>

                      <IonRow className={styles.profileStats}>
                        <IonCol className={styles.profileStat}>
                          <IonCardTitle>109</IonCardTitle>
                          <IonCardSubtitle>Patients</IonCardSubtitle>
                        </IonCol>

                        <IonCol className={styles.profileStat}>
                          <IonIcon icon={star} style={{ color: "gold" }} />
                          <IonCardSubtitle>Rating</IonCardSubtitle>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6">
                      <IonButton fill="outline" expand="block">
                        Message
                      </IonButton>
                    </IonCol>

                    <IonCol size="6">
                      <IonButton
                        color="primary"
                        expand="block"
                        onClick={() => setShowSlots((prev) => !prev)}
                      >
                        <IonIcon icon={personAddOutline} size="small" />
                        &nbsp; Book
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className={styles.profileStatusContainer}>
            <IonCol size="12">
              <IonCard className={styles.profileCard}>
                <IonCardHeader>
                  <IonRow className={styles.profileStatus}>
                    <IonCardSubtitle>
                      Dr. {doctor ? doctor.name : "Loading..."}
                    </IonCardSubtitle>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p> {doctor ? doctor.bio : "Loading..."}</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className={styles.profileActionContainer}>
            <IonCol size="12">
              <IonCard
                className={`${styles.profileActionCard} bg-emerald-500 bg-opacity-50`}
              >
                <IonCardContent>
                  <IonRow className="ion-justify-content-between">
                    <IonCardSubtitle>View Available slots</IonCardSubtitle>
                    <IonIcon
                      icon={arrowForward}
                      onClick={() => setShowSlots((prev) => !prev)}
                    />
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {showSlots && (
            <div>
              <h2 className="text-center">Available Slots</h2>
             
			  {doctor &&
  doctor.schedule &&
  Object.entries(doctor.schedule).map(([day, timeSlots]) => (
    <div key={day}>
      <h3>{day}</h3>
      {timeSlots.map((slot, index) => {
        if (!slot.isBooked) {
          return (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardSubtitle>{day}</IonCardSubtitle>
                <IonCardTitle>{`${slot.startTime} - ${slot.endTime}`}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton
                  expand="full"
                  color="primary"
                  onClick={() => handleSlotSelection(day, slot.startTime, slot.endTime)}
                >
                  Book Slot
                </IonButton>
              </IonCardContent>
            </IonCard>
          );
        }
        return null;
      })}
    </div>
  ))}
            </div>
          )}
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            {selectedSlot && doctor && (
              <NewBookingFormModal
                doctor={doctor}
                selectedSlot={selectedSlot}
                isOpen={showModal}
                onCancel={handleCloseModal}
                userId={userId}
                authUser={authUser}
              />
            )}
          </IonModal>

          <IonRow>
            <IonCol size="6">
              <IonCard className={styles.profileCard}>
                <IonCardContent>
                  <IonIcon icon={imageOutline} />
                  <IonCardTitle>147</IonCardTitle>
                  <IonCardSubtitle>Photos</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard className={styles.profileCard}>
                <IonCardContent>
                  <IonIcon icon={bookmarkOutline} />
                  <IonCardTitle>63</IonCardTitle>
                  <IonCardSubtitle>Bookmarks</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
