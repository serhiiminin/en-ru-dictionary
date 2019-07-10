import React from 'react';
import { shallow } from 'enzyme';
import Component from '.';

describe('Page not found', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Component />);
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
