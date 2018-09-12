import { transformAmountToWei } from '../index';

test('Should update amount property', () => {
  const values = {
    amount: '0.0002',
    title: 'yooo',
  };
  const updatedValues = transformAmountToWei(values);
  expect(updatedValues.amount).toBe(
    (values.amount * Math.pow(10, 18)).toString()
  );
});
