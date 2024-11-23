export interface privacyPolicyProps {
	id: number;
	title: string;
	content: string[];
}

export const privacyPolicy: privacyPolicyProps[] = [
	{
		id: 1,
		title: 'Information We Collect',
		content: [
			'We may collect the following types of information: ',
			'a. Information You Provide ',
			'- Account Information: When you register, we collect your name, email address, and other information required for account creation.',
			'- User-Generated Content: This includes reviews, comments, and lists you create on Kito.',
			'b. Automatically Collected Information ',
			'When you use our site, we collect certain data automatically: ',
			'- Device Information: IP address, browser type, operating system, and device identifiers.',
			'- Usage Data: Pages visited, time spent on the site, clicks, and other interaction metrics.',
			'c. Third-Party Data ',
			'We may receive information from third-party services, such as the Jikan API, to provide anime-related content.',
		],
	},
	{
		id: 2,
		title: 'How We Use Your Information',
		content: [
			'We use the information collected for the following purposes:',
			'- To provide, maintain, and improve the Kito platform.',
			'- To personalize your experience, including suggesting anime based on your preferences.',
			'- To communicate with you regarding account updates, features, or promotional offers.',
			'- To monitor and analyze site usage to enhance performance and security.',
			'- To comply with legal obligations and enforce our Terms of Service.',
		],
	},
	{
		id: 3,
		title: 'Cookies and Tracking Technologies',
		content: [
			'Kito uses cookies and similar technologies to enhance your experience. These may include:',

			'- Essential Cookies: Required for basic functionality, such as logging in.',
			'- Analytics Cookies: To analyze usage trends and improve the website.',
			'- Preference Cookies: To remember your preferences, such as language or theme settings.',
			'You can manage your cookie preferences through your browser settings.',
		],
	},
	{
		id: 4,
		title: 'How We Share Your Information',
		content: [
			'We do not sell your personal information to third parties. However, we may share your data with:',
			'- Service Providers: To facilitate services such as hosting, analytics, or email delivery.',
			'- Legal Authorities: If required to comply with legal obligations or protect our rights.',
			'- Business Transfers: In the event of a merger, acquisition, or sale of assets.',
		],
	},
	{
		id: 5,
		title: 'Data Security',
		content: [
			'We implement appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse.',
			'However, no online system is 100% secure, and we cannot guarantee absolute security.',
		],
	},
	{
		id: 6,
		title: 'Data Retention',
		content: [
			'We retain your personal information for as long as necessary to provide our services or comply with legal obligations.',
			'You may request the deletion of your account and associated data by contacting us at support@kito.com.',
		],
	},
	{
		id: 7,
		title: 'Your Rights',
		content: [
			'Depending on your jurisdiction, you may have the following rights regarding your personal data:',
			'- Access: Request a copy of the data we hold about you.',
			'- Correction: Request correction of inaccurate or incomplete data.',
			'- Deletion: Request deletion of your personal data.',
			'- Objection: Object to the processing of your data for specific purposes.',
			'To exercise your rights, contact us at support@kito.com.',
		],
	},
	{
		id: 8,
		title: "Children's Privacy",
		content: [
			'Kito is not intended for individuals under the age of 13.',
			'We do not knowingly collect personal information from children.',
			'If we discover that we have collected data from a child under 13, we will delete it promptly.',
		],
	},
	{
		id: 9,
		title: 'Third-Party Links',
		content: [
			'Our site may contain links to third-party websites.',
			'We are not responsible for the privacy practices or content of those sites.',
			'Please review their privacy policies before providing any personal information.',
		],
	},
	{
		id: 10,
		title: 'Changes to This Policy',
		content: [
			'We may update this Privacy Policy from time to time.',
			'Changes will be posted on this page with an updated "Effective Date."',
			'Your continued use of Kito signifies your acceptance of the revised policy.',
		],
	},
	{
		id: 11,
		title: 'Contact Us',
		content: [
			'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:',
			'Email: support@kito.com',
		],
	},
];

export interface WelcomePrivacyPolicyProps {
	content: string[];
}

export const welcomePrivacyPolicy: WelcomePrivacyPolicyProps[] = [
	{
		content: [
			'Kito ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your personal information when you use our website and services.',
			'By using Kito, you agree to the terms outlined in this policy.',
		],
	},
];
