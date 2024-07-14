import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
function ViewDialog({ data, open , handlClose }) {
    console.log(data, "SSS")
    return (
        <Dialog
            open={open}
            onClose={handlClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

                <DialogTitle id="alert-dialog-title">{"Ride Details"}</DialogTitle>
                <IconButton className=' !mr-3' onClick={handlClose}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            <DialogContent>
                <Stack direction={'row'} gap={6}>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                        <Typography variant="body1"><strong>Passenger Name:</strong> {data['pass_name']}</Typography>
                        <Typography variant="body1"><strong>Passenger Moible:</strong> {data['pass_mobile_no']}</Typography>
                    </DialogContentText>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default memo(ViewDialog)