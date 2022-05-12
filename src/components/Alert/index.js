import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';

import { Snackbar } from "@mui/material";
import { selectAlert } from "../AppManager/selectors";

const AlertMessage = () => {
    const  alert  = useSelector(selectAlert);
    const [show, setShow] = useState(false);
    const [alertContent, setAlertContent] = useState({})
    useEffect(() => {
        if (alert?.hasAlert) {
            setAlertContent(alert)
            setShow(true)
        }
    }, [alert]);


    const onClose = () => {
        setShow(false);
    };

    return show ? (
        <>
            {show && <Snackbar
                open={show}
                autoHideDuration={3000}
                onClose={onClose}
                key={"verticaltop"}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                 }}
            >
                <Alert onClose={onClose} severity={alertContent.type} sx={{ width: '100%' }}>
                   {alertContent.message}
                </Alert>
            </Snackbar>}
        </>
    ) : null;
};

export default AlertMessage;