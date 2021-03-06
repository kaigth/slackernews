import React from 'react';
import Filter from './index';
import renderer from 'react-test-renderer';

it('renders the Filter correctly', () => {
  const store = { listMode: 'list' };

  const tree = renderer
    .create(<Filter store={ store } />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});