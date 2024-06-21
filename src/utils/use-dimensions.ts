import * as React from 'react';
import { Dimensions, EmitterSubscription, ScaledSize } from 'react-native';

import { isBelowRN65 } from './libraries';

export const useDimensions = (): ScaledSize => {
  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));

  const onChange = ({ window }: { window: ScaledSize }): void => {
    if (
      dimensions.width !== window.width ||
      dimensions.height !== window.height ||
      dimensions.scale !== window.scale ||
      dimensions.fontScale !== window.fontScale
    ) {
      setDimensions(window);
    }
  };

  React.useEffect(() => {
    let dimensionChangeListener: EmitterSubscription | null = null;

    if (isBelowRN65) {
      Dimensions.addEventListener('change', onChange);
    } else {
      dimensionChangeListener = Dimensions.addEventListener('change', onChange);
    }

    return () => {
        dimensionChangeListener?.remove();
    };
  }, []);

  return dimensions;
};
