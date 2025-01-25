import { Grid2, TextField, Typography } from '@mui/material';
import { textFieldStyles } from '../../styles/AuthStyles';
import { useState } from 'react';
import theme from '../../styles/theme';

const ContactForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	return (
		<>
			<Grid2 size={12}>
				<Typography
					variant="h3"
					sx={{
						textAlign: 'center',
						margin: '1rem',
						fontSize: {
							xs: theme.typography.h5.fontSize,
							sm: theme.typography.h3.fontSize,
							md: theme.typography.h3.fontSize,
							lg: theme.typography.h2.fontSize,
							xl: theme.typography.h2.fontSize,
						},
					}}
				>
					Contact us
				</Typography>
			</Grid2>
			<Grid2 size={6}>
				<Typography
					variant="h5"
					sx={{
						textAlign: 'center',
						margin: '2rem',
						fontSize: {
							xs: theme.typography.body1.fontSize,
							md: theme.typography.h5.fontSize,
						},
					}}
				>
					Have questions or need assistance?
					<br /> We're here to help! <br />
					Feel free to reach out to us using the form below, and we'll
					get back to you as soon as possible.
				</Typography>
			</Grid2>
			<Grid2 size={6}>
				<form
				// onSubmit={handleSubmit}
				>
					<TextField
						id="name"
						fullWidth
						label="Name"
						type="name"
						// value={data.email}
						name="name"
						// onChange={handleChange}
						sx={textFieldStyles}
					/>

					<TextField
						id="email"
						fullWidth
						label="Email"
						type="email"
						// value={data.email}
						name="email"
						// onChange={handleChange}
						// helperText={validationsErrors.email}
						sx={textFieldStyles}
					/>

					<TextField
						id="message"
						fullWidth
						label="Message"
						type="message"
						// value={data.email}
						name="message"
						multiline
						rows={7}
						// onChange={handleChange}
						// helperText={validationsErrors.message}
						sx={textFieldStyles}
					/>
				</form>
			</Grid2>
		</>
	);
};

export default ContactForm;
