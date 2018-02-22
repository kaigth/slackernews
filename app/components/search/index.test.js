import React from 'react';
import Search from './index';
import renderer from 'react-test-renderer';

it('renders the Search correctly', () => {
  const tree = renderer
    .create(<Search />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});