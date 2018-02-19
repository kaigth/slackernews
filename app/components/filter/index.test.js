import React from 'react';
import Filter from './index';
import renderer from 'react-test-renderer';

it('renders the Filter correctly', () => {
  const tree = renderer
    .create(<Filter />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});