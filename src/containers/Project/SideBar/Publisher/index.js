import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { MetaMaskLoader, Loader } from '../../../../components/Loader';
import { Link } from '../../../../components/Link';
import styled from 'styled-components';

export class Publisher extends Component {
  state = {
    loading: false,
    error: false,
    message: '',
    txHash: '',
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
    return this.setState({ finished: true });
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
    this.setState({ loading: true, finished: false });

    requestNetwork
      .create([paymentAddress], [amount], {
        category,
        description,
        logoUrl,
        projectImageUrl,
        title,
      })
      .on('broadcasted', ({ transaction }) => {
        this.setState({ loading: false, txHash: transaction.hash });
        this.getRequest(transaction.hash);
      })
      .then(() => {
        this.setState({ finished: true });
      })
      .catch(err => {
        return this.setState({
          error: true,
          loading: false,
          message: err.message.slice(1, -1).toUpperCase(),
        });
      });
  };

  render() {
    const {
      finished,
      loading: loadingMetaMask,
      error,
      message,
      txHash,
    } = this.state;
    const { project, requestNetwork, button } = this.props;

    return this.props.children({
      ready: !(
        !requestNetwork.currentAccount || requestNetwork.networkMismatch
      ),
      finished: false,
      message: requestNetwork.currentAccount
        ? 'PUBLISH'
        : 'Please Login using MetaMask',
      error,
      loading: loadingMetaMask,
      publish: () => this.handlePublish(requestNetwork, project),
      txHash: '',
    });
  }
}
