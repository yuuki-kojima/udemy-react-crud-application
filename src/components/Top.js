import React from 'react';
import * as images from '../utils/images'
import { Link as RouterLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = theme => ({
  card: {
    width: '90vw',
    maxWidth: 600,
    margin: '10px auto',
  },
  media: {
    width: '95%',
    margin: '5px auto',
  },
})

const Top = ({classes}) => (
  <React.Fragment>
    <Link component={RouterLink} to="/mch">
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component='img'
            className={classes.media}
            image={images.MCH_LOGO}
            title="MyCryptHeroes"
          />
        </CardActionArea>
      </Card>
    </Link>
  </React.Fragment>
)

export default withStyles(styles)(Top)
