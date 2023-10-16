import * as YUP from "yup";

export const loginSchema = YUP.object({
  email: YUP.string().email("invalid mail").required("enter email"),
  password: YUP.string().required("enter password"),
});

export const registerSchema = YUP.object({
  name: YUP.string().min(3, "minimum 3 character").required("enter name"),
  email: YUP.string().email("invalid mail").required("enter email"),
  password: YUP.string().required("enter password"),
  confirmPassword: YUP.string()
    .oneOf([YUP.ref("password"), null], "password must be match")
    .required("enter password"),
});
