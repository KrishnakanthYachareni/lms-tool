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
import { selectProblemStatementsAll, selectUserInfo } from '../AppManager/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { loadProblemStatementsAll } from '../AppManager/slice.js';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import ProblemStatementCreate from './CreateProblemStatement.js';
import { selectUploadingError } from './selectors.js';
import AlertMessage from '../Alert/index.js';

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
    { id: 'title', label: 'Problem\u00a0Statement', minWidth: 100 },
    // { id: 'references', label: 'Mediaattachements', minWidth: 100 },

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

];


export default function ProblemStatements() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        console.log('changed')
        setOpen(!open);
    };
    const dispatch = useDispatch()
    const [rows, setRows] = React.useState([])

    const problemStatementsAll = useSelector(selectProblemStatementsAll)
    const uploadingError = useSelector(selectUploadingError)
    const [modalOpen, setModelOpen] = React.useState(false);
    const handleModalOpen = () => setModelOpen(true);
    const handleModalClose = () => setModelOpen(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    React.useEffect(() => {
        dispatch(loadProblemStatementsAll())
    }, [])

    React.useEffect(() => {
        console.log(problemStatementsAll)
        setRows(problemStatementsAll)
    }, [problemStatementsAll])

    React.useEffect(() => {
        dispatch(loadProblemStatementsAll())
    }, [modalOpen])

    React.useEffect(() => {
        console.log(uploadingError)
        if (!uploadingError?.error) {
            setModelOpen(false)
        }
    }, [uploadingError])
    console.log(userInfo)
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
                        {userInfo && userInfo.userType==='faculty' && <Button onClick={handleModalOpen} variant="contained">Create New ProblemStatement</Button>}
                            <Modal
                                open={modalOpen}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add a new ProblemStatement
                                    </Typography>
                                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                                        <ProblemStatementCreate />
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
                                                                    value = raw.map(item => item + ',')

                                                                }
                                                                else if (column.label == 'references') {
                                                                    // value = raw.map(value=>
                                                                    //     <a href={`${API_ENDPOINT}/uploads/${value.media}`} download="file" target="_blank" />
                                                                    //  )
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

