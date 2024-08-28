import React from 'react';
import { Box, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import END_POINTS from '../../constants/endpoints';
import { deleteJob , closeJob } from '../../api/services/job';
import CloseIcon from '@mui/icons-material/Close';
const { DELETE_JOB , CLOSE_JOB} = END_POINTS;
export default function JobTable({ jobs , handleUpdate , fetchJobs}) {
    const navigate = useNavigate()
    function timeAgo(timestamp) {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    }
    const handleNavigate = (id) => {
        navigate(`/all-candidates/${id}`)
    }
    const handleDelete = async (jobId) => {
        try {
            const response = await deleteJob(DELETE_JOB, {
                data: { jobId: jobId }
            });
            console.log(response , "response")
            fetchJobs()
        } catch (error) {
            console.log(error, "Error")
        }
    }
    const handleClose = async (jobId) => {
        try {
            const response = await closeJob(CLOSE_JOB, {
                data: { jobId: jobId }
            });
            fetchJobs()
        } catch (error) {
            console.log(error, "Error")
        }
    }
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Job Type</TableCell>
                        <TableCell>Shift</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Pay</TableCell>
                        <TableCell>Experience</TableCell>
                        <TableCell>Car Name</TableCell>
                        <TableCell>Car Type</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Applicants</TableCell>
                        <TableCell>Post Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs?.map((job, index) => (
                        <TableRow key={job._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.job_type}</TableCell>
                            <TableCell>{job.shift}</TableCell>
                            <TableCell>{job.duration}</TableCell>
                            <TableCell>{job.pay_from}  -{job.pay_to}</TableCell>
                            <TableCell>{job.experience}</TableCell>
                            <TableCell>{job.car_name}</TableCell>
                            <TableCell>{job.car_type}</TableCell>
                            <TableCell>{job?.location + "," + job?.city + "," + job?.state}</TableCell>
                            <TableCell className='text-center'>
                                <Stack direction={'row'} alignItems={'center'}>
                                    <Typography>
                                        {job?.request_count}
                                    </Typography>
                                    <IconButton onClick={() => handleNavigate(job?._id)}>
                                        <RemoveRedEyeIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                            <TableCell>{timeAgo(job?.createdAt)}</TableCell>
                            <TableCell>{job?.job_status}</TableCell>
                            <TableCell >
                                <Box className=" flex">
                                    <IconButton onClick={() => handleUpdate(job)}>
                                        <EditNoteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(job._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleClose(job._id)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
