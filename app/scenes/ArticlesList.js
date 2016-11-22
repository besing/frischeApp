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

    this.state = {
      confirmButtonClicked: false,
      articleListFetched: false
    };

    this._hideConfirmButton = this._hideConfirmButton.bind(this);
  }

  render() {
    const confirmButton = (
      // render Button-JSX only when articleListFetched (otherwise show empty View)
        this.state.articleListFetched && <IconMaterial.Button
        name="playlist-add-check"
        backgroundColor="sandybrown"
        onPress={() => this.setState({confirmButtonClicked: true})}
        underlayColor="#000"
        size={25}
        borderRadius={0}
      >
        Eingabe überprüfen
      </IconMaterial.Button>
    ) || <View/>;

    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 64}]}>
        <NavbarSubtitle>{this.props.email}</NavbarSubtitle>
        <GetDepositArticles filterListOnButtonConfirm={this.state.confirmButtonClicked}
                            hideConfirmButtonWhileLoading={this._hideConfirmButton} />
        {confirmButton}
      </View>
    );
  }

  _hideConfirmButton() {
    this.setState({articleListFetched: true});
  }
}
