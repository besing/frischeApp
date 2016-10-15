'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import globalStyles from '../config/styles';
import {width, height} from '../config/styles';

import TextDefault from '../components/TextDefault';

export default class ImageBox extends Component {
  render() {
    return (
      <View style={[{
        alignItems: 'center',
        marginBottom: 10
      }]}>
        <View style={{marginBottom: 7}}>
          <TextDefault fontWeight="semibold">{this.props.title}</TextDefault>
        </View>
        <Image
          source={{uri: this.props.source}}
          style={{
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.borderRadius,
          }}
          resizeMode={'cover'}
          blurRadius={this.props.blur}
        />
        <Text>{this.props.caption}</Text>
      </View>
    )
  }
}
