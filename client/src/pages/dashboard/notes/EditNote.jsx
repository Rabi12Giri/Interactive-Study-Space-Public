import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { putRequest } from '../../../utils';

const EditNote = ({ note, refetch }) => {
  const [open, setOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteImages, setNoteImages] = useState([]);

  useEffect(() => {
    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
      setNoteImages(note.images || []);
    }
  }, [note]);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleFileChange = (e) => {
    setNoteImages(Array.from(e.target.files));
  };

  const handleUpdateNote = async () => {
    try {
      const formData = new FormData();
      formData.append('title', noteTitle);
      formData.append('content', noteContent);
      noteImages.forEach((file) => {
        formData.append('images', file);
      });

      const res = await putRequest({
        endpoint: `/notes/${note._id}`,
        data: formData,
      });

      handleClose();
      refetch();

      if (res.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  return (
    <>
      <IconButton color="blue" size="sm" onClick={handleClose}>
        <FaEdit className="h-5 w-5" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogHeader>Edit Note</DialogHeader>
        <DialogBody className="space-y-4">
          <Input
            label="Title"
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <Textarea
            autoFocus
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            rows={5}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <Input
            type="file"
            label="Image"
            multiple
            onChange={handleFileChange}
          />
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleClose} color="red">
            Cancel
          </Button>
          <Button onClick={handleUpdateNote} color="green" className="ml-4">
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EditNote;
