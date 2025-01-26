import { Grid2, TextField, Typography } from '@mui/material';
import { textFieldStyles } from '../../styles/AuthStyles';
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import theme from '../../styles/theme';
import MainButton from '../Buttons/MainButton';

const ContactForm = () => {
	const [state, handleSubmit] = useForm(process.env.REACT_APP_FORM_ID);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmitForm = () => {
		console.log(name, 'name');
		console.log(email, 'email');
		console.log(message, 'message');
	};
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
				<form onSubmit={handleSubmitForm}>
					<TextField
						id="name"
						fullWidth
						label="Name"
						type="name"
						value={name}
						name="name"
						onChange={(event) => setName(event.target.value)}
						sx={textFieldStyles}
					/>

					<TextField
						id="email"
						fullWidth
						label="Email"
						type="email"
						value={email}
						name="email"
						onChange={(event) => setEmail(event.target.value)}
						// helperText={validationsErrors.email}
						sx={textFieldStyles}
					/>

					<TextField
						id="message"
						fullWidth
						label="Message"
						type="message"
						value={message}
						name="message"
						multiline
						rows={7}
						onChange={(event) => setMessage(event.target.value)}
						sx={textFieldStyles}
					/>

					<MainButton onClick={handleSubmitForm}>Send</MainButton>
				</form>
			</Grid2>
		</>
	);
};
export default ContactForm;
