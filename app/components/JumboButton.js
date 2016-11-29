'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';


export default class JumboButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconMaterial.Button
        name={this.props.iconName}
        backgroundColor={this.props.bgColor}
        onPress={this.props.onPress}
        underlayColor={this.props.underlayColor}
        size={this.props.iconSize}
        borderRadius={0}
        style={[{flexDirection: 'column'}, this.props.slim ? {padding: 10} : {padding: 20}]}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </IconMaterial.Button>
    )
  }
}
