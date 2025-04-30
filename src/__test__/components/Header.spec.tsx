import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import Header from "../../components/Header";
import { clearLoginUser } from "../../redux/actions/userAction";

const mockStore = configureStore([]);

describe("Given Header component", () => {
  it("renders Header without user", () => {
    const store = mockStore({ user: { data: {} } });
    const { queryByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(queryByText("Task manager")).toBeNull();
    expect(queryByText("Logout")).toBeNull();
  });

  it("opens logout dialog", () => {
    const store = mockStore({ user: { data: { email: "test@example.com" } } });
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    userEvent.click(getByText("Logout"));
    expect(getByRole("dialog")).toBeInTheDocument();
  });

  test("closes logout dialog", () => {
    const store = mockStore({ user: { data: { email: "test@example.com" } } });
    const { getByText, queryByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    userEvent.click(getByText("Logout"));
    userEvent.click(getByText("Close"));
    expect(queryByRole("dialog")).toBeNull();
  });

  test("logs out user and redirects to home page", () => {
    const store = mockStore({ user: { data: { email: "test@example.com" } } });
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(getByText("Logout"));
    userEvent.click(getByText("Logout"));

    // Check if the user is logged out
    const actions = store.getActions();
    expect(actions).toContainEqual(clearLoginUser());

    // Check if redirected to home page
    expect(window.location.pathname).toBe("/");
  });
});
