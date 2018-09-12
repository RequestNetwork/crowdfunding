import React, { Fragment } from 'react';
import { Field } from 'formik';
import { Link } from '../../../components/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { InputCurrency, Input, Select } from '../../../components/Input';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  && {
    margin-bottom: 1rem;
  }
`;

const NextLink = props => <Link to="/onboarding/signup" {...props} />;

export const ProjectStep = ({ isValid }) => (
  <Fragment>
    <Field
      component={InputCurrency}
      name="amount"
      placeholder="Amount you want to raise"
    />
    <Field
      component={Input}
      type="text"
      name="paymentAddress"
      placeholder="Eth address to receive the funds"
    />
    <Field
      component={Input}
      type="text"
      name="title"
      placeholder="Your project name"
    />
    <Field
      component={StyledSelect}
      id="category"
      name="category"
      placeholder="Add a category"
    >
      <MenuItem id="item-nonprofit" value="Nonprofit">
        Non-profit
      </MenuItem>
      <MenuItem id="item-personal" value="Personal">
        Personal
      </MenuItem>
      <MenuItem id="item-commercial" value="Commercial">
        Commercial
      </MenuItem>
    </Field>

    {false ? (
      <Button
        variant="raised"
        component={NextLink}
        color="primary"
        disabled={!isValid}
        fullWidth
      >
        NEXT
      </Button>
    ) : (
      <Button
        variant="raised"
        disabled={!isValid}
        color="primary"
        style={{ width: 350 }}
        type="submit"
      >
        Create Project
      </Button>
    )}
  </Fragment>
);
