import React from 'react';
import Splash from './index';
import renderer from 'react-test-renderer';

it('renders the Loader correctly', () => {
  const tree = renderer
    .create(<Splash />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});