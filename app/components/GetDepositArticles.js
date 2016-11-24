'use strict';

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  ListView
} from 'react-native';

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

    this.state = {
      currentlyLoading: true,
      fetchedData: [],
      dataSource: this.ds.cloneWithRows([]),
      dataSourceReduced: this.ds.cloneWithRows([]),
    };

    this.getArticleList = this.getArticleList.bind(this); // important! (No Autobinding in ES6 Classes)
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

    return (
      <View style={{flex: 1}}>
        {spinner}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <ArticlesListItem title={rowData.name} img={rowData.image} id={rowData.id}
                              returnCount={this.props.articlesReturned}
                              filterOn={this.props.filterListOnButtonConfirm}/>
          }
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          style={this.props.filterListOnButtonConfirm ? {height: height - 183} : {height: height - 132}}
          initialListSize={20}
        />
      </View>
        // height-132px = screen height - Status-/Nav-/Subtitle-Bars - Button
        // (otherwise hidden since 'automaticallyAdj...' above)
        // even 51px less for Confirm Screen (w/ second button)
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
}
