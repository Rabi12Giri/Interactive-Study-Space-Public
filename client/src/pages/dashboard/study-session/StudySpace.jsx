import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
} from '@material-tailwind/react';
import { getRequest, postRequest } from '../../../utils';
import { toast } from 'react-toastify';
import { STUDY_SESSION_STATUS } from '../../../constants';

const StudySpace = () => {
  const { studySessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [timer, setTimer] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await getRequest({
          endpoint: `/sessions/${studySessionId}`,
        });
        const sessionData = res.data;
        setSession(sessionData);

        // Calculate the time difference and set the initial timer
        const startTime = new Date(sessionData.startTime).getTime();
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        setTimer(elapsedTime);
      } catch (error) {
        console.error('Error fetching session', error);
        toast.error('Failed to load session');
      }
    };

    fetchSession();
  }, [studySessionId]);

  useEffect(() => {
    let interval;
    if (session && session.status === STUDY_SESSION_STATUS.ONGOING) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session]);

  const handlePause = async () => {
    try {
      await postRequest({
        endpoint: `/sessions/${studySessionId}/pause`,
      });
      setSession((prev) => ({ ...prev, status: STUDY_SESSION_STATUS.PAUSED }));
      toast.success('Session paused');
    } catch (error) {
      console.error('Error pausing session', error);
      toast.error('Failed to pause session');
    }
  };

  const handleResume = async () => {
    try {
      await postRequest({
        endpoint: `/sessions/${studySessionId}/resume`,
      });
      setSession((prev) => ({ ...prev, status: STUDY_SESSION_STATUS.ONGOING }));
      toast.success('Session resumed');
    } catch (error) {
      console.error('Error resuming session', error);
      toast.error('Failed to resume session');
    }
  };

  const handleEnd = async () => {
    try {
      await postRequest({
        endpoint: `/sessions/${studySessionId}/end`,
      });
      toast.success('Session ended');
      navigate('/dashboard/study-session');
    } catch (error) {
      console.error('Error ending session', error);
      toast.error('Failed to end session');
    }
  };

  const handleConfirmLeave = async () => {
    await handleEnd();
  };

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-100">
      {session ? (
        <>
          <Typography variant="h4" className="mb-4">
            {session.title}
          </Typography>
          <Card className="w-full max-w-md mb-6">
            <CardBody className="flex flex-col items-center justify-center">
              <Typography variant="h2" className="font-mono">
                {formatTimer(timer)}
              </Typography>
              <Typography variant="body2" color="gray" className="mt-2">
                Timer (hh:mm:ss)
              </Typography>
            </CardBody>
          </Card>
          <div className="flex gap-4 mt-4">
            {session.status === STUDY_SESSION_STATUS.ONGOING && (
              <Button color="yellow" onClick={handlePause}>
                Pause
              </Button>
            )}
            {session.status === STUDY_SESSION_STATUS.PAUSED && (
              <Button color="green" onClick={handleResume}>
                Resume
              </Button>
            )}
            <Button color="red" onClick={() => setOpenDialog(true)}>
              End
            </Button>
          </div>
        </>
      ) : (
        <Typography variant="h4">Loading session...</Typography>
      )}
      <Dialog open={openDialog} onClose={handleCancelDialog}>
        <DialogBody>
          Are you sure you want to leave? Your session will be ended.
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleCancelDialog}>
            Cancel
          </Button>
          <Button color="green" onClick={handleConfirmLeave} className="ml-4">
            End Session and Leave
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default StudySpace;
