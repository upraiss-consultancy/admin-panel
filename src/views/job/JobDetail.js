import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import END_POINTS from '../../constants/endpoints';
import { allApplicantList } from '../../api/services/job';
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
  const [params , setParams] = useState({

  })
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterCandidates = (status) => {
    if (status === 'All') {
      return job.candidates;
    }
    return job.candidates.filter(candidate => candidate.status === status);
  };

  const fetchJobs = async () => {
    const response = await allApplicantList(USER_APPLIED_JOB_LIST, {
        params: {
            ...params
        }
    });
    console.log(response , "RESPONDEE")
    if (response) {
        // setJobData(response?.data)
    }
}

  useEffect(() => {
    fetchJobs()
  },[])
  return (
    <Box>
      <Typography variant="h4">{job.title}</Typography>
      <Typography variant="subtitle1">Location: {job.location[0]?.city}, {job.location[1]?.state}</Typography>
      <Typography variant="subtitle2">Pay: {job.pay_from} - {job.pay_to}</Typography>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="All" />
        <Tab label="Shortlisted" />
        <Tab label="Selected" />
        <Tab label="Unselected" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {renderCandidateCards(filterCandidates('All'))}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderCandidateCards(filterCandidates('Shortlisted'))}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderCandidateCards(filterCandidates('Selected'))}
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        {renderCandidateCards(filterCandidates('Unselected'))}
      </TabPanel>
    </Box>
  );
}

function renderCandidateCards(candidates) {
  return (
    <Grid container spacing={3}>
      {candidates.map(candidate => (
        <Grid item xs={12} sm={6} md={4} key={candidate.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{candidate.name}</Typography>
              <Typography variant="body2">{candidate.email}</Typography>
              <Typography variant="body2">Status: {candidate.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
