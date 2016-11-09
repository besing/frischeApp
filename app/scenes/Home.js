'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  NavigatorIOS
} from 'react-native';

import { Button } from 'react-native-elements';

import digestCall from 'digest-auth-request-rn';

import appConfig from '../config/settings';
import globalStyles from '../config/globalStyles';
import CustomerSearch from '../scenes/CustomerSearch';
import GetDepositArticles from '../components/GetDepositArticles';

import appHelpers from '../config/helpers';

const url = appConfig.apiCredentials_test.url;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;


export let customerData = null;
export let ordersData = null;

export default class NavigatorHome extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'Frischepost Pfandrückgabe'
        }}
        style={{flex: 1}}
      />
    );
  }
}

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCustomerUpdate: '',
      customersDidUpdate: false,
      lastOrdersUpdate: 'Letzte Aktualisierung: n/v'
    };
    this._getAllCustomers = this._getAllCustomers.bind(this);
    this._getAllOrders = this._getAllOrders.bind(this);
    this._navPush = this._navPush.bind(this);
  }

  render() {
    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 150}]}>
        <Button
          small
          title="Kunden auswählen per Scan"
          backgroundColor="green"
          icon={{name: 'camera-alt'}}
          borderRadius={5}
          underlayColor="#999" // TODO: Underlay viel größer als Button??
          onPress={null}
          buttonStyle={{marginBottom: 20}}
          disabled // TODO
        />
        <Button
          small
          title="Kunden auswählen per Suche"
          backgroundColor="olive"
          icon={{name: 'person'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={this._navPush}
          buttonStyle={{marginBottom: 50}}
          disabled={!this.state.customersDidUpdate}
        />
        <Button
          small
          title="Update: Customers"
          backgroundColor="orange"
          icon={{name: 'cloud-download'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={this._getAllCustomers}
          buttonStyle={{marginBottom: 10}}
        />
        <Text style={{textAlign: 'center'}}>
          {this.state.lastCustomerUpdate}
        </Text>
        <Button
          small
          title="Update: Orders"
          backgroundColor="brown"
          icon={{name: 'cloud-download'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={this._getAllOrders}
          buttonStyle={{marginBottom: 10, marginTop: 20}}
        />
        <Text style={{textAlign: 'center'}}>
          {this.state.lastOrdersUpdate}
        </Text>
      </View>
    ); // TODO: Add Logic "letzte Aktualisierung"
  }

  ComponentDidMount() {
    this.setState({
      lastCustomersUpdate: 'Letzte Aktualisierung: n/v'
    })
  }

  _navPush() {
    this.props.navigator.push({
      title: 'Kunden suchen',
      component: CustomerSearch
    });
  }

  _getAllCustomers() {
    const req = new digestCall('GET', url + '/customers' + '?limit=40', apiUser, apiKey); // TODO: limit
    this.setState({
      lastCustomerUpdate: 'lädt...'
    });
    req.request((result) => {
      customerData = result.data;

      this.setState({
        lastCustomerUpdate: 'Letzte Aktualisierung: ' + appHelpers.currentTime,
        customersDidUpdate: true
      });
    }, (error) => {
      console.error(error);
    });
  }

  _getAllOrders() {
    const req = new digestCall('GET', url + '/orders' + '?limit=40', apiUser, apiKey); // TODO: limit
    this.setState({
      lastOrdersUpdate: 'lädt...'
    });
    req.request((result) => {
      ordersData = result.data;

      this.setState({
        lastOrdersUpdate: 'Letzte Aktualisierung: ' + appHelpers.currentTime
      });
    }, (error) => {
      console.error(error);
    });
  }
}
