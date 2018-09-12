import React, { Component, Fragment } from 'react';
import { Formik, Field, Form } from 'formik';
import Button from '@material-ui/core/Button';
import { Flex } from '../../../components/Flex';
import { InputCurrency } from '../../../components/Input';
import { Loader } from '../../../components/Loader';
import { MetaMaskLoader } from '../../../components/Loader';
import { DisabledButton } from './Publisher';
import styled from 'styled-components';

const StyledInputCurrency = styled(InputCurrency)`
  && {
    margin-bottom: 1rem;
  }
`;

const initialValues = { amount: '0' };

const validate = values => {
  let errors = {};
  if (parseFloat(values.amount, 10) <= 0) {
    errors.amount = 'Invalid values';
  }
  return errors;
};

const BackerForm = ({ children }) => (
  <Form>
    <Flex>
      <Field
        component={StyledInputCurrency}
        type="number"
        name="amount"
        placeholder="amount"
      />

      {children}
    </Flex>
  </Form>
);
export class Backer extends Component {
  state = {
    backed: false,
    metaMaskLoading: false,
  };
  handleSubmit = async (values, requestId, requestNetwork) => {
    this.setState({ metaMaskLoading: true });
    const amountInWei = values.amount * Math.pow(10, 18);
    requestNetwork
      .pay(requestId, [amountInWei.toString()])
      .on('broadcasted', () =>
        this.setState({ backed: true, metaMaskLoading: false })
      )
      .catch(e => this.setState({ metaMaskLoading: false }));
  };

  render() {
    const { requestNetwork, requestId } = this.props;
    const { metaMaskLoading } = this.state;

    if (metaMaskLoading) {
      return (
        <DisabledButton>
          <MetaMaskLoader />
        </DisabledButton>
      );
    }

    if (!requestId) {
      return (
        <DisabledButton>
          <Loader size={25} />
        </DisabledButton>
      );
    }

    if (!requestNetwork.currentAccount) {
      return (
        <DisabledButton>
          Login with Metamask to Back this Project
        </DisabledButton>
      );
    }

    return (
      <Fragment>
        <Formik
          validate={validate}
          onSubmit={values =>
            this.handleSubmit(values, requestId, requestNetwork)
          }
          initialValues={initialValues}
          render={props => (
            <BackerForm {...props}>
              <Button
                variant="raised"
                color="primary"
                type="submit"
                fullWidth
                disabled={!requestNetwork.isReady || !props.isValid}
              >
                {this.state.backed
                  ? 'YOU JUST BACKED THIS PROJECT!'
                  : 'BACK THIS PROJECT'}
              </Button>
            </BackerForm>
          )}
        />
      </Fragment>
    );
  }
}
