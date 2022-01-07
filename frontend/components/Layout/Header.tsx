import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Switch } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import { API_ENDPOINT } from "../../util/consts";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Header = () => {
    const { data, mutate } = useSWR(`${API_ENDPOINT}/network`, fetcher);
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked == true) {
            axios.post(`${API_ENDPOINT}/network`).then((res) => {
                if (res.data == "started network") {
                    // TODO: Success snackbar
                    setChecked(true);
                    mutate();
                }

                if (res.data == "network already started") {
                    // TODO: Error snackbar
                    setChecked(true);
                }
            });
        }

        if (event.target.checked == false) {
            axios.delete(`${API_ENDPOINT}/network`).then((res) => {
                if (res.data == "stopped network") {
                    // TODO: Success snackbar
                    setChecked(false);
                    mutate();
                }

                if (res.data == "network not started") {
                    // TODO: Error snackbar
                    setChecked(false);
                }
            });
        }
    };

    useEffect(() => {
        setChecked(data);
    }, [data, checked]);

    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        href="/"
                        color="#fff"
                        sx={{ flexGrow: 1 }}
                        underline="none"
                    >
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="div"
                        >
                            HaccTheHub
                        </Typography>
                    </Link>
                    <Typography>Network</Typography>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        color="error"
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
