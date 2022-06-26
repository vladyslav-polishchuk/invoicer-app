import MoreVert from '@mui/icons-material/MoreVert';
import { IconButton, Menu } from '@mui/material';
import { useState, type ReactNode } from 'react';

interface DropdownMenuProps {
  children: ReactNode;
  ariaLabel: string;
}

export default function DropdownMenu({
  children,
  ariaLabel,
}: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick} size="small" aria-label={ariaLabel}>
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClick={handleClose}>
        {children}
      </Menu>
    </>
  );
}
