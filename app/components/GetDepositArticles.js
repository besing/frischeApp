'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import digestCall from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn'; // later: maybe throw out if unused

import appConfig from '../config/settings';
import appHelpers from '../config/helpers';
import globalStyles from '../config/styles';

import TextDefault from '../components/TextDefault';
import ImageBox from './ImageBox';
import TwoColumns from '../components/TwoColumns';

// const {url} = appConfig.apiCredentials_test; // later: use this on
const url = appConfig.apiCredentials_mock.url_get;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;


export default class GetDepositArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
    this.getAllArticles = this.getAllArticles.bind(this); // important! (No Autobinding in ES6 Classes)
    this.filterResults = this.filterResults.bind(this);
    this.iterateResults = this.iterateResults.bind(this);
  }

  render() {
    return (
      <ScrollView style={{flex: 1, paddingTop: 30}}>
        {<TwoColumns>{this.state.result}</TwoColumns> || <TextDefault>Lädt!</TextDefault>}
      </ScrollView>
    )
  }

  componentDidMount() {
    this.getAllArticles(); // if inside render() => Infinite Loop!
  }

  getAllArticles() {
    // const req = new digestCall('GET', url + '/articles', apiUser, apiKey); // later: use this one
    const req = new digestCall('GET', url + '', apiUser, apiKey);
    req.request((result) => {
      // changed to ES6-Fat-Arrow-Functions (for preserving 'this' -> no need for binding)

      // this.output = result.data; // .data = array // later: use this one
      this.output = result; // .data = array

      this.setState({
        result: this.iterateResults()
      });

    }, (error) => {
      console.error(error);
    });
  }

  filterResults() {
    this.filteredArr = this.output.filter((obj) => {
      return obj.category_id == 117; // later: maybe new API
    });
  }

  iterateResults() {
    this.filterResults();

    return (
      this.filteredArr.map((item) => {
        return (
          <View key={item.id}>
              <ImageBox
                source={item.img}
                title={item.name}
                size={110}
                borderRadius={10}
                blur={5}
              />
          </View>
        )
      })
    );
  }
}
