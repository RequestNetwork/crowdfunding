import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { MetaMaskLoader, Loader } from '../../../../components/Loader';
import { Link } from '../../../../components/Link';
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

export const DisabledButton = ({ children }) => (
  <Button
    variant="raised"
    disabled
    color="primary"
    style={{
      marginTop: '1rem',
      marginBottom: '3rem',
    }}
  >
    {children}
  </Button>
);

const Flex = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export class Publisher extends Component {
  state = {
    loading: false,
    error: false,
    message: '',
    txHash: '',
    ready: false,
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
    return this.setState({ ready: true });
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
    this.setState({ loading: true, ready: false });

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
        this.setState({ ready: true });
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
      ready,
      loading: loadingMetaMask,
      error,
      message,
      txHash,
    } = this.state;
    const { project, requestNetwork } = this.props;
    if (loadingMetaMask) {
      return (
        <DisabledButton>
          <MetaMaskLoader />
        </DisabledButton>
      );
    }
    const PublishedLink = props => (
      <Link to={`/project/published/${txHash}`} {...props} />
    );

    if (txHash.length > 0) {
      return (
        <Fragment>
          {!ready && (
            <Flex>
              <Loader size={50} style={{ marginRight: '1rem' }} />
              <div>Please wait while your links are being generated</div>
            </Flex>
          )}
          <Clipboard
            style={{ all: 'unset' }}
            data-clipboard-text={`${
              window.location.origin
            }/project/published/${txHash}`}
          >
            <Button variant="raised" color="primary" fullWidth>
              COPY URL
            </Button>
          </Clipboard>
          <Button
            disabled={!ready}
            variant="raised"
            color="primary"
            component={PublishedLink}
            fullWidth
            style={{ height: '3rem', marginTop: '1rem' }}
          >
            Go to Project
          </Button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Button
          variant="raised"
          color="primary"
          disabled={
            !requestNetwork.currentAccount || requestNetwork.networkMismatch
          }
          style={{ marginBottom: '3rem' }}
          onClick={() => this.handlePublish(requestNetwork, project)}
        >
          {!requestNetwork.currentAccount && 'Please Login using MetaMask'}
          {requestNetwork.currentAccount && 'PUBLISH'}
        </Button>
        <div>{error && message}</div>
      </Fragment>
    );
  }
}
