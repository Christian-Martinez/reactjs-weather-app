import React from 'react';
import Weather from './Weather';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// TDD
test('Weather render sunny', async () => {
  // AAA Arrange Act Assert
  /* findByRole extrae un solo rol */
  const { findByRole } = render(<Weather temperature={10} state='clouds' />);

  const temp = await findByRole('heading');

  expect(temp).toHaveTextContent('10');
});
