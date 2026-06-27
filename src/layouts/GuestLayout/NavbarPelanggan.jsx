import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Popper,
  Paper,
  ClickAwayListener,
  Grow,
  MenuList,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Storefront,
  Search,
  ShoppingCart,
  Menu as MenuIcon,
  Category,
  Info,
  ExpandLess,
  ExpandMore,
  Close,
  KeyboardArrowDown,
  AssignmentReturn,
} from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';

// ============================
//  STYLED COMPONENTS
// ============================

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha('#0d47a1', 0.92),
  backdropFilter: 'blur(12px)',
  borderBottom: `1px solid ${alpha('#90caf9', 0.2)}`,
  boxShadow: '0 4px 30px rgba(13, 71, 161, 0.3)',
  transition: 'all 0.3s ease',
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha('#ffffff', 0.12),
  borderRadius: '12px',
  padding: '0 12px',
  border: `1px solid ${alpha('#ffffff', 0.15)}`,
  transition: 'all 0.3s ease',
  '&:focus-within': {
    borderColor: '#64b5f6',
    backgroundColor: alpha('#ffffff', 0.18),
    boxShadow: '0 0 0 3px rgba(100, 181, 246, 0.3)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: alpha('#ffffff', 0.85),
  fontWeight: 500,
  fontSize: '0.875rem',
  textTransform: 'none',
  padding: '6px 16px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha('#64b5f6', 0.2),
    color: '#ffffff',
  },
  '&.active': {
    color: '#ffffff',
    backgroundColor: alpha('#64b5f6', 0.25),
  },
}));

const AnimatedBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#ff9800',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.65rem',
    minWidth: 20,
    height: 20,
    borderRadius: '10px',
    animation: 'bounce 1s infinite',
  },
  '@keyframes bounce': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
  },
}));

// ============================
//  MAIN COMPONENT
// ============================

