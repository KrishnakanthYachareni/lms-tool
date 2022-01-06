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
import { selectProblemStatementsAll } from '../AppManager/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { loadProblemStatementsAll } from '../AppManager/slice.js';
import { API_ENDPOINT } from '../../constants.js';


const mdTheme = createTheme();

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
    { id: 'tags', label: 'tags', minWidth: 100,
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
    const [rows,setRows] = React.useState([])

    const problemStatementsAll = useSelector(selectProblemStatementsAll)

    React.useEffect(()=>{
        dispatch(loadProblemStatementsAll())
    },[])

    React.useEffect(()=>{
        console.log(problemStatementsAll)
        setRows(problemStatementsAll)
    },[problemStatementsAll])

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
                    <Grid container spacing={10} alignItems="center"
                        justifyContent="center">
                        <Grid item xs={12} md={12} lg={12} style={{ marginTop: "50px" }}>
                            <Button variant="contained" href="/dsd4/#/problem-statements/create">Create New Problem Statement</Button>
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
                                                          console.log(row,column)
                                                          const raw = row[column.id];
                                                          let value; 
                                                          if(column.label =='tags'){
                                                            value = raw.map(item=> item+',')
                                                           
                                                          }
                                                          else if(column.label=='references'){
                                                            // value = raw.map(value=>
                                                            //     <a href={`${API_ENDPOINT}/uploads/${value.media}`} download="file" target="_blank" />
                                                            //  )
                                                            console.log(raw)
                                                            value= 1
                                                          }
                                                          else{
                                                              value = raw
                                                          }
                                                          console.log(value)
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

