'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { Button } from 'react-native-elements';

import globalStyles from '../config/globalStyles';

import FullWidthButton from '../components/FullWidthButton';


export default class FrischeApp extends Component {
  render() {
    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 20}]}>
        {/*<FullWidthButton>Kunde auswählen</FullWidthButton>*/}
        <Button
          title="Kunden auswählen"
          backgroundColor="green"
          icon={{name: 'person'}}
        />
      </View>
    );
  }
}
