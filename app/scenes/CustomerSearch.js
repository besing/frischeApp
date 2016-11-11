'use strict';

import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  TextInput
} from 'react-native';

import globalStyles from '../config/globalStyles';
import { SearchBar, List, ListItem } from 'react-native-elements';

import { customersData } from '../scenes/Home';


export default class CustomerSearch extends Component {

  constructor(props) {
    super(props);

    this.filteredResults = customersData;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds.cloneWithRows(customersData),
      searchTextFirstName: '',
      searchTextLastName: ''
    };

    this._setSearchTextFirstName = this._setSearchTextFirstName.bind(this);
    this._setSearchTextLastName = this._setSearchTextLastName.bind(this);
    this._filterList = this._filterList.bind(this);
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.lastname + ', ' + rowData.firstname}
        subtitle={rowData.email}
      /> // later: maybe replace by native Component (instead of RN Elements ListItem)?
    )
  }

  render() {
    return (
      <View style={{paddingTop: 64, flex: 1}}>
        <SearchBar
          onChange={this._setSearchTextFirstName}
          placeholder="Vorname"
          lightTheme
        />
        <SearchBar
          onChange={this._setSearchTextLastName}
          placeholder="Nachname"
          lightTheme
        />

        <ListView
          automaticallyAdjustContentInsets={false} // otherwise additional 64px top-space (default)
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </View>
    );
  }

  _setSearchTextFirstName(event) {
    let searchText = event.nativeEvent.text;
    let searchTextLowercase = searchText.toLowerCase();
    this.setState({searchTextFirstName: searchText});
    this._filterList(customersData, 'firstname', searchText, searchTextLowercase)
  }
  // the two very similar methods could/should be merged into one (functional) --> but didn't manage to source out the event Callback into arguments..

  _setSearchTextLastName(event) {
    let searchText = event.nativeEvent.text;
    let searchTextLowercase = searchText.toLowerCase();
    this.setState({searchTextLastName: searchText});
    this._filterList(customersData, 'lastname', searchText, searchTextLowercase)
  }

  _filterList(data, property, valueNormal, valueLowercase) {
    let filteredData = data.filter((obj) => {
      return obj[property].includes(valueNormal) || obj[property].includes(valueLowercase)
    });

    this.setState({
      dataSource: this.ds.cloneWithRows(filteredData)
    });
  }
}

const styles = {
  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: .1,
    borderWidth: 9,
    borderColor: '#E4E4E4'
  }
};
