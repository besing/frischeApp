'use strict';

import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

// Import Globals, Configs & Helpers
  import {brandMainColorLight} from '../config/globalStyles'


export default class NavbarSubtitle extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={{padding: 5, backgroundColor: brandMainColorLight}}>
        <Text style={{textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}
