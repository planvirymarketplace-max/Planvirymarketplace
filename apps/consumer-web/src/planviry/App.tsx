'use client';

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useEnsureHash } from '@/planviry/router';
import { AppProvider } from '@/planviry/context/AppContext';
import { Layout } from '@/planviry/components/Layout';

// Pages
import { Home } from '@/planviry/pages/Home';
import { ItineraryPage } from '@/planviry/pages/Itinerary';
import { PaymentPage } from '@/planviry/pages/Payment';
import { VendorPortalPage } from '@/planviry/pages/VendorPortal';
import { CoPlanningTasksPage } from '@/planviry/pages/CoPlanningTasks';
import { LegalCenter } from '@/planviry/pages/Legal';
import { GlobalAdminPage } from '@/planviry/pages/GlobalAdmin';
import { GuestPortalPage } from '@/planviry/pages/GuestPortal';
import { PrivacyRightsForm } from '@/planviry/pages/PrivacyRequest';
import { ContactForm } from '@/planviry/pages/ContactForm';

// Category pages
import { ServicesPage } from '@/planviry/pages/Services';
import { PlanPage } from '@/planviry/pages/Plan';
import { ThingsToDoPage } from '@/planviry/pages/ThingsToDo';
import { FoodDrinkPage } from '@/planviry/pages/FoodDrink';
import { LiveShowsPage } from '@/planviry/pages/LiveShows';
import { TravelPage } from '@/planviry/pages/Travel';
import { PartyPage } from '@/planviry/pages/Party';
import { SpacesPage } from '@/planviry/pages/Spaces';
import { VendorsPage } from '@/planviry/pages/Vendors';
import { ExplorePage } from '@/planviry/pages/Explore';
import { VendorDetail } from '@/planviry/pages/VendorDetail';
import { ComposePage } from '@/planviry/pages/Compose';
import { ConciergePage } from '@/planviry/pages/Concierge';
import { DestinationNavigatorPage } from '@/planviry/pages/DestinationNavigator';

function AppRoutes() {
  useEnsureHash();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/vendor-portal" element={<VendorPortalPage />} />
          <Route path="/tasks" element={<CoPlanningTasksPage />} />
          <Route path="/legal" element={<LegalCenter />} />
          <Route path="/privacy-request" element={<PrivacyRightsForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/global-admin" element={<GlobalAdminPage />} />
          <Route path="/guest-portal" element={<GuestPortalPage />} />

          {/* Category Directory Routes */}
          <Route path="/vendor/:id" element={<VendorDetail />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/things-to-do" element={<ThingsToDoPage />} />
          <Route path="/food-drink" element={<FoodDrinkPage />} />
          <Route path="/live-shows" element={<LiveShowsPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/destination-navigator" element={<DestinationNavigatorPage />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/compose" element={<ComposePage />} />
          <Route path="/concierge" element={<ConciergePage />} />

          {/* Redirect any other path to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default function PlanviryApp() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
