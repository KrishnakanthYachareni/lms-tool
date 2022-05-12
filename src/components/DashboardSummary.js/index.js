import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectDashboardData } from '../AppManager/selectors.js';
import { loadDashboardData, loadTags } from '../AppManager/slice.js'
import { selectTags } from '../AppManager/selectors';
import { API_ENDPOINT } from '../../constants.js';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const FixedTag = styled("div")`
align-items: center;
margin: 7px 0;
margin-right: 10px;
padding: 0 10px;
padding-right: 5px;
border: 1px solid #1976D2;
border-radius: 5px;
background-color: #1976D2;
white-space: nowrap;
color: white;
`

const ChipContainer = styled('Chip')`
  display: flex;
  justify-content: space-evenly;
`;

const columns = [
  { id: 'mediaType', label: 'File\u00a0Type', minWidth: 170 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tags',
    label: 'Tags',
    minWidth: 170,
    align: 'center',
  },
  {
    id: "mediaUrl",
    label: 'Actions',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }
];



export default function DashboardSummary() {

  const dispatch = useDispatch()
  const dashboardData = useSelector(selectDashboardData)
  const [rows, setRows] = React.useState([])
  React.useEffect(() => {
    setRows(dashboardData)
  }, [dashboardData])


  React.useEffect(() => {
    dispatch(loadTags())
    dispatch(loadDashboardData())

  }, [])

  const allTags = useSelector(selectTags)

  const handleTag = (name) => {

    if (!(value.filter(e => e === name).length > 0)) {
      setValue([...value, name])

    }

  }
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    dispatch(loadDashboardData({ search: value }))
  }, [value])
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: "100%",
              zIndex: 100
            }}
          >
            <Label >Search videos, presentations, images, problem statements etc!</Label>
            <Autocomplete
              value={value}
              disablePortal
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              multiple
              id="tags-filled"
              options={allTags}
              freeSolo

              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label=""
                  placeholder="Search"
                />
              )}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {allTags && allTags.map((tag, index) => (
                <FixedTag
                  className="tag"
                  onClick={() => handleTag(tag)}
                  key={index}
                >
                  {tag}

                </FixedTag>
              ))}
            </div>
          </Paper>

        </Grid>
        <Grid item xs={12} md={12} lg={12}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
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

                        <TableCell key={row.id}>
                          {row.uploadType}
                        </TableCell>
                        <TableCell key={row.id}>
                          {row.description}
                        </TableCell>
                        <TableCell key={row.id}>
                          <ChipContainer>
                            {row.tags?.map(item => {
                              if (item) {
                                return <Chip style={{borderRadius:'5px'}} color="primary" label={item} />
                              }
                            } 
                            )}
                          </ChipContainer>
                        </TableCell>
                        <TableCell key={row.id} align="center">
                          <a href={`${API_ENDPOINT}/uploads/${row.mediaUrl}`} download="file" target="_blank"> Download </a>
                        </TableCell>
                      </TableRow>

                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
