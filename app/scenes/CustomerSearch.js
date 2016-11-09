'use strict';

import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
} from 'react-native';

import globalStyles from '../config/globalStyles';
import { SearchBar } from 'react-native-elements';

import { customerData } from '../scenes/Home';


export default class CustomerSearch extends Component {
  render() {
    return (
      <View style={{paddingTop: 64}}>
        <SearchBar
          onChangeText={null}
          placeholder="Placeholder 1"
          lightTheme
        />
        <Text>{customerData[5].lastname}, {customerData[5].firstname}</Text>
      </View>
    );
  }
}
