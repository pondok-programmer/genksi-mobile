import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCoordinates} from '../features/Distributor/services/mapSlice';

const useLocation = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    // default to Jakarta Pusat
    longitude: 106.82719,
    latitude: -6.175395,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: 0,
  });
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      res => {
        setLocation(res.coords);
        dispatch(setCoordinates(res.coords));
        console.log('location', res.coords);
      },
      err => {
        setError(err);
        console.log('error fetch location', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {...location, error, getCurrentLocation};
};

export default useLocation;
