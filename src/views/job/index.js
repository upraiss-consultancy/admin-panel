import { Paper, Box, Typography, TextField, IconButton, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import JobTable from "./JobTable";
import { useEffect, useState } from "react";
import END_POINTS from "../../constants/endpoints";
import { getJob } from "../../api/services/job";
import JobForm from "./CreateJob";
const { GET_ALL_JOB } = END_POINTS;
export const Job = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('')
    const [params, setAllParams] = useState({
        page: 1,
        limit: 10,
        search: ''
    });
    const [jobData, setJobData] = useState([])
    const fetchJobs = async () => {
        const response = await getJob(GET_ALL_JOB, {
            params: {
                ...params
            }
        });
        console.log(response , "RESPONDEE")
        if (response) {
            setJobData(response?.data)
        }
    }
    useEffect(() => {
        fetchJobs();
    }, [params])
    return (
        <>
            <Paper className="pt-2">


                {
                    open ? <JobForm setOpen={setOpen} /> : <Box>

                        <Box className="flex my-2 mt-2 justify-between px-4">
                            <Typography variant="h6" component="div">
                                All Jobs
                            </Typography>
                            <TextField placeholder="Search Job..." sx={{
                                '& .MuiInputBase-root': {
                                    height: 40,  // Set the height you need
                                },
                            }} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => {
                                            // if (search.trim() !== "") {
                                            setAllParams(prevState => ({ ...prevState, search: search }))
                                            // }
                                        }}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>

                                )
                            }} onChange={(e) => setSearch(e.target.value)} />
                            <Button
                                variant="contained"
                                className="!bg-[#DD781E]"
                                onClick={() => setOpen(true)}
                            >
                                Create Job
                            </Button>
                        </Box>
                        <JobTable jobs={jobData}/>
                    </Box>
                }
            </Paper>
        </>
    )
}