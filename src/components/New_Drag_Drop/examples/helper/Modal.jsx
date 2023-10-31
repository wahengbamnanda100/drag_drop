import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

const CustomModal = ({ open, handleClose, handleMerge, handleOverWrite }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Same item ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You can merge the data or Overerite the content replacing the old data
        </DialogContentText>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleMerge}>
            Merge
          </Button>
          <Button variant="contained" onClick={handleOverWrite} autoFocus>
            OverWrite
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
