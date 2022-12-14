import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import React from 'react';

/**
 * Header component. Displaying favorite recipe count on the top right nav bar
 */
const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Link href="/" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: '600' }}>
              Omnisafe Test
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
