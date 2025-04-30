import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router";

import NotFound from "../../components/NotFound";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Given NoFound Page", () => {
  describe("when visit any random page", () => {
    it("should render", () => {
      render(<NotFound />);
      const txt = screen.getByText("Page not found");
      expect(txt).toBeInTheDocument();
    });

    it('should navigate to path "/" route', () => {
      const navigate = useNavigate();
      render(<NotFound />);
      const button = screen.getByRole("button", { name: /go home/i });
      button.click();
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
