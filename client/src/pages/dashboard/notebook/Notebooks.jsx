import React, { useEffect, useState } from 'react';
import { getTokenFromCookie, useAuth } from '../../../utils';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Input,
} from '@material-tailwind/react';
import CreateNotebookButton from './CreateNotebookButton ';

const Notebooks = () => {
  const { currentUser } = useAuth();
  const token = getTokenFromCookie();
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteImages, setNoteImages] = useState([]);

  const fetchNotebookByAuthor = async () => {
    try {
      const res = await fetch(`http://localhost:8000/notebooks/author`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setNotebooks(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching notebooks', error);
    }
  };

  const handleOpenModal = (notebook) => {
    setSelectedNotebook(notebook);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNotebook(null);
    setNoteTitle('');
    setNoteContent('');
    setNoteImages([]);
  };

  const handleCreateNote = async () => {
    try {
      const res = await fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          notebookId: selectedNotebook._id,
          title: noteTitle,
          content: noteContent,
          images: noteImages,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Note created:', data);
        handleCloseModal();
      } else {
        const errorData = await res.json();
        console.error('Error creating note:', errorData.message);
      }
    } catch (error) {
      console.error('Error creating note', error);
    }
  };

  useEffect(() => {
    fetchNotebookByAuthor();
  }, [currentUser._id, token]);

  return (
    <div className="p-6">
      <CreateNotebookButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {notebooks.map((notebook) => (
          <Card
            key={notebook._id}
            className="cursor-pointer"
            onClick={() => handleOpenModal(notebook)}
          >
            <CardBody className="p-4">
              <Typography variant="h5" className="font-bold mb-2">
                {notebook.name}
              </Typography>
              <Typography variant="body2" color="gray" className="mb-2">
                Author: {notebook.author.fullName}
              </Typography>
              <Typography variant="body2" color="gray">
                Created At: {new Date(notebook.createdAt).toLocaleDateString()}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedNotebook && (
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogHeader>Create Note for {selectedNotebook.name}</DialogHeader>
          <DialogBody>
            <Input
              label="Title"
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="mb-4"
            />
            <br />
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
            <Input type="file" label="Image" multiple className="mb-4" />
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
      )}
    </div>
  );
};

export default Notebooks;
