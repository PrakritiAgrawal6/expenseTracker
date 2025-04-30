import { useEffect } from "react";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { loginSchema } from "../schemas/userLoginSchema";
import { IUserLogin } from "../interfaces/user";
import { userLogin } from "../redux/actions/userAction";
import { IStore } from "../interfaces/store";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { email },
  } = useSelector((state: IStore) => state.user);
  const validateUserLogin = (values: IUserLogin) => {
    dispatch(userLogin(values));
  };

  useEffect(() => {
    if (email) {
      navigate("/transactions");
    }
  }, [email, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            validateUserLogin(values);
          }}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <FastField
                name="email"
                type="email"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <FastField
                name="password"
                type="password"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-sm text-red-600"
              />
              <div>
                <button></button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            {/* <p>
              Don't have an account? Click here to{" "}
              <a href="/register" className="text-blue-500">
                Register
              </a>
            </p> */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
