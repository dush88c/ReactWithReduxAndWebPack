import React from 'react';

const Channel = ({ isSelected, name, handleClick }) =>
  <a onClick={handleClick} className={isSelected ? ' list-group-item active ' : 'list-group-item'} >{name}</a>;


export default Channel;
