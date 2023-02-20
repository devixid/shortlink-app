import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "@/components/atoms";

describe("Test `Button` component", () => {
  const renderButton = () =>
    render(
      <Button type="button" data-testid="test-button">
        Test Button
      </Button>
    );

  test("should render the button", () => {
    renderButton();
    const getButtonByText = screen.getByText(/Test Button/i);
    const getButtonByTestId = screen.getByTestId("test-button");

    expect(getButtonByText).toBeInTheDocument();
    expect(getButtonByText).toBeEnabled();
    expect(getButtonByText).toBeVisible();

    expect(getButtonByTestId).toBeInTheDocument();
    expect(getButtonByTestId).toBeEnabled();
    expect(getButtonByTestId).toBeVisible();
  });

  test("should be disabled when the button is clicked", () => {
    renderButton();
    const button = screen.getByTestId("test-button");

    expect(button).toBeInTheDocument(); // button must be rendered
    expect(button).toBeEnabled();
    expect(button).toBeVisible();

    button.addEventListener("click", () => button.setAttribute("disabled", "")); // disabled the button when it is clicked

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });
});
