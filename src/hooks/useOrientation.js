import {Dimensions} from 'react-native';
import React from 'react';

export default function useOrientation() {
  const [screenAndroid, setScreenAndroid] = React.useState(
    Dimensions.get('screen'),
  );
  React.useEffect(() => {
    let dimensionsHandler = Dimensions.addEventListener('change', result => {
      setScreenAndroid(result.screen);
    });
    return () => dimensionsHandler.remove();
  }, []);

  return {
    ...screenAndroid,
    isPortrait: screenAndroid.height > screenAndroid.width,
  };
}
