import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from '../Header/index.js';
import Sider from '../Sider/index.js';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { selectTemplates, selectTemplateUploadingError } from '../AppManager/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { loadTemplates } from '../AppManager/slice.js';
import { Chip, Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import TemplateCreate from './CreateTemplate';
import AlertMessage from '../Alert/index.js';
import { API_ENDPOINT } from '../../constants.js';

const mdTheme = createTheme();
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: 'title', label: 'Template', minWidth: 100 },
    {
        id: 'description',
        label: 'Description',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'year',
        label: 'Uploaded Year',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'tags', label: 'tags', minWidth: 100,
    },
    {
        id: 'createdBy',
        label: 'Created By',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
    },
];


export default function Templates() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch()
    const [rows, setRows] = React.useState([])

    const templates = useSelector(selectTemplates)
    const uploadingError = useSelector(selectTemplateUploadingError)
    const [modalOpen, setModelOpen] = React.useState(false);
    const handleModalOpen = () => setModelOpen(true);
    const handleModalClose = () => setModelOpen(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    React.useEffect(() => {
        dispatch(loadTemplates())
    }, [])

    React.useEffect(() => {
        setRows(templates)
    }, [templates])

    React.useEffect(() => {
        dispatch(loadTemplates())
    }, [modalOpen])

    React.useEffect(() => {
        if (!(uploadingError?.error)) {
            setModelOpen(false)
        }
    }, [uploadingError])

    const handleDownload = (references) => {
        function download_next(i) {
            if (i >= references.length) {
                return;
            }
            var a = document.createElement('a');
            a.href = API_ENDPOINT +'/'+ references[i].media;
            a.target = '_blank';

                a.download = references[i].media;
            

            (document.body || document.documentElement).appendChild(a);
            a.click()
            a.parentNode.removeChild(a);
            setTimeout(function () {
                download_next(i + 1);
            }, 5000);
        }
        download_next(0);
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} toggleDrawer={toggleDrawer} />
                <Sider open={open} toggleDrawer={toggleDrawer} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <AlertMessage />
                    <Grid container spacing={10} alignItems="center"
                        justifyContent="center">
                        <Grid item xs={12} md={12} lg={12} style={{ marginTop: "50px" }}>
                            {userInfo && <Button onClick={handleModalOpen} variant="contained">Create New Template</Button>}
                            <Modal
                                open={modalOpen}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add a new Template
                                    </Typography>
                                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                                        <TemplateCreate />
                                    </div>
                                </Box>
                            </Modal>
                        </Grid>
                        <Grid
                            item xs={9} md={10} lg={10}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "100%",
                                    zIndex: 100
                                }}
                            >
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth, color: "blue" }}

                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows

                                                .map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            {columns.map((column) => {
                                                                const raw = row[column.id];
                                                                let value;
                                                                if (column.label == 'tags') {
                                                                    // value = raw.map(item => item + ',')
                                                                    value = <>
                                                                    {raw.map(item => {
                                                                        if(item) {
                                                                            return <Chip color="primary" label={item}/>
                                                                        }
                                                                    } 
)}
                                                                    </>

                                                                }
                                                                else if (column.label == 'references') {
                                                                   
                                                                    value = 1
                                                                }
                                                                else {
                                                                    value = raw
                                                                }
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                            <TableCell key={row.id} align="center">
                                                                <Button variant="contained" onClick={() => handleDownload(row.references)}>Download</Button>

                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

