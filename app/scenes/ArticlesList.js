'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import globalStyles from '../config/globalStyles';

import GetDepositArticles from '../components/GetDepositArticles';


export default class ArticlesList extends Component {
  render() {
    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee'}]}>
        <GetDepositArticles />
      </View>
    );
  }
}
