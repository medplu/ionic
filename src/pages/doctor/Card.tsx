import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


interface appointmentType {
  _id: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  time: string;
  Date: string;
}

interface CardProps {
  doctorId: string;
}

const Card: React.FC<CardProps> = ({ doctorId }) => {
  const [appointments, setAppointments] = useState<appointmentType[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/appointments/all/${doctorId}`);
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

  return (
    <div className="bg-gray-800 text-white text-center p-4 rounded-lg shadow-md">
      <IonCardHeader>
        <IonCardTitle>Your upcoming appointments</IonCardTitle>
      </IonCardHeader>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {appointments.map((appointment) => (
          <SwiperSlide key={appointment._id}>
            <IonCard className="p-2 bg-gray-900 bg-opacity-70 text-white border border-gray-800 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <IonCardContent>
                <h2 className="text-lg font-bold">{appointment.name}</h2>
                <p className="text-gray-200">{appointment.gender}</p>
                <p className="text-gray-200">{appointment.email}</p>
                <p className="text-gray-200">{appointment.phone}</p>
                <p className="text-gray-200">{appointment.time}</p>
                <p className="text-orange-500">{new Date(appointment.Date).toLocaleDateString()}</p>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Card;