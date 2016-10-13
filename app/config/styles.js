'use strict';

import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window'); // TODO: not exported yet
const fpMainColor = '#598c8a';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  contentBlock: {
    // width: width,
  },
  headerBlock: {
    padding: 40,
    backgroundColor: fpMainColor
  },
  logoText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 5
  },
  buttonBlock: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'beige'
  },
  button: {
    padding: 15,
    borderWidth: 1
  },
  resultsBlock: {
    flex: 1,
    padding: 30,
    backgroundColor: '#eee'
  }
});

export default globalStyles;
