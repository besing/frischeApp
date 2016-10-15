'use strict';

import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import globalStyles from '../config/globalStyles';


export default class TextDefault extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {fontWeight} = this.props;
    let fontWeightVal = null;
    fontWeight == 'semibold' ? fontWeightVal = '600' : '300';

    return (
      <Text style={[{
        fontSize: 17,
        fontWeight: fontWeightVal,
        color: this.props.color
      }]}>
        {this.props.children}
      </Text>
    )
  }
}
