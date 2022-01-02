import { Typography, Box, Card, CardContent, Grid, CardActions, Button, Snackbar, Alert } from "@mui/material";
import useSWR from 'swr';
import axios from 'axios';
import { API_ENDPOINT } from "../util/consts";
import React from 'react';

const RenderStatus = ({ status }) => {
    if (status == "running") {
        return <Typography variant="h6" color="green">
            {status}
        </Typography>
    }

    else if (status == "pulled") {
        return <Typography variant="h6" color="grey">
            {status}
        </Typography>
    }

    else {
        return <Typography variant="h6" color="red">
            {status}
        </Typography>
    }
}

const RenderBoxesCards = ({ status, mutate, setOpen }) => {
    return status.map(item =>
        <Card variant="outlined" key={item.name}>
            <CardContent>
                <Grid sx={{ display: 'flex' }} container>
                    <Grid item sm>
                        <Typography variant="h5">
                            {item.name}
                        </Typography>
                    </Grid>
                    <Grid item sm>
                        <RenderStatus status={item.status} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button onClick={() => {
                    axios.get(`${API_ENDPOINT}/container/${item.name}`).then((res) => {
                        if (res.data == "success") {
                            setOpen(true)
                            mutate()
                        }
                    })
                }}>Start</Button>
                <Button onClick={() => {
                    axios.delete(`${API_ENDPOINT}/container/${item.name}`).then((res) => {
                        if (res.data == "success") {
                            setOpen(true)
                            mutate()
                        }
                    })
                }}>Destroy</Button>
                <Button onClick={() => {
                    axios.post(`${API_ENDPOINT}/images/pull/${item.name}`).then((res) => {
                        if (res.data == "success") {
                            setOpen(true)
                            mutate()
                        }
                    })
                }}>Pull</Button>
            </CardActions>
        </Card>
    )
}

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
    const { data, error, mutate } = useSWR(`${API_ENDPOINT}/boxes/status`, fetcher)
    const [open, setOpen] = React.useState(false);

    const handleClose = (reason) => {
        setOpen(false);
    };


    if (error) {
        return "An error has occurred.";
    }
    if (!data) return "Loading...";

    return (
        <Box sx={{ mx: "auto", width: 1400 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h3">
                    Lessons
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3">
                    Boxes
                </Typography>
                <Grid sx={{ display: 'flex' }} container>
                    <Grid item sm>
                        <Typography variant="h5">Name</Typography>
                    </Grid>
                    <Grid item sm>
                        <Typography variant="h5">Status</Typography>
                    </Grid>
                </Grid>
                <RenderBoxesCards status={data} mutate={mutate} setOpen={setOpen} />
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Home