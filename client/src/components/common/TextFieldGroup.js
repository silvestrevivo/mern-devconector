import React from 'react'
import className from 'classnames';
import PropTypes from 'prop-types'

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  info,
  onChange }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={className('form-control form-control-lg', {
          'is-invalid': error === name,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <small className="form-text text-muted">{info}</small>
    </div>
  )
}

TextFieldGroup.prototype = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
  type: 'text',
}

export default TextFieldGroup
