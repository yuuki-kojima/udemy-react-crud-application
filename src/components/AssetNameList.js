import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  heading: {
  fontSize: theme.typography.pxToRem(15),
  fontWeight: theme.typography.fontWeightRegular,
  },
  card: {
    width: 70,
    margin: 5,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  panels: {
    marginTop: 20,
    marginBottom: 20,
  },
  panel: {
    width: '90%',
    maxWidth: 500,
    margin: '0 auto',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  dialog: {
    WebkitOverflowScrolling: 'touch',
  }
})


class AssetNameList extends React.Component {
  constructor(props) {
    super(props)

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(){
    const { classes } = this.props
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Search for Asset Name
        </Button>
        <Dialog
          className={classes.dialog}
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Asset Lists
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.panels}>
            {
              this.props.assetInfos.map( (assetInfo, index) => (
                  <ExpansionPanel key={index} className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{assetInfo.rarity}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <List dense className={classes.list}>
                    {
                      assetInfo.assetLists.map( (list, index) => (
                        <ListItem key={index} button onClick={this.props.onClick}>
                          <ListItemAvatar className={classes.avatar}>
                            <Avatar alt={list.name} src={list.image} />
                          </ListItemAvatar>
                          <ListItemText className='asset-name' style={{fontSize: '1rem'}} primary={list.name}/>
                        </ListItem>
                      ))
                    }
                      </List>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
              ))
            }
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(AssetNameList)
