import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Button , Divider } from '@mui/material';
import END_POINTS from '../../constants/endpoints';
import { allApplicantList, toggleShortlistStatus  } from '../../api/services/job';
import { useParams } from 'react-router-dom';
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
        setParams({ ...params, status: "selected" })
        break;
      case 3:
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
        <Tab label="Selected" />
        <Tab label="Unselected" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams)}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams)}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams)}
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        {renderCandidateCards(jobDetail?.jobhistory, searchParams)}
      </TabPanel>
    </Box>
  );
}

function renderCandidateCards(candidates, searchParams) {
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

  const renderButtons = (candidate) => {
    console.log(candidate, "Candidate")
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
    <Grid container spacing={3}>
      {candidates?.map(candidate => (
        <Grid item xs={12} sm={6} md={4} key={candidate.id}>
          <Card>
            <Box display="flex" p={2}>
              <CardMedia
                component="img"
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                image={candidate?.profile_img || '/default-image.jpg'}
                alt={`${candidate?.user_name} profile`}
              />
              <CardContent className='!pt-0'>
                <Typography variant="h6">{candidate?.user_name}</Typography>
                <Typography variant="body2">{candidate?.email}</Typography>
                <Typography variant="body2">{candidate?.mobile_no}</Typography>
                <Typography variant="body2">Status: {candidate.status}</Typography>
              </CardContent>
            </Box>
            <Box display="flex" justifyContent="space-between" p={2}>
              {renderButtons(candidate)}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
