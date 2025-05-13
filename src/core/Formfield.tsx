import { Field, ErrorMessage } from 'formik';

//Interface for form field
interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  as?: string;
  step?: string;
  max?: string;
  options?: { value: string; label: string }[];
}

//Reusable component for forms using Formik
const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', as, options, ...props }) => (
  <div className="mb-2">
    <label className="block text-sm font-medium">
      {label}<span className="text-red-500">*</span>
    </label>
    <Field
      name={name}
      type={type}
      as={as}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      {...props}
    >
      {options && options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

export default FormField;
