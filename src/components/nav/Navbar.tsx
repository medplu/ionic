import React, { useState } from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton } from "@ionic/react";
import { menuOutline, closeOutline, chevronDownOutline } from "ionicons/icons";
import Logo from "./Logo";

interface NavLinkProps {
  to: string;
  label: string;
  hasDropdown?: boolean;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <IonHeader>
      <IonToolbar className="bg-blue-600 text-white">
        <IonButton slot="start" onClick={toggleMenu} fill="clear" color="light">
          <IonIcon icon={isMenuOpen ? closeOutline : menuOutline} />
        </IonButton>
        <IonTitle>
          <Logo />
        </IonTitle>
        <IonContent>
          <IonMenu contentId="main-content" side="start" menuId="first" isOpen={isMenuOpen} onIonDidClose={() => setIsMenuOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <NavLink to="/" label="Home" />
                <NavLink to="/about" label="About" />
                <NavLink to="/services" label="Services" hasDropdown />
                <NavLink to="/diseases" label="Diseases" hasDropdown />
                <NavLink to="/resources" label="Resources" hasDropdown />
                <NavLink to="/socials" label="Socials" />
                <NavLink to="/blogs" label="Blogs" />
              </IonList>
            </IonContent>
          </IonMenu>
        </IonContent>
      </IonToolbar>
    </IonHeader>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ to, label, hasDropdown }) => {
  return (
    <IonItem routerLink={to} className="relative text-slate-950 hover:text-gray-300 px-4 py-2 rounded-md">
      {label}
      {hasDropdown && (
        <IonIcon icon={chevronDownOutline} slot="end" />
      )}
    </IonItem>
  );
};

export default Navbar;
