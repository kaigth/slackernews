import React from 'react';
import Loader from './index';
import renderer from 'react-test-renderer';

it('renders the Loader correctly', () => {
  const tree = renderer
    .create(<Loader />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});