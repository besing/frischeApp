'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';

import globalStyles from '../config/globalStyles';
import {width, height} from '../config/globalStyles';

export default class CustomerScan extends Component {
  constructor(props) {
    super(props);

    this._takePicture = this._takePicture.bind(this);
  }

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
          <Text style={styles.capture} onPress={this._takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
    )
  }

  _takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({ // TODO: no Stylesheet.create necessary?
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width,
    height: height,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
