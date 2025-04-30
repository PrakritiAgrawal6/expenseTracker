import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../../components/Login";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { userLogin } from "../../redux/actions/userAction";
import { IStore } from "../../interfaces/store";

jest.mock("react-toastify/dist/ReactToastify.css");

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/actions/userAction", () => ({
  userLogin: jest.fn(),
}));

const mockStoreData: IStore = {
  user: {
    data: {
      name: "",
      email: "",
      mobile: "",
      role: "user"
    },
    isLoading: false,
    error: "",
  },
};

const mockStore = configureMockStore();
const store = mockStore(mockStoreData);

describe("when login renders", () => {
  it("should form field available", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it("should validate login submit when login submit", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("loginBtn"));

    await waitFor(() => {
      expect(screen.getByText("Email is Required")).toBeInTheDocument();
      expect(screen.getByText("Password is Required")).toBeInTheDocument();
    });
  });

  it("should validate email", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "abcd" },
    });
    fireEvent.submit(screen.getByTestId("loginBtn"));

    await waitFor(() =>
      expect(screen.getByText("Invalid email")).toBeInTheDocument()
    );
  });

  it("should validate email", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const formData = {
      email: "abc@gmail.com",
      password: "123456",
    };
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: formData.email },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: formData.password },
    });

    fireEvent.submit(screen.getByTestId("loginBtn"));

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledWith(formData);
    });
  });
});
