import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Avatar, Divider, List, ListItem, ListItemText, Button, Box,  } from '@mui/material';
import END_POINTS from '../../constants/endpoints';
import { allApplicantList, toggleShortlistStatus } from '../../api/services/job'
const { USER_APPLIED_JOB_LIST, JOB_ACTION } = END_POINTS;

const ApplicantDetailView = () => {
  const { state } = useLocation();
  console.log(state, "state")
  const applicant = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    profileImage: 'https://via.placeholder.com/150', // Replace with actual image URL
    licenseNumber: 'DL12345678',
    experience: 5,
    vehicleType: 'Sedan',
    applicationDate: '2024-08-20',
    additionalInfo: 'John has extensive experience in city driving and long-haul trips.'
  };
  const onShortlist = async (id) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: 'shortlist',
      remark: "string"
    })
    console.log(response, "Response")
  }

  const onReject = async (id) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: 'unselected',
      remark: "string"
    });
    console.log(response , "response")
  }

  const onTrials = async (id) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: 'trails',
      remark: "string"
    })
    console.log(response , "response")
  }

  const onSelect = async (id) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: 'selected',
      remark: "string"
    })
  }

  const onUnselect = async (id) => {
    const response = await toggleShortlistStatus(JOB_ACTION, {
      jobId: id,
      type: 'unselected',
      remark: "string"
    })
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
            <Button variant="contained" color="primary" onClick={(e) => { onShortlist(candidate?._id); e.stopPropagation() }}>
              Shortlist
            </Button>
            <Button variant="contained" color="secondary" onClick={(e) => { onReject(candidate?._id); e.stopPropagation() }}>
              Reject
            </Button>
          </>
        );
      case 'shortlisted':
        return (
          <>
            <Button variant="contained" color="primary" onClick={(e) => { onTrials(candidate?._id); e.stopPropagation() }}>
              Select For Trials
            </Button>
            <Button variant="contained" color="secondary" onClick={(e) => { onUnselect(candidate?._id); e.stopPropagation() }}>
              Unselect
            </Button>
          </>
        );
      case 'trails':
        return (
          <>
            <Button variant="contained" color="primary" onClick={(e) => { onSelect(candidate?._id); e.stopPropagation() }}>
              Select
            </Button>
            <Button variant="contained" color="secondary" onClick={(e) => { onUnselect(); e.stopPropagation() }}>
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
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {/* Applicant Basic Info */}
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <Avatar
            src={state?.candidate?.userDetails[0]?.profile_img}
            alt={applicant.name}
            style={{ width: '120px', height: '120px', margin: 'auto' }}
          />
          <Typography variant="h5" style={{ marginTop: '10px' }}>
            {state?.candidate?.userDetails[0]?.full_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {state?.candidate?.userDetails[0]?.email}
          </Typography>
        </Grid>

        {/* Applicant Details */}
        <Grid item xs={12} md={8}>
          <List>
            <ListItem>
              <ListItemText primary="Phone" secondary={state?.candidate?.userDetails[0]?.mobile_no} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="License Number" secondary={state?.candidate?.userDetails[0]?.dl_no} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Experience" secondary={`${applicant.experience} years`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Vehicle Type" secondary={state?.candidate?.userDetails[0]?.vehicle_type} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Application Date" secondary={state?.candidate?.userDetails[0]?.createdAt} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Actions" secondary={<Box className=" flex gap-2">{renderButtons(state?.candidate)}</Box>} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      
{}
      {/* Additional Details */}
      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="h6">Additional Information</Typography>
      <Typography variant="body2" color="textSecondary">
        {applicant.additionalInfo || 'No additional information provided.'}
      </Typography>
    </Paper>

  );
};

export default ApplicantDetailView;
