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
      articleListFetched: false,
      articlesReturnedCount: 0,
      filteredViewActive: false
    };

    this._articlesFetched = this._articlesFetched.bind(this);
    this._hideConfirmButtonOnFilteredView = this._hideConfirmButtonOnFilteredView.bind(this);
    this._articlesReturned = this._articlesReturned.bind(this);
  }

  render() {
    let articlesGotReturned = (true) ? this.state.articlesReturnedCount > 0 : false;

    const confirmButton = (
      // render Button-JSX only when articleListFetched + not yet in filtered View (otherwise empty View)
        this.state.articleListFetched && !this.state.filteredViewActive && <IconMaterial.Button
        name="playlist-add-check"
        backgroundColor={articlesGotReturned ? "sandybrown" : '#aaa'}
        onPress={() => {
          this.setState({confirmButtonClicked: true});
          this._hideConfirmButtonOnFilteredView();
        }}
        underlayColor="#000"
        size={25}
        borderRadius={0}
        disabled={!articlesGotReturned}
      >
        Eingabe überprüfen
      </IconMaterial.Button>
    ) || <View/>;

    const backToEditButton = (
        this.state.filteredViewActive && <IconMaterial.Button
        name="edit"
        backgroundColor="crimson"
        onPress={null}
        underlayColor="#000"
        size={25}
        borderRadius={0}
      >
        Zurück zur Eingabe
      </IconMaterial.Button>
    ) || <View/>;

    const submitButton = (
        this.state.filteredViewActive && <IconMaterial.Button
        name="send"
        backgroundColor="mediumseagreen"
        onPress={null}
        underlayColor="#000"
        size={35}
        borderRadius={0}
      >
        Alles ok, Daten hochladen
      </IconMaterial.Button>
    ) || <View/>;

    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 64}]}>
        <NavbarSubtitle>{this.props.email}</NavbarSubtitle>
        <GetDepositArticles filterListOnButtonConfirm={this.state.confirmButtonClicked}
                            hideConfirmButtonWhileLoading={this._articlesFetched}
                            articlesReturned={this._articlesReturned}/>
        {confirmButton}
        {backToEditButton}
        {submitButton}
      </View>
    );
  }

  _articlesFetched() {
    this.setState({articleListFetched: true});
  }

  _articlesReturned(num) {
    this.setState({articlesReturnedCount: num});
  }

  _hideConfirmButtonOnFilteredView() {
    this.setState({filteredViewActive: true})
  }
}
