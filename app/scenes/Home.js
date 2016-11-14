'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  NavigatorIOS,
  ActivityIndicator
} from 'react-native';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import digestCall from 'digest-auth-request-rn';

import appConfig from '../config/settings';
import globalStyles from '../config/globalStyles';
import CustomerSearch from '../scenes/CustomerSearch';
import GetDepositArticles from '../components/GetDepositArticles';

import appHelpers from '../config/helpers';
import {currentTime} from '../config/helpers';
import {width, height} from '../config/globalStyles';
import {fpMainColor} from '../config/globalStyles';

const url = appConfig.apiCredentials_test.url;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;


export let customersDataAll = null;
export let customersData = null;
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
        barTintColor={fpMainColor}
        titleTextColor="#fff"
        tintColor="rgba(255,255,255,0.8)"
        shadowHidden={true}
      />
    );
  }
}

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCustomersUpdate: 'Noch nicht aktualisiert',
      currentlyLoading: false,
      fetchedCustomersCount: 0,
      customersDidUpdate: false,
      lastOrdersUpdate: 'Noch nicht aktualisiert',
      fetchedOrdersCount: null,
      ordersDidUpdate: false,
    };
    this._getAllCustomers = this._getAllCustomers.bind(this);
    this._getAllOrders = this._getAllOrders.bind(this);
    this._navPush = this._navPush.bind(this);
  }

  render() {
    let spinner = null;
    if (this.state.currentlyLoading) {
      spinner = <ActivityIndicator
        animating={this.state.currentlyLoading}
      />
    } else { spinner = <View/> }

    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 150, paddingLeft: width*0.05, paddingRight: width*0.05}]}>

        <View style={{marginBottom: 20}}>
          <IconMaterial.Button
            name="camera-alt"
            backgroundColor="#aaa"
            onPress={null}
            underlayColor="#000"
            size={30}
            disabled
          >
            Kunden auswählen per Scan
          </IconMaterial.Button>
        </View>

        <View style={{marginBottom: 50}}>
          <IconMaterial.Button
            name="person"
            backgroundColor={this.state.customersDidUpdate ? 'olive' : '#aaa'}
            onPress={this._navPush}
            underlayColor="#000"
            size={30}
            disabled={!this.state.customersDidUpdate}
          >
            Kunden auswählen per Suche
          </IconMaterial.Button>
        </View>

        <View style={{marginBottom: 10}}>
          <IconMaterial.Button
            name="cloud-download"
            backgroundColor="orange"
            onPress={() => this._getAllCustomers(null, 'lastname', 'ASC')}
            // passing Arguments in onPress: http://bit.ly/2fHoAln
            underlayColor="#000"
            size={25}
          >
            Update: Customers
          </IconMaterial.Button>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
          <Text style={{marginRight: 5}}>
            {this.state.lastCustomersUpdate}
          </Text>
          {spinner}
        </View>
        <Text style={{textAlign: 'center', marginBottom: 20}}>
          {this.state.fetchedCustomersCount} Kunden geladen
        </Text>

        <View style={{marginBottom: 10}}>
          <IconMaterial.Button
            name="cloud-download"
            backgroundColor="#aaa"
            onPress={this._getAllOrders}
            underlayColor="#000"
            size={25}
            disabled
          >
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
    // this._getAllCustomers(null, 'lastname', 'ASC'); // TODO --- bloß für einfachere Dev hier drin
  }

  _navPush() {
    this.props.navigator.push({
      title: 'Kunden suchen',
      component: CustomerSearch
    });
  }

  _getAllCustomers(limit, sortAttr, order) {
    let dataLimit;
    limit !== null ? dataLimit = '&limit=' + limit : ''; // if there is no passed limit param on the req. data

    const req = new digestCall(
      'GET',
      url + '/customers' + '?sort[0][property]=' + sortAttr +'&sort[0][direction]=' + order + dataLimit,
      apiUser, apiKey
    );
    this.setState({
      currentlyLoading: true,
      lastCustomersUpdate: 'Letzte Aktualisierung: '
    });
    req.request((result) => {
      let customersTotal = result.total;
      customersDataAll = result.data;
      customersData = customersDataAll.filter((f) => { // filter out customers without name in BE
        return f.lastname !== ''
      });

      let customersAmount = customersData.length;

      this.setState({
        currentlyLoading: false,
        lastCustomersUpdate: 'Letzte Aktualisierung: ' + currentTime,
        fetchedCustomersCount: customersAmount + ' (von ' + customersTotal + ')',
        customersDidUpdate: true
      });

      // this._navPush(); // TODO --- bloß für einfachere Dev hier drin
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
        lastOrdersUpdate: 'Letzte Aktualisierung: ' + currentTime
      });
    }, (error) => {
      console.error(error);
    });
  }
}
