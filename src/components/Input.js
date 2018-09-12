import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { EthereumIcon } from '../media/icons.js';
import styled from 'styled-components';

import InputAdornment from '@material-ui/core/InputAdornment';
export const Input = ({
  field,
  form: { errors, touched },
  endAdornment,
  ...rest
}) => (
  <TextField
    error={touched[field.name] && !!errors[field.name]}
    fullWidth
    label={touched[field.name] && errors[field.name] ? errors[field.name] : ' '}
    {...field}
    {...rest}
    InputLabelProps={{
      shrink: true,
    }}
    InputProps={{
      disableUnderline: true,
      endAdornment,
    }}
  />
);

export const AmountInput = ({ children, ...props }) => (
  <Input
    {...props}
    endAdornment={<InputAdornment>{children}</InputAdornment>}
  />
);

const Currency = styled.div`
  color: #617b9f;
  font-size: 18px;
  margin-left: 0.5rem;
  font-weight: 500;
`;

export const InputCurrency = props => (
  <AmountInput {...props}>
    <EthereumIcon style={{ width: '1rem', height: '1rem' }} />
    <Currency>ETH</Currency>
  </AmountInput>
);

export class Select extends Component {
  render() {
    const { children, handleBlur, ...rest } = this.props;
    return (
      <Input select {...rest} onBlur={handleBlur}>
        {children}
      </Input>
    );
  }
}

export default Input;
