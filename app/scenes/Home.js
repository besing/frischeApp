'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  NavigatorIOS,
  ActivityIndicator
} from 'react-native';

// Import 3rd Party Node Modules
  import digestCall from 'digest-auth-request-rn';
  import QRCodeScanner from 'react-native-qrcode-scanner';
  import IconMaterial from 'react-native-vector-icons/MaterialIcons';

// Import Scenes & Components
  import ArticlesList from '../scenes/ArticlesList';
  import CustomerSearch from '../scenes/CustomerSearch';
  import JumboButton from '../components/JumboButton';

// Import Globals, Configs & Helpers
  import appConfig from '../config/settings';
  import {currentTime} from '../config/helpers';
  import globalStyles, {width, height, brandMainColor} from '../config/globalStyles';

// Exports Locals
  export let customersData = null;


export default class NavigatorHome extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'Frischepost Pfandrückgabe'
        }}
        style={globalStyles.container}
        barTintColor={brandMainColor}
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
      customersDidUpdate: false,
      goBackIcon: null
    };
    this._getAllCustomers = this._getAllCustomers.bind(this);
    this._processBarcode = this._processBarcode.bind(this);
  }

  render() {
    const spinner = (
        // needs to be sourced out into conditional in order to hide properly when State=loaded
      this.state.currentlyLoading && <ActivityIndicator
        animating={this.state.currentlyLoading}
      />
    ) || <View/>;

    const homeMargins = height * 0.04;
      // dynamic height for nicer layout on different screen sizes

    return (
      <View style={[
        globalStyles.container, {
        backgroundColor: '#eee',
        paddingTop: 64,
        paddingLeft: homeMargins,
        paddingRight: homeMargins
      }]}>

        <View style={{
          marginTop: homeMargins,
          marginBottom: homeMargins
        }}>
          <JumboButton
            iconName="camera-alt"
            bgColor={'#bf6b66'}
            onPress={() => {
              this.props.navigator.push({
                component: QRCodeScanner,
                title: 'QR Code scannen',
                passProps: {
                  onRead: this._processBarcode
                }
              });
            }}
            iconSize={60}
            style={{
              paddingTop: height * 0.1,
              paddingBottom: height * 0.1
            }}
          >
            QR Code scannen
          </JumboButton>
        </View>

        <View>
          <JumboButton
            iconName="person"
            bgColor={this.state.customersDidUpdate ? '#223f3e' : '#aaa'}
            onPress={() => {
              this.props.navigator.push({
                title: 'Kunden suchen',
                component: CustomerSearch
              });
            }}
            iconSize={30}
            style={{
              paddingTop: homeMargins,
              paddingBottom: homeMargins
            }}
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
              // limit 10,000 means basically "no limit"
              // passing Arguments in onPress: http://bit.ly/2fHoAln
            iconSize={25}
            style={{
              paddingTop: homeMargins,
              paddingBottom: homeMargins
            }}
          >
            Kunden updaten
          </JumboButton>
        </View>

        <View style={[
          globalStyles.centerXY, {
          flexDirection: 'row'
        }]}>
          <Text style={{marginRight: 5}}>
            {this.state.lastCustomersUpdate}
          </Text>

          {spinner}
        </View>

      </View>
    );
  }

  componentDidMount() {
    IconMaterial.getImageSource('chevron-left', 43, 'blue')
      .then((chevronIconSource) => {this.setState({
          goBackIcon: chevronIconSource
        });
      });
      // 43px Chevron font size = iOS Default
      // a bit complicated way because of NavigatorIOS' Nature
      // but still right: https://github.com/oblador/react-native-vector-icons#usage-with-navigatorios
  }

  _processBarcode(event) {
    const parsedData = JSON.parse(event.data);
    const orderData = parsedData.order;

    this.props.navigator.push({
      title: `${orderData.shipping.firstName} ${orderData.shipping.lastName}`,
      component: ArticlesList,
      leftButtonTitle: 'Zurück',
      onLeftButtonPress: () => this.props.navigator.popToTop(0),
        // go directly back Home instead of back to Scanner -- workaround for Scanner's Event Handling
      leftButtonIcon: this.state.goBackIcon,
        // leftButtonIcon AND leftButtonTitle somehow not possible --> Icon more important
      passProps: {
        // passed Props same as from CustomerSearch (except last)
        customerId: orderData.customerId,
        firstname: orderData.customer.firstname,
        lastname: orderData.customer.lastname,
        email: orderData.customer.email,
        fetchedFromScan: true
          // to distinguish between Scan and Search results (alternative Back-Button-Logic)
      },
    });
  }

  _getAllCustomers(limit, sortAttr, order) {
    const url = appConfig.apiCredentials_test.url;
    const {apiUser} = appConfig.apiCredentials_test;
    const {apiKey} = appConfig.apiCredentials_test;

    this.setState({
      currentlyLoading: true,
      lastCustomersUpdate: 'Letzte Aktualisierung: '
    });

    const req = new digestCall('GET', `${url}/customers` +
      `?sort[0][property]=${sortAttr}` + `&sort[0][direction]=${order}` + `&limit=${limit}`,
      apiUser, apiKey
    );

    req.request((result) => {
      const customersDataAll = result.data;
      customersData = customersDataAll.filter((f) => { // filter out customers with empty name
        return f.lastname !== ''
      });

      this.setState({
        currentlyLoading: false,
        lastCustomersUpdate: `Letzte Aktualisierung: ${currentTime} Uhr`,
        customersDidUpdate: true
      });

    }, (error) => {
      console.error(error);
    });
  }
}
