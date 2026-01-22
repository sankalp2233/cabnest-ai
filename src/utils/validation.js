// Validation utility functions for CabNest authentication

/**
 * Validates email format using RFC 5322 standard
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

/**
 * Validates Indian phone number format (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export const isValidPhone = (phone) => {
    if (!phone) return false;
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if it's exactly 10 digits
    return cleaned.length === 10;
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} - { valid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
    const errors = [];

    if (!password) {
        errors.push('Password is required');
        return { valid: false, errors };
    }

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    // Optional: Add more strength requirements
    // if (!/[A-Z]/.test(password)) {
    //     errors.push('Password must contain at least one uppercase letter');
    // }
    // if (!/[0-9]/.test(password)) {
    //     errors.push('Password must contain at least one number');
    // }

    return {
        valid: errors.length === 0,
        errors
    };
};

/**
 * Detects if identifier is email or phone number
 * @param {string} identifier - Email or phone number
 * @returns {'email' | 'phone' | 'unknown'} - Type of identifier
 */
export const detectIdentifierType = (identifier) => {
    if (!identifier) return 'unknown';

    const trimmed = identifier.trim();

    // Check if it's an email
    if (isValidEmail(trimmed)) {
        return 'email';
    }

    // Check if it's a phone number
    if (isValidPhone(trimmed)) {
        return 'phone';
    }

    return 'unknown';
};

/**
 * Formats phone number for display (adds spaces)
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
};

/**
 * Cleans phone number (removes all non-digits)
 * @param {string} phone - Phone number
 * @returns {string} - Cleaned phone number
 */
export const cleanPhoneNumber = (phone) => {
    return phone.replace(/\D/g, '');
};
