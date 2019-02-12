import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingComponent = () => (
  <div style={{textAlign:'center', margin:30}}>
    <CircularProgress size={100}/>
  </div>
)

export default LoadingComponent
