import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getRequest, postRequest } from '../utils';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';

const PublicResource = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ comment: '', rating: 0 });
  const [resourceId, setResourceId] = useState(null); // Corrected spelling here

  const fetchAllResources = async () => {
    const res = await getRequest({
      endpoint: '/resources',
    });

    if (res.ok) {
      setResources(res.data);
    }
  };

  useEffect(() => {
    fetchAllResources();
  }, []);

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedResource || !feedback.comment || feedback.rating <= 0) {
      return;
    }

    const res = await postRequest({
      endpoint: `resources/feedback/${resourceId}`,
      data: {
        comment: feedback.comment,
        rating: feedback.rating,
        resourceId: resourceId,
      },
    });

    if (res.ok) {
      setModalOpen(false);
      fetchAllResources();
      toast.success(res.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-center py-12 text-3xl font-semibold">Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] mx-auto">
          {resources.map((resource) => (
            <Card
              key={resource._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <CardBody className="p-4">
                <Typography variant="h5" className="font-bold mb-2">
                  Title: {resource.title}
                </Typography>
                <p className="mb-2">Description: {resource.description}</p>
                <p className="mb-2">
                  Uploaded At:{' '}
                  {new Date(resource.createdAt).toLocaleDateString()}
                </p>
                <div className="mb-2">
                  <p className="font-semibold">Rating: {resource.avgRating}</p>
                </div>
                {resource.fileNames.map((fileName, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8000/${fileName}`}
                    alt={fileName}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
                <p className="mt-4 text-gray-600">
                  Uploaded by: {resource.uploadedBy.fullName}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedResource(resource._id);
                    setResourceId(resource._id); // Ensure resourceId is set
                    setModalOpen(true);
                  }}
                >
                  Give Feedback
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <DialogHeader>Give Feedback</DialogHeader>
          <DialogBody>
            <Input
              name="comment"
              value={feedback.comment}
              onChange={handleFeedbackChange}
              className="mb-4"
              label="Your feedback comment"
            />
            <br />
            <Input
              name="rating"
              type="number"
              value={feedback.rating}
              onChange={handleFeedbackChange}
              placeholder="Rating (1-5)"
              className="mb-4"
              min="1"
              max="5"
              label="1 to 5"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={handleFeedbackSubmit} className="mr-2">
                Submit
              </Button>
              <Button onClick={() => setModalOpen(false)} variant="outlined">
                Cancel
              </Button>
            </div>
          </DialogBody>
        </div>
      </Dialog>
    </div>
  );
};

export default PublicResource;
