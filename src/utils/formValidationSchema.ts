import { object, string, ref } from 'yup';

const passwordLengthError =
  'Password length must be between 5 and 16 characters';
const name = string().required('Name is required');
const email = string()
  .email('Email must be a valid email address')
  .required('Email is required');
const password = string()
  .required('Password is required')
  .min(5, passwordLengthError)
  .max(16, passwordLengthError);
const confirmPassword = password.oneOf(
  [ref('password'), null],
  'Passwords must match'
);

export const loginValidationSchema = object({ email, password });

export const registerValidationSchema = object({
  name,
  email,
  password,
  confirmPassword,
});

export const companyDetailsValidationSchema = object({
  companyName: string().required().min(3).max(16),
  companyAddress: string().required(),
  vat: string().required(),
  registrationNumber: string().required(),
  iban: string(),
  swift: string(),
});
