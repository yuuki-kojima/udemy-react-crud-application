import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

// Material-UI Icons
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import * as icons from '../utils/images'

// Route
import { Link } from 'react-router-dom';

// Components
import ResponsiveDrawerListItem from './ResponsiveDrawerListItem';
import ResponsiveDrawerListItemWithAvatar from './ResponsiveDrawerListItemWithAvatar';

// Utils
import * as assetTypes from '../utils/AssetTypes'

// 設定値
const drawerWidth = 240;
const bottomNavigationHeight = 65;

// スタイル
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolBar: {
    justifyContent: 'stretch', // 中央寄せのため追加
    minHeight: bottomNavigationHeight,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    paddingTop: 65,
    width: '100%',
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
  }
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  closeDrawerNav = () => {
    this.setState({ mobileOpen: false });
  }
  openDrawerNav = () => {
    this.setState({ mobileOpen: true });
  }

  render() {

    // Material-ui関連
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <List>
          <ResponsiveDrawerListItem
            to="/about"
            onClick={this.closeDrawerNav}
            icon={<InfoIcon />}
            text="About Site"
          />
        </List>
        <Divider />
        <List>
          <ResponsiveDrawerListItem
            to="/"
            onClick={this.closeDrawerNav}
            icon={<HomeIcon />}
            text="Top Page"
          />
        </List>
        <List>
          <ResponsiveDrawerListItemWithAvatar
            to={'/assets/' + assetTypes.MY_CRYPT_HEROES}
            onClick={this.closeDrawerNav}
            img={icons.MCH_HERO_ICON}
            text="MyCryptHeroes"
          />
        </List>
        <List>
          <ResponsiveDrawerListItemWithAvatar
            to={'/assets/' + assetTypes.MY_CRYPT_HEROES_EXTENSION}
            onClick={this.closeDrawerNav}
            img={icons.MCH_EXTENSION_ICON}
            text="MyCryptHeroes:Ex"
          />
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolBar} variant="dense">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => this.openDrawerNav()}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Link className={classes.link} to="/">
              <Typography className={classes.title} variant="h6" noWrap>
                Digital Asset Online
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.closeDrawerNav}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
