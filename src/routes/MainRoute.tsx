import EventDetail from 'pages/EventDetail';
import Events from 'pages/Events';
import EventType from 'pages/EventType';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

/**
 * Main Route for the application
 */
const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/detail" element={<EventDetail />} />
      <Route path="/event-type" element={<EventType />} />
    </Routes>
  );
};

export default MainRoute;
