import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './components/common/LoadingSpinner';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import './theme/tailwind.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

import LoginPage from './pages/auth/Login';
import ServicesSection from './components/services/ServicesSection';
import { withRouter } from 'react-router';
import DoctorPage from './pages/doctor/DoctorPage';

setupIonicReact();

const ServicesSectionWithRouter = withRouter(ServicesSection);

const App: React.FC = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.error) return null;
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      return data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/signup">
              <Tab2 />
            </Route>
            <Route exact path="/services">
              {authUser ? <ServicesSectionWithRouter authUser={authUser} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route path="/doctors/:doctorId">
              {authUser ?<Tab3 authUser={authUser} userId={authUser._id}/>: <Redirect to="/login" />}
            </Route>
            <Route path="/doctor/:doctorId">
  {authUser ? <DoctorPage authUser={authUser} userId={authUser._id} /> : <Redirect to="/login" />}
</Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={ellipse} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon aria-hidden="true" icon={square} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
