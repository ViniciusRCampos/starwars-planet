import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Testing page", async () => {
  render(<App />);
  const validation = screen.getByText(/Projeto Star Wars - Trybe/i);
  const sortButton = screen.getByTestId("column-sort-button");
  const descRadio = screen.getByTestId("column-sort-input-desc");
  const ascRadio = screen.getByTestId("column-sort-input-asc");
  const colunmSort = screen.getByTestId("column-sort");

  expect(validation).toBeInTheDocument();
  expect(sortButton).toBeInTheDocument();
  expect(descRadio).toBeInTheDocument();
  expect(ascRadio).toBeInTheDocument();
  expect(colunmSort).toBeInTheDocument();
  const planet = await screen.findByText(/Tatooine/i, {}, { timeout: 15000 });
  expect(planet).toBeInTheDocument();

  userEvent.selectOptions(colunmSort, "orbital_period");
  userEvent.click(ascRadio);
  userEvent.click(sortButton);

  const planetsAsc = screen.getAllByTestId("planet-name");

  expect(planetsAsc[0]).toHaveTextContent("Tatooine");

  userEvent.selectOptions(colunmSort, "orbital_period");
  userEvent.click(descRadio);
  userEvent.click(sortButton);

  const planetsDesc = screen.getAllByTestId("planet-name");

  expect(planetsDesc[0]).toHaveTextContent("Bespin");
});
