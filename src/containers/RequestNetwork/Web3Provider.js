import { Component } from 'react';
const PropTypes = require('prop-types');

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const propTypes = {
  onChangeAccount: PropTypes.func,
};
const childContextTypes = {
  web3: PropTypes.shape({
    accounts: PropTypes.array,
    selectedAccount: PropTypes.string,
    network: PropTypes.string,
    networkId: PropTypes.string,
  }),
};

class Web3Provider extends Component {
  constructor(props, context) {
    super(props, context);
    const accounts = this.getAccounts();

    this.state = {
      accounts,
      networkId: null,
      networkError: null,
    };
    this.interval = null;
    this.networkInterval = null;
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.fetchNetwork = this.fetchNetwork.bind(this);

    if (accounts) {
      this.handleAccounts(accounts, true);
    }
  }

  getChildContext() {
    return {
      web3: {
        accounts: this.state.accounts,
        selectedAccount: this.state.accounts && this.state.accounts[0],
        network: getNetwork(this.state.networkId),
        networkId: this.state.networkId,
        web3Available: this.state.web3Available,
        accountsAvailable: this.state.accountsAvailable,
      },
    };
  }

  /**
   * Start polling accounts, & network. We poll indefinitely so that we can
   * react to the user changing accounts or netowrks.
   */
  componentDidMount() {
    this.fetchAccounts();
    this.fetchNetwork();
    this.initPoll();
    this.initNetworkPoll();
  }

  /**
   * Init web3/account polling, and prevent duplicate interval.
   * @return {void}
   */
  initPoll() {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, ONE_SECOND);
    }
  }

  /**
   * Init network polling, and prevent duplicate intervals.
   * @return {void}
   */
  initNetworkPoll() {
    if (!this.networkInterval) {
      this.networkInterval = setInterval(this.fetchNetwork, ONE_MINUTE);
    }
  }

  /**
   * Update state regarding the availability of web3 and an ETH account.
   * @return {void}
   */
  fetchAccounts() {
    const { web3 } = window;
    const ethAccounts = this.getAccounts();

    if (ethAccounts.length === 0) {
      web3 &&
        web3.eth &&
        web3.eth.getAccounts((err, accounts) => {
          if (err) {
            this.setState({
              accountsError: err,
            });
          } else {
            this.handleAccounts(accounts);
          }
        });
    } else {
      this.handleAccounts(ethAccounts);
    }
  }

  handleAccounts(accounts, isConstructor = false) {
    const { onChangeAccount } = this.props;
    let next = accounts[0];
    let curr = this.state.accounts[0];
    next = next && next.toLowerCase();
    curr = curr && curr.toLowerCase();
    const didChange = curr && next && curr !== next;

    if (this.state.accounts.length === 0 && accounts.length > 0) {
      this.setState({
        accountsError: null,
        accounts: accounts,
      });
    }

    if (didChange && !isConstructor) {
      this.setState({
        accountsError: null,
        accounts,
      });
    }

    // If provided, execute callback
    if (didChange && typeof onChangeAccount === 'function') {
      onChangeAccount(next);
    }
  }

  /**
   * Get the network and update state accordingly.
   * @return {void}
   */
  fetchNetwork() {
    const { web3 } = window;

    web3 &&
      web3.version &&
      web3.version.getNetwork((err, netId) => {
        if (err) {
          this.setState({
            networkError: err,
          });
        } else {
          if (netId !== this.state.networkId) {
            this.setState({
              networkError: null,
              networkId: netId,
            });
          }
        }
      });
  }

  /**
   * Get the account. We wrap in try/catch because reading `web3.eth.accounts`
   * will throw if no account is selected.
   * @return {String}
   */
  getAccounts() {
    try {
      const { web3 } = window;
      // throws if no account selected
      const accounts = web3.eth.accounts;

      return accounts;
    } catch (e) {
      return [];
    }
  }

  render() {
    const { web3 } = window;

    if (!web3) {
      return this.setState({ web3Available: false });
    }

    if (this.state.accounts.length === 0) {
      return this.setState({ accountsAvailable: false });
    }

    return this.props.children;
  }
}

Web3Provider.propTypes = propTypes;
Web3Provider.childContextTypes = childContextTypes;

function getNetwork(networkId) {
  switch (networkId) {
    case '1':
      return 'MAINNET';
    case '2':
      return 'MORDEN';
    case '3':
      return 'ROPSTEN';
    case '4':
      return 'RINKEBY';
    case '42':
      return 'KOVAN';
    default:
      return 'UNKNOWN';
  }
}
