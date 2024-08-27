import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import END_POINTS from '../../constants/endpoints';
import { allApplicantList, toggleShortlistStatus } from '../../api/services/job';
import { useParams, useNavigate } from 'react-router-dom';
const { USER_APPLIED_JOB_LIST, JOB_ACTION } = END_POINTS;
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function JobDetailScreen() {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0);
  const searchParams = useParams();
  const [jobDetail, setJobDetail] = useState([]);
  const [candiDates, setCandidates] = useState([])
  const [params, setParams] = useState({
    page: 1,
    limit: '',
    search: '',
    status: ''
  })
  const handleTabChange = (event, newValue) => {
    console.log(newValue, 'newValue')
    switch (newValue) {
      case 0:
        setParams({ ...params, status: "" })
        break;
      case 1:
        setParams({ ...params, status: "shortlisted" })
        break;
      case 2:
        setParams({ ...params, status: "trails" })
        break;
      case 3:
        setParams({ ...params, status: "selected" })
        break;
      case 4:
        setParams({ ...params, status: "not shortlisted" })
        break;

      default:
        setParams({ ...params, status: "" })
    }
    setTabValue(newValue);
  };


  const fetchJobs = async () => {
    const response = await allApplicantList(USER_APPLIED_JOB_LIST, {
      params: {
        jobId: searchParams.id,
        ...params
      }
    });


    console.log(response, " >>?>? ")
    if (response) {
      setJobDetail(response)
      // setCandidates(response)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [tabValue]);

  console.log(jobDetail, "Job Detailvjlajdl")
  return (
    <Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {jobDetail?.title}
        </Typography>
        <Divider />

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {jobDetail?.city}, {jobDetail?.state}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Pay:</strong> ₹{jobDetail?.pay_from} - ₹{jobDetail?.pay_to}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Shift:</strong> {jobDetail?.shift}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Working Hours:</strong> {jobDetail?.working_hours}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Experience:</strong> {jobDetail?.experience} years
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Car Name:</strong> {jobDetail?.car_name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Car Type:</strong> {jobDetail?.car_type}
          </Typography>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong>
          </Typography>
          <Typography variant="body2" component="div">
            <div dangerouslySetInnerHTML={{ __html: jobDetail?.description }} />
          </Typography>
        </Box>
      </Box>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="All" />
        <Tab label="Shortlisted" />
        <Tab label="Trials" />
        <Tab label="Selected" />
        <Tab label="Unselected" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams, navigate)}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams, navigate)}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams, navigate)}
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams, navigate)}
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams, navigate)}
      </TabPanel>
    </Box>
  );
}

function renderCandidateCards(candidates, searchParams, navigate) {

  const onShortlist = async (id) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: true,
      remark: "string"
    })
  }

  const onReject = async (id) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: false,
      remark: "string"
    })
  }

  const onSelect = () => {

  }

  const onUnselect = () => {

  }

  const handleAction = async (id, status) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: false,
      remark: "string"
    })
  }

  const renderButtons = (candidate) => {
    switch (candidate.status) {
      case 'applied':
        return (
          <>
            <Button variant="contained" color="primary" onClick={() => onShortlist(candidate?._id)}>
              Shortlist
            </Button>
            <Button variant="contained" color="secondary" onClick={() => onReject(candidate?._id)}>
              Reject
            </Button>
          </>
        );
      case 'shortlisted':
        return (
          <>
            <Button variant="contained" color="primary" onClick={onSelect}>
              Select For Trials
            </Button>
            <Button variant="contained" color="secondary" onClick={onUnselect}>
              Unselect
            </Button>
          </>
        );
      case 'trials':
        return (
          <>
            <Button variant="contained" color="primary" onClick={onSelect}>
              Select
            </Button>
            <Button variant="contained" color="secondary" onClick={onUnselect}>
              Unselect
            </Button>
          </>
        );
      case 'selected':
      case 'not shortlisted':
      default:
        return null; // No buttons displayed for 'selected' or 'rejected' status
    }
  };


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile No</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates?.map(candidate => (
            <TableRow key={candidate.id} onClick={() => navigate('/applicant')}>
              {
                console.log(candidate, 'candidate hain ??')
              }
              <TableCell>
                <Avatar
                  src={candidate?.profile_img || '/default-image.jpg'}
                  alt={`${candidate?.user_name} profile`}
                  sx={{ width: 50, height: 50 }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="h6">{candidate?.userDetails[0]?.full_name}</Typography>
              </TableCell>
              <TableCell>{candidate?.userDetails[0]?.email}</TableCell>
              <TableCell>{candidate?.userDetails[0]?.mobile_no}</TableCell>
              <TableCell>{candidate?.status}</TableCell>
              <TableCell>
                <Box display="flex" justifyContent="flex-start" className="!gap-4">
                  {renderButtons(candidate)}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
