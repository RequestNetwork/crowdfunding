import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Display = ({ children, ...props }) => (
  <Typography {...props} variant="display3">
    {children}
  </Typography>
);
export const H1 = ({ children, ...props }) => (
  <Typography {...props} variant="title">
    {children}
  </Typography>
);

export const H2 = ({ children, ...props }) => (
  <Typography {...props} variant="subheading">
    {children}
  </Typography>
);
