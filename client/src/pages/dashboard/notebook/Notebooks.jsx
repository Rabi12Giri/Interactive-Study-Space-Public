import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa'; // Importing react-icons
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteRequest, getRequest } from '../../../utils';
import CreateNotebookButton from './CreateNotebookButton';
import ShareNotebook from './ShareNotebooks';

const Notebooks = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const {
    data: notebooks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['Notebooks'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/notebooks/author',
      });
      return res.data || [];
    },
  });

  const handleDelete = async (notebookId) => {
    try {
      const res = await deleteRequest({
        endpoint: `/notebooks/${notebookId}`,
      });

      if (res.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      refetch();
    } catch (error) {
      console.error('Error deleting notebook', error);
    }
  };

  if (isLoading) {
    return (
      <Typography variant="h4" className="p-8">
        Loading......
      </Typography>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <Typography variant="h4">Notebooks</Typography>
        <CreateNotebookButton onSuccess={refetch} />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {notebooks.map((notebook) => (
          <Card key={notebook._id} className="relative cursor-pointer">
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
              <Button
                color="blue"
                size="sm"
                className="mt-4"
                onClick={() => navigate(`notes/${notebook._id}`)}
              >
                View Notes
              </Button>
              <div className="absolute top-2 right-2 flex gap-2">
                <ShareNotebook
                  notebookId={notebook._id}
                  sharedUserIds={notebook.shared}
                />
                <IconButton
                  color="red"
                  size="sm"
                  onClick={() => handleDelete(notebook._id)}
                >
                  <FaTrash className="h-5 w-5" />
                </IconButton>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notebooks;
