import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import {Text} from 'react-native';

const App = () => {
  const [title, setTitle] = useState('Loading...');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3000');
      setTitle(result.data[0].title);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Text>Hello World! Product: {title}</Text>
    </Fragment>
  );
};

export default App;
