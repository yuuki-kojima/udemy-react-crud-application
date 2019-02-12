import React from 'react';
import Fab from '@material-ui/core/Fab';

const LoadMoreComponent = ({onClick}) => (
   <div style={{textAlign:'center', margin:30}}>
     <Fab
       variant="extended"
       aria-label="Delete"
       onClick={onClick}
     >
      Load More...
     </Fab>
   </div>
)

export default LoadMoreComponent
