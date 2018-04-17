/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 */

import React, { Component } from 'react'
import { LoginScreen } from 'edge-login-ui-rn'
import { makeEdgeContext } from 'edge-core-js'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

function setupCore () {
  return makeEdgeContext({
    // Replace this with your own API key from https://developer.airbitz.co:
    apiKey: '0b5776a91bf409ac10a3fe5f3944bf50417209a0',
    appId: 'com.mydomain.myapp',
    vendorName: 'Chain Net',
    vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'
  })
}

export default class App extends Component{
  constructor (props) {
    super(props)
    this.state = {
      context: null,
      account: null,
    }
    // Creating the context is async, so we store it in our state:
    setupCore().then(context => this.setState(state => ({ ...state, context })))
  }
  onLogin = (error = null, accountObject) => {
    this.setState({
      account: accountObject
    })
  }
  renderLoginApp = () => {
    if (this.state.account){
      return <Text style={styles.welcome}>Logged In</Text>
    }
    if (this.state.context && !this.state.account) {
      return <LoginScreen
      context={this.state.context}
      onLogin={this.onLogin.bind(this)}
      accountOptions={{}}
      />
    }
    return <Text style={styles.welcome}>Loading</Text>
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderLoginApp()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
