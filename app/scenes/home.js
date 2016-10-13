'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import globalStyles from '../config/styles';

import Header from '../components/Header';
import GetDepositArticles from '../components/GetDepositArticles';


export default class frischeApp extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Header scene="home"/>
        <GetDepositArticles />
      </View>
    );
  }
}
