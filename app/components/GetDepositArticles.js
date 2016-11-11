'use strict';

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator
} from 'react-native';

import digestCall from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn'; // later: maybe throw out if unused

import appConfig from '../config/settings';
import appHelpers from '../config/helpers';
import globalStyles from '../config/globalStyles';

import TextDefault from '../components/TextDefault';
import ArticlesListItem from '../components/ArticlesListItem';

// const {url} = appConfig.apiCredentials_test; // later: use this one
const url = appConfig.apiCredentials_test.url;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;


export default class GetDepositArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      currentlyLoading: true
    };
    this.getArticleList = this.getArticleList.bind(this); // important! (No Autobinding in ES6 Classes)
    this.iterateResults = this.iterateResults.bind(this);
  }

  render() {
    let spinner = null;
    if (this.state.currentlyLoading) {
      spinner = <ActivityIndicator
        animating={this.state.currentlyLoading}
        size="large"
        style={{justifyContent: 'center', marginTop: 50}}
      />
    } else { spinner = <View/> }

    return (
      <View style={{}}>
        {spinner}
        <ScrollView style={{}} automaticallyAdjustContentInsets={false}>
          <View>{this.state.result}</View>
        </ScrollView>
      </View>
    )
  }

  componentDidMount() {
    this.getArticleList(); // if inside render() => Infinite Loop!
  }

  getArticleList() {
    const req = new digestCall(
      'GET',
      url + '/articles' + '?filter[0][property]=mode&filter[0][value]=5',
      apiUser,
      apiKey
    );
    // const req = new digestCall('GET', url + '', apiUser, apiKey); // Dev JSON Mock
    req.request((result) => {
      // changed to ES6-Fat-Arrow-Functions (for preserving 'this' -> no need for binding)

      this.output = result.data; // .data = array

      this.setState({currentlyLoading: false});

      this.setState({
        result: this.iterateResults()
      });

    }, (error) => {
      console.error(error);
    });
  }

  iterateResults() {
    return (
      this.output.map((item, i) => {
        return (
          <View key={i}>
            <ArticlesListItem title={item.name} img={item.img} returnedArticlesNum="" />
          </View>
        )
      })
    );
  }
}
