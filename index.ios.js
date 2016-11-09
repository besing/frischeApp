'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import NavigatorHome from './app/scenes/Home';
import ArticlesList from './app/scenes/ArticlesList';


class FrischeApp extends Component {
  render() {
    return (
      <NavigatorHome/>
    )
  }
}

AppRegistry.registerComponent('FrischeApp', () => FrischeApp);
