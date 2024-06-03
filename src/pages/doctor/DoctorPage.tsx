import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonCard, IonText, IonButton, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Bookings from './Bookings';
import CreateSchedule from './CreateSchedule';
import ScheduleList from './ScheduleList';
import ToolModal from './ToolModal';
import BottomNavigation from '../../components/BottomNavigation';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const DoctorPage: React.FC<{ userId: userIdType, authUser: authUserType }> = ({ userId, authUser }) => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateSchedule, setShowCreateSchedule] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const { doctorId } = useParams<doctorIdType>();
  const [showBookings, setShowBookings] = useState<boolean>(false);
  const [newAppointmentsCount, setNewAppointmentsCount] = useState<number>(0);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`/api/schedules/${userId}`);
        setSchedule(response.data);
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
        setError('Failed to fetch schedule. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userId]);

  useEffect(() => {
    const fetchNewAppointmentsCount = async () => {
      try {
        const response = await axios.get(`/api/appointments/new/count/${doctorId}`);
        setNewAppointmentsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching new appointments count:', error);
      }
    };

    fetchNewAppointmentsCount();

    const intervalId = setInterval(fetchNewAppointmentsCount, 60000);

    return () => clearInterval(intervalId);
  }, [doctorId]);

  const handleIconClick = (iconName: string) => {
    switch (iconName) {
      case 'appointments':
        setShowBookings(true);
        setNewAppointmentsCount(0);
        axios.post(`/api/appointments/new/reset/${doctorId}`).catch(error => console.error('Error resetting new appointments count:', error));
        break;
    }
  };

  const filteredSlots = schedule
    .filter((s) => s.day === selectedDay)
    .flatMap((s) => s.slots);

  return (
    <div>
      <IonText>
        <h1>Welcome Doctor {authUser.username}</h1>
      </IonText>
      <Card doctorId={doctorId} />
      {showBookings && <Bookings doctorId={doctorId} />}
      {loading ? (
        <p>Loading schedule...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <IonCard>
          <h2>Your Schedule</h2>
          <div>
            <IonButton onClick={() => setShowCreateSchedule(!showCreateSchedule)}>
              Add
            </IonButton>
            <IonButton onClick={() => {/* logic to edit schedule slot */}}>
              Edit
            </IonButton>
            <IonButton onClick={() => {/* logic to delete schedule slot */}}>
              Delete
            </IonButton>
          </div>
          <IonLabel>Select Day:</IonLabel>
          <IonSelect value={selectedDay} onIonChange={e => setSelectedDay(e.detail.value)}>
            {daysOfWeek.map((day) => (
              <IonSelectOption key={day} value={day}>
                {day}
              </IonSelectOption>
            ))}
          </IonSelect>
          {showCreateSchedule && (
            <CreateSchedule doctorId={userId} />
          )}
          <ScheduleList slots={filteredSlots} />
        </IonCard>
      )}
      <IonCard>
        <h2>Organizational Tools</h2>
        <div onClick={() => setActiveTool('Notes')}>
          <span>Notes</span>
        </div>
        <div onClick={() => setActiveTool('Calendar')}>
          <span>Calendar</span>
        </div>
        <div onClick={() => setActiveTool('Reminders')}>
          <span>Reminders</span>
        </div>
        <div onClick={() => setActiveTool('Patient Search')}>
          <span>Patient Search</span>
        </div>
      </IonCard>
      {/* {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
      )} */}
      <BottomNavigation onIconClick={handleIconClick} newAppointmentsCount={newAppointmentsCount} />
    </div>
  );
};

export default DoctorPage;