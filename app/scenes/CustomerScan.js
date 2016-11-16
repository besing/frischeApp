'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';

import globalStyles from '../config/globalStyles';


export default class CustomerScan extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={false}
        >
          <Text>Hier Cam</Text>
        </Camera>
      </View>
    )
  }
}

const styles = { // TODO: no Stylesheet.create necessary?
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};