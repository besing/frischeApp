'use strict';

import React, { Component } from 'react';
import {
  View,
  NavigatorIOS
} from 'react-native';

import { Button } from 'react-native-elements';

import globalStyles from '../config/globalStyles';


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
  render() {
    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 150}]}>
        <Button
          title="Kunden auswählen"
          backgroundColor="green"
          icon={{name: 'person'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={null}
          buttonStyle={{marginBottom: 20}}
        />
        <Button
          title="Aktualisiere Daten"
          backgroundColor="orange"
          icon={{name: 'cloud-download'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={null}
        />
      </View>
    );
  }
}
