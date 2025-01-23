import { legalProps, WelcomeLegalProps } from '../models/Interfaces';

export const termsOfService: legalProps[] = [
	{
		id: 1,
		title: 'Eligibility',
		content: [
			'To use our services, you must: ',
			'- Be at least 13 years old (or the minimum legal age in your jurisdiction).',
			'- Provide accurate and truthful information during registration.',
			'- Use the website in compliance with all applicable laws and regulations.',
		],
	},
	{
		id: 2,
		title: 'User Registration and Accounts',
		content: [
			'To access features like creating anime lists or interacting with the community, you are required to create an account.',
			'By registering, you agree to:',
			'- Keep your login credentials secure.',
			'- Notify us immediately if you suspect unauthorized access to your account.',
			'- Refrain from sharing your account with others.',
			'Kito reserves the right to suspend or terminate accounts that violate these terms.',
		],
	},
	{
		id: 3,
		title: 'User Content',
		content: [
			'You may upload, submit, or share content (e.g., anime reviews, comments, or lists) on Kito.',
			'By doing so, you grant us a non-exclusive, worldwide license to use, display, and distribute this content on our platform.',
			'You agree that:',
			'- Your content does not infringe the rights of others or contain illegal material.',
			'- You are solely responsible for the content you share.',
			'We reserve the right to moderate, remove, or edit any content that violates these Terms or is deemed inappropriate.',
		],
	},
	{
		id: 4,
		title: 'Data Collection and Privacy',
		content: [
			'We value your privacy and are committed to protecting your personal information.',
			'Your data, including anime preferences and account details, will be handled in accordance with our Privacy Policy.',
			'By using Kito, you consent to the collection and use of your information as outlined in the Privacy Policy.',
		],
	},
	{
		id: 5,
		title: 'Use of Third-Party Services',
		content: [
			'Kito utilizes third-party services, including the Jikan API, to provide accurate anime information.',
			'However, we do not guarantee the accuracy, completeness, or reliability of the data provided by these external services.',
			'Any issues arising from third-party content should be directed to the respective service providers.',
		],
	},
	{
		id: 6,
		title: 'Prohibited Activities',
		content: [
			'While using Kito, you agree not to:',
			'- Post or share any unlawful, defamatory, or harmful content.',
			'- Engage in spamming, phishing, or other fraudulent activities.',
			'- Attempt to hack, disrupt, or overload our servers or systems.',
			'- Use automated tools to scrape or collect data from the website.',
			'Violation of these rules may result in the suspension or termination of your account and legal action if necessary.',
		],
	},
	{
		id: 7,
		title: 'Intellectual Property',
		content: [
			'All content on Kito, including text, graphics, logos, and software, is the property of Kito or its licensors.',
			'You may not copy, modify, distribute, or use any content from the site without prior written consent.',
		],
	},
	{
		id: 8,
		title: 'Limitation of Liability',
		content: [
			'Kito is provided "as is" without any warranties, express or implied. We do not guarantee uninterrupted or error-free access to the platform.',
			'Kito is not liable for any damages resulting from:',
			'- The use or inability to use the site.',
			'- Errors or inaccuracies in content.',
			'- Unauthorized access to your account.',
		],
	},
	{
		id: 9,
		title: 'Changes to the Terms',
		content: [
			'We may update these Terms of Service from time to time.',
			'Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the revised terms.',
			'Please review the terms periodically.',
		],
	},
	{
		id: 10,
		title: 'Termination',
		content: [
			'We reserve the right to suspend or terminate your access to Kito at our sole discretion, without prior notice, for violations of these Terms or other reasons.',
		],
	},
	{
		id: 11,
		title: 'Contact Information',
		content: [
			'If you have any questions, concerns, or feedback about these Terms of Service, feel free to reach out to us at:',
			'Email: support@kito.com',
		],
	},
];

export const welcomeTermsOfService: WelcomeLegalProps[] = [
	{
		content: [
			'By accessing or using our website, you agree to comply with these Terms of Service.',
			'These terms govern your use of the Kito platform, including its features, content, and services.',
			'If you do not agree to these terms, please do not use our website.',
		],
	},
];
