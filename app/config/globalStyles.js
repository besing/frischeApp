'use strict';

import { StyleSheet, Dimensions } from 'react-native';

export const {width, height} = Dimensions.get('window');
export const fpMainColor = '#598c8a';

const globalStyles = StyleSheet.create({
  debug: {
    borderColor: 'red',
    borderWidth: 1
  },
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 15,
    borderWidth: 1
  },
});

// TODO: clean unused Style Objects

export default globalStyles;
