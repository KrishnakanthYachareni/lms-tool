import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Header from '../../Header/index.js';
import Sider from '../../Sider/index.js';

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
    { id: 'fileType', label: 'File\u00a0Type', minWidth: 170 },
    { id: 'projectName', label: 'Project\u00a0Name', minWidth: 100 },
    { id: 'uploadedDate', label: 'Uploaded\u00a0Date', minWidth: 100 },
    { id: 'Actions', label: 'Actions', align: 'center', minWidth: 100 },

];
function createData(fileType, uploadedDate, projectName) {
    return { fileType, uploadedDate, projectName, id: uploadedDate };
}

const rows = [
    createData('pdf', 2021, 'test1'),
    createData('pptx', 2021, 'test2'),
    createData('video', 2021, 'test1'),
    createData('mp4', 2021, 'test1'),
    createData('jpeg', 2021, 'test1'),

];
export default function GroupDetails() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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
                        justifyContent="center"
                        style={{ marginTop: "50px" }}>
                        <Grid item xs={9} md={10} lg={10}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "100%",
                                }}
                            >
                                <div>
                                    GroupName : Group1
                                </div>
                            </Paper>
                        </Grid>
                        <Grid
                            item xs={9} md={10} lg={10}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "100%",
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
                                                                {row['fileType']}
                                                            </TableCell>
                                                            <TableCell key={row.id}>
                                                                {row['projectName']}
                                                            </TableCell>
                                                            <TableCell key={row.id}>
                                                                {row['uploadedDate']}
                                                            </TableCell>
                                                            <TableCell key={row.id} align="center">
                                                                <Button variant="contained">Download</Button>
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

