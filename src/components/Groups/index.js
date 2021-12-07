import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DashboardSummary from '../DashboardSummary.js/index.js';
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

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
    { id: 'groupName', label: 'Group\u00a0Name', minWidth: 170 },
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
function DashboardContent() {
    console.log('dashboard')
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const ProfileOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (id) => {
        console.log(id)
    }


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header open={open} toggleDrawer={toggleDrawer} />
                <Sider />
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
                    <Grid container spacing={10} alignItems="center"
                        justifyContent="center">
                        <Grid item xs={12} md={12} lg={12} style={{ marginTop: "50px" }}>
                            <Button variant="contained">Create New Group</Button>
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
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                                <a href={"/group/"+row.id} >{row['groupName']}</a>
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
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}