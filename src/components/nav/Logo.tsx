import React from "react";
import { IonRouterLink, IonIcon, IonItem, IonText } from "@ionic/react";
import { homeOutline } from "ionicons/icons";

const Logo: React.FC = () => {
  return (
    <div className="flex rounded-xl overflow-hidden">
      {/* Left Section with SVG */}
      <IonRouterLink routerLink="/landing">
        <IonItem className="bg-yellow-400 flex items-center justify-center" style={{ width: "40px", height: "40px" }}>
          <IonIcon icon={homeOutline} size="large" color="light" />
        </IonItem>
      </IonRouterLink>

      {/* Right Section with Text */}
      <IonRouterLink routerLink="/landing">
        <IonItem className="bg-blue-500 text-white text-sm items-center p-1" style={{ width: "calc(100% - 40px)", minHeight: "40px" }}>
          <IonText>
            Medplus<sup>+</sup>
          </IonText>
        </IonItem>
      </IonRouterLink>
    </div>
  );
};

export default Logo;
