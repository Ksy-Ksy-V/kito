import {
	Button,
	Dialog,
	DialogContent,
	DialogProps,
	DialogTitle,
	Grid2,
} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../styles/theme';
import { useState } from 'react';
import Sorting from './Sorting';
import Filters from './Filters';
import GenresFilter from './GenresFilter';
import SearchButtons from './SearchButtons';
import React from 'react';
import StyledButton from '../StyledButton';
import { useSearchContext } from '../../context/SearchContext';

const FiltersMenu = () => {
	const { state } = useSearchContext();
	const [open, setOpen] = useState(false);
	const [scroll, setScroll] = React.useState<DialogProps['scroll']>('body');

	const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<StyledButton
				onClick={handleClickOpen('body')}
				startIcon={<TuneOutlinedIcon />}
				disabled={state.loading}
				sx={{
					lineHeight: 1.9,
					backgrounsColor: 'transparent',
				}}
			>
				Filters
			</StyledButton>

			<Dialog
				scroll="body"
				onClose={handleClose}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
				open={open}
			>
				<Grid2
					size={12}
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<DialogTitle id="customized-dialog-title">
						Filters
					</DialogTitle>

					<Button
						aria-label="close"
						onClick={handleClose}
						sx={{
							color: theme.palette.primary.main,
							fontSize: '4rem',
						}}
					>
						<CloseIcon />
					</Button>
				</Grid2>

				<DialogContent
					dividers={scroll === 'body'}
					tabIndex={-1}
					id="scroll-dialog-description"
				>
					<Grid2 size={12}>
						<SearchButtons
							dialogOptions
							closeDialog={() => handleClose()}
						/>
					</Grid2>

					<Grid2 size={12}>
						<Sorting />
					</Grid2>

					<Grid2 size={12}>
						<Filters />
					</Grid2>

					<Grid2 size={12}>
						<GenresFilter genresOpenValue={false} />
					</Grid2>

					<Grid2 size={12} sx={{ marginTop: '1rem' }}>
						<SearchButtons
							dialogOptions
							closeDialog={() => handleClose()}
						/>
					</Grid2>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default FiltersMenu;
