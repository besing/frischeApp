'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import globalStyles from '../config/globalStyles';
import {width, height} from '../config/globalStyles';

export default class TwoColumns extends Component {
  render() {
    return (
      <View style={[{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center' // important, fixes weird layout issue (value unimportant)
      }]}>
        {this.props.children}
      </View>
    )
  }
}
