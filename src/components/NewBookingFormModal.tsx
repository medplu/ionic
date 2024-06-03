import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import {
  IonButton,
  IonButtons,
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
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
  IonTextarea,
  IonSelect,
  IonToolbar,
  IonToast,
  IonSelectOption,
} from "@ionic/react";
import { close } from "ionicons/icons";
import axios from "axios";

const NewBookingFormModal = ({
  doctor,
  selectedSlot,
  isOpen,
  onCancel,
  userId,
  authUser,
}: {
  doctor: any;
  selectedSlot: any;
  isOpen: boolean;
  onCancel: () => void;
  userId: string;
  authUser: any;
}) => {
  const [formData, setFormData] = useState({
    name: authUser.fullName, // Populate name from authUser
    email: authUser.email, // Populate email from authUser
    phone: "",
    gender: "",
    age: "",
    reason: "",
    date: new Date().toISOString().split("T")[0], // Set current date as default value
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLIonInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post("/api/appointments", {
        ...formData,
        doctorId: doctor._id,
        userId,
        slot: selectedSlot,
      });
  
      setLoading(false);
      if (response.status === 201) {
        // Mark the selected slot as booked in the doctor state
        setDoctor(prevDoctor => {
          const updatedDoctor = { ...prevDoctor };
          updatedDoctor.schedule[selectedSlot.day] = updatedDoctor.schedule[selectedSlot.day].map(slot =>
            slot.startTime === selectedSlot.startTime && slot.endTime === selectedSlot.endTime
              ? { ...slot, isBooked: true, patientId: userId }
              : slot
          );
          return updatedDoctor;
        });
  
        setShowToast(true);
        onCancel();
        history.push('/services');
      }
    } catch (error) {
      setError("Failed to book appointment. Please try again.");
      setLoading(false);
    }
  };
  

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onCancel}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-text-center">
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Booking for {doctor.name}</IonCardSubtitle>
                  <IonCardTitle>{`${selectedSlot.day} ${selectedSlot.startTime} - ${selectedSlot.endTime}`}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={handleSubmit}>
                    <IonItem>
                      <IonLabel position="floating">Name</IonLabel>
                      <IonInput
                        name="name"
                        value={formData.name}
                        onIonChange={handleInputChange}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Date</IonLabel>
                      <IonInput
                        type="date"
                        name="date"
                        value={formData.date}
                        onIonChange={handleInputChange}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Email</IonLabel>
                      <IonInput
                        name="email"
                        value={formData.email}
                        onIonChange={handleInputChange}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Phone</IonLabel>
                      <IonInput
                        name="phone"
                        value={formData.phone}
                        onIonChange={handleInputChange}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Gender</IonLabel>
                      <IonSelect
                        name="gender"
                        value={formData.gender}
                        onIonChange={handleInputChange}
                      >
                        <IonSelectOption value="male">Male</IonSelectOption>
                        <IonSelectOption value="female">Female</IonSelectOption>
                        <IonSelectOption value="other">Other</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Age</IonLabel>
                      <IonInput
                        type="number"
                        name="age"
                        value={formData.age}
                        onIonChange={handleInputChange}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">
                        Reason for Appointment
                      </IonLabel>
                      <IonTextarea
                        name="reason"
                        value={formData.reason}
                        onIonChange={handleInputChange}
                      />
                    </IonItem>
                    <IonButton
                      expand="full"
                      type="submit"
                      style={{ marginTop: "1rem" }}
                      disabled={loading}
                    >
                      {loading ? "Booking..." : "Book Appointment"}
                    </IonButton>
                    {error && (
                      <IonText color="danger" style={{ marginTop: "1rem" }}>
                        {error.message}
                      </IonText>
                    )}
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
  isOpen={showToast}
  onDidDismiss={() => setShowToast(false)}
  message="Appointment created successfully!"
  duration={2000}
/>
      </IonContent>
    </IonModal>
  );
};

export default NewBookingFormModal;
