import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CityList from './CityList'; // SUT

const cities = [
  { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR' },
  { city: 'Bogotá', country: 'Colombia', countryCode: 'CO' },
  { city: 'Madrid', country: 'España', countryCode: 'ES' },
  { city: 'Ciudad de México', country: 'México', countryCode: 'MX' },
];

test('CityList renders', async () => {
  // AAA Arrange Act Assert
  const { findAllByRole } = render(<CityList cities={cities} />);
  const items = await findAllByRole('listitem');
  expect(items).toHaveLength(4);
});
