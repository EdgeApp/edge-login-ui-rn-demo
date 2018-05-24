/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 */

import '../shim.js'
import React, { Component } from 'react'
import { Button } from 'react-native'
import { makeEdgeContext, type EdgeSpendInfo } from 'edge-core-js'
import { LoginScreen } from 'edge-login-ui-rn'
import {
  bitcoincashCurrencyPluginFactory,
} from 'edge-currency-bitcoin'

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class App extends Component{
  constructor (props) {
    super(props)
    this.state = {
      context: null,
      account: null,
      walletId: null,
      wallet: null,
      content: ''
    }
    // Creating the context is async, so we store it in our state:
    makeEdgeContext({
      // Replace this with your own API key from https://developer.airbitz.co:
      apiKey: '0b5776a91bf409ac10a3fe5f3944bf50417209a0',
      appId: 'com.mydomain.myapp',
      vendorName: 'Chain Net',
      vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png',
      plugins: [bitcoincashCurrencyPluginFactory]
    }).then(context => {
      this.setState({ context })
    })
  }

  onLogin = (error = null, account) => {
    if (error) {
      console.log(error)
    }
    if (!this.state.account) {
      this.setState({account})
    }
    if (!this.state.walletId) {
      // Check if there is a wallet, if not create it
      let walletInfo = account.getFirstWalletInfo('wallet:bitcoincash')
      if (walletInfo) {
        this.setState({walletId: walletInfo.id})
      } else {
        account.createCurrencyWallet('wallet:bitcoincash', {
          name: 'My First Wallet',
          fiatCurrencyCode: 'iso:USD'
        }).then(wallet => {
          this.setState({ wallet })
          this.setState({walletId: wallet.id})
        })
      }
    }
  }

  accountOptions = {
    callbacks: {
      onKeyListChanged: () => {
        this.logger('onKeyListChanged:')
        if (this.state.account && !this.state.wallet && this.state.walletId) {
          // Try to grab the wallet from currencyWallets
          const wallet = this.state.account.currencyWallets[this.state.walletId]
          if (wallet) {
            this.setState({ wallet })
          }
        }
      },
      onAddressesChecked: (walletId, progressRatio) => {
        if (walletId === this.state.walletId) {
          this.logger(`onAddressesChecked: ${walletId.slice(0, 6)} ${progressRatio}`)
          if (progressRatio === 1) {
            this.state.wallet.getReceiveAddress().then(address => {
              this.logger(`address ${address.publicAddress}`)
            })
          }
        }
      },
      onBalanceChanged: (walletId, currencyCode, nativeBalance) => {
        if (walletId === this.state.walletId) {
          this.logger(`onBalanceChanged: ${walletId.slice(0, 6)} ${currencyCode} ${nativeBalance}`)
        }
      },
      onNewTransactions: (walletId, edgeTransactions) => {
        if (walletId === this.state.walletId) {
          this.logger(`onNewTransactions: ${walletId.slice(0, 6)} ${edgeTransactions[0].nativeAmount}`)
        }
      }
    }
  }

  onPressButton = async () => {
    const spendInfo: EdgeSpendInfo = {
      currencyCode: 'BCH',
      spendTargets: [{
        publicAddress: 'bitcoincash:qrpx5e79hmrzmyfrfpyxunud9e6qsdzj0vuss2mq58',
        nativeAmount: '10000' // 1 mBCH ($.10 USD)
      }]
    }

    try {
      let tx = await this.state.wallet.makeSpend(spendInfo)
      tx = await this.state.wallet.signTx(tx)
      tx = await this.state.wallet.broadcastTx(tx)
      await this.state.wallet.saveTx(tx)
      this.logger('Tx sent')
    } catch (e) {
      this.logger(e)
    }
  }

  renderLoginApp = () => {
    // No context.. We're still initializing Edge Core
    if (!this.state.context) {
      return <Text style={styles.welcome}>Loading...</Text>
    }

    // No account, we need to show login screen
    if (!this.state.account) {
      return <LoginScreen
      context={this.state.context}
      onLogin={this.onLogin}
      // accountOptions={{}}
      accountOptions={this.accountOptions}
      />
    }

    // We're logged in!!
    return (
      <View>
        <Button onPress={this.onPressButton} title={'Spend'}/>
        <Text style={styles.welcome}>Logged in</Text>
        <Text style={styles.content}>{this.state.content}</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderLoginApp()}
      </View>
    );
  }
  logger (t) {
    if (typeof t === 'object') {
      t = JSON.stringify(t)
    }
    this.setState({ content: this.state.content + t + '\n'})
    console.log(t)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  content: {
    fontSize: 15,
    textAlign: 'left',
    margin: 5
  }
});
