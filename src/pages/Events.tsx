import EventsList from 'components/EventsList';
import MainLayout from 'layouts/MainLayout';
import React from 'react';

const Events = () => {
  return <MainLayout>
    <EventsList isAll={true} />
  </MainLayout>;
};

export default Events;
