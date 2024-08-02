import React, { useEffect, useState } from 'react';
import { deleteRequest, getRequest } from '../../../utils/apiHandler';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

const ViewResources = () => {
  const [resources, setResources] = useState([]);

  const fetchResource = async () => {
    const res = await getRequest({
      endpoint: '/resources/user',
    });

    if (res.ok) {
      setResources(res.data);
    }
  };

  useEffect(() => {
    fetchResource();
  }, []);

  const handleDeleteResource = async (resourceId) => {
    const res = await deleteRequest({
      endpoint: `/resources/${resourceId}`,
    });

    if (res.ok) {
      toast.success('Resource deleted successfully');
      fetchResource();
      return;
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Added Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card
            key={resource._id}
            className=" bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <CardBody className="p-4 relative">
              <div
                className="absolute right-4 cursor-pointer top-4 p-2 rounded-full bg-red-500"
                onClick={() => handleDeleteResource(resource._id)}
              >
                <MdDeleteForever className="text-white text-2xl" />
              </div>
              <Typography variant="h5" className="font-bold mb-2">
                Title: {resource.title}
              </Typography>
              <p className="mb-2">Description: {resource.description}</p>
              <p className="mb-2">
                Uploaded At: {new Date(resource.createdAt).toLocaleDateString()}
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
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewResources;
