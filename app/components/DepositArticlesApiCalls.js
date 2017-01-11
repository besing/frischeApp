'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ListView,
  StyleSheet
} from 'react-native';

// Import 3rd Party Node Modules
  import digestCall from 'digest-auth-request-rn';
  import DropdownAlert from 'react-native-dropdownalert';

// Import Scenes & Components
  import ArticlesListItem from '../components/ArticlesListItem';

// Import Globals, Configs & Helpers
  import appConfig from '../config/settings';
  import globalStyles, {width, height} from '../config/globalStyles';


const url = appConfig.apiCredentials_test.url;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;

export default class DepositArticlesApiCalls extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.customerReturnedArticles = [];
    this.state = {
      currentlyLoading: true,
      dataSource: this.ds.cloneWithRows([]),
      dataSourceReduced: this.ds.cloneWithRows([]),
    };
    this.getArticleList = this.getArticleList.bind(this);
    this.collectReturnedItems = this.collectReturnedItems.bind(this);
    this.mergeReturnedArticlesToObj = this.mergeReturnedArticlesToObj.bind(this);
    this.createSubmitObject = this.createSubmitObject.bind(this);
    this.submitArticlesRequest = this.submitArticlesRequest.bind(this);
  }

  render() {
    const spinner = (
      this.state.currentlyLoading && <ActivityIndicator
        animating={this.state.currentlyLoading}
        size="large"
        style={{
          justifyContent: 'center',
          marginTop: 50
        }}
      />
    ) || <View/>;

    const dropdownAlertSuccess = (
      <DropdownAlert
        ref={(ref) => this.dropdownSuccess = ref}
        containerStyle={[styles.dropdownAlert, {
          backgroundColor: 'mediumseagreen',
        }]}
        titleStyle={styles.dropdownAlertTitle}
        closeInterval={1500} />
    );

    const dropdownAlertError = (
      <DropdownAlert
        ref={(ref) => this.dropdownError = ref}
        containerStyle={[styles.dropdownAlert, {
          backgroundColor: 'crimson',
        }]}
        titleStyle={styles.dropdownAlertTitle}
        closeInterval={10000} />
    );

    if (this.props.submitArticles) { this.mergeReturnedArticlesToObj() }

    return (
      <View style={globalStyles.container}>
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
          initialListSize={20} // render all Rows at once (20 = more than total)
          style={this.props.filterListOnButtonConfirm ?
            {height: height - 183} :
            {height: height - 132}}
        />

        {dropdownAlertSuccess}
        {dropdownAlertError}
      </View>
        // height-132px = screen height - Status-/Nav-/Subtitle-Bars - Button
        //(otherwise hidden since 'automaticallyAdj...' above)
        // even 51px less for Confirm Screen (w/ second button)
    );
  }

  componentDidMount() {
    this.getArticleList();
  }

  getArticleList() {
    const req = new digestCall(
      'GET',
      url + '/depositArticles',
      apiUser,
      apiKey
    );

    req.request((result) => {
      // changed to ES6-Arrow-Functions (for preserving 'this' -> no binding necessary)
      this.setState({
        currentlyLoading: false,
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
      returnedArticles: {
        customerId: this.props.customerId,
        articles: []
      }
    };

    for (let prop in obj) {
      if (obj[prop] > 0 && obj.hasOwnProperty(prop)) { // ignore amount = 0 and check if hasOwnProp
        submitObject.returnedArticles.articles.push({
          articleId: prop,
          returnAmount: obj[prop]
        });
      }
    }

    this.submitArticlesRequest(submitObject);
  }

  submitArticlesRequest(submitObj) {
          const postData = submitObj;

          console.log('postData: ', postData);

          const postReq = new digestCall(
            'POST',
            url + '/deposit',
            apiUser,
            apiKey
          );

          postReq.request((data) => {
            console.log('success alert: ', data);
            this.dropdownSuccess.alertWithType('custom', 'Pfand erfolgreich zurückgebucht');
            setTimeout(this.props.goBackToHome, 1000);

          }, (error) => {
            console.error(error);
            this.dropdownError.alertWithType('custom', 'Fehler. Bitte noch mal versuchen.');

          }, postData);


  }
}

const styles = StyleSheet.create({
  dropdownAlert: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft:  16
  },
  dropdownAlertTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});
