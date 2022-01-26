import {EdgeAccount, EdgeContext} from 'edge-core-js';
import {LoginScreen} from 'edge-login-ui-rn';
import * as React from 'react';
import {Text} from 'react-native';
import {YourApp} from './YourApp';

interface Props {
  edgeContext?: EdgeContext;
}

/**
 * The main router component.
 *
 * Switches between a loading screen, the login screen, and the main app.
 *
 * Normally this would be a library like react-navigation,
 * but we are trying to keep things simple for this demo.
 */
export const Router = (props: Props) => {
  const {edgeContext} = props;

  // Stores the Edge account:
  const [account, setAccount] = React.useState<EdgeAccount>();
  const handleLogout = () => {
    account?.logout();
    setAccount(undefined);
  };

  // Once the context is ready, we can show the login screen.
  // Once the user logs in, we can show the main app:
  return edgeContext == null ? (
    <Text>Loading...</Text>
  ) : account == null ? (
    <LoginScreen
      accountOptions={{}}
      context={edgeContext}
      onLogin={setAccount}
    />
  ) : (
    <YourApp edgeAccount={account} onLogout={handleLogout} />
  );
};
