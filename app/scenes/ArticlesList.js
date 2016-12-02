'use strict';

import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

// Import 3rd Party Node Modules
  import IconMaterial from 'react-native-vector-icons/MaterialIcons';

// Import Scenes & Components
  import DepositArticlesApiCalls from '../components/DepositArticlesApiCalls';
  import NavbarSubtitle from '../components/NavbarSubtitle';

// Import Globals, Configs & Helpers
  import globalStyles from '../config/globalStyles';


export default class ArticlesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showConfirmScreen: false,
      articleListFetched: false,
      allArticlesReturnedSum: 0,
      submitChoice: false
    };
    this._articlesReturned = this._articlesReturned.bind(this);
  }

  render() {
    const articlesGotReturned = (true) ? this.state.allArticlesReturnedSum > 0 : false;

    const confirmButton = (
      this.state.articleListFetched && !this.state.showConfirmScreen && <IconMaterial.Button
        name="playlist-add-check"
        backgroundColor={articlesGotReturned ? "sandybrown" : '#aaa'}
        onPress={() => {
          this.setState({
            showConfirmScreen: true,
          })
        }}
        underlayColor={'#000'}
        size={25}
        borderRadius={0}
        disabled={!articlesGotReturned}
      >
        Eingabe überprüfen
      </IconMaterial.Button>
    ) || <View/>;

    const backToEditButton = (
      this.state.showConfirmScreen && <IconMaterial.Button
        name="edit"
        backgroundColor="crimson"
        onPress={() => this.setState({
          showConfirmScreen: false
        })}
        underlayColor={'#000'}
        size={25}
        borderRadius={0}
      >
        Korrigieren
      </IconMaterial.Button>
    ) || <View/>;

    const submitButton = (
      this.state.showConfirmScreen && <IconMaterial.Button
        name="send"
        backgroundColor="mediumseagreen"
        onPress={() => this.setState({
          submitChoice: true
        })}
        underlayColor={'#000'}
        size={35}
        borderRadius={0}
      >
        Daten hochladen
      </IconMaterial.Button>
    ) || <View/>;

    return (
      <View style={[globalStyles.container, {backgroundColor: '#eee', paddingTop: 64}]}>
        <NavbarSubtitle>
          {this.props.email}
        </NavbarSubtitle>
        <DepositArticlesApiCalls filterListOnButtonConfirm={this.state.showConfirmScreen}
                          hideConfirmButtonWhileLoading={() => this.setState({
                              articleListFetched: true
                            })}
                          articlesReturned={this._articlesReturned}
                          customerId={this.props.customerId}
                          customerFirstname={this.props.firstname}
                          customerLastname={this.props.lastname}
                          submitArticles={this.state.submitChoice}
                          goBackToHome={() => this.props.navigator.popToTop(0)} />
        {confirmButton}
        {backToEditButton}
        {submitButton}
      </View>
    );
  }

  _articlesReturned(add, remove) {
    this.setState({allArticlesReturnedSum: this.state.allArticlesReturnedSum + add - remove});
  }
}
