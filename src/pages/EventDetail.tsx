import { Box, Typography } from '@mui/material';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IStoreValue } from 'types';

const EventDetail = () => {
  const [searchParams] = useSearchParams();
  const eventId: number = +(searchParams.get("id") ?? 0);
  const events = useSelector((state: IStoreValue) => state.omnisafeReducer.events);
  const eventTypes = useSelector((state: IStoreValue) => state.omnisafeReducer.eventTypes);
  const eventDetailItem = events.find(item => item.id === eventId);
  const eventType = eventTypes.find(item => item.id === eventDetailItem?.eventsTypeId);
  return (
    <MainLayout>
      <Box>
        <Typography variant='h3'>{eventDetailItem?.name}</Typography>
        <Typography variant='h5' sx={{mt: 5, mb: 10}}>Description: {eventDetailItem?.description}</Typography>
        <Typography>Event Type: {eventType?.name}</Typography>
      </Box>
    </MainLayout>
  );
};

export default EventDetail;