import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Testing page", async () => {
  render(<App />);
  const validation = screen.getByText(/Projeto Star Wars - Trybe/i);
  const inputName = screen.getByPlaceholderText(/Filter By Name/i);
  const inputColunm = screen.getByTestId("column-filter");
  const inputComparison = screen.getByTestId("comparison-filter");
  const inputValue = screen.getByPlaceholderText(/value/i);
  const AddButton = screen.getByTestId("button-filter");
  const removeAllButton = screen.getByTestId("button-remove-filters");

  expect(validation).toBeInTheDocument();
  expect(inputName).toBeInTheDocument();
  expect(inputColunm).toBeInTheDocument();
  expect(inputComparison).toBeInTheDocument();
  expect(inputValue).toBeInTheDocument();
  expect(AddButton).toBeInTheDocument();
  expect(removeAllButton).toBeInTheDocument();
  const planet = await screen.findByText(/Tatooine/i, {}, { timeout: 15000 });
  expect(planet).toBeInTheDocument();

  userEvent.type(inputName, "oo");
  expect(inputName.value).toBe("oo");
  userEvent.clear(inputName);

  userEvent.clear(inputValue);

  userEvent.selectOptions(inputColunm, 'surface_water');
  userEvent.selectOptions(inputComparison, 'maior que');
  userEvent.type(inputValue, '10');
  expect(inputColunm.value).toBe("surface_water");
  expect(inputComparison.value).toBe("maior que");
  expect(inputValue.value).toBe("10");

  userEvent.click(AddButton);
  const filters = screen.getByTestId('filter');
  expect(filters).toBeInTheDocument()
  
  userEvent.selectOptions(inputColunm, 'rotation_period');
  userEvent.selectOptions(inputComparison, 'menor que');
  userEvent.clear(inputValue);
  userEvent.type(inputValue, '25');
  userEvent.click(AddButton);
  expect(inputComparison.value).toBe("menor que");

  userEvent.selectOptions(inputColunm, 'orbital_period');
  userEvent.selectOptions(inputComparison, 'igual a');
  userEvent.clear(inputValue);
  userEvent.type(inputValue, '364');
  userEvent.click(AddButton);
  
  expect(screen.getByText('Alderaan')).toBeInTheDocument();

  const filtersBeforeClick = screen.getAllByRole('button', {
    name: /remove/i
  })
  expect(filtersBeforeClick).toHaveLength(3);
  userEvent.click(filtersBeforeClick[0]);

  const filtersAfterClick = screen.getAllByRole('button', {
    name: /remove/i
  })
  expect(filtersAfterClick).toHaveLength(2);


  userEvent.click(removeAllButton)


});
