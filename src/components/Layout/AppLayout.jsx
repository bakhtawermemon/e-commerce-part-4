import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ProdectsCard from '../prodect-card/ProdectsCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Badge, Menu, MenuItem } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import CartList from '../cart-list/CartList';
import { useSelector } from 'react-redux';
import InventoryIcon from '@mui/icons-material/Inventory';

interface Props {
  window?: () => Window;
}


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function AppLayout(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openCartList, setOpenCartList] = React.useState(false);
  const {cartItems} = useSelector ((state)=> state.cart)
  // console.log(count, 'count');
  
  const toggleCartLiist = (newOpen) => () => {
      setOpenCartList(newOpen);
  }
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        E-Store
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            E-Store
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
            <Badge badgeContent={cartItems?.length} color="secondary">
              <InventoryIcon  sx={{cursor:'pointer'}} className='text-white' onClick={toggleCartLiist(true)} />
            </Badge>
      
      <Button className='text-white'
        id="basic-button"
        aria-controls={true ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={true ? 'true' : undefined}
        onClick={handleClick}
      >
       <AccountCircleIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}><Link className='text-decoration-none' to='/sign-in'>My account</Link></MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet/>
      </Box>
      
      <CartList openCartList={openCartList} toggleCartLiist={toggleCartLiist} />
    </Box>
  );
}

export default AppLayout;
