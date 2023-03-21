import React from 'react';
import { TablePagination } from '@mui/material';

const PaginationScreen = ({ pageCount, handleChangePage,setSkipPerPage,pageLength,handleChangeRowsPerPage }) => {
   
    return (
        <div className='pagination'>
            <TablePagination
                component="div"
                count={pageLength}
                page={pageCount}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
            />
        </div>
    )
}

export default PaginationScreen;