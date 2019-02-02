import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 10,
  },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  headline: {
    marginBottom: 10,
  }
});

const About = ({classes}) => (
  <React.Fragment>
    <h2>About Site</h2>
    <div className={classes.textLeft}>
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.headline} variant="h5" component="h3">
          What is Digital Asset Garage
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          「Digital Asset Garage」はブロックチェーンで管理されたデジタルゲームアイテム（アセット）の売買情報をまとめたウェブアプリケーションです。現在は「Opensea.io」で販売されているアセットのみ扱っていますが、今後出て来るであろうデジタルアイテムマーケットの情報も統合していく予定です。
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          "Digital Asset Garage" is a web application that summarizes sales information on digital game items (is called assets) managed in a Block Chain. Currently we deal only with assets sold under "Opensea.io", but we will also integrate information on the digital item market that will come out in the future.
        </Typography>
      </Paper>
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.headline} variant="h5" component="h3">
          Development of technology
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          本アプリは下記の技術を用いて作成されています。各サービスの仕様変更ならびに障害発生時には、本アプリの提供・公開を中断する場合がありますので、予めご了承下さい。
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          This application is made using the following technology. Please understand beforehand that it may interrupt the provision / disclosure of this application at the time of specification change of each service and trouble.
        </Typography>
        <Typography component="div" className={classes.paragraph}>
          <ul>
            <li>Firebase Hosting</li>
            <li>Opensea API V1</li>
            <li>React・Redux・Material-UI</li>
          </ul>
        </Typography>
      </Paper>
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.headline} variant="h5" component="h3">
          Self Introduction
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          <a href="https://twitter.com/_torike" target="_blank" rel="noopener noreferrer">
            @_torike
          </a>
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          ウェブアプリケーションをこよなく愛するフリーランスプログラマーです。最近はブロックチェーン関連技術に興味があり、本アプリもその一環で作成しました。
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          本アプリへのご要望・ご指摘などは、
          <a href="https://twitter.com/_torike" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          よりご連絡下さい。
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          I am a freelance programmer who loves web applications. Recently I am interested in block chain related technology, I made this application as part of it.
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          Please contact me from &nbsp;
          <a href="https://twitter.com/_torike" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          &nbsp;for requests or suggestions to this application.
        </Typography>
      </Paper>
    </div>
  </React.Fragment>
)

export default withStyles(styles)(About)
