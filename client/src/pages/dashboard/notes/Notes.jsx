import React from 'react';
import {
  Card,
  CardBody,
  IconButton,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa'; // Importing react-icons
import { useParams, useLocation } from 'react-router-dom';
import { deleteRequest, formatImageUrl, getRequest } from '../../../utils';
import CreateNotes from './CreateNotes';
import EditNote from './EditNote';
import { toast } from 'react-toastify';

const Notes = () => {
  const { notebookId } = useParams(); // Get notebookId from URL params
  const location = useLocation(); // Get the current URL

  const {
    data: notes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['notes', notebookId],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: `/notes/notebook/${notebookId}`,
      });
      return res.data || [];
    },
    enabled: !!notebookId, // Only run the query if notebookId is available
  });

  const handleDelete = async (noteId) => {
    try {
      const res = await deleteRequest({
        endpoint: `/notes/${noteId}`,
      });

      if (res.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      refetch();
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  if (isLoading) {
    return (
      <Typography variant="h4" className="p-8">
        Loading......
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h4" className="p-8">
        Error loading notes
      </Typography>
    );
  }

  const isSharedNotebook = location.pathname.includes('shared-notebooks');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">Notes</Typography>
        {!isSharedNotebook && <CreateNotes refetch={refetch} />}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {notes.map((note) => (
          <Card key={note._id} className="cursor-pointer">
            <CardBody className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Typography variant="h5" className="font-bold">
                  {note.title}
                </Typography>
                {!isSharedNotebook && (
                  <div className="flex gap-2">
                    <EditNote note={note} refetch={refetch} />
                    <IconButton
                      color="red"
                      size="sm"
                      onClick={() => handleDelete(note._id)}
                    >
                      <FaTrash className="h-5 w-5" />
                    </IconButton>
                  </div>
                )}
              </div>
              <Typography variant="body2" color="gray" className="mb-4">
                {note.content}
              </Typography>
              {note.images && note.images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-5">
                  {note.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={formatImageUrl(image)}
                      alt={`Note ${note.title} - ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;
