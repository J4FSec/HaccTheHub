import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { marked } from "marked";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINT } from "../../util/consts";
import { makeStyles } from "@material-ui/core/styles";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useStyles = makeStyles((theme) => {
    const tags = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const nestedRules = {};
    tags.forEach((tag) => {
        nestedRules[`& ${tag}`] = { ...theme.typography[tag] };
    });
    return {
        root: nestedRules,
    };
});

const Lesson = () => {
    const classes = useStyles();
    const router = useRouter();
    const { name } = router.query;

    const { data, error } = useSWR(`${API_ENDPOINT}/lesson/${name}`, fetcher);

    if (error) {
        return "An error has occurred.";
    }
    if (!data) return "Loading...";

    const getMarkdownText = () => {
        const rawMarkup = marked.parse(data);
        return {
            __html: rawMarkup,
        };
    };

    return (
        <Box sx={{ mx: "auto", width: "100%" }}>
            <Grid container>
                <Grid item>
                    <Paper sx={{ overflow: "auto", maxHeight: "100%", width: "400px", p: 1 }}>
                        <Typography
                            className={classes.root}
                            dangerouslySetInnerHTML={getMarkdownText()}
                        ></Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <iframe src="https://localhost:9020/vnc.html" width="1450px" height="800px">
                    </iframe>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Lesson;
