/*
  Evan MacHale - N00150552
  26.03.19
  Text.js
*/

import React from 'react';
import PropTypes from 'prop-types';
// Material Design Components
import TextField, { Input } from '@material/react-text-field';

/*
  TextField_ renders an input for our forms 📝
  Takes name, label, value, onChange
*/

const Text = (props) => {
  const { name } = props;
  const { label } = props;
  const { value } = props;
  const { onChange } = props;
  return (
    <TextField
      label={label}
      outlined
    >
      <Input
        name={name}
        value={value}
        onChange={onChange}
      />
    </TextField>
  );
};

Text.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

// Specifies the default values for props:
Text.defaultProps = {
  name: '',
  label: '',
  value: '',
  onChange: null,
};

export default Text;