const NavbarPelanggan = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);

  // Data menu
  const menuItems = [
    { label: 'Kategori Produk', icon: <Category />, path: '/guest/kategori-produk', hasSubmenu: true },
    { label: 'Tentang', icon: <Info />, path: '/guest/tentang' },
    { label: 'Retur Borang', icon: <AssignmentReturn />, path: '/guest/retur-barang' },
  ];

  const categorySubmenu = [
    'Bahan Bangunan',
    'Cat & Pelapis',
    'Perkakas',
    'Elektrikal',
    'Plumbing',
    'Lainnya',
  ];

  // ============================
  //  EVENT HANDLERS
  // ============================

  const handleMobileToggle = () => setMobileOpen(!mobileOpen);
  const handleCategoriesToggle = () => setOpenCategories(!openCategories);
  const handleCategoryMenuOpen = (event) => setCategoryAnchorEl(event.currentTarget);
  const handleCategoryMenuClose = () => setCategoryAnchorEl(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // ============================
  //  MOBILE DRAWER CONTENT
  // ============================

  const renderMobileDrawer = () => (
    <Box
      sx={{
        width: 300,
        bgcolor: '#0d47a1',
        height: '100%',
        color: '#fff',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: '#64b5f6',
              borderRadius: '10px',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Storefront sx={{ fontSize: 24, color: '#fff' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>
              Materially
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#90caf9',
                fontWeight: 500,
                letterSpacing: '0.5px',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
              }}
            >
              Toko Bangunan
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleMobileToggle} sx={{ color: '#bbdefb' }}>
          <Close />
        </IconButton>
      </Box>

      <List sx={{ px: 1.5, py: 1 }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem
              button
              component={item.hasSubmenu ? 'div' : NavLink}
              to={item.path}
              onClick={() => {
                if (item.hasSubmenu) {
                  handleCategoriesToggle();
                } else {
                  setMobileOpen(false);
                }
              }}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                '&:hover': { bgcolor: 'rgba(100, 181, 246, 0.2)' },
                '&.active': { bgcolor: 'rgba(100, 181, 246, 0.3)' },
              }}
            >
              <ListItemIcon sx={{ color: '#bbdefb', minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ sx: { color: '#fff', fontWeight: 500 } }}
              />
              {item.hasSubmenu &&
                (openCategories ? (
                  <ExpandLess sx={{ color: '#bbdefb' }} />
                ) : (
                  <ExpandMore sx={{ color: '#bbdefb' }} />
                ))}
            </ListItem>

            {item.hasSubmenu && (
              <Collapse in={openCategories} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categorySubmenu.map((sub) => (
                    <ListItem
                      key={sub}
                      button
                      component={NavLink}
                      to={`/categories/${sub.toLowerCase().replace(/ /g, '-')}`}
                      onClick={() => setMobileOpen(false)}
                      sx={{
                        pl: 4,
                        borderRadius: '8px',
                        '&:hover': { bgcolor: 'rgba(100, 181, 246, 0.15)' },
                        '&.active': { bgcolor: 'rgba(100, 181, 246, 0.25)' },
                      }}
                    >
                      <ListItemText
                        primary={sub}
                        primaryTypographyProps={{ sx: { color: '#e3f2fd', fontSize: '0.9rem' } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />
    </Box>
  );

  // ============================
  //  MAIN RENDER
  // ============================

  return (
    <>
      <StyledAppBar position="sticky">
        <Container maxWidth="lg" disableGutters sx={{ px: 0 }}>
          <Toolbar disableGutters sx={{ height: 72, gap: { xs: 1, md: 3 } }}>
            {/* Logo */}
            <Box
              component={NavLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                flexShrink: 0,
                ml: 0,
                pl: 0,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  bgcolor: '#64b5f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  boxShadow: '0 4px 14px rgba(100, 181, 246, 0.5)',
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.05) rotate(-3deg)' },
                }}
              >
                <Storefront sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    color: '#fff',
                    letterSpacing: '-0.5px',
                    lineHeight: 1.2,
                  }}
                >
                  Materially
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#90caf9',
                    fontSize: '0.65rem',
                    letterSpacing: '0.5px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    display: 'inline-block',
                  }}
                >
                  Toko Bangunan
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
                {menuItems.map((item) => {
                  if (item.hasSubmenu) {
                    return (
                      <Box key={item.label}>
                        <Button
                          onClick={handleCategoryMenuOpen}
                          endIcon={<KeyboardArrowDown />}
                          sx={{
                            color: alpha('#fff', 0.85),
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            textTransform: 'none',
                            px: 2,
                            py: 1,
                            borderRadius: '8px',
                            '&:hover': {
                              backgroundColor: alpha('#64b5f6', 0.2),
                              color: '#fff',
                            },
                          }}
                        >
                          {item.label}
                        </Button>
                        <Popper
                          open={Boolean(categoryAnchorEl)}
                          anchorEl={categoryAnchorEl}
                          transition
                          disablePortal
                          placement="bottom-start"
                        >
                          {({ TransitionProps }) => (
                            <Grow {...TransitionProps} timeout={200}>
                              <Paper
                                sx={{
                                  mt: 1,
                                  bgcolor: '#0d47a1',
                                  color: '#fff',
                                  borderRadius: '12px',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  minWidth: 200,
                                  boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                                  overflow: 'hidden',
                                }}
                              >
                                <ClickAwayListener onClickAway={handleCategoryMenuClose}>
                                  <MenuList>
                                    {categorySubmenu.map((sub) => (
                                      <MenuItem
                                        key={sub}
                                        component={NavLink}
                                        to={`/categories/${sub.toLowerCase().replace(/ /g, '-')}`}
                                        onClick={handleCategoryMenuClose}
                                        sx={{
                                          '&:hover': { bgcolor: 'rgba(100, 181, 246, 0.2)' },
                                          '&.active': { bgcolor: 'rgba(100, 181, 246, 0.3)' },
                                        }}
                                      >
                                        {sub}
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </Box>
                    );
                  }
                  return (
                    <NavButton
                      key={item.label}
                      component={NavLink}
                      to={item.path}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      {item.label}
                    </NavButton>
                  );
                })}
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* Search Bar */}
            {!isMobile && (
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
              >
                <SearchWrapper>
                  <TextField
                    placeholder="Cari produk..."
                    variant="standard"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="small"
                    sx={{
                      '& .MuiInput-root': {
                        color: '#fff',
                        '&:before, &:after': { display: 'none' },
                      },
                      '& .MuiInput-input': {
                        py: 1.2,
                        px: 0.5,
                        width: 180,
                        fontSize: '0.85rem',
                      },
                      '& .MuiInput-input::placeholder': {
                        color: alpha('#fff', 0.6),
                        opacity: 1,
                      },
                    }}
                    InputProps={{
                      endAdornment: searchQuery && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setSearchQuery('')}
                            sx={{ color: alpha('#fff', 0.6) }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <IconButton type="submit" size="small" sx={{ color: alpha('#fff', 0.7) }}>
                    <Search sx={{ fontSize: 20 }} />
                  </IconButton>
                </SearchWrapper>
              </Box>
            )}

            {/* Action Buttons – hanya keranjang */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                component={NavLink}
                to="/cart"
                sx={{
                  color: alpha('#fff', 0.85),
                  '&:hover': { bgcolor: 'rgba(100, 181, 246, 0.2)' },
                  borderRadius: '10px',
                }}
              >
                <AnimatedBadge badgeContent={3} max={99}>
                  <ShoppingCart sx={{ fontSize: 26 }} />
                </AnimatedBadge>
              </IconButton>

              {isMobile && (
                <IconButton
                  onClick={handleMobileToggle}
                  sx={{
                    color: '#fff',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    borderRadius: '10px',
                    ml: 0.5,
                  }}
                >
                  <MenuIcon sx={{ fontSize: 28 }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileToggle}
        PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        {renderMobileDrawer()}
      </Drawer>
    </>
  );
};

export default NavbarPelanggan;