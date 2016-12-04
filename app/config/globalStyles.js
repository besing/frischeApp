'use strict';

import {
  StyleSheet,
  Dimensions
} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const brandMainColor = '#598c8a';
export const brandMainColorLight = '#9bbab8';

const globalStyles = StyleSheet.create({
  debug: {
    borderColor: 'red',
    borderWidth: 1
  },
  container: {
    flex: 1,
  },
  centerXY: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default globalStyles;
