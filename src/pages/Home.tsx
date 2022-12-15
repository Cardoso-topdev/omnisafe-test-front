import React, { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { omnisafeAPIs } from 'service/api-service';
import { Box, Tabs, Tab } from '@mui/material';
import TabPanel from 'components/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from 'redux/redux-slice';
import { IStoreValue } from 'types';
import EventsList from 'components/EventsList';

const tabProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const subscribedEvents = useSelector((state: IStoreValue) => state.omnisafeReducer.events);
  // const storeEventTypes = useSelector((state: IStoreValue) => state.omnisafeReducer.eventTypes);
  useEffect(() => {
    if (subscribedEvents.length == 0) {
      omnisafeAPIs.getEventTypes().then(result => {
        if (result.data && result.data.length > 0) {
          dispatch(setEvents(result.data));
        }
      })
    }
  }, [subscribedEvents])
  const [tabIdx, setTabIdx] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIdx(newValue);
  };
  return <MainLayout>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tabIdx} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Active Events" {...tabProps(0)} />
        <Tab label="Past Events" {...tabProps(1)} />
      </Tabs>
    </Box>
    <TabPanel value={tabIdx} index={0}>
      <EventsList isAll={false} isActive={true}/>
    </TabPanel>
    <TabPanel value={tabIdx} index={1}>
      <EventsList isAll={false} isActive={false}/>
    </TabPanel>
  </MainLayout>;
};

export default Home;
