'use strict';

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import NavigatorHome from './app/scenes/Home';

class FrischeApp extends Component {
  render() {
    return (
      <NavigatorHome/>
    )
  }
}

AppRegistry.registerComponent('FrischeApp', () => FrischeApp);
