import * as React from 'react';
import { Provider } from './index'
import Web3 from 'web3';
import { createRequest, getRequest } from './utils';



const getNetwork = networkName => {
  switch (networkName) {
    case 'rinkeby':
      return 4;
    case 'main':
      return 1;
    default:
      return 4;
  }
};

interface IWindow extends Window {
  web3: any;
}

declare const window: IWindow;

const INFURA_NODE = {
  1: 'https://mainnet.infura.io/BQBjfSi5EKSCQQpXebO',
  4: 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO',
};

const NETWORK_NAME = process.env.REACT_APP_NETWORK;
const networkId = getNetwork(NETWORK_NAME);
interface IProps {
  onInit: () => void;
}

export class RequestNetworkProvider extends React.Component<IProps> {
  public state = {
    requestNetwork: undefined,
    currentAccount: '',
    currentNetwork: '',
  };
  public interval = null;

  public initPoll() {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, 1000);
    }
  }

  public initRequestProvider(web3, networkId, network) {
    import('@requestnetwork/request-network.js')
      .then(RequestNetwork => {
        return this.setState({
          requestNetwork: new RequestNetwork.default(
            web3.currentProvider,
            networkId
          ),
          currentNetwork: network,
        });
      })
      .catch(e => console.error(e));
  }

  public async initWeb3() {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider);
      const network = await web3.eth.net.getNetworkType();
      this.initRequestProvider(web3, networkId, network);
    } else {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(INFURA_NODE[networkId])
      );
      const network = await web3.eth.net.getNetworkType();
      this.initRequestProvider(web3, networkId, network);
    }
  }

  public fetchAccounts = async () => {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider);
      const { currentAccount } = this.state;
      const account = await web3.eth.getAccounts();
      if (account.length > 0 && currentAccount === '') {
        return this.setState({ currentAccount: account[0] });
      }
      if (currentAccount !== account[0]) {
        return this.setState({ currentAccount: account[0] });
      }
    }
  };

  public componentDidMount() {
    this.initWeb3();
    this.initPoll();
  }

  public componentDidUpdate({ onInit }, prevState) {
    if (prevState.requestNetwork === undefined && this.state.requestNetwork) {
      onInit();
    }
  }

  public render() {
    const { requestNetwork, currentNetwork, currentAccount } = this.state;
    if (!requestNetwork) {
      return null;
    }

    return (
      <Provider
        value={{
          create: (paymentAddress: [string], amounts: [string], data: any) =>
            createRequest(requestNetwork, paymentAddress, amounts, data, {
              currentAccount,
            }),
          get: id => getRequest(requestNetwork, id),
          isReady: true,
          currentNetwork,
          networkMismatch: !(NETWORK_NAME === currentNetwork),
          currentAccount,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default RequestNetworkProvider;

