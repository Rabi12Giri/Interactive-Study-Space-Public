import React from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { formatDuration, getRequest } from '../../../utils';
import CreateStudySessionDialog from './CreateStudySessionDialog';
import { STUDY_SESSION_STATUS } from '../../../constants';

const TABLE_HEAD = [
  'Title',
  'Start Time',
  'End Time',
  'Status',
  'Total Duration',
  'Actions',
];

const fetchSessions = async () => {
  const res = await getRequest({ endpoint: '/sessions/user' });
  return res.data || [];
};

export function SessionHistoryTable() {
  const navigate = useNavigate();

  const {
    data: sessions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
  });

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
        Error loading sessions
      </Typography>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">Session History</Typography>
        <CreateStudySessionDialog refetch={refetch} />
      </div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => {
              const isLast = index === sessions.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={session._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {session.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(session.startTime).toLocaleString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {session.endTime
                        ? new Date(session.endTime).toLocaleString()
                        : 'Ongoing'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {session.status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {session.totalDuration
                        ? formatDuration(session.totalDuration)
                        : 'Calculating...'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {session.status !== STUDY_SESSION_STATUS.COMPLETED && (
                      <Button
                        color="blue"
                        size="sm"
                        onClick={() =>
                          navigate(`/study-session/${session._id}`)
                        }
                      >
                        View Session
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default SessionHistoryTable;
