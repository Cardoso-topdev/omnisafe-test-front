import { Logout } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'redux/redux-slice';
import { IStoreValue } from 'types';
import './styles.scss';

/**
 * Header component.
 */
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(
    (state: IStoreValue) => state.omnisafeReducer.user.username
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onLogout = () => {
    dispatch(logout())
    navigate('/sign-in');
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar className="header-nav-toolbar">
          <Link to={'/'}>
            <Typography sx={{ color: 'white', fontWeight: '600' }}>
              Omnisafe Test
            </Typography>
          </Link>
          <Box
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            <Link to={'/event-type'}>
              <Typography sx={{ minWidth: 100 }}>Event Type</Typography>
            </Link>
            <Link to={'/events'}>
              <Typography sx={{ minWidth: 100 }}>Events</Typography>
            </Link>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> {userName}
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={onLogout}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
