import React, { Component } from 'react';
import { Font } from 'expo';
import { imageStyles } from '../styles/images';
import { layoutStyles, margins } from '../styles/layout';
import { View } from 'react-native';
//import { Document, Page } from 'react-pdf';

export default class ResourceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.navigation.state.params.resourceLink);
    return (
      <View />
      /*
      <div>
        <Document
          file="mathrvew.pdf"
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      */
    );
  }
}
