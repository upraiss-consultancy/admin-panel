import { Avatar, Card, CardHeader, Container, Grid, CardActions, Button, Typography, IconButton, Stack, List, ListItemAvatar, ListItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { getDriverList } from "../../api/services/driver";
import { useEffect, useState } from "react";
import END_POINTS from "../../constants/endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import { assignRide } from "../../api/services/ride";
import showToast from "../../utils/toast";
function Drivers({ text }) {
    const [allDrivers, setAllDrivers] = useState([]);
    const [searchParams] = useSearchParams()
    const bookingId = searchParams.get('bookingId');
    const navigate = useNavigate();
    const { ALL_USER_ADMIN, ASSIGN_RIDE } = END_POINTS;
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fetchRides = async () => {
            const data = await getDriverList(ALL_USER_ADMIN);
            if (data?.length > 0) {
                setAllDrivers(data);
            }
        };
        fetchRides();
    }, []);

    const handleDrawer = () => {
        setOpen(true)
    }
    const handleAssign = async (_id) => {
        const response = await assignRide(ASSIGN_RIDE, { bookingId: bookingId, userId: _id });
        if (response) {
            showToast('Ride assign to driver successfully', 'success');
            navigate('/rides')
        }
    }
    return (
        <>
            <Container className=" !px-0">
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <IconButton>
                        <NavLink to={'/rides'}>
                            <ArrowBackIcon />
                        </NavLink>
                    </IconButton>
                    <Typography>{bookingId ? "Suggestions" : "Drivers"}</Typography>
                </Stack>
                <Grid container spacing={2} className="!mt-4 !mx-0">
                    {
                        allDrivers?.map((data) => <Grid item xs={6} sm={4} md={4}>
                            {console.log(data, "data")}
                            <Card>
                                <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                </Avatar>} action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                    title={data?.full_name}
                                    subheader="September 14, 2016" />
                                <CardActions className="!w-full ">
                                    <Stack direction={'row'} justifyContent={'space-between'} className=" !w-full" gap={2}>
                                        <Button className="w-full" onClick={handleDrawer}>View Profile</Button>
                                        {
                                            bookingId && <Button className="w-full" onClick={() => handleAssign(data?._id)}>Assign</Button>
                                        }
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>)
                    }
                </Grid>
                <Drawer open={open} anchor="right">
                    <List>
                        <ListItemAvatar>
                            <Avatar alt="Profile-Image" src="https://mui.com/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItem>
                            Name: Kanhaiya SIngh
                        </ListItem>
                    </List>

                </Drawer>
            </Container>
        </>
    )
}

export default Drivers;