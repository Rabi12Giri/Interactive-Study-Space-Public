import React, { useState } from 'react';
import { postRequest } from '../../../utils/apiHandler';
import { toast } from 'react-toastify';

const Resource = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || images.length === 0) {
      toast.error('Title and at least one file are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    const response = await postRequest({
      endpoint: '/resources',
      data: formData,
    });

    if (response.ok) {
      toast.success('Resource created successfully');
      setTitle('');
      setDescription('');
      setImages([]);
    } else {
      toast.error(response.message || 'An error occurred');
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Create Resource</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Resource
        </button>
      </form>
    </div>
  );
};

export default Resource;
