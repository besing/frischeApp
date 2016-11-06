'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
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
          title="Kunden auswählen per Scan"
          backgroundColor="green"
          icon={{name: 'camera-alt'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={null}
          buttonStyle={{marginBottom: 20}}
        />
        <Button
          title="Kunden auswählen per Suche"
          backgroundColor="brown"
          icon={{name: 'person'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={null}
          buttonStyle={{marginBottom: 50}}
        />
        <Button
          title="Aktualisiere Daten"
          backgroundColor="orange"
          icon={{name: 'cloud-download'}}
          borderRadius={5}
          underlayColor="#999"
          onPress={null}
          buttonStyle={{marginBottom: 10}}
        />
        <Text style={{textAlign: 'center'}}>letzte Aktualisierung: xx</Text>
      </View>
    ); // TODO: Add Logic "letzte Aktualisierung"
  }
}
