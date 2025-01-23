import { Pagination } from '@mui/material';
import { PagePaginationProps } from '../models/Interfaces';
import { FC } from 'react';

const PagePagination: FC<PagePaginationProps> = ({
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
			color="primary"
		/>
	);
};

export default PagePagination;
