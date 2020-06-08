import React from 'react';
import { render } from '@testing-library/react';
import Map from '../index';

describe('Map component', () => {
  const mockGeolocation = {
    watchPosition: jest
      .fn()
      .mockImplementation((successFunction, errorFunction, options) =>
        Promise.resolve(
          successFunction({
            coords: {
              latitude: -3.86164,
              longitude: -38.643355,
            },
          })
        )
      ),

    clearWatch: jest.fn(),
  };

  const build = () => {
    const wrapper = render(<Map />);
    return {
      wrapper,
    };
  };

  beforeAll(() => {
    // @ts-ignore #2540
    global.navigator.geolocation = mockGeolocation;
  });

  it('renders location info', () => {
    const { wrapper } = build();
    const { getByText } = wrapper;

    const locationInfo = getByText(/Quadra 14 \/ Lote 7/i);

    expect(locationInfo).toBeInTheDocument();
  });
});
