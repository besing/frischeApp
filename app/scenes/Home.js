'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  NavigatorIOS
} from 'react-native';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import digestCall from 'digest-auth-request-rn';

import appConfig from '../config/settings';
import globalStyles from '../config/globalStyles';
import CustomerSearch from '../scenes/CustomerSearch';
import GetDepositArticles from '../components/GetDepositArticles';

import appHelpers from '../config/helpers';
import {width, height} from '../config/globalStyles';

const url = appConfig.apiCredentials_test.url;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;


export let customersData = null;
export let ordersData = null;
export let customersDataNames = null;

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
      lastCustomersUpdate: '',
      customersDidUpdate: false,
      lastOrdersUpdate: '',
      ordersDidUpdate: false,
    };
    this._getAllCustomers = this._getAllCustomers.bind(this);
    this._getAllOrders = this._getAllOrders.bind(this);
    this._navPush = this._navPush.bind(this);
  }

  render() {
    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 150, paddingLeft: width*0.05, paddingRight: width*0.05}]}>

        <View style={{marginBottom: 20}}>
          <IconMaterial.Button name="camera-alt" backgroundColor="#aaa" onPress={null} underlayColor="#999" borderRadius={0} disabled>
            Kunden auswählen per Scan
          </IconMaterial.Button>
        </View>

        <View style={{marginBottom: 50}}>
          <IconMaterial.Button name="person" backgroundColor={this.state.customersDidUpdate ? 'olive' : '#aaa'} onPress={this._navPush} underlayColor="#999" borderRadius={0} disabled={!this.state.customersDidUpdate}>
            Kunden auswählen per Suche
          </IconMaterial.Button>
        </View>

        <View style={{marginBottom: 10}}>
          <IconMaterial.Button name="cloud-download" backgroundColor="orange" onPress={this._getAllCustomers} underlayColor="#999" borderRadius={0}>
            Update: Customers
          </IconMaterial.Button>
        </View>

        <Text style={{textAlign: 'center', marginBottom: 20}}>
          {this.state.lastCustomersUpdate}
        </Text>

        <View style={{marginBottom: 10}}>
          <IconMaterial.Button name="cloud-download" backgroundColor="brown" onPress={this._getAllOrders} underlayColor="#999" borderRadius={0}>
            Update: Orders
          </IconMaterial.Button>
        </View>

        <Text style={{textAlign: 'center'}}>
          {this.state.lastOrdersUpdate}
        </Text>
      </View>
    ); // TODO: Add Logic "letzte Aktualisierung"
  }

  componentDidMount() {
    this.setState({
      lastCustomersUpdate: 'Letzte Aktualisierung: n/v',
      lastOrdersUpdate: 'Letzte Aktualisierung: n/v'
    })
  }

  _navPush() {
    this.props.navigator.push({
      title: 'Kunden suchen',
      component: CustomerSearch
    });
  }

  _getAllCustomers() {
    const req = new digestCall(
      'GET',
      url + '/customers' + '?limit=100' + '&sort[0][property]=id&sort[0][direction]=DESC',
      apiUser, apiKey
    ); // TODO: limit/sortOrder
    this.setState({
      lastCustomersUpdate: 'lädt...'
    });
    req.request((result) => {
      customersData = result.data;

      this.setState({
        lastCustomersUpdate: 'Letzte Aktualisierung: ' + appHelpers.currentTime,
        customersDidUpdate: true
      });

      customersDataNames = customersData.map((item) => {
        return (
          item.firstname + ' ' + item.lastname
        )
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

const styles = {

};
