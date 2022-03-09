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
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

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

const columns = [
  { id: 'mediaType', label: 'File\u00a0Type', minWidth: 170 },
  // { id: 'problemStatement', label: 'Project\u00a0Name', minWidth: 100 },
  // {
  //   id: 'group',
  //   label: 'Team\u00a0Name',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: 'updatedAt',
    label: 'Last\u00a0Modified\u00a0Date',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "mediaUrl",
    label: 'Actions',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }

];

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}





export default function DashboardSummary() {

  const dispatch = useDispatch()
  const dashboardData = useSelector(selectDashboardData)
  const [rows, setRows] = React.useState([])
  React.useEffect(() => {
    setRows(dashboardData)
  }, [dashboardData])


  React.useEffect(() => {
    console.log('loadTags')
    dispatch(loadTags())
    dispatch(loadDashboardData())

  }, [])

  const allTags = useSelector(selectTags)

  const handleTag = (name) => {

    console.log("clicked", name, value)
    if (!(value.filter(e => e === name).length > 0)) {
      setValue([...value, name])

    }

  }
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    console.log('value', value)
    dispatch(loadDashboardData({ search: value }))
  }, [value])
  console.log(dashboardData)
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
                console.log(newValue)
                setValue(newValue);
              }}
              multiple
              id="tags-filled"
              options={allTags}
              freeSolo
              // renderTags={(value, getTagProps) =>
              //   value.map((option, index) => (
              //     <Chip
              //       variant="outlined"
              //       label={option}
              //       {...getTagProps({ index })}
              //     />
              //   ))
              // }
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
          {/* <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: "100%",
            }}
          > */}
          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
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
                          {row.mediaType}
                        </TableCell>
                        {/* <TableCell key={row.id}>
                          {row?.group?.problemStatement?.title || ''}
                        </TableCell> */}
                        <TableCell key={row.id}>
                          {row['updatedAt']}
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

          {/* </Paper> */}

          {/* </Paper> */}
        </Grid>

      </Grid>
    </Container>
  );
}
