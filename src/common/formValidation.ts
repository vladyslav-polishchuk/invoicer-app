import { object, string, ref } from 'yup';

const passwordLengthError =
  'Password length must be between 5 and 16 characters';

const password = string()
  .required('Password is required')
  .min(5, passwordLengthError)
  .max(16, passwordLengthError);
const confirmPassword = password.oneOf(
  [ref('password'), null],
  'Passwords must match'
);

export const fieldValidators = {
  email: string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  name: string().required('Name is required'),
};

export const loginValidationSchema = object({
  email: fieldValidators.email,
  password,
});

export const signupValidationSchema = object({
  name: fieldValidators.name,
  email: fieldValidators.email,
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
