import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import Button from '@material-ui/core/Button';
import { Flex } from '../../../components/Flex';
import { InputCurrency } from '../../../components/Input';
import { Loader } from '../../../components/Loader';
import { MetaMaskLoader } from '../../../components/Loader';
import { DisabledButton } from './PublishSection';
import styled from 'styled-components';
import * as Yup from 'yup';

const StyledInputCurrency = styled(InputCurrency)`
  && {
    margin-bottom: 1rem;
  }
`;

const MAX_SIZE = 50;
const MIN_AMOUNT = 0.0001;

const BackerSchema = Yup.object().shape({
  amount: Yup.number('Must be a number')
    .test('is-zero', 'Needs to be more than 0', value => !(value === 0))
    .test(
      'valid-to-wei',
      `Amount needs to be higher than ${MIN_AMOUNT} ETH`,
      value => value > MIN_AMOUNT
    )
    .positive('Needs to be a positive number')
    .required('Required'),
});

const initialValues = { amount: '0' };

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

interface IProps {
  isReady: boolean;
  disabled: boolean;
  metaMaskLoading: boolean;
  metaMaskDisabled: boolean;
  backed: boolean;
  pay(amount:number);
}
export default class BackerSection extends React.Component<IProps> {
  public render() {
    const {
      isReady,
      disabled,
      metaMaskLoading,
      pay,
      metaMaskDisabled,
      backed,
    } = this.props;

    if (metaMaskLoading) {
      return (
        <DisabledButton>
          <MetaMaskLoader />
        </DisabledButton>
      );
    }

    if (disabled) {
      return (
        <DisabledButton>
          <Loader size={25} />
        </DisabledButton>
      );
    }

    if (metaMaskDisabled) {
      return (
        <DisabledButton>
          Login with Metamask to Back this Project
        </DisabledButton>
      );
    }

    console.log(isReady);
    return (
      <React.Fragment>
        <Formik
          validationSchema={BackerSchema}
          onSubmit={values => pay(values.amount)}
          initialValues={initialValues}
          render={props => (
            <BackerForm {...props}>
              {console.log(props.isValid)}
              <Button
                variant="raised"
                color="primary"
                type="submit"
                fullWidth={true}
                disabled={!isReady || !props.isValid}
              >
                {backed ? 'YOU JUST BACKED THIS PROJECT!' : 'BACK THIS PROJECT'}
              </Button>
            </BackerForm>
          )}
        />
      </React.Fragment>
    );
  }
}
