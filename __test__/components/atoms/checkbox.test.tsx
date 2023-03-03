import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Checkbox } from "@/components/atoms";

describe("Test `Checkbox` component", () => {
  test("should render checkbox component", () => {
    render(<Checkbox data-testid="test-checkbox" name="checkbox" />);
    const checkbox = screen.getByTestId("test-checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeEnabled();
  });

  test("should be checked when the component is clicked", () => {
    render(<Checkbox data-testid="test-checkbox" name="checkbox" />);
    const checkbox = screen.getByTestId("test-checkbox");

    expect(checkbox).toBeInTheDocument(); // checkbox must be rendered
    expect(checkbox).toBeEnabled();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
