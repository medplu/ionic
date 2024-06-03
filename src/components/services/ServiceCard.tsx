import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image }) => {
  return (
    <IonCard>
      <IonImg src={image} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {description}
      </IonCardContent>
    </IonCard>
  );
};

export default ServiceCard;