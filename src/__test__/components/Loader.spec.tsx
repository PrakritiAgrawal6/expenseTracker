import { render } from "@testing-library/react";

import Loader from "../../components/Loader";

describe("Given Loader component", () => {
  test("renders Loader component", () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId("backdrop")).toBeInTheDocument();
    expect(getByTestId("circular-progress")).toBeInTheDocument();
  });

  test("Backdrop has correct properties", () => {
    const { getByTestId } = render(<Loader />);
    const backdrop = getByTestId("backdrop");

    expect(backdrop).toHaveStyle("color: #fff");
    expect(backdrop).toHaveStyle("z-index: 100");
    expect(backdrop).toHaveAttribute("open", "true");
  });

  test("CircularProgress has correct properties", () => {
    const { getByTestId } = render(<Loader />);
    const circularProgress = getByTestId("circular-progress");

    expect(circularProgress).toHaveAttribute("color", "inherit");
  });

  test('Loader is visible', () => {
    const { getByTestId } = render(<Loader />);
    const backdrop = getByTestId('backdrop');
  
    expect(backdrop).toBeVisible();
  });
});
