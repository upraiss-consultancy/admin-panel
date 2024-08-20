import React from 'react';
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { formatDistanceToNow } from 'date-fns';
export default function JobTable({ jobs }) {
    function timeAgo(timestamp) {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
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
                        <TableCell>Working Hours</TableCell>
                        <TableCell>Pay</TableCell>
                        <TableCell>Experience</TableCell>
                        <TableCell>License</TableCell>
                        <TableCell>Car Name</TableCell>
                        <TableCell>Car Type</TableCell>
                        <TableCell>Job Details</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Applicants</TableCell>
                        <TableCell>Post Time</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs?.map((job, index) => (
                        <TableRow key={job._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.job_type}</TableCell>
                            <TableCell>{job.shift}</TableCell>
                            <TableCell>{job.working_hours}</TableCell>
                            <TableCell>{job.pay_from}  -{job.pay_to}</TableCell>
                            <TableCell>{job.experience}</TableCell>
                            <TableCell>{job.license}</TableCell>
                            <TableCell>{job.car_name}</TableCell>
                            <TableCell>{job.car_type}</TableCell>
                            <TableCell>{job.job_details}</TableCell>
                            <TableCell>{job?.location + "," + job?.city + "," + job?.state}</TableCell>
                            <TableCell><div dangerouslySetInnerHTML={{ __html: job.description }} /></TableCell>
                            <TableCell className='text-center'>
                                <Stack direction={'row'} alignItems={'center'}>
                                    <Typography>
                                        {job?.request_count}
                                    </Typography>
                                    <IconButton>
                                        <RemoveRedEyeIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                            <TableCell>{timeAgo(job?.createdAt)}</TableCell>
                            <TableCell>{job?.job_status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
