import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
} from '@material-tailwind/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getTokenFromCookie } from '../../../utils';

const CreateNotebookButton = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const token = getTokenFromCookie();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateNotebook = async () => {
    const res = await fetch('http://localhost:8000/notebooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      onSuccess();
      handleClose();
      setName('');

      return;
    }

    toast.error(data.message);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Notebook
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogHeader>Create New Notebook</DialogHeader>
        <DialogBody>
          <Textarea
            autoFocus
            margin="dense"
            label="Notebook Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateNotebook}
            color="primary"
            className="ml-4"
          >
            Create
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CreateNotebookButton;
