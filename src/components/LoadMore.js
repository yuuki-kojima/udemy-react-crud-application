import React from 'react';
import Fab from '@material-ui/core/Fab';

const LoadMore = ({hasMore, isFetching, handleClick}) => (
    (hasMore === true && !isFetching)
    && <div style={{textAlign:'center', margin:30}}>
         <Fab
           variant="extended"
           aria-label="Delete"
           onClick={handleClick}
         >
          Load More...
         </Fab>
       </div>
  )

export default LoadMore
