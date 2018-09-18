import React, { Component, Fragment } from 'react';

export class Publisher extends Component {
  state = {
    broadcasting: false,
    error: false,
    message: '',
    txHash: '',
    mining: false,
    finished: false,
  };
  getRequest = async hash => {
    const { requestNetwork } = this.props;
    try {
      const response = await requestNetwork.get({ hash });
      if (!response.request) {
        return setTimeout(() => this.getRequest(hash), 1000);
      }
    } catch (e) {
      return setTimeout(() => this.getRequest(hash), 1000);
    }
    return this.setState({ mining: false, finished: true });
  };

  handlePublish = (
    requestNetwork,
    {
      amount,
      paymentAddress,
      category,
      description,
      logoUrl,
      projectImageUrl,
      title,
    }
  ) => {
    this.setState({ broadcasting: true });

    requestNetwork
      .create([paymentAddress], [amount], {
        category,
        description,
        logoUrl,
        projectImageUrl,
        title,
      })
      .on('broadcasted', ({ transaction }) => {
        this.setState({
          mining: true,
          txHash: transaction.hash,
          broadcasting: false,
        });
        this.getRequest(transaction.hash);
      })
      .then(() => {
        this.setState({ finished: true });
      })
      .catch(err => {
        return this.setState({
          error: true,
          broadcasting: false,
          message: err.message.slice(1, -1).toUpperCase(),
        });
      });
  };

  render() {
    const {
      finished,
      broadcasting,
      error,
      message,
      txHash,
      mining,
    } = this.state;
    const { project, requestNetwork } = this.props;

    return this.props.children({
      ready: !(
        !requestNetwork.currentAccount || requestNetwork.networkMismatch
      ),
      finished,
      message: requestNetwork.currentAccount
        ? 'PUBLISH'
        : 'Please Login using MetaMask',
      error,
      mining,
      broadcasting,
      publish: () => this.handlePublish(requestNetwork, project),
      txHash,
    });
  }
}
