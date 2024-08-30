import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { getUserPhoneByNumber } from '../../api/services/payment';
import END_POINTS from '../../constants/endpoints';
const { GET_USER_BY_PHONE } = END_POINTS;
function PhoneNumberDialog({ open, handleClose, setOpen, toggleDrawer, getHandleDriverData }) {
    // State to control dialog open/close
    //   const [open, setOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    const handleNext = () => {
        // Handle the next button action
        console.log('Phone Number:', phoneNumber);
        setOpen(false); // Close the dialog
    };

    const fetchUser = async () => {
        const response = await getUserPhoneByNumber(GET_USER_BY_PHONE, {
            params: {
                mobile_no: phoneNumber
            }
        });
        if (response?.responseCode === 200) {
            setOpen(false)
            toggleDrawer(true)
            getHandleDriverData(response?.responseData)
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Phone Number</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Phone Number"
                        type="tel"
                        fullWidth
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={fetchUser} color="primary" disabled={phoneNumber.length !== 10}>
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PhoneNumberDialog;
