import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStoreValue } from 'types';

interface IEventsListProps {
  isActive?: boolean,
  isAll: boolean
}
const EventsList: React.FC<IEventsListProps> = ({isActive, isAll}) => {
  const events = useSelector((state: IStoreValue) => state.omnisafeReducer.events);
  const eventTypes = useSelector((state: IStoreValue) => state.omnisafeReducer.eventTypes);
  const formatedEvents = events.map(eventItem => {
    const eventType = eventTypes.find(item => item.id === eventItem.eventsTypeId);
    return {
      ...eventItem,
      eventTypeName: eventType?.name,
      subscribed: eventType?.subscribed
    }
  }).filter(eItem => {
    if (isAll) {
      return true;
    }
    if (!eItem.subscribed) {
      return false;
    }
    if (isActive) {
      return eItem.status;
    } else {
      return !eItem.status;
    }
  })
  return (
    <Grid
      container={true}
    >
      {formatedEvents.map( item => (
        <Grid
          item={true}
          key={item.id}
        >
          <Card
            sx={{
              margin: 3,
              width: 400
            }}
          >
            <CardContent>
              <Typography>Name: {item.name}</Typography>
              <Typography>Description: {item.description}</Typography>
              <Typography>Type: {item.eventTypeName}</Typography>
            </CardContent>
            <CardActions>
              <Link to={`/events/detail?id=${item.id}`}>
                <Button size="small">Detail</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsList;