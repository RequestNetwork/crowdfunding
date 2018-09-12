import * as Yup from 'yup';
const Web3 = require('web3');
const web3 = new Web3();

const MAX_SIZE = 50;
const MIN_AMOUNT = 0.0001;

export const ProjectSchema = Yup.object().shape({
  paymentAddress: Yup.string()
    .test(
      'is-ethAddress',
      'This is an invalid ETH address',
      web3.utils.isAddress
    )
    .required('Required'),
  title: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(MAX_SIZE, `Must be longer than ${MAX_SIZE} characters`)
    .required('Required'),
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
