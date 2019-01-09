import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Hangman from './Hangman';
import img0 from './0.jpg';
import img1 from './1.jpg';

// smoke test
it('renders without crashing', function() {
  shallow(<Hangman />);
});

// snapshot test
it('matches snapshot', function() {
  let wrapper = shallow(<Hangman />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('simulates img changes after incorrect guess', function() {
  let wrapper = shallow(<Hangman />);
  const incorrectButton = wrapper.find("button[value='b']");
  incorrectButton.simulate('click', { target: { value: 'b' } });
  expect(wrapper.state().nWrong).toBe(1);
  // This is how to target the "img" element
  const img = wrapper.find('img');
  expect(img.props().src).toBe('1.jpg');
});

it('simulates img does not change after correct guess', function() {
  let wrapper = shallow(<Hangman />);
  const correctButton = wrapper.find("button[value='a']");
  correctButton.simulate('click', { target: { value: 'a' } });
  expect(wrapper.state().nWrong).toBe(0);
  // This is how to target the "img" element
  const img = wrapper.find('img');
  expect(img.props().src).toBe('0.jpg');
});
