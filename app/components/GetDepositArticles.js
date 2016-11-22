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
    this.modifiedResults = [];

    this.state = {
      currentlyLoading: true,
      fetchedData: [],
      dataSource: this.ds.cloneWithRows([]),
      dataSourceReduced: this.ds.cloneWithRows([]),
    };

    this.getArticleList = this.getArticleList.bind(this); // important! (No Autobinding in ES6 Classes)
    this.callbackArticlesListItemChanged = this.callbackArticlesListItemChanged.bind(this);
  }

  callbackArticlesListItemChanged(title, id, returnCount) {
    let findChangedObject = (item) => item.id === id;
    let obj = this.modifiedResults.find(findChangedObject);
    obj.articleReturnedCount = returnCount; // add new property for filtering TODO: ggf. noch mal checken

    let filteredResults = this.modifiedResults.filter((item) => item.articleReturnedCount > 0);

    this.setState({
      dataSourceReduced: this.ds.cloneWithRows(filteredResults)
    });
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

    let filterListActive = this.props.filterListOnButtonConfirm;
    let rowRender = null;

    if (filterListActive) {
      // should avoid duplicate sections but can't seem to make JSX attributes conditional/vars
      rowRender =
        <ListView
          dataSource={this.state.dataSourceReduced}
          renderRow={(rowData) =>
            <ArticlesListItem title={rowData.name} img={rowData.image} id={rowData.id}
                              listItemCallback={this.callbackArticlesListItemChanged}
                              articleReturnedAmount={rowData.articleReturnedCount}/>
          }
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          style={{height: height - 132}}
          initialListSize={20}
        />;
    } else {
      rowRender =
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
              <ArticlesListItem title={rowData.name} img={rowData.image} id={rowData.id}
                                listItemCallback={this.callbackArticlesListItemChanged}/>
          }
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          style={{height: height - 132}}
          initialListSize={20}
        />
    }
    // height-132px = screen height - Status-/Nav-/Subtitle-Bars - Button (otherwise hidden since 'automaticallyAdj...' above)

    return (
      <View style={{flex: 1}}>
        {spinner}
        {rowRender}
      </View>
    );
  }

  componentDidMount() {
    this.getArticleList(); // if inside render() => Infinite Loop!
  }

  getArticleList() {
    const req = new digestCall(
      'GET',
      // url + '/depositArticles', // TODO - switch to this Endpoint again (didn't work temporarily)
      url + '/articles' + '?filter[0][property]=mode&filter[0][value]=5',
      apiUser,
      apiKey
    );
    // const req = new digestCall('GET', url + '', apiUser, apiKey); // Dev JSON Mock
    req.request((result) => {
      // changed to ES6-Arrow-Functions (for preserving 'this' -> no need for binding)

      this.modifiedResults = result.data.slice(); // first just copy array

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
