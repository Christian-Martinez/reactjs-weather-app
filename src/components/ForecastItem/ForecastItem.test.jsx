import React from 'react';
import { render } from '@testing-library/react';
import ForecastItem from './ForecastItem';

test('ForecastItem render', async() => {
	// Tarea, se deben renderizar los diferentes textos
	const { findByText } = render(<ForecastItem hour={10} state='clear' temperature={23} weekDay='Lunes' />);

	const hour = await findByText(/10/);
  const temperature = await findByText(/23/);
	// const state = await findByText('clear');
  const weekDay = await findByText('Lunes');

	expect(hour).toHaveTextContent('10');
  expect(temperature).toHaveTextContent('23 °');
  // expect(state).toHaveTextContent('clear');
  expect(weekDay).toHaveTextContent('Lunes');
})
