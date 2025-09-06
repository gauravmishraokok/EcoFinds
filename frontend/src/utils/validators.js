// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 chars, at least one letter and one number)
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

// Username validation (3-30 chars, alphanumeric and underscores only)
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
};

// Price validation (positive number, max 2 decimals)
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return !isNaN(numPrice) && numPrice >= 0 && priceRegex.test(price);
};

// Form validation helpers
export const validateForm = (data, rules) => {
  const errors = {};

  for (const field in rules) {
    const value = data[field];
    const rule = rules[field];

    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${rule.label || field} is required`;
      continue;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
      continue;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} cannot exceed ${rule.maxLength} characters`;
      continue;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${rule.label || field} format is invalid`;
      continue;
    }

    if (value && rule.custom && !rule.custom(value)) {
      errors[field] = rule.message || `${rule.label || field} is invalid`;
      continue;
    }
  }

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
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    message: 'Password must be at least 6 characters and contain a letter and a number',
    label: 'Password'
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]{3,30}$/,
    message: 'Username must be 3-30 characters and contain only letters, numbers, or underscores',
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
    message: 'Price must be a valid positive number (max 2 decimals)',
    label: 'Price'
  }
};