import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "@/components/atoms";

describe("Test `Button` component", () => {
  test("should render the button", () => {
    render(
      <Button type="button" data-testid="test-button">
        Test Button
      </Button>
    );

    const getButtonByText = screen.getByText(/Test Button/i);
    const getButtonByTestId = screen.getByTestId("test-button");

    expect(getButtonByText).toBeInTheDocument();
    expect(getButtonByText).toHaveTextContent(/Test Button/);
    expect(getButtonByText).toBeEnabled();
    expect(getButtonByText).toBeVisible();

    expect(getButtonByTestId).toBeInTheDocument();
    expect(getButtonByTestId).toHaveTextContent(/Test Button/);
    expect(getButtonByTestId).toBeEnabled();
    expect(getButtonByTestId).toBeVisible();
  });

  test("should be disabled when the button is clicked", () => {
    render(
      <Button type="button" data-testid="test-button">
        Test Button
      </Button>
    );

    const button = screen.getByTestId("test-button");

    button.addEventListener("click", () => button.setAttribute("disabled", "")); // disabled the button when it is clicked

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Test Button/);
    expect(button).toBeDisabled();
  });
});
