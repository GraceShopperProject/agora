import React from 'react';
import { connect } from 'react-redux';
import FormItem from './FormItem';

// TODO Form Authentication

/**
 * COMPONENT
 */
export default function Form (props) {

  const { title, submitText, handleChange, onSubmit, formItems } = props;
  const keys = Object.keys(formItems);
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={(evt) => { onSubmit(evt) }}>
        {
          keys.map((key, idx) => (
            <FormItem key={idx} handleChange={handleChange} name={key} value={formItems[key]} />
          ))
        }
        <div>
          <button type="submit">{submitText}</button>
        </div>
      </form>
    </div>
  );
}
