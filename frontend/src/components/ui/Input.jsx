import React from 'react';
import { clsx } from 'clsx';

const Input = React.forwardRef(({ 
  className = '', 
  type = 'text', 
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={clsx(
        'input',
        error && 'border-red-500 focus-visible:ring-red-500',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
