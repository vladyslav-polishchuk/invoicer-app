import Image from '../../../images/background.jpeg';
import { Box } from '@mui/material';

export default function BackgroundImage() {
  return (
    <Box
      sx={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        backgroundImage: `url(${Image.src})`,
        backgroundColor: '#efe0cb',
        filter: 'blur(4px)',
        displayPrint: 'none',
        zIndex: 0,
      }}
    />
  );
}
