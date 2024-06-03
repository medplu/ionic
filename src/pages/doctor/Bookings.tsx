import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonButton, IonModal, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonDatetime, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface Appointment {
    _id: string;
    name: string;
    gender: string;
    email: string;
    Date: string;
}

interface BookingsProps {
    doctorId: string;
}

const Bookings: React.FC<BookingsProps> = ({ doctorId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [time, setTime] = useState('');
    const history = useHistory();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/appointments/${doctorId}`);
        let appointmentsData = response.data.data;
        if (!Array.isArray(appointmentsData)) {
          appointmentsData = [appointmentsData];
        }
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleConfirmAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleTimeChange = (event: CustomEvent) => {
    setTime(event.detail.value);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAppointment(null);
    setTime('');
  };

  const handleSetTime = async () => {
    try {
      const response = await axios.post(`/api/appointments/confirm/${selectedAppointment?._id}`, { time });
      console.log('Appointment confirmed:', response.data);
      // Update the appointments list after confirmation
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== selectedAppointment?._id)
      );
      handleClose();
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    // Implement the logic for rescheduling the appointment here
    console.log(`Rescheduling appointment with ID: ${appointmentId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Your Upcoming Appointments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {appointments.map((appointment) => (
            <IonItem key={appointment._id}>
              <IonLabel>
                <h2>{appointment.name}</h2>
                <p>{appointment.gender}</p>
                <p>{appointment.email}</p>
                <p>{new Date(appointment.Date).toLocaleDateString()}</p>
              </IonLabel>
              <IonButton slot="end" onClick={() => handleConfirmAppointment(appointment)}>
                Confirm
              </IonButton>
              <IonButton slot="end" onClick={() => handleRescheduleAppointment(appointment._id)}>
                Reschedule
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={open} onDidDismiss={handleClose}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Set Appointment Time</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonDatetime
              displayFormat="HH:mm"
              value={time}
              onIonChange={handleTimeChange}
            />
            <IonButton onClick={handleClose}>
              Cancel
            </IonButton>
            <IonButton onClick={handleSetTime}>
              Confirm
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Bookings;