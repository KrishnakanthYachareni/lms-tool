import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Header from '../Header/index.js';
import Sider from '../Sider/index.js';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { saveUserSignup } from '../AppManager/slice'
import { useSelector } from 'react-redux';
import { selectProblemStatements, selectUserInfo } from '../AppManager/selectors';
import { useHistory } from 'react-router';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { WithContext as ReactTags } from 'react-tag-input';
import { uploadVideo } from './slice.js';
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

const Keys = {
  TAB: 9,
  SPACE: 32,
  COMMA: 188,
  ENTER: 13
};


const mdTheme = createTheme();


const defaultValues = {
  project: "",
  group: 0,
  description: "",
  tags: []
};

const tags = [{ id: "science", text: "nuclear-science" },
{ id: "math", text: "math" }]

const suggestions = [
  { id: 'USA', text: 'USA' },
  { id: 'Germany', text: 'Germany' },
  { id: 'Austria', text: 'Austria' },
  { id: 'Costa Rica', text: 'Costa Rica' },
  { id: 'Sri Lanka', text: 'Sri Lanka' },
  { id: 'Thailand', text: 'Thailand' }
]

export default function Videos() {
  console.log('dashboard')
  const [open, setOpen] = React.useState(true);
  const [tags, setTags] = React.useState([])
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [formValues, setFormValues] = React.useState(defaultValues);
  const [ file, setFile] = React.useState(null)
  const dispatch = useDispatch()
  const allProjects = useSelector(selectProblemStatements)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData()
   formData.append("description" , formValues.description)
   formData.append("tags" , tags)
   formData.append("file" , file)
   formData.append("project",'test')
   formData.append("group" , 'group')
   dispatch(uploadVideo({
     file: file,
     project: formValues.projectName
   }))
  };

  const handleFile = (event) =>{
    console.log(event.target.files)
    if(event.target.files.length >0){
      setFile(event.target.files[0])
    }
  }

  const handleAddition = (tag) => {
    console.log(tag)
    setTags([...tags, tag])
  }

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
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
            alignItems: 'center',
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}

                >
                  <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={8}>
                      <Autocomplete
                        disablePortal
                        id="project"
                        width="100%"
                        options={allProjects}
                        inputValue={formValues.project}
                        getOptionLabel={(option) => option.title}
                        onInputChange={(event, newInputValue) => {
                          setFormValues({
                            ...formValues,
                            project: newInputValue
                          });
                        }}
                        renderInput={(params) => <TextField {...params} label="Project Name" />}
                      />

                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Autocomplete
                        disablePortal
                        id="ggroup-name"
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="Group Name" />}
                      />

                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextareaAutosize
                        minRows={6}
                        aria-label="maximum height"
                        placeholder="Description of the Video"
                        style={{ width: "100%" }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <input accept="videos/*" id="contained-button-file" multiple type="file" onChange={handleFile}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <ReactTags
                        tags={tags}
                        inline
                        width="300"
                        delimiters={[Keys.TAB, Keys.SPACE, Keys.COMMA, Keys.ENTER]}
                        inputFieldPosition="top"
                        suggestions={suggestions}
                        handleAddition={handleAddition}
                        handleDelete={handleDelete}
                      />

                    </Grid>
                    <Grid item xs={12} sm={8}>

                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="medium"
                        onClick={handleSubmit}
                      >
                        Upload Video
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

