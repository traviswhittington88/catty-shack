import React from 'react';
import Tooltip from '../../components/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import './MyButton.css';

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} tooltiptext={`Add Meow`}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);
