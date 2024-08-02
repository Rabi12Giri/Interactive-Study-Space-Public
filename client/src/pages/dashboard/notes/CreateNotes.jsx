import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { postRequest } from '../../../utils';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';

const CreateNotes = ({ refetch }) => {
  const { notebookId } = useParams(); // Get notebookId from URL params
  const [modalOpen, setModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteImages, setNoteImages] = useState([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNoteTitle('');
    setNoteContent('');
    setNoteImages([]);
  };

  const handleFileChange = (e) => {
    setNoteImages(Array.from(e.target.files));
  };

  const handleCreateNote = async () => {
    if (!notebookId || !noteTitle || !noteContent) {
      toast.error('Notebook ID, title, and content are required');
      return;
    }

    const formData = new FormData();
    formData.append('notebookId', notebookId);
    formData.append('title', noteTitle);
    formData.append('content', noteContent);
    noteImages.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const res = await postRequest({
        endpoint: '/notes',
        data: formData,
      });

      refetch();

      if (res.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      handleCloseModal();
      return;
    } catch (error) {
      console.error('Error creating note', error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpenModal} color="green">
        Create Note
      </Button>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogHeader>Create Note</DialogHeader>
        <DialogBody className="space-y-4">
          <Input
            label="Title"
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="mb-4"
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
            className="mb-4"
          />
          <Input
            type="file"
            label="Image"
            multiple
            className="mb-4"
            onChange={handleFileChange}
          />
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleCloseModal} color="red">
            Cancel
          </Button>
          <Button onClick={handleCreateNote} color="green" className="ml-4">
            Create
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CreateNotes;
