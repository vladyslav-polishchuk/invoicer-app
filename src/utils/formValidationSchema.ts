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

export const signupValidationSchema = object({
  name,
  email,
  password,
  confirmPassword,
});

export const companyDetailsValidationSchema = object({
  name: string().required().min(3).max(16),
  address: string().required(),
  vatNumber: string().required(),
  regNumber: string().required(),
  iban: string(),
  swift: string(),
});

export const clientFormValidationSchema = object({
  email,
  name: name.min(3),
  companyDetails: object({
    name: string().required(),
    address: string().required(),
    vatNumber: string().required(),
    regNumber: string().required(),
    iban: string().required(),
    swift: string().required(),
  }),
});
