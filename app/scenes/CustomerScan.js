'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';

import ArticlesList from '../scenes/ArticlesList';

import globalStyles from '../config/globalStyles';
import {width, height} from '../config/globalStyles';


export default class CustomerScan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcodeDetected: false
    };

    this._processQrCode = this._processQrCode.bind(this);
    this.resetBarcodeScanner = this.resetBarcodeScanner.bind(this);
  }

  render() {
    return (
      <View style={[globalStyles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Camera
          ref={(cam) => {this.camera = cam;}}
          onBarCodeRead={!this.state.barcodeDetected ? this._processQrCode : null}
          style={[styles.preview, {borderColor: 'yellow', borderWidth: 1, width: width*0.8, height: width*0.8}]}
        >
        </Camera>
      </View>
    )
  }

/*
  componentDidMount() {
    const returnedJsonData = '{"order":{"id":4363,"customerId":804,"customer":{"firstname":"Julia","lastname":"Aalders","email":"home@aalders.email"},"billing":{"firstName":"Julia","lastName":"Aalders","street":"Treuburger Weg 8\\r","zipCode":"22049","city":"Hamburg"},"shipping":{"firstName":"Julia","lastName":"Aalders","street":"Treuburger Weg 8\\r","zipCode":"22049","city":"Hamburg"}}}';

    let parsedJson = JSON.parse(returnedJsonData);

    console.log('parsedJson.order.customer.email:', parsedJson.order.customer.email)
  }
*/


  _processQrCode(event) {
    if (this.state.barcodeDetected === false) {

      this.setState({barcodeDetected: true}); // navigator push hier in den Callback (dann bloß 1x gecalled?)

      const parsedData = JSON.parse(event.data);
      const orderData = parsedData.order;

      console.log(orderData);

      this.props.navigator.push({
        title: orderData.shipping.firstName + ' ' + orderData.shipping.lastName,
        component: ArticlesList,
        passProps: {
          customerId: orderData.customerId,
          firstname: orderData.customer.firstname,
          lastname: orderData.customer.lastname,
          email: orderData.customer.email,
          barcodeDetected: this.resetBarcodeScanner
        },
      });

    }
  }

  resetBarcodeScanner() {
    this.setState({barcodeDetected: false});
    console.log('barcode reset');
  }
}

const styles = StyleSheet.create({
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
