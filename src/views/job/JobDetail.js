import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import END_POINTS from '../../constants/endpoints';
import { allApplicantList } from '../../api/services/job';
import { useParams } from 'react-router-dom';
const { USER_APPLIED_JOB_LIST } = END_POINTS;
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

export default function JobDetailScreen({ job }) {
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
    if (response) {
      setJobDetail(response?.metadata)
      setCandidates(response?.data)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [tabValue]);
  return (
    <Box>
      <Typography variant="h4">{jobDetail[0]?.jobDetail?.title}</Typography>
      <Typography variant="subtitle1">Location: {jobDetail[0]?.jobDetail?.city}, {jobDetail[0]?.jobDetail?.state}</Typography>
      <Typography variant="subtitle2">Pay: {jobDetail[0]?.jobDetail?.pay_from} - {jobDetail[0]?.jobDetail?.pay_to}</Typography>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="All" />
        <Tab label="Shortlisted" />
        <Tab label="Selected" />
        <Tab label="Unselected" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {renderCandidateCards(candiDates)}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderCandidateCards(candiDates)}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderCandidateCards(candiDates)}
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        {renderCandidateCards(candiDates)}
      </TabPanel>
    </Box>
  );
}

function renderCandidateCards(candidates) {
  const onShortlist = () => {

  }

  const onReject = () => {

  }

  const onSelect = () => {

  }

  const onUnselect = () => {

  }

  const renderButtons = (candidate) => {
    switch (candidate.status) {
      case 'applied':
        return (
          <>
            <Button variant="contained" color="primary" onClick={onShortlist}>
              Shortlist
            </Button>
            <Button variant="contained" color="secondary" onClick={onReject}>
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
      {candidates.map(candidate => (
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
                image={candidate?.users?.profile_img || '/default-image.jpg'}
                alt={`${candidate?.users?.full_name} profile`}
              />
              <CardContent className='!pt-0'>
                <Typography variant="h6">{candidate?.users?.full_name}</Typography>
                <Typography variant="body2">{candidate?.users?.email}</Typography>
                <Typography variant="body2">{candidate?.users?.mobile_no}</Typography>
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
