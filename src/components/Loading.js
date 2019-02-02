import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({isFetching}) => (
      isFetching
      && <div style={{textAlign:'center', margin:30}}>
           <CircularProgress size={100}/>
         </div>
  )

export default Loading
