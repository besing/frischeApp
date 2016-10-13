'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import digestCall from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn'; // later: maybe throw out if unused

import appConfig from '../config/settings';
import appHelpers from '../config/helpers';
import globalStyles from '../config/styles';

import TextDefault from '../components/TextDefault';

const {url} = appConfig.apiCredentials_test;
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
      <ScrollView style={{flex: 1}}>
        <View style={globalStyles.resultsBlock}>
          <View style={{marginBottom: 15}}>
            <TextDefault>{this.state.result ? 'Results:' : 'Lädt...'}</TextDefault>
          </View>
          <View>{this.state.result}</View>
        </View>
      </ScrollView>
    )
  }

  componentDidMount() {
    this.getAllArticles(); // if this GET-Call inside render() => Infinite Loop!
  }

  getAllArticles() {
    const req = new digestCall('GET', url + '/articles', apiUser, apiKey);
    req.request((result) => {
      // changed to ES6-Fat-Arrow-Functions (for preserving 'this' -> no need for binding)

      this.output = result.data; // .data = array

      this.setState({
        result: this.iterateResults()
      });

    }, (error) => {
      console.error(error);
    });
  }

  filterResults() {
    this.filteredArr = this.output.filter((obj) => {
      let searchVal = obj.name.toLowerCase();
      return searchVal.includes('pfand');
    });
  }

  iterateResults() {
    this.filterResults();

    return (
      this.filteredArr.map((item) => {
        return (
          <Text key={item.id}>{item.name} (id = {item.id})</Text>
        )
      })
    );
  }
}