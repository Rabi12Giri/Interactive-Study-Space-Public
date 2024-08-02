import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postRequest } from '../../../utils';

const CreateStudySessionDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setError(null);
  };

  const handleCreateSession = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await postRequest({
        endpoint: '/sessions/',
        data: { title },
      });

      handleClose();

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      const newSession = res.data;

      navigate(`/study-session/${newSession._id}`);

      toast.success('Session created successfully!');
    } catch (error) {
      console.error('Error creating session', error);
      setError('Failed to create session. Please try again.');
      toast.error('Failed to create session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="blue" onClick={handleOpen}>
        Create Session
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogHeader>Create New Study Session</DialogHeader>
        <DialogBody>
          <Input
            label="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {error && (
            <Typography variant="small" color="red" className="mt-2">
              {error}
            </Typography>
          )}
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            color="green"
            onClick={handleCreateSession}
            disabled={isLoading}
            className="ml-4"
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CreateStudySessionDialog;
