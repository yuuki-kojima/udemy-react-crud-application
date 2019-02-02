import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AppTab = ({mode, onChange}) => (
    <Paper square>
      <Tabs
        value={mode}
        textColor="primary"
        variant="fullWidth"
        onChange={onChange}
      >
        <Tab value="Hero" label="Hero" />
        <Tab value="Extension" label="Extension" />
      </Tabs>
    </Paper>
)

export default AppTab
