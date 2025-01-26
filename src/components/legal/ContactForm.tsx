import { Grid2, TextField, Typography } from '@mui/material';
import { textFieldStyles } from '../../styles/AuthStyles';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from '@formspree/react';
import theme from '../../styles/theme';
import MainButton from '../Buttons/MainButton';

const ContactForm = () => {
	const [state, handleSubmit] = useForm(import.meta.env.VITE_FORM_ID);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleSubmit(e);

		if (state.succeeded) {
			setFormData({
				name: '',
				email: '',
				message: '',
			});
		}
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
							xs: theme.typography.h4.fontSize,
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

			{state.succeeded ? (
				<Grid2 size={12}>
					<Typography
						variant="h5"
						sx={{
							textAlign: 'center',
							margin: '2rem',
						}}
					>
						Thank you for your message!
						<br />
						We will get back to you as soon as possible.
					</Typography>
				</Grid2>
			) : (
				<Grid2 size={{ xs: 12, sm: 6 }}>
					<Typography
						variant="h5"
						sx={{
							textAlign: 'center',
							margin: {
								xs: '0rem 2rem 2rem 2rem',
								sm: '6rem 2rem 2rem 2rem',
							},
							display: 'flex',

							alignContent: 'space-between',
						}}
					>
						Have questions or need assistance?
						<br /> We're here to help! <br />
						Feel free to reach out to us using the form below, and
						we'll get back to you as soon as possible.
					</Typography>
				</Grid2>
			)}

			<Grid2 size={{ xs: 12, sm: 6 }}>
				{!state.succeeded && (
					<form onSubmit={handleFormSubmit}>
						<TextField
							id="name"
							fullWidth
							label="Name"
							type="name"
							value={formData.name}
							name="name"
							onChange={handleChange}
							sx={textFieldStyles}
						/>

						<TextField
							id="email"
							fullWidth
							label="Email"
							type="email"
							value={formData.email}
							name="email"
							onChange={handleChange}
							sx={textFieldStyles}
						/>

						<TextField
							id="message"
							fullWidth
							label="Message"
							type="message"
							value={formData.message}
							name="message"
							multiline
							rows={7}
							onChange={handleChange}
							sx={textFieldStyles}
						/>

						<MainButton type="submit" disabled={state.submitting}>
							Send
						</MainButton>
					</form>
				)}
			</Grid2>
		</>
	);
};
export default ContactForm;
