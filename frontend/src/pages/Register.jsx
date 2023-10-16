import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import { registerSchema } from "../schema";
import InputField from "../components/inputForm/InputField";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const { registerUser, user } = useAppStore();
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        registerUser(values, navigate);
      },
    });

  const formValues = [
    { name: "name", title: "Name ", type: "text", value: values.name },
    { name: "email", title: "Email ", type: "email", value: values.email },
    {
      name: "password",
      title: "Password ",
      type: "password",
      value: values.password,
    },
    {
      name: "confirmPassword",
      title: "Confirm password ",
      type: "password",
      value: values.confirmPassword,
    },
  ];

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Layout>
      <section className="w-full h-full py-5 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[550px] shadow-md p-8 sm:p-10 rounded-2xl bg-white"
        >
          <h2 className="font-extrabold text-[26px] tracking-widest">
            Get Started
          </h2>

          <p className="pt-6">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 underline cursor-pointer"
            >
              Login
            </span>
          </p>
          {formValues.map((item, id) => (
            <InputField
              key={id}
              handleChange={handleChange}
              name={item.name}
              title={item.title}
              type={item.type}
              value={item.value}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
            />
          ))}
          <button
            type="submit"
            className="text-[18px] hover:bg-black hover:text-white my-4 w-full py-4 rounded-[8px] border-[1px] border-black font-semibold"
          >
            Register
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
