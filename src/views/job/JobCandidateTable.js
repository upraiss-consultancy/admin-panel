import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const JobTable = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const candidates = [
    {
      name: "John Doe",
      status: "Selected",
      title: "Car Driver",
      pay_from: 12000,
      pay_to: 15000,
      job_details: "Mern stack",
      location: {
        city: "Gurugram",
        state: "Haryana",
        address: "cddvgvf"
      },
      working_hours: "2 hr",
      job_type: "Full Time",
      shift: "Day Shift",
      car_name: "Suv",
      car_type: "Manual",
      description: "sdfgbbfvdcx sadfbfvdcx adsfgbhfd",
      pay_type: "noida",
      experience: "noida",
      license: "noida"
    },
    {
      name: "Jane Smith",
      status: "Rejected",
      title: "Car Driver",
      pay_from: 12000,
      pay_to: 15000,
      job_details: "Mern stack",
      location: {
        city: "Gurugram",
        state: "Haryana",
        address: "cddvgvf"
      },
      working_hours: "2 hr",
      job_type: "Full Time",
      shift: "Day Shift",
      car_name: "Suv",
      car_type: "Manual",
      description: "sdfgbbfvdcx sadfbfvdcx adsfgbhfd",
      pay_type: "noida",
      experience: "noida",
      license: "noida"
    },
    {
      name: "Alice Johnson",
      status: "Shortlisted",
      title: "Car Driver",
      pay_from: 12000,
      pay_to: 15000,
      job_details: "Mern stack",
      location: {
        city: "Gurugram",
        state: "Haryana",
        address: "cddvgvf"
      },
      working_hours: "2 hr",
      job_type: "Full Time",
      shift: "Day Shift",
      car_name: "Suv",
      car_type: "Manual",
      description: "sdfgbbfvdcx sadfbfvdcx adsfgbhfd",
      pay_type: "noida",
      experience: "noida",
      license: "noida"
    },
  ];

  const getCandidatesByStatus = (status) => {
    return candidates.filter(candidate => candidate.status === status);
  };

  const renderTable = (data) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Pay Range</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((candidate, index) => (
            <TableRow key={index}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.title}</TableCell>
              <TableCell>{`${candidate.location.city}, ${candidate.location.state}, ${candidate.location.address}`}</TableCell>
              <TableCell>{`${candidate.pay_from} - ${candidate.pay_to}`}</TableCell>
              <TableCell>{candidate.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="All Candidates" />
        <Tab label="Selected Candidates" />
        <Tab label="Rejected Candidates" />
        <Tab label="Shortlisted Candidates" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {selectedTab === 0 && renderTable(candidates)}
        {selectedTab === 1 && renderTable(getCandidatesByStatus('Selected'))}
        {selectedTab === 2 && renderTable(getCandidatesByStatus('Rejected'))}
        {selectedTab === 3 && renderTable(getCandidatesByStatus('Shortlisted'))}
      </Box>
    </Box>
  );
};

export default JobTable;
