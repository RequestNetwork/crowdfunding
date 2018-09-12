import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const NetworkName = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  background: linear-gradient(180deg, #5392ff 0%, #3e82f7 98.52%);
  position: relative;
  z-index: 2;
  min-height: 1rem;
  padding: 1rem;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

export class NetworkStatus extends Component {
  state = {
    hide: false,
  };
  render() {
    const { metaMaskIsLoggedIn, mismatch } = this.props;
    const { hide } = this.state;
    if (hide) return <div />;
    if (!metaMaskIsLoggedIn) {
      return (
        <NetworkName square elevation={0}>
          You need to log in to MetaMask to back this project
          <CloseButton onClick={() => this.setState({ hide: true })}>
            X
          </CloseButton>
        </NetworkName>
      );
    }

    if (mismatch) {
      return (
        <NetworkName square elevation={0}>
          {`You're on the wrong network please select ${
            process.env.REACT_APP_NETWORK
          }`}
          <CloseButton onClick={() => this.setState({ hide: true })}>
            X
          </CloseButton>
        </NetworkName>
      );
    }
    return <div />;
  }
}
