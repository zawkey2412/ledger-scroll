import { Field, ErrorMessage } from "formik";

interface FormFieldProps {
  name: string;
  type?: string;
  placeholder: string;
  className?: string;
  as?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type = "text",
  placeholder,
  className,
  as,
}) => {
  return (
    <div className="my-2 w-full">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        as={as}
        className={`p-3 rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          className || ""
        }`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
};

export default FormField;
