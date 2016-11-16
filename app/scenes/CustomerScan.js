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
    this._processQrCode = this._processQrCode.bind(this);
  }

  render() {
    return (
      <View style={[globalStyles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={[styles.preview, {borderColor: 'yellow', borderWidth: 1, width: width*0.8, height: width*0.8}]}
          aspect="fill"
          captureAudio={false}
          onBarCodeRead={this._processQrCode}
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

  _processQrCode(event) {
    console.info('QR Code erkannt.');
    console.log(event.data);
  }
}

const styles = StyleSheet.create({ // TODO: no Stylesheet.create necessary?
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
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
