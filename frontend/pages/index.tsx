import {
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    CardActions,
    Button,
    Snackbar,
    Alert,
    Link,
    Tabs,
    Tab,
} from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import { API_ENDPOINT } from "../util/consts";
import React from "react";
import { getLessons } from "../util/fetcher";

const RenderStatus = ({ status }) => {
    if (status == "running") {
        return (
            <Typography variant="h6" color="green">
                {status}
            </Typography>
        );
    } else if (status == "pulled") {
        return (
            <Typography variant="h6" color="grey">
                {status}
            </Typography>
        );
    } else {
        return (
            <Typography variant="h6" color="red">
                {status}
            </Typography>
        );
    }
};

const RenderLessonBoxes = ({ boxes }) => {
    return boxes.map((item) => (
        <Card variant="outlined" key={item} sx={{ my: 1 }}>
            <CardContent>
                <Typography variant="h5">{item}</Typography>
            </CardContent>
        </Card>
    ));
};

const RenderLessonsCards = ({ lessons }) => {
    return lessons.map((item) => (
        <Card variant="outlined" key={item.name} sx={{ my: 2 }}>
            <CardContent>
                <Link href={`/lesson/${item.name}`} variant="h5">
                    {item.displayname}
                </Link>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {item.name}
                </Typography>
                <Typography sx={{ mb: 2 }}>{item.description}</Typography>
                <Typography variant="h6">Objective:</Typography>
                <Typography>{item.objective}</Typography>
                <Typography variant="h6">Prerequisites:</Typography>
                <Typography>{item.prerequisites}</Typography>
                <Typography variant="h6">Boxes:</Typography>
                <RenderLessonBoxes boxes={item.boxes} />
            </CardContent>
        </Card>
    ));
};

const RenderBoxesCards = ({ status, mutate, setOpen }) => {
    return status.map((item) => (
        <Card variant="outlined" key={item.name} sx={{ my: 2 }}>
            <CardContent>
                <Grid sx={{ display: "flex" }} container>
                    <Grid item sm>
                        <Typography variant="h5">
                            {item.display_name}
                        </Typography>
                        <Typography variant="subtitle1">{item.name}</Typography>
                    </Grid>
                    <Grid item sm>
                        <RenderStatus status={item.status} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => {
                        axios
                            .get(`${API_ENDPOINT}/container/${item.name}`)
                            .then((res) => {
                                if (res.data == "success") {
                                    setOpen(true);
                                    mutate();
                                }
                            });
                    }}
                >
                    Start
                </Button>
                <Button
                    onClick={() => {
                        axios
                            .delete(`${API_ENDPOINT}/container/${item.name}`)
                            .then((res) => {
                                if (res.data == "success") {
                                    setOpen(true);
                                    mutate();
                                }
                            });
                    }}
                >
                    Destroy
                </Button>
                <Button
                    onClick={() => {
                        axios
                            .post(`${API_ENDPOINT}/images/pull/${item.name}`)
                            .then((res) => {
                                if (res.data == "success") {
                                    setOpen(true);
                                    mutate();
                                }
                            });
                    }}
                >
                    Pull
                </Button>
            </CardActions>
        </Card>
    ));
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const LessonTab = ({ lessons }) => {
    return (
        <Box>
            <Typography variant="h3">Lessons</Typography>
            <RenderLessonsCards lessons={lessons} />
        </Box>
    );
};

const BoxTab = ({ data, mutate, setOpen }) => {
    return (
        <Box>
            <Typography variant="h3">Boxes</Typography>
            <Grid sx={{ display: "flex" }} container>
                <Grid item sm>
                    <Typography variant="h5">Name</Typography>
                </Grid>
                <Grid item sm>
                    <Typography variant="h5">Status</Typography>
                </Grid>
            </Grid>
            <RenderBoxesCards status={data} mutate={mutate} setOpen={setOpen} />
        </Box>
    );
};

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
    const { data, error, mutate } = useSWR(
        `${API_ENDPOINT}/boxes/status`,
        fetcher
    );
    const [open, setOpen] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const lessons = getLessons();

    if (error) {
        return "An error has occurred.";
    }
    if (!data) return "Loading...";

    return (
        <Box sx={{ mx: "auto", width: 1400 }}>
            <Tabs value={tabValue} onChange={handleChange} centered>
                <Tab label="Lessons" />
                <Tab label="Boxes" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <LessonTab lessons={lessons} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <BoxTab data={data} mutate={mutate} setOpen={setOpen} />
            </TabPanel>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Success!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;
