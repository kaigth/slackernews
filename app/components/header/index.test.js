import React from 'react';
import Header from './index';
import renderer from 'react-test-renderer';

it('renders the Header correctly', () => {
  const store = {};
  const tree = renderer
    .create(<Header />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});