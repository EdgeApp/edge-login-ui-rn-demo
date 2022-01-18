import {EdgeAccount} from 'edge-core-js';
import * as React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

interface Props {
  edgeAccount: EdgeAccount;
  onLogout: () => void;
}

/**
 * Your app goes here.
 */
export const YourApp = (props: Props) => {
  const {edgeAccount, onLogout} = props;

  // We expect to have an Ethereum wallet in the account:
  const walletInfo = edgeAccount.getFirstWalletInfo('wallet:ethereum');

  // Create an Ethereum wallet at login if we don't have one:
  React.useEffect(() => {
    if (walletInfo == null)
      edgeAccount.createCurrencyWallet('wallet:ethereum', {
        name: 'My First Wallet',
        fiatCurrencyCode: 'iso:USD',
      });
  }, [edgeAccount]);

  // Watch the list of loaded wallets.
  // Wallets begin loading after the login is complete,
  // so it always takes time for our wallet to appear:
  const [wallets, setWallets] = React.useState(edgeAccount.currencyWallets);
  React.useEffect(
    () => edgeAccount.watch('currencyWallets', setWallets),
    [edgeAccount],
  );

  // Find our wallet in the list (might not be there at first):
  const wallet = walletInfo == null ? undefined : wallets[walletInfo.id];

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <Text>Username: {edgeAccount.username}</Text>
      <Text>Wallet name: {wallet?.name}</Text>
      <Text>Wallet Balance: {wallet?.balances?.ETH}</Text>
      <Button title="Log Out" onPress={onLogout}></Button>
    </SafeAreaView>
  );
};
