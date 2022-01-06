import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from '../Header/index.js';
import Sider from '../Sider/index.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { WithContext as ReactTags } from 'react-tag-input';
import { uploadProblemStatement } from './slice.js';
import { selectUploadingError } from './selectors.js';
import { selectUserInfo } from '../AppManager/selectors.js';


const Keys = {
  TAB: 9,
  COMMA: 188,
  ENTER: 13
};


const mdTheme = createTheme();

const defaultValues = {
  title: "",
  description: "",
  tags: [],
  year: new Date().getFullYear(),
};


export default function ProblemStatementCreate() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [file, setFile] = React.useState(null)
  const dispatch = useDispatch()
  
  const [formValues, setFormValues] = React.useState(defaultValues);
  const [tags, setTags] = React.useState(defaultValues.tags)


  const uploadingError = useSelector(selectUploadingError)
  const ref = React.useRef();

  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo)
  React.useEffect(() => {
    console.log(formValues)
  }, [formValues])


  const handleSubmit = (event) => {
      console.log('create')
    event.preventDefault();
	 let tagsObject =[];
    tags.map(item=>{
      tagsObject.push(item.text)
      })
    
    dispatch(uploadProblemStatement({
      file: file,
      title: formValues.title,
      year: formValues.year,
      description: formValues.description,
      tags: tagsObject,
      createdBy: userInfo.email,
    }))
        if(uploadingError){
      alert("Error uploadig problemStatement")
    }
    if(!uploadingError){
      alert("Upload Successfull")
      setFormValues(defaultValues)
      ref.current.value=""
      setTags([])
    }
    
  };

  const handleFile = (event) => {
    console.log(event.target.files)
    if (event.target.files.length > 0) {
      setFile(event.target.files)

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
                  <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Problem Statements Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={formValues.title}
                        onChange={(event) => {
                            console.log(event.target.value)
                            setFormValues({
                            ...formValues,
                            title: event.target.value
                            });
                        }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextareaAutosize
                        minRows={6}
                        aria-label="maximum height"
                        placeholder="Description of the ProblemStatement"
                        style={{ width: "100%" }}
                        onChange={(event) => {
                          console.log(event.target.value)
                          setFormValues({
                            ...formValues,
                            description: event.target.value
                          });
                        }}
                        value={formValues.description}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <ReactTags
                        tags={tags}
                        inline
                        classNames={{width100: 'width100'}}
                        style={{ width: "100%", height:"50px" }}
                        delimiters={[Keys.TAB, Keys.SPACE, Keys.COMMA, Keys.ENTER]}
                        inputFieldPosition="top"
                        handleAddition={handleAddition}
                        handleDelete={handleDelete}
                      />

                    </Grid>
                    <Grid item xs={12} sm={8}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Problem Statement Year"
                        name="year"
                        autoComplete="year"
                        autoFocus
                        value={formValues.year}
                        onChange={(event) => {
                            console.log(event.target.value)
                            setFormValues({
                            ...formValues,
                            year: event.target.value
                            });
                        }}
                    />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <input id="contained-button-file" ref={ref}  name='m' type="file" onChange={handleFile} multiple="multiple" />
                    </Grid>
                    <Grid item xs={12} sm={8}>

                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="medium"
                        onClick={handleSubmit}
                      >
                        Create New Problem Statement
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

