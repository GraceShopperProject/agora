import React from 'react';

export default function FormItem(props) {
  const { handleChange, name, value, options } = props;
  const text = name.split('_').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ') + ':';
  return (
    <div>
      <label htmlFor={`${name}`}><small>{text}</small></label>
      {
        options 
        ? (<select name={`${name}`} value={`${value}`}>
            {
              options.map(option => (
                <option value={option.id} key={option.id}>{option.name}</option>
              ))
            }
          </select>)
        : (<input name={`${name}`} type="text" value={`${value}`} onChange={handleChange} />)
      }
    </div>
  )
}