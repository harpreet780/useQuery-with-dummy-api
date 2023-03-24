import React from 'react';
import { TablePagination } from '@mui/material';

const PaginationScreen = ({ pageCount, handleChangePage,pageLength }) => {
    return (
        <div className='pagination'>
            <TablePagination
                component="div"
                count={pageLength}
                page={pageCount}
                onPageChange={handleChangePage}
                rowsPerPage={8}
                rowsPerPageOptions={[]}
            />
        </div>
    )
}

export default PaginationScreen;