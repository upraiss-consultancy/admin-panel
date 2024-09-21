import { Container, Grid, Paper, Typography, Card, CardContent, Stack, Tabs, Tab, Box, Avatar, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Bar } from 'react-chartjs-2';
import { useSpring, animated } from '@react-spring/web';
import WorkIcon from '@mui/icons-material/Work';
import { getJob } from "../../api/services/job";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import END_POINTS from "../../constants/endpoints";
import { getDriverList } from "../../api/services/driver";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const { GET_ALL_JOB, ALL_USER_ADMIN } = END_POINTS;
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
            <Avatar src={driver.profile_img} alt={driver.name} />
            <Box ml={2}>
                <Typography variant="h6">{driver.full_name}</Typography>
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


const DriverStatus = ({ navigate }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const [drivers, setDrivers] = useState([]);
    const fetchDrivers = async () => {
        const responseData = await getDriverList(ALL_USER_ADMIN, {
            params: {
                active_status: tabValue == 0 ? 'online' : 'offline'
            }

        });
        if (responseData?.data) {
            setDrivers(responseData?.data)
        }
    };
    useEffect(() => {
        fetchDrivers();
    }, [tabValue])

    const tabStyles = (isActive) => ({
        backgroundColor: isActive ? '#DD781E' : '#e0e0e0',
        color: isActive ? '#fff' : '#000',
        borderRadius: '4px',
        margin: '0 4px',
    });
    const handleViewDriver = (id) => {
        navigate(`/profile/${id}`)
    }

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
                {/* <Tab label="Blocked Driver" style={tabStyles(tabValue === 1)} className=" flex-1" /> */}
                <Tab label="Inactive Driver" style={tabStyles(tabValue === 1)} className=" flex-1" />
            </Tabs>

            <TabPanel value={tabValue} index={tabValue}>
                <Grid container spacing={2}>
                    {drivers?.map((driver, index) => (
                        <Grid item xs={12} md={12} key={index} onClick={() => handleViewDriver(driver?._id)}>
                            <DriverCard driver={driver} />
                        </Grid>
                    ))}
                </Grid>
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

const RecentJobItem = ({ job, navigate }) => {
    function timeAgo(timestamp) {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    }
    const handleNavigate = (id) => {
        navigate(`/all-candidates/${id}`)
    }
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2 }} onClick={() => handleNavigate(job?._id)}>
            <Grid container alignItems="center">
                <Grid item>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <WorkIcon />
                    </Avatar>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {'Drive Assist'} - {job.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {timeAgo(job?.createdAt)}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

const RecentJobs = ({ navigate }) => {
    const [jobData, setJobData] = useState([]);
    const fetchJobs = async () => {
        const response = await getJob(GET_ALL_JOB);
        if (response) {
            setJobData(response?.data)
        }
    }
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
    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <Box>
            <Typography variant="h5" mb={3}>
                Recent Jobs
            </Typography>
            {jobData.map((job, index) => (
                <RecentJobItem key={index} job={job} navigate={navigate} />
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
    const navigate = useNavigate()
    return (
        <>
            <Paper className=" py-5 px-5">
                <Box className=" flex justify-between items-start mb-4">

                    <Typography variant="h4" component="h3" className=" !mb-2">
                        Dashboard
                    </Typography>
                    <Box className="  flex justify-between items-center gap-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="From"

                                // onChange={(value) => setAllParams({ ...allParams, startDate: dayjs(value).format('YYYY-MM-DD') })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{ '& .MuiInputBase-root': { height: 40 } }} // Adjust height
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="To"

                                // onChange={(value) => setAllParams({ ...allParams, startDate: dayjs(value).format('YYYY-MM-DD') })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{ '& .MuiInputBase-root': { height: 40 } }} // Adjust height
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Grid container spacing={2}>

                    <Grid item xs={3}>

                        <Stack direction={'column'} gap={5} className=" mb-5">
                            <RideCard title="Total Rides" count={120} status="total" />
                            <RideCard title="Complete Rides" count={100} status="complete" />
                            <RideCard title="Cancel Rides" count={20} status="cancel" />
                        </Stack>
                        <Divider />
                        <Box className="mt-5">
                            <RecentJobs navigate={navigate} />
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        <Paper className=" p-5">
                            <DriverStatus navigate={navigate} />
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