export const validateName = (name: string): string => {
	if (!name.trim()) {
		return 'Name is required';
	}
	return '';
};

export const validateEmail = (email: string): string => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return 'Invalid email format';
	}
	return '';
};

export const validatePassword = (password: string): string => {
	if (password.length < 8) {
		return 'Password must be at least 8 characters';
	}
	return '';
};

export const validateConfirmPassword = (
	password: string,
	confirmPassword: string
): string => {
	if (password !== confirmPassword) {
		return 'Passwords do not match';
	}
	return '';
};

export const validateTerms = (agreeToTerms: boolean): string => {
	if (!agreeToTerms) {
		return 'You must agree to the terms and conditions';
	}
	return '';
};

export const validateForm = (
	name: string,
	email: string,
	password: string,
	confirmPassword: string,
	agreeToTerms: boolean
) => {
	const errors = {
		name: validateName(name),
		email: validateEmail(email),
		password: validatePassword(password),
		confirmPassword: validateConfirmPassword(password, confirmPassword),
		terms: validateTerms(agreeToTerms),
	};

	return errors;
};
