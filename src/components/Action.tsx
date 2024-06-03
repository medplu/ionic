import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

interface ActionProps {
  message: string;
  link: string;
  text: string;
}

export const Action: React.FC<ActionProps> = (props) => (
  <IonRow className="ion-text-center ion-justify-content-center">
    <IonCol size="12">
      <p>
        {props.message}
        <IonRouterLink className="custom-link" routerLink={props.link}> {props.text} &rarr;</IonRouterLink>
      </p>
    </IonCol>
  </IonRow>
);