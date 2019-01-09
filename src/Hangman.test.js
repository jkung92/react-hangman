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
  wrapper.setState({ answer: 'apple' });
  const incorrectButton = wrapper.find("button[value='b']");
  incorrectButton.simulate('click', { target: { value: 'b' } });
  expect(wrapper.state().nWrong).toBe(1);
  expect(wrapper.state().guessed.has('b')).toBe(true);
  // This is how to target the "img" element
  const img = wrapper.find('img');
  expect(img.props().src).toBe('1.jpg');
});

it('simulates img does not change after correct guess', function() {
  let wrapper = shallow(<Hangman />);
  wrapper.setState({ answer: 'apple' });
  const correctButton = wrapper.find("button[value='a']");
  // console.log(`This is t dhe correct btn`, correctButton.debug());
  correctButton.simulate('click', { target: { value: 'a' } });
  expect(wrapper.state().nWrong).toBe(0);
  expect(wrapper.state().guessed.has('a')).toBe(true);
  // This is how to target the "img" element
  const img = wrapper.find('img');
  expect(img.props().src).toBe('0.jpg');
});

it('simulates ends game after maxGuesses has been exceeded', function() {
  let wrapper = shallow(<Hangman />);
  // Set nWrong to 5
  wrapper.setState({ answer: 'apple' });
  wrapper.setState({ nWrong: 5 });
  const incorrectButton = wrapper.find("button[value='d']");
  incorrectButton.simulate('click', { target: { value: 'd' } });
  // check if nWrong === maxGuesses expect img src = img 6.jpg
  const img = wrapper.find('img');
  expect(img.props().src).toBe('6.jpg');
  const msg = wrapper.find('#win-or-lose');
  expect(msg.html()).toBe('<p id="win-or-lose">You lose! Word was: apple</p>');
});

it('resets game after reset button has been pressed', function() {
  let wrapper = shallow(<Hangman />);
  const incorrectButton = wrapper.find('#reset-btn');
  incorrectButton.simulate('click');
  expect(wrapper.state().nWrong).toBe(0);
  expect(wrapper.state().guessed.size).toBe(0);
});
