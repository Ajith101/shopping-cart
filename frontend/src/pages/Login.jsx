import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useFormik } from "formik";
import { loginSchema } from "../schema";
import InputField from "../components/inputForm/InputField";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { loginUser, user } = useAppStore();
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        loginUser(values, navigate);
      },
    });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Layout>
      <section className="w-full h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[550px] shadow-md p-8 sm:p-10 rounded-2xl bg-white"
        >
          <h2 className="font-extrabold text-[26px] tracking-widest">Login</h2>

          <p onClick={() => navigate("/register")} className="pt-6">
            Don't have an account?
            <span className="text-blue-500 underline cursor-pointer">
              Get Started
            </span>
          </p>

          <InputField
            handleChange={handleChange}
            name={"email"}
            title={"Email "}
            type={"email"}
            value={values.email}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
          />
          <InputField
            handleChange={handleChange}
            name={"password"}
            title={"Password "}
            type={"password"}
            value={values.password}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
          />
          <h2 className="text-blue-500 py-3 underline text-right cursor-pointer">
            forgot-password
          </h2>
          <button
            type="submit"
            className="text-[18px] hover:bg-black hover:text-white my-4 w-full py-4 rounded-[8px] border-[1px] border-black font-semibold"
          >
            Login
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
