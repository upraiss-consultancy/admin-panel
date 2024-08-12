import { Container, Grid, Paper, Typography, Card, CardContent, Stack, Tabs, Tab, Box, Avatar, Divider } from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Bar } from 'react-chartjs-2';
import { useSpring, animated } from '@react-spring/web';
import WorkIcon from '@mui/icons-material/Work';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AnimatedNumber = ({ number }) => {
    const props = useSpring({ number, from: { number: 0 }, config: { duration: 1000 } });
    return <animated.div>{props.number.to((n) => n.toFixed(0))}</animated.div>;
};

const FinancialSummary = () => {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Revenue',
                data: [12000, 15000, 8000, 20000, 18000, 22000],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Expenses',
                data: [8000, 7000, 6000, 10000, 12000, 15000],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Box>
            <Typography variant="h5" mb={2}>
                Financial Summary
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="subtitle1">Total Revenue</Typography>
                        <Typography variant="h4">
                            <AnimatedNumber number={87000} />
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="subtitle1">Total Expenses</Typography>
                        <Typography variant="h4">
                            <AnimatedNumber number={60000} />
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="subtitle1">Net Profit</Typography>
                        <Typography variant="h4" color="success.main">
                            <AnimatedNumber number={27000} />
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box mt={4} height={400}>
                <Bar data={chartData} options={chartOptions} />
            </Box>
        </Box>
    );
};


const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const DriverCard = ({ driver }) => {
    return (
        <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={driver.image} alt={driver.name} />
            <Box ml={2}>
                <Typography variant="h6">{driver.name}</Typography>
                <Box display="flex" alignItems="center">
                    <CheckCircleIcon style={{ color: 'green', fontSize: 16 }} />
                    <Typography variant="body2" color="textSecondary" ml={1}>
                        {driver.status}
                    </Typography>
                </Box>
                <Typography variant="body2">{driver.details}</Typography>
            </Box>
        </Box>
    );
};


const DriverStatus = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Example drivers data
    const drivers = [
        {
            image: 'https://via.placeholder.com/150',
            name: 'John Doe',
            status: 'Active',
            details: 'Driver since 2021, 500 rides completed',
        },
        {
            image: 'https://via.placeholder.com/150',
            name: 'Jane Smith',
            status: 'Active',
            details: 'Driver since 2020, 350 rides completed',
        },
    ];

    const tabStyles = (isActive) => ({
        backgroundColor: isActive ? '#DD781E' : '#e0e0e0', // Active tab: blue, Inactive tab: light grey
        color: isActive ? '#fff' : '#000',
        borderRadius: '4px',
        margin: '0 4px',
    });

    return (
        <Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Active Driver" style={tabStyles(tabValue === 0)} className=" flex-1" />
                <Tab label="Blocked Driver" style={tabStyles(tabValue === 1)} className=" flex-1" />
                <Tab label="Inactive Driver" style={tabStyles(tabValue === 2)} className=" flex-1" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2}>
                    {drivers.map((driver, index) => (
                        <Grid item xs={12} md={12} key={index}>
                            <DriverCard driver={driver} />
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Typography variant="h6">Blocked Driver Details Here</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Typography variant="h6">Inactive Driver Details Here</Typography>
            </TabPanel>
        </Box>
    );
};
const RideCard = ({ title, count, status }) => {
    // Define background colors based on ride status
    const getBackgroundColor = (status) => {
        switch (status) {
            case 'complete':
                return '#4caf50'; // Green for completed rides
            case 'cancel':
                return '#f44336'; // Red for canceled rides
            default:
                return '#DD781E'; // Blue for total rides
        }
    };

    return (
        <Card style={{ backgroundColor: getBackgroundColor(status) }}>
            <CardContent>
                <Typography variant="h6" className="text-white">{title}</Typography>
                <Typography variant="h4" className="text-white">{count}</Typography>
            </CardContent>
        </Card>
    );
};


const RecentActivityItem = ({ activity }) => {
    return (
        <Box display="flex" alignItems="flex-start" mb={3} p={2} borderRadius="8px" border="1px solid #e0e0e0">
            <Avatar src={activity.driverImage} alt={activity.driverName} />
            <Box ml={2}>
                <Typography variant="h6">{activity.driverName}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {activity.date} at {activity.time}
                </Typography>
                <Typography variant="body1" mt={1}>
                    {activity.details}
                </Typography>
            </Box>
        </Box>
    );
};

const RecentJobItem = ({ job }) => {
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Grid container alignItems="center">
                <Grid item>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <WorkIcon />
                    </Avatar>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {job.company} - {job.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {job.date}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

const RecentJobs = () => {
    const jobs = [
        {
            title: 'Software Engineer',
            company: 'Tech Corp',
            location: 'New York, NY',
            date: 'Posted 2 days ago',
        },
        {
            title: 'UI/UX Designer',
            company: 'Design Studio',
            location: 'San Francisco, CA',
            date: 'Posted 5 days ago',
        },
        {
            title: 'Product Manager',
            company: 'Innovate Inc.',
            location: 'Austin, TX',
            date: 'Posted 1 week ago',
        },
        // Add more jobs as needed
    ];

    return (
        <Box>
            <Typography variant="h5" mb={3}>
                Recent Jobs
            </Typography>
            {jobs.map((job, index) => (
                <RecentJobItem key={index} job={job} />
            ))}
        </Box>
    );
};

const RecentActivity = () => {
    // Example data for recent activities
    const activities = [
        {
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Kanhaiya Singh',
            date: 'Aug 10, 2024',
            time: '10:30 AM',
            details: 'Completed a ride from A to B. Passenger rated 5 stars.',
        },
        {
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Dhyana Dave',
            date: 'Aug 10, 2024',
            time: '9:45 AM',
            details: 'Reported an issue with the vehicle during a ride.',
        },
        {
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Kanhaiya Singh',
            date: 'Aug 10, 2024',
            time: '10:30 AM',
            details: 'Completed a ride from A to B. Passenger rated 5 stars.',
        },
        {
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Dhyana Dave',
            date: 'Aug 10, 2024',
            time: '9:45 AM',
            details: 'Reported an issue with the vehicle during a ride.',
        },
        {
            driverImage: 'https://via.placeholder.com/150',
            driverName: 'Kanhaiya Singh',
            date: 'Aug 10, 2024',
            time: '9:45 AM',
            details: 'Reported an issue with the vehicle during a ride.',
        },
        // Add more activities as needed
    ];

    return (
        <Box>
            <Typography variant="h5" mb={2}>
                Recent Activity
            </Typography>
            <Grid container direction="column">
                {activities.map((activity, index) => (
                    <Grid item key={index}>
                        <RecentActivityItem activity={activity} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

function Dashboard() {
    return (
        <>
            <Paper className=" py-5 px-5">
                <Typography variant="h4" component="h3" className=" !mb-2">
                    Dashboard
                </Typography>
                <Grid container spacing={2}>

                    <Grid item xs={3}>

                        <Stack direction={'column'} gap={5} className=" mb-5">
                            <RideCard title="Total Rides" count={120} status="total" />
                            <RideCard title="Complete Rides" count={100} status="complete" />
                            <RideCard title="Cancel Rides" count={20} status="cancel" />
                        </Stack>
                        <Divider />
                        <Box className="mt-5">
                            <RecentJobs />
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        <Paper className=" p-5">
                            <DriverStatus />
                            <Divider />
                            <Box className=" mt-4">
                                <FinancialSummary />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>

                        <RecentActivity />

                    </Grid>
                </Grid>
            </Paper>

        </>
    )
}

export default Dashboard;