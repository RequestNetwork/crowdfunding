import * as React from 'react';
import Button from '@material-ui/core/Button';
import { MetaMaskLoader, Loader } from '../../../components/Loader';
import { Link } from '../../../components/Link';
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

export const DisabledButton = ({ children }) => (
  <Button
    variant="raised"
    disabled={true}
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

interface IPropType {
  broadcasting: boolean;
  ready: boolean;
  finished: boolean;
  txHash: string;
  mining: boolean;
  publish: () => null;
  message: string;
}
export default (props: IPropType) => {
  const {
    broadcasting,
    ready,
    finished,
    txHash,
    mining,
    publish,
    message,
  } = props;
  if (broadcasting) {
    return (
      <DisabledButton>
        <MetaMaskLoader />
      </DisabledButton>
    );
  }
  const PublishedLink = () => <Link to={`/project/published/${txHash}`} />;
  if (mining) {
    return (
      <Flex>
        <Loader size={50} style={{ marginRight: '1rem' }} />
        <div>Please wait while your links are being generated</div>
      </Flex>
    );
  }
  if (finished) {
    return (
      <React.Fragment>
        <Clipboard
          style={{ all: 'unset' }}
          data-clipboard-text={`${
            window.location.origin
          }/project/published/${txHash}`}
        >
          <Button variant="raised" color="primary" fullWidth={true}>
            COPY URL
          </Button>
        </Clipboard>
        <Button
          disabled={!finished}
          variant="raised"
          color="primary"
          component={PublishedLink}
          fullWidth={true}
          style={{ height: '3rem', marginTop: '1rem' }}
        >
          Go to Project
        </Button>
      </React.Fragment>
    );
  }

  return (
    <Button
      variant="raised"
      color="primary"
      disabled={!ready}
      style={{ marginBottom: '3rem' }}
      onClick={publish}
    >
      {message}
    </Button>
  );
};
