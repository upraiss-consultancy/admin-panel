import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
function CancelRideDialog({ handleClose, handleConfirm, open, remarksChange }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to cancel this ride?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you cancel this ride, it cannot be undone. Are you sure you want to proceed?
                </DialogContentText>
                <TextField placeholder='Remarks' className=' w-full !mt-2' onChange={(e) => remarksChange(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleConfirm} color="error" autoFocus>
                    Yes, Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(CancelRideDialog)