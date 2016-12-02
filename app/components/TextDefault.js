'use strict';

import React, {Component} from 'react';
import {Text} from 'react-native';


export default class TextDefault extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const fontWeightVal = '600' ? this.props.fontWeight == 'semibold' : '300';

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
