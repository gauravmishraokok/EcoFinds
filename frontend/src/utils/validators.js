// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Username validation
export const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 30;
};

// Price validation
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice >= 0;
};

// Form validation helpers
export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];

    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${rule.label || field} is required`;
      return;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
      return;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} cannot exceed ${rule.maxLength} characters`;
      return;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${rule.label || field} format is invalid`;
      return;
    }

    if (value && rule.custom && !rule.custom(value)) {
      errors[field] = rule.message || `${rule.label || field} is invalid`;
      return;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
    label: 'Email'
  },
  password: {
    required: true,
    minLength: 6,
    message: 'Password must be at least 6 characters',
    label: 'Password'
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 30,
    label: 'Username'
  },
  title: {
    required: true,
    maxLength: 100,
    label: 'Title'
  },
  description: {
    required: true,
    maxLength: 1000,
    label: 'Description'
  },
  price: {
    required: true,
    custom: validatePrice,
    message: 'Price must be a valid positive number',
    label: 'Price'
  }
};
