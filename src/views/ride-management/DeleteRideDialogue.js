import React, { memo, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/material';
const Remarks = [
    "Lorem ipsum dolor sit amet",
    "consectetur adipiscing elit",
    "Excepteur sint occaecat cupidatat non proident",
    "Other"
];
const customColor = '#DD781E';
function DeleteRide({ handleClose, handleConfirm, open }) {
    const [selectedRemarks, setSelectedRemarks] = useState([])
    const handleToggleRemark = (remark) => {
        setSelectedRemarks((prevSelected) =>
            prevSelected.includes(remark)
                ? prevSelected.filter((item) => item !== remark)
                : [...prevSelected, remark]
        );
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this driver?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you delete this driver, it cannot be undone. Are you sure you want to proceed?
                </DialogContentText>
                <DialogContentText>
                    <Stack gap={2} direction={'row'} flexWrap={'wrap'} className='mt-4'>
                        {
                            Remarks?.map((remark) => <Chip label={remark} sx={{
                                backgroundColor: selectedRemarks.includes(remark) ? customColor : 'default',
                                color:  selectedRemarks.includes(remark) ? 'white' : 'black', // Adjust text color for better visibility if needed
                                '&:hover': {
                                    backgroundColor: selectedRemarks.includes(remark) ? customColor : 'default',
                                },
                            }} onClick={() => handleToggleRemark(remark)}
                             />)
                        }
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={() => handleConfirm(selectedRemarks.join(','))} color="error" autoFocus>
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(DeleteRide)