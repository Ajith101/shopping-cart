import React from "react";

const InputField = ({
  title,
  name,
  value,
  type,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  return (
    <div className="w-full pt-3 flex flex-col">
      <label htmlFor={name}>
        {title}
        {"*"}
      </label>
      {errors[name] && touched[name] ? (
        <span className="text-red-500">{errors[name]}</span>
      ) : null}
      <input
        className="w-full my-2 outline-none rounded-[8px] bg-gray-100 p-4"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={title}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default InputField;
