import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-poppins';
import 'typeface-roboto';
import { client } from './apollo';
import { NetworkStatus } from './containers/NetworkStatus';
import { RequestNetworkProvider as OldRequestNetworkProvider } from './containers/RequestNetwork';
import RequestNetworkProvider, { Consumer } from '@requestnetwork/react-components';
import { Main } from './containers/Routes';
import { theme } from './theme';

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <RequestNetworkProvider onInit={() => console.log('new library')}>
          <OldRequestNetworkProvider
            onInit={() => console.log('Request Library has initialized!')}
          >
            {requestNetwork => {
              return (
                <Router>
                  <ApolloProvider client={client}>
                    <div>
                      <Route
                        path="/project/:id"
                        render={props => (
                          <Consumer>
                            {newRequestNetwork => (
                              <NetworkStatus
                                {...props}
                                mismatch={newRequestNetwork.networkMismatch}
                                metaMaskIsLoggedIn={
                                  !!newRequestNetwork.currentAccount
                                }
                              />
                            )}
                          </Consumer>
                        )}
                      />
                      <Main requestNetwork={requestNetwork} />
                    </div>
                  </ApolloProvider>
                </Router>
              );
            }}
          </OldRequestNetworkProvider>
        </RequestNetworkProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
