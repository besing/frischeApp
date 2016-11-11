'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import globalStyles from '../config/globalStyles';

import GetDepositArticles from '../components/GetDepositArticles';
import NavbarSubtitle from '../components/NavbarSubtitle';


export default class ArticlesList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {email} = this.props;

    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 64}]}>
        <NavbarSubtitle>{email}</NavbarSubtitle>
        <GetDepositArticles />
      </View>
    );
  }
}
