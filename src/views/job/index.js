import { Paper, Box, Typography, TextField, IconButton, Button, Select, MenuItem, FormControl, InputLabel, TablePagination } from "@mui/material";
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
        page: 0,
        limit: 10,
        search: '',
        status: ''
    });
    const [jobData, setJobData] = useState([]);
    const [updateJobData, setUpdateJobData] = useState({})
    const fetchJobs = async () => {
        const response = await getJob(GET_ALL_JOB, {
            params: {
                ...params
            }
        });
        if (response) {
            setJobData(response?.data)
        }
    }

    const handleChangePage = (
        event,
        newPage
    ) => {
        setAllParams(prevParams => ({ ...prevParams, page: newPage }));
    };

    const handleChangeRowsPerPage = (
        event
    ) => {
        setAllParams(prevParams => ({ ...prevParams, page: 0, limit: parseInt(event.target.value, 10) }));
    };

    const handleUpdate = (data) => {
        setUpdateJobData(data)
        setOpen(true)
    }
    useEffect(() => {
        fetchJobs();
    }, [params])

    return (
        <>
            <Paper className="pt-2">


                {
                    open ? <JobForm setOpen={setOpen} updateJobData={updateJobData} fetchJobs={fetchJobs}/> : <Box>

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
                            <FormControl>
                                <InputLabel>Filter Jobs</InputLabel>
                                <Select
                                    // labelId="job-filter-label"
                                    id="job-filter"
                                    // value={filter}
                                    onChange={(e) => setAllParams({ ...params, status: e.target.value === 'All' ? '' : e.target.value })}
                                    defaultValue={'All'}
                                    className="!min-w-24 !h-10"
                                    label="Filter Jobs"
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="closed">Closed</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                className="!bg-[#DD781E]"
                                onClick={() => { setOpen(true); setUpdateJobData({}) }}
                            >
                                Create Job
                            </Button>
                        </Box>
                        <JobTable jobs={jobData} handleUpdate={handleUpdate} fetchJobs={fetchJobs} />
                        <TablePagination
                            component="div"
                            count={100}
                            page={params.page}
                            onPageChange={handleChangePage}
                            rowsPerPage={params.limit}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                }
            </Paper>
        </>
    )
}