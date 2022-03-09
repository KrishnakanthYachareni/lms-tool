import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import GroupModal from './GroupModal/index.js';
import { selectCreateGroup, selectGroups, selectUserInfo } from '../AppManager/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { loadGroups } from '../AppManager/slice.js';
import AlertMessage from '../Alert/index.js';

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

const drawerWidth = 240;


const mdTheme = createTheme();
const Pop = props => {
    const { className, anchorEl, style, ...rest } = props
    const bound = anchorEl.getBoundingClientRect()
    return <div {...rest} style={{
        position: 'absolute',
        zIndex: 9999,
        width: bound.width
    }} />
}

const columns = [
    { id: 'name', label: 'Group\u00a0Name', minWidth: 170 },
    { id: 'year', label: 'Year', minWidth: 100 },
    // {
    //   id: 'population',
    //   label: 'Team\u00a0Name',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'size',
    //   label: 'Last\u00a0Modified\u00a0Date',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'density',
    //   label: 'Year',
    //   minWidth: 170,
    //   align: 'right',
    //   // format: (value) => value.toFixed(2),
    // },
];
function createData(groupName, year, id) {
    return { groupName, year, id };
}

const rows = [
    createData('Group1', 2021, 1),
    createData('Group2', 2021),
    createData('Group3', 2021),
    createData('Group4', 2021),
    createData('Group5', 2021),

];

export default function Group() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [modalOpen, setModelOpen] = React.useState(false);
    const handleModalOpen = () => setModelOpen(true);
    const handleModalClose = () => setModelOpen(false);
    const groups = useSelector(selectGroups);

    const dispatch = useDispatch()
    const createErrorStatus = useSelector(selectCreateGroup)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    React.useEffect(() => {
        dispatch(loadGroups())
    }, [modalOpen])

    React.useEffect(() =>{
        if(!createErrorStatus.error){
            setModelOpen(false)
        }
    },[createErrorStatus])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex', }}>
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
                    {/* Recent Orders */}
                    <AlertMessage />
                    <Grid container spacing={10} alignItems="center"
                        justifyContent="center">
                        <Grid item xs={12} md={12} lg={12}>
                            {userInfo && userInfo.userType==='faculty' && <Button onClick={handleModalOpen} style={{marginTop: "30px"}} variant="contained">Create New Group</Button>}
                            <Modal
                                open={modalOpen}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add a new group
                                    </Typography>
                                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                                        <GroupModal />
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
                                            {groups
                                                .map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            {/* {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : value}
                                                                    </TableCell>
                                                                );
                                                            
                                                            })} */}
                                                            <TableCell key={row.id}>
                                                                <a href={"/dsd4/#/group?name=" + row.name} >{row['name']}</a>
                                                            </TableCell>
                                                            <TableCell key={row.id}>
                                                                {row['year']}
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

