import { Avatar, Card, CardHeader, Container, Grid, CardActions, Button, Typography, IconButton, Stack } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { getDriverList } from "../../api/services/driver";
import { useEffect, useState } from "react";
import END_POINTS from "../../constants/endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";

// import Drawer from '@mui/material/Drawer';
function Drivers({ text, booking_id , booking_list}) {
    const [allDrivers, setAllDrivers] = useState([])
    const { ALL_USER_ADMIN , USER_INTERESTED_BOOKING_LIST } = END_POINTS;
    useEffect(() => {
        const fetchRides = async () => {
            const data = await getDriverList(ALL_USER_ADMIN);
            if (data?.length > 0) {
                setAllDrivers(data);
            }
        };
        fetchRides();
    }, []);


    return (
        <>
            <Container className=" !px-0">
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <IconButton>
                        <NavLink to={'/rides'}>
                            <ArrowBackIcon />
                        </NavLink>
                    </IconButton>
                    <Typography>Interested Riders</Typography>
                </Stack>
                <Grid container spacing={2} className="!mt-4">
                    {
                        allDrivers?.map((data) => <Grid item xs={6} sm={4} md={4}>
                            <Card>
                                <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>} action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                    title="Shrimp and Chorizo Paella"
                                    subheader="September 14, 2016" />
                                <CardActions className="!w-full ">
                                    <Stack direction={'row'} justifyContent={'space-between'} className=" !w-full" gap={2}>
                                        <Button className="w-full">View Profile</Button>
                                        <Button className="w-full">Assign</Button>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>)
                    }

                </Grid>

            </Container>
        </>
    )
}

export default Drivers;