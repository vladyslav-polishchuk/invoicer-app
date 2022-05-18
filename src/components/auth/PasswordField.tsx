import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import FormField, { type FormFieldProps } from '../common/FormField';

export default function PasswordField(props: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordButton = (
    <InputAdornment position="end">
      <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormField
      autoComplete="current-password"
      type={showPassword ? 'text' : 'password'}
      label="Password"
      InputProps={{ endAdornment: showPasswordButton }}
      {...props}
    />
  );
}
