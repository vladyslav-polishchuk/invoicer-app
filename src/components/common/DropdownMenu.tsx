import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import { useState, type ReactNode } from 'react';

interface DropdownMenuProps {
  children: ReactNode;
}

export default function DropdownMenu({ children }: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClick={handleClose}>
        {children}
      </Menu>
    </>
  );
}
