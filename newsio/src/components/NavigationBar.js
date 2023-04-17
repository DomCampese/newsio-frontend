import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from 'api/authentication';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavigationBar = () => {
  const pageToRoute = {
    'Search': '/search',
    'My Stories': '/my-stories',
  }

  const settings = ['Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }
    navigate('login');
  }

  const handleMenuClick = (page) => {
    handleCloseNavMenu();
    navigate(pageToRoute[page])
  };

  return (
    <AppBar position='static' sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/search"
            sx={styles.logoContainerLeft}
          >
            <Box sx={styles.iconAndTitleContainer}>
              <NewspaperIcon sx={styles.logo}/>
              <Typography sx={{ fontSize: 32 }}>News.io</Typography>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={styles.menu}
            >
              {Object.keys(pageToRoute).map((page) => (
                <Button
                  key={page}
                  onClick={() => handleMenuClick(page)}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={styles.logoContainerCenter}
          >
            <NewspaperIcon sx={styles.logo}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(pageToRoute).map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isLoggedIn() &&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon fontSize='large' sx={{ color: 'white' }}></AccountCircleIcon>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    logout();
                    handleCloseUserMenu();
                  }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
       </Container>
    </AppBar>
  )
}

const styles = {
  appBar: {
    backgroundColor: 'light blue',
  },
  logoContainerLeft: {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
  logoContainerCenter: {
    mr: 2,
    display: {
      xs: 'flex',
      md: 'none'
    },
    flexGrow: 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none'
  },
  logo: {
    mr: 1,
    height: '50px',
    width: '50px'
  },
  menu: {
    display: {
      xs: 'block',
      md: 'none'
    }
  },
  iconAndTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'center'
  }
}

export default NavigationBar