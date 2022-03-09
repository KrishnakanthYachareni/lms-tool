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
import Button from '@mui/material/Button';
import { Accordion, AccordionSummary, List, ListItem, ListItemButton, ListItemText, } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { loadCurrentGroup, loadCurrentGroupMedia } from '../../AppManager/slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrentGroup, selectCurrentGroupMedia } from '../../AppManager/selectors.js';



const mdTheme = createTheme();

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
    const dispatch = useDispatch()

    const params = useParams();
    console.log(params, 'params')

    React.useEffect(() => {
        dispatch(loadCurrentGroup({ groupName: "test" }))
    }, [])
    const currentGroup = useSelector(selectCurrentGroup)

    React.useEffect(() => {
        dispatch(loadCurrentGroupMedia({ id: currentGroup._id }))
    }, [currentGroup])
    const currentGroupMedia = useSelector(selectCurrentGroupMedia)
    console.log(currentGroupMedia)

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
                                    justifyContent: 'space-evenly'
                                }}
                            >
                                <div>
                                    {currentGroup.name}
                                </div>
                            </Paper>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Team Members</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {currentGroup && currentGroup.teamMembers?.map((value, index)=>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={value.email} />
                                            </ListItemButton>
                                        </ListItem>
                                        )}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
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
                                            {currentGroupMedia && currentGroupMedia?.map((row,index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            <TableCell key={row.id}>
                                                                {row.mediaType}
                                                            </TableCell>
                                                            <TableCell key={row.id}>
                                                                {currentGroup?.problemStatement?.projectName || ''}
                                                            </TableCell>
                                                            <TableCell key={row.id}>
                                                                {row['updatedAt']}
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

