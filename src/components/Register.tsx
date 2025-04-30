import { Formik, FastField, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { registerSchema } from "../schemas/userRegistrationSchema";
import { customFetch } from "../utils/api";
import { POST } from "../constants/api";
import { IUser } from "../interfaces/user";

const Register = () => {
  const navigate = useNavigate();

  const registerUser = async (values: IUser) => {
    try {
      const result = await customFetch({
        path: "/users/register",
        method: POST,
        data: values,
      });
      if (result) toast.success("Registered Successfully");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error", error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  max-h-[400px] overflow-auto">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <Formik
          initialValues={{
            name: "",
            mobile: "",
            email: "",
            password: "",
            // role: "employee",
          }}
          validationSchema={registerSchema}
          onSubmit={(values: IUser) => {
            registerUser(values);
          }}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name<span className="text-red-500">*</span>
              </label>

              <FastField
                name="name"
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="name"
                component={"div"}
                className="text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <FastField
                name="mobile"
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="mobile"
                component={"div"}
                className="text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="sapId"
                className="block text-sm font-medium text-gray-700"
              >
                SAP ID<span className="text-red-500">*</span>
              </label>
              <FastField
                name="sapId"
                type="string"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="sapId"
                component={"div"}
                className="text-sm text-red-600"
              />
            </div>
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
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <p>
              Already have an account? Click here to{" "}
              <a href="/" className="text-blue-500">
                Login
              </a>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
