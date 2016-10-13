'use strict';

import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import globalStyles from '../config/styles';


export default class TextDefault extends Component {
  render() {
    return (
      <Text style={{fontSize: 20}}>
        {this.props.children}
      </Text>
    )
  }
}
