'use strict';

import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import globalStyles from '../config/styles';


export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {scene} = this.props;
    return (
      <View style={[globalStyles.headerBlock, globalStyles.center]}>
        <Text style={globalStyles.logoText}>FRISCHEPOST @{scene}</Text>
      </View>
    )
  }
}
