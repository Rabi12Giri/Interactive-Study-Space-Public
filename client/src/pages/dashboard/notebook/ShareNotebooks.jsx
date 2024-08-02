import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getRequest, postRequest, useAuth } from '../../../utils';

const ShareNotebook = ({ notebookId, sharedUserIds }) => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([...sharedUserIds]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getRequest({ endpoint: '/users/' });
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open]);

  const handleToggleUser = (userId) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleShare = async () => {
    try {
      const res = await postRequest({
        endpoint: `/notebooks/${notebookId}/share`,
        data: { sharedUserIds: selectedUserIds },
      });
      setOpen(false);

      if (res.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Error sharing notebook', error);
    }
  };

  return (
    <>
      <IconButton color="blue" size="sm" onClick={() => setOpen(true)}>
        <FaShare className="h-5 w-5" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader>Share Notebook</DialogHeader>
        <DialogBody className="overflow-y-auto" style={{ maxHeight: '400px' }}>
          <div className="space-y-2">
            {users
              .filter((user) => user._id !== currentUser._id)
              .map((user) => (
                <div key={user._id} className="flex items-center">
                  <Checkbox
                    checked={selectedUserIds.includes(user._id)}
                    onChange={() => handleToggleUser(user._id)}
                    color="blue"
                  />
                  <Typography className="ml-2">{user.fullName}</Typography>
                </div>
              ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleShare} className="ml-4">
            Share
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ShareNotebook;
