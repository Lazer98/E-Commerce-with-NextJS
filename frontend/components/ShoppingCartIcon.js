// ShoppingCartIcon.js
import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';

const ShoppingCartIconComponent = ({ itemCount }) => {
  return (
    <Badge badgeContent={itemCount} color="error">
      <ShoppingCartIcon />
    </Badge>
  );
};

export default ShoppingCartIconComponent;
