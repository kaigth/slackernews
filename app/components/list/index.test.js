import React from 'react';
import List from './index';
import { BrowserRouter as Router } from "react-router-dom";
import renderer from 'react-test-renderer';

it('renders the List correctly', () => {
  const testItems = [
    {
      by: 'SuperNeatGuy',
      descendants: 0,
      id: 1,
      score: 1,
      time: 1518982182,
      title: 'This is bat country!',
      type: 'story',
      url: 'http://skyward.io'
    },
    {
      by: 'MrFancyPants',
      descendants: 0,
      id: 2,
      score: 10,
      time: 1518982186,
      title: 'Wax on, wax off.',
      type: 'story',
      url: 'http://skyward.io'
    }
  ];

  const tree = renderer
    .create(<Router><List items={ testItems } /></Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});