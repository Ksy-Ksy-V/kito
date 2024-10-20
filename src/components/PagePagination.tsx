import { Pagination } from '@mui/material';

interface PagePaginationProps {
	loading?: boolean;
	page?: number;
	count?: number;
	onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PagePagination: React.FC<PagePaginationProps> = ({
	loading,
	page,
	count,
	onChange,
}) => {
	return (
		<Pagination
			count={count}
			page={page}
			onChange={onChange}
			disabled={loading}
			sx={{
				'& .Mui-selected': {
					backgroundColor: 'primary.main',
				},
				'& .MuiPaginationItem-root': {
					'&:hover': {
						backgroundColor: 'primary.main',
					},
				},
			}}
		/>
	);
};

export default PagePagination;
