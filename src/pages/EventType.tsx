import EventTypeTable from 'components/EventTypeTable';
import MainLayout from 'layouts/MainLayout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from 'redux/redux-slice';
import { omnisafeAPIs } from 'service/api-service';
import { IStoreValue } from 'types';

const EventType = () => {
  const dispatch = useDispatch();
  const storeEventTypes = useSelector((state: IStoreValue) => state.omnisafeReducer.eventTypes);
  useEffect(() => {
    if (storeEventTypes.length == 0) {
      omnisafeAPIs.getEventTypes().then(result => {
        if (result.data && result.data.length > 0) {
          dispatch(setEvents(result.data));
        }
      })
    }
  }, [storeEventTypes])

  return <MainLayout>
    <EventTypeTable />
  </MainLayout>;
};

export default EventType;
