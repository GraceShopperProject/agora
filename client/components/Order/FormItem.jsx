import React from 'react';

export default function FormItem(props) {
  const { handleChange, itemName, orderInfo, text} = props
  return (
    <div>
      <h3>RobinsThing</h3>
      <label htmlFor={`${itemName}`}><small>{text}</small></label>
      <input name={`${itemName}`} type="text" value={`${orderInfo[itemName]}`} onChange={props.handleChange} />
    </div>
  )
}