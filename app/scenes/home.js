'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import globalStyles from '../config/globalStyles';

import FullWidthButton from '../components/FullWidthButton';
import GetDepositArticles from '../components/GetDepositArticles';


export default class frischeApp extends Component {
  render() {
    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 20}]}>
        <FullWidthButton>Kunde auswählen</FullWidthButton>
        <GetDepositArticles />
      </View>
    );
  }
}
