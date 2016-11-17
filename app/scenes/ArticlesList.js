'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import globalStyles from '../config/globalStyles';

import GetDepositArticles from '../components/GetDepositArticles';
import NavbarSubtitle from '../components/NavbarSubtitle';


export default class ArticlesList extends Component {
  constructor(props) {
    super(props);

    this._showArticlesConfirmationList = this._showArticlesConfirmationList.bind(this);
  }

  render() {
    const {email} = this.props;

    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 64}]}>
        <NavbarSubtitle>{email}</NavbarSubtitle>
        <GetDepositArticles />
          <IconMaterial.Button
            name="playlist-add-check"
            backgroundColor="rgba(244,164,96,0.7)" // sandybrown
            onPress={this._showArticlesConfirmationList}
            underlayColor="#000"
            size={25}
            borderRadius={0}
          >
            Eingabe überprüfen
          </IconMaterial.Button>
      </View>
    );
  }

  _showArticlesConfirmationList() {

  }
}

const styles = StyleSheet.create({

});