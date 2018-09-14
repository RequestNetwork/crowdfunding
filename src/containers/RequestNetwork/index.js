import { Component } from 'react';
const Web3 = require('web3');

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

const INFURA_NODE = {
  1: 'https://mainnet.infura.io/BQBjfSi5EKSCQQpXebO',
  4: 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO',
};

const NETWORK_NAME = process.env.REACT_APP_NETWORK;
const networkId = getNetwork(NETWORK_NAME);

const createRequest = (
  requestNetwork: any,
  paymentAddresses: [string],
  amounts: [string],
  data,
  { currentAccount }
) =>
  requestNetwork.requestEthereumService.createRequestAsPayee(
    [currentAccount],
    amounts,
    '0x7d085bb0b1b2c99b42e3b17a4609311e4518208c', // aribtrary payer address
    paymentAddresses,
    undefined, // refund
    JSON.stringify(data),
    undefined, // extensions
    undefined, // extensionsParams
    { gasPrice: '15000000000' }
  );

const payRequest = (requestNetwork, requestId, amounts) =>
  requestNetwork.requestEthereumService.paymentAction(requestId, amounts);

const getRequest = (requestNetwork, { hash }) => {
  return requestNetwork.requestCoreService.getRequestByTransactionHash(hash);
};

export class RequestNetworkProvider extends Component {
  state = {
    requestNetwork: undefined,
    currentAccount: '',
  };
  interval = null;

  initPoll() {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, 1000);
    }
  }

  initRequestProvider(web3, networkId, network) {
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

  async initWeb3() {
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

  fetchAccounts = async () => {
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

  componentDidMount() {
    this.initWeb3();
    this.initPoll();
  }

  componentDidUpdate({ onInit }, prevState) {
    if (prevState.requestNetwork === undefined && this.state.requestNetwork) {
      onInit();
    }
  }

  render() {
    const { requestNetwork, currentNetwork, currentAccount } = this.state;
    if (!requestNetwork) {
      return null;
    }

    return this.props.children({
      create: (paymentAddress: [string], amounts: [string], data) =>
        createRequest(requestNetwork, paymentAddress, amounts, data, {
          currentAccount,
        }),
      pay: (requestId, amounts) =>
        payRequest(requestNetwork, requestId, amounts),
      get: ids => getRequest(requestNetwork, ids),
      isReady: true,
      currentNetwork,
      networkMismatch: !(NETWORK_NAME === currentNetwork),
      currentAccount,
    });
  }
}
