import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabComponent = ({mode, values, onChange}) => (
    <Paper square>
      <Tabs
        value={mode}
        textColor="primary"
        variant="fullWidth"
        onChange={onChange}
      >
        {values.map( (value, index) => <Tab key={index} value={value.key} label={value.value} />)}
      </Tabs>
    </Paper>
)

export default TabComponent
