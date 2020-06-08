import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  const mockGeolocation = {
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  };

  beforeAll(() => {
    // @ts-ignore #2540
    global.navigator.geolocation = mockGeolocation;
  });

  const build = () => {
    const wrapper = render(<App />);
    return {
      wrapper,
    };
  };

  it('renders app component', () => {
    const { wrapper } = build();
    expect(wrapper).toMatchSnapshot();
  });
});
