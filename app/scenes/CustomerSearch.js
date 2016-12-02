'use strict';

import React, { Component } from 'react';
import {
  View,
  ListView,
  Text
} from 'react-native';

// Import 3rd Party Node Modules
  import { SearchBar, List, ListItem } from 'react-native-elements';

// Import Scenes & Components
  import ArticlesList from '../scenes/ArticlesList';

// Import Locals
  import {customersData} from '../scenes/Home';


export default class CustomerSearch extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(customersData),
      searchTextFirstName: '',
      searchTextLastName: ''
    };
    this.renderRow = this.renderRow.bind(this);
    this._setSearchTextFirstName = this._setSearchTextFirstName.bind(this);
    this._setSearchTextLastName = this._setSearchTextLastName.bind(this);
    this._filterList = this._filterList.bind(this);
    this._selectCustomer = this._selectCustomer.bind(this)
  }

  render() {
    return (
      <View style={{paddingTop: 64, flex: 1}}>
        <SearchBar
          onChange={this._setSearchTextFirstName}
          placeholder="Vorname"
          clearButtonMode="always"
          lightTheme
        />
        <SearchBar
          onChange={this._setSearchTextLastName}
          placeholder="Nachname"
          clearButtonMode="always"
          lightTheme
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
        />
      </View>
    );
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={`${rowData.lastname}, ${rowData.firstname}`}
        subtitle={rowData.email}
        onPress={() => this._selectCustomer(rowData)}
        underlayColor={'#eee'}
      />
    )
  }

  _setSearchTextFirstName(event) {
    const searchText = event.nativeEvent.text;
    this.setState({
      searchTextFirstName: searchText
    });
    this._filterList(customersData, 'firstname', searchText, 'lastname', this.state.searchTextLastName)
  }

  _setSearchTextLastName(event) {
    const searchText = event.nativeEvent.text;
    this.setState({searchTextLastName: searchText});
    this._filterList(customersData, 'lastname', searchText, 'firstname', this.state.searchTextFirstName);
  }

  _filterList(data, firstProp, firstValue, secondProp, secondValue) {
    const filteredData = data.filter((obj) => {
      return (
        obj[firstProp].includes(firstValue) && obj[secondProp].includes(secondValue) ||
        obj[firstProp].includes(firstValue.toLowerCase()) && obj[secondProp].includes(secondValue) ||
        obj[firstProp].includes(firstValue) && obj[secondProp].includes(secondValue.toLowerCase()) ||
        obj[firstProp].includes(firstValue.toLowerCase()) &&
        obj[secondProp].includes(secondValue.toLowerCase())
      );
    });

    this.setState({
      dataSource: this.ds.cloneWithRows(filteredData)
    });
  }

  _selectCustomer(selectedCustomer) {
    this.props.navigator.push({
      title: `${selectedCustomer.firstname} ${selectedCustomer.lastname}`,
      component: ArticlesList,
      passProps: {
        customerId: selectedCustomer.id,
        firstname: selectedCustomer.firstname,
        lastname: selectedCustomer.lastname,
        email: selectedCustomer.email
      }
    });
  }
};
