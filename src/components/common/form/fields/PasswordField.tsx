import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import TextField, { type TextFieldProps } from './TextField';

export default function PasswordField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordButton = (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowPassword((show) => !show)}
        edge="end"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      autoComplete="current-password"
      type={showPassword ? 'text' : 'password'}
      label="Password"
      InputProps={{ endAdornment: showPasswordButton }}
      {...props}
    />
  );
}
