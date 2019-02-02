import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// Route関連
import { Link } from 'react-router-dom'

const ResponsiveDrawerListItemWithAvatar = ({to, onClick, img, text}) => (
  <ListItem button component={Link} to={to} onClick={onClick}>
    <ListItemAvatar>
      <Avatar alt={text} src={img} />
    </ListItemAvatar>
    <ListItemText primary={text} />
  </ListItem>
);

export default ResponsiveDrawerListItemWithAvatar;
