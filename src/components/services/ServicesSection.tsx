import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonImg, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { personCircleOutline, settingsOutline } from 'ionicons/icons';
import { RouteComponentProps } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import ServiceCard from "./ServiceCard";
import { hammerOutline } from "ionicons/icons";
import { IonCard, IonText, IonModal, IonInput, IonItem, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardContent } from "@ionic/react";
import { carSportOutline, bodyOutline, flaskOutline, medicalOutline, heartOutline, womanOutline, ribbonOutline, personOutline } from 'ionicons/icons';
import BookingFormModal from './BookingFormModal';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

import './services.css';
interface Doctor {
  _id: string;
  image: string;
  name: string;
  specialties: string;
  consultationFee: number;
  location: string;
}

interface AuthUser {
  _id: string;
  username: string;
  email: string;
}

interface ServicesSectionProps extends RouteComponentProps {
  authUser: AuthUser;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ authUser }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSegment, setSelectedSegment] = useState('services');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<{ icon: string, title: string, description: string } | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors'); // Adjust the URL according to your backend route
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleCardClick = (service: { icon: string, title: string, description: string }) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedDoctor(null);
  };
  const slideOpts = {
    slidesPerView: 2.5,
    freeMode: true,
  };
  const categoriesSets: { icon: string; title: string; description: string }[][] = [
    [
      { icon: carSportOutline, title: 'Ambulance', description: 'Emergency medical transportation' },
      { icon: flaskOutline, title: 'Laboratory', description: 'Medical testing and analysis' },
    ],
    [
      { icon: medicalOutline, title: 'Cardiologist', description: 'Heart and blood vessel specialists' },
      { icon: heartOutline, title: 'Neurologist', description: 'Brain and nervous system specialists' },
      { icon: bodyOutline, title: 'Kidneys', description: 'Kidney specialists' },
    ]
  ];

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon slot="icon-only" icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome!</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonImg
            src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1715100266/ueycdq8etsxr1kjyhnqf.jpg"
            alt="Hero Image"
          />
          <IonCardHeader>
            <IonCardTitle>Your Healthcare Partner</IonCardTitle>
            <IonCardSubtitle>Connecting you to professional Medical Care</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <IonSegment onIonChange={e => setSelectedSegment(e.detail.value || '')}>
          <IonSegmentButton value="services">
            <IonLabel>Services</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="specialties">
            <IonLabel>Specialties</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {selectedSegment === 'services' && (
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {categoriesSets[0].map((service, index) => (
              <SwiperSlide key={index}>
                <IonCard onClick={() => handleCardClick(service)}>
                  <IonCardHeader>
                    <IonIcon icon={service.icon} />
                    <IonCardTitle>{service.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {service.description}
                  </IonCardContent>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {selectedSegment === 'specialties' && (
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {categoriesSets[1].map((specialty, index) => (
              <SwiperSlide key={index}>
                <IonCard onClick={() => handleCardClick(specialty)}>
                  <IonCardHeader>
                    <IonIcon icon={specialty.icon} />
                    <IonCardTitle>{specialty.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {specialty.description}
                  </IonCardContent>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <IonText>
          <h1>Our Top Specialists </h1>
        </IonText>

        <Swiper slidesPerView={2} spaceBetween={10} className="mySwiper">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            doctors.map((doctor) => (
              <SwiperSlide key={doctor._id}>
                <div>
                  <Link to={`/doctors/${doctor._id}`}>
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                    />
                  </Link>
                  <div>
                    <div>
                      <h3>{doctor.name}</h3>
                      <p>{doctor.specialties}</p>
                      <div>
                        <p>{doctor.consultationFee}</p>
                        <div>
                          <p>
                            <IonLabel /> {doctor.location}
                          </p>
                        </div>
                        <IonButton
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedDoctor(doctor);
                            setShowBookingModal(true);
                          }}
                        >
                          Book
                        </IonButton>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        {selectedDoctor && (
          <BookingFormModal
            isOpen={showBookingModal}
            onCancel={closeBookingModal}
            doctor={selectedDoctor}
            authUser={authUser}
            userId={authUser._id}
          />
        )}
      </IonContent>

      {selectedService && (
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
              <IonTitle>{selectedService.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="ion-padding">
              <IonIcon icon={selectedService.icon} size="large" />
              <IonText>
                <p>{selectedService.description}</p>
              </IonText>
            </div>
          </IonContent>
        </IonModal>
      )}
    </IonPage>
  );
};

export default ServicesSection;