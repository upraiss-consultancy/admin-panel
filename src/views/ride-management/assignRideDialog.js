import { Button, Dialog, DialogActions, DialogTitle, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AssignRideDialog({ dialogOpen, setDialogOpen }) {
  const navigate = useNavigate()
  return (
    <Dialog open={dialogOpen}>
      <Box className=" min-w-[400px]">
        <DialogTitle>Assign a Driver</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>No</Button>
          <Button onClick={() => { setDialogOpen(false); navigate('/drivers') }}>Yes</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AssignRideDialog;