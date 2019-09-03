import React, {Fragment} from 'react';
import EventList from './EventList';
import EventCreate from './EventCreate';

const App = () => {
  return (
    <Fragment>
      <EventList />
      <EventCreate />
    </Fragment>
  );
};

export default App;
