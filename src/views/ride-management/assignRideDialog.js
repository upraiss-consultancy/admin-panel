import { Button, Dialog, DialogActions, DialogTitle, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AssignRideDialog({ dialogOpen, handleNavigate }) {
  const navigate = useNavigate()
  return (
    <Dialog open={dialogOpen}>
      <Box className=" min-w-[400px]">
        <DialogTitle>Assign a Driver</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleNavigate(false)}>No</Button>
          <Button onClick={() => handleNavigate(true)}>Yes</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AssignRideDialog;