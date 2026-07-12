import React from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Select from './Select';
import NumberInput from './NumberInput';
import ChipSelector from './ChipSelector';

export default function DynamicForm({
  schema = [],
  values = {},
  onChange,
  errors = {},
  onSubmit,
  submitLabel = 'Submit',
  submitting = false
}) {
  const handleFieldChange = (name, value) => {
    if (onChange) {
      onChange(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {schema.map((field) => {
        const value = values[field.name];
        const error = errors[field.name];

        const fieldProps = {
          key: field.name,
          name: field.name,
          label: field.label,
          placeholder: field.placeholder,
          required: field.required,
          helpText: field.helpText,
          error: error,
          value: value === undefined ? '' : value,
          onChange: (val) => handleFieldChange(field.name, val),
          minLength: field.minLength,
          maxLength: field.maxLength,
          min: field.min,
          max: field.max,
          options: field.options
        };

        // Render matching UI control based on schema type
        switch (field.type) {
          case 'textarea':
            return <TextArea {...fieldProps} />;
          case 'select':
            return <Select {...fieldProps} />;
          case 'number':
            return <NumberInput {...fieldProps} />;
          case 'chip':
            return <ChipSelector {...fieldProps} />;
          case 'text':
          default:
            return <TextInput {...fieldProps} />;
        }
      })}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitting}
        style={{
          width: '100%',
          padding: '14px',
          fontSize: '16px',
          marginTop: '10px'
        }}
      >
        {submitting ? 'Processing...' : submitLabel}
      </button>
    </form>
  );
}
