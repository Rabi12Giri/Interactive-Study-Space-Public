import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../../utils';

const SharedNotebooksList = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const {
    data: notebooks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['SharedNotebooks'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: '/notebooks/shared/',
      });
      return res.data || [];
    },
  });

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
        <Typography variant="h4">Shared Notebooks</Typography>
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
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SharedNotebooksList;
