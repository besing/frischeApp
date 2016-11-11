'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';


import TextDefault from '../components/TextDefault';

import {fpMainColorLight} from '../config/globalStyles'

export default class NavbarSubtitle extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={{padding: 5, backgroundColor: fpMainColorLight}}>
        <Text style={{textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>
          {this.props.children}
        </Text>
      </View>
    ); // TODO: colors only guessed for now
  }
}
