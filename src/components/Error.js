import React from 'react';
import { H1 } from './H';
import { Center } from './Center';
import styled from 'styled-components';
import { Link } from './Link';

import Button from '@material-ui/core/Button';

const Column = styled(Center)`
  align-items: unset;
  justify-content: unset;
`;

const HomeLink = props => <Link to="/" {...props} />;

export const Error = () => (
  <Column>
    <H1>Something went wrong</H1>
    <Button component={HomeLink} color="primary" variant="raised">
      Go Home
    </Button>
  </Column>
);
