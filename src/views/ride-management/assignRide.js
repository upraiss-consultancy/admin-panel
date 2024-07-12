import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

function AssignRide () {
    const [open , setOpen] = useState(false);
    return (
      <Dialog>
        <DialogTitle>Assign Ride</DialogTitle>
      </Dialog>
    );
};

export default AssignRide;