'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  NavigatorIOS,
  ActivityIndicator
} from 'react-native';

import digestCall from 'digest-auth-request-rn';

import appConfig from '../config/settings';
import globalStyles from '../config/globalStyles';
import CustomerSearch from '../scenes/CustomerSearch';
import CustomerScan from '../scenes/CustomerScan';
import GetDepositArticles from '../components/GetDepositArticles';
import JumboButton from '../components/JumboButton';

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
      fetchedCustomersCount: 0, // later: can be removed if not shown in UI (also usages on bottom)
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
    let spinner = null; // TODO: vereinfachen wie bei anderen Spinner-Stellen
    if (this.state.currentlyLoading) {
      spinner = <ActivityIndicator
        animating={this.state.currentlyLoading}
      />
    } else { spinner = <View/> }

    const homeMargins = height * 0.04;

    return (
      <View style={[globalStyles.container,
        {backgroundColor: '#eee', paddingTop: 64, paddingLeft: homeMargins, paddingRight: homeMargins}
        ]}>

        <View style={{marginTop: homeMargins, marginBottom: homeMargins}}>
          <JumboButton
            iconName="camera-alt"
            bgColor="#BF6B66"
            onPress={() => {this._navPush('Kunden scannen', CustomerScan)}}
            iconSize={60}
            style={{paddingTop: height * 0.1, paddingBottom: height * 0.1}}
              // dynamic height for nicer layout on different screen sizes
          >
            QR Code scannen
          </JumboButton>
        </View>

        <View>
          <JumboButton
            iconName="person"
            bgColor={this.state.customersDidUpdate ? '#223f3e' : '#aaa'}
            onPress={() => {this._navPush('Kunden suchen', CustomerSearch)}}
            iconSize={30}
            style={{paddingTop: homeMargins, paddingBottom: homeMargins}}
            disabled={!this.state.customersDidUpdate}
          >
            Kunden suchen
          </JumboButton>
        </View>

        <View style={{marginBottom: homeMargins / 2}}>
          <JumboButton
            iconName="cloud-download"
            bgColor="#4e6564"
            onPress={() => this._getAllCustomers(10000, 'lastname', 'ASC')}
              // passing Arguments in onPress: http://bit.ly/2fHoAln
              // limit 10,000 means basically "no limit"
            iconSize={25}
            style={{paddingTop: homeMargins, paddingBottom: homeMargins}}
          >
            Kunden updaten
          </JumboButton>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginRight: 5}}>
            {this.state.lastCustomersUpdate}
          </Text>
          {spinner}
        </View>

        {/*<View style={{marginBottom: 10}}> // later: whole Button+Txt can probably be removed (+call on bottom)
          <IconMaterial.Button
            name="cloud-download"
            backgroundColor="#aaa" // --> lightslategrey
            onPress={this._getAllOrders}
            underlayColor="#000"
            size={25}
            disabled
          >
            Update: Orders (Guest-Edgecase)
          </IconMaterial.Button>
        </View>

        <Text style={{textAlign: 'center'}}>
          {this.state.lastOrdersUpdate}
        </Text>*/}
      </View>
    );
  }

  componentDidMount() {
    // this._getAllCustomers(null, 'lastname', 'ASC'); // TODO --- bloß für einfachere Dev hier drin
  }

  _navPush(title, component) {
    this.props.navigator.push({
      title: title,
      component: component
    });
  }

  _getAllCustomers(limit, sortAttr, order) {
    const req = new digestCall(
      'GET',
      url + '/customers' + '?sort[0][property]=' + sortAttr +'&sort[0][direction]=' + order + '&limit=' + limit,
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

      // console.log(this.state.fetchedCustomersCount + 'Customers loaded');

      // this._navPush('Kunden suchen', CustomerSearch); // TODO --- bloß für einfachere Dev hier drin
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
