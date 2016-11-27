'use strict';

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  ListView,
  TouchableHighlight
} from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';

import digestCall from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn'; // later: maybe throw out if unused

import appConfig from '../config/settings';

import ArticlesListItem from '../components/ArticlesListItem';

// const {url} = appConfig.apiCredentials_test; // later: use this one
const url = appConfig.apiCredentials_test.url;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;
import {width, height} from '../config/globalStyles';


export default class GetDepositArticles extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.customerReturnedArticles = [];

    this.state = {
      currentlyLoading: true,
      fetchedData: [],
      dataSource: this.ds.cloneWithRows([]),
      dataSourceReduced: this.ds.cloneWithRows([]),
    };

    this.getArticleList = this.getArticleList.bind(this); // important! (No Autobinding in ES6 Classes)
    this.collectReturnedItems = this.collectReturnedItems.bind(this);
    this.mergeReturnedArticlesToObj = this.mergeReturnedArticlesToObj.bind(this);
    this.createSubmitObject = this.createSubmitObject.bind(this);
    this.submitArticlesRequest = this.submitArticlesRequest.bind(this);
  }

  render() {
    const spinner = (
      // needs to be sourced out into conditional in order to hide properly when State=loaded
      this.state.currentlyLoading && <ActivityIndicator
        animating={this.state.currentlyLoading}
        size="large"
        style={{justifyContent: 'center', marginTop: 50}}
      />
    ) || <View/>;

    const dropdownAlertSuccess = (
      <DropdownAlert
        ref={(ref) => this.dropdownSuccess = ref}
        containerStyle={{backgroundColor: 'mediumseagreen', paddingTop: 0, paddingBottom: 20, paddingLeft:  16}}
        titleStyle={{textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff'}}
        closeInterval={1500} />
    );

    const dropdownAlertError = (
      <DropdownAlert
        ref={(ref) => this.dropdownError = ref}
        containerStyle={{backgroundColor: 'crimson', paddingTop: 0, paddingBottom: 20, paddingLeft:  16}}
        titleStyle={{textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff'}}
        closeInterval={10000} />
    );

    if (this.props.submitArticles) { this.mergeReturnedArticlesToObj() }

    return (
      <View style={{flex: 1}}>
        {spinner}

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <ArticlesListItem title={rowData.name} img={rowData.image} id={rowData.id}
                              returnCount={this.props.articlesReturned}
                              filterOn={this.props.filterListOnButtonConfirm}
                              collectItems={this.collectReturnedItems}/>
          }
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          style={this.props.filterListOnButtonConfirm ? {height: height - 183} : {height: height - 132}}
          initialListSize={20}
        />

        {dropdownAlertSuccess}
        {dropdownAlertError}
      </View>
        /* height-132px = screen height - Status-/Nav-/Subtitle-Bars - Button
         * (otherwise hidden since 'automaticallyAdj...' above)
         * even 51px less for Confirm Screen (w/ second button) */
    );
  }

  componentDidMount() {
    this.getArticleList(); // if inside render() => Infinite Loop!
  }

  getArticleList() {
    const req = new digestCall(
      'GET',
      url + '/depositArticles',
      apiUser,
      apiKey
    );
    req.request((result) => {
      // changed to ES6-Arrow-Functions (for preserving 'this' -> no need for binding)

      this.setState({
        currentlyLoading: false,
        fetchedData: result.data,
        dataSource: this.ds.cloneWithRows(result.data),
      });

      this.props.hideConfirmButtonWhileLoading();

    }, (error) => {
      console.error(error);
    });
  }

  collectReturnedItems(articleId, articleName, add, remove) {
    this.customerReturnedArticles.push({
      id: articleId,
      name: articleName,
      addAmount: add,
      removeAmount: remove
    });
  }

  mergeReturnedArticlesToObj() {
    let merged = {};

    this.customerReturnedArticles.forEach((arrObj) => {

      if (merged.hasOwnProperty(arrObj.id)) {
        merged[arrObj.id] += arrObj.addAmount;
        merged[arrObj.id] -= arrObj.removeAmount;
      } else {
        merged[arrObj.id] = arrObj.addAmount;
      }
    });

    this.createSubmitObject(merged)
  }

  createSubmitObject(obj) {
    let submitObject = {
        customerId: this.props.customerId,
        articles: []
      };

    for (let prop in obj) {
      if (obj[prop] > 0 && obj.hasOwnProperty(prop)) { // ignore amount = 0 & check if hasOwnProp
        submitObject.articles.push({
          articleId: prop,
          returnAmount: obj[prop]
        });
      }
    }

    this.submitArticlesRequest(submitObject);
  }

  submitArticlesRequest(submitObj) {
    // TODO: switch to Digest Auth when API Endpoint ready (for now just on mocked API)

    fetch('http://localhost:3000/returnedArticles', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitObj)})

      .then((response) => { // Fetch() needs additional error handling
        if (!response.ok) {
          this.dropdownError.alertWithType('custom', 'Fehler. Bitte noch mal versuchen.');
          // console.error(response.statusText);
        }
        return response
      })

      .then((response) => {
        if (response.ok) {
          this.dropdownSuccess.alertWithType('custom', 'Pfand erfolgreich zurückgebucht');
          setTimeout(this.props.goBackToHome, 1000);
        }
      })

      .catch((error) => {
        // console.error(error);
        this.dropdownError.alertWithType('custom', 'Fehler. Bitte noch mal versuchen.');
      })
  }
}
