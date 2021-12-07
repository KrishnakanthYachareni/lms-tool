import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from '../Header/index.js';
import Sider from '../Sider/index.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { loadProblemStatements } from '../AppManager/slice'
import { useSelector } from 'react-redux';
import { selectProblemStatements } from '../AppManager/selectors';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { WithContext as ReactTags } from 'react-tag-input';
import { uploadVideo } from './slice.js';
import { selectUploadingError } from './selectors.js';


const Keys = {
  TAB: 9,
  SPACE: 32,
  COMMA: 188,
  ENTER: 13
};


const mdTheme = createTheme();

const defaultValues = {
  problemStatement: "",
  group: "",
  description: "",
  tags: []
};


const groupOptions = [
  "group1", "group2"
]

export default function Videos() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [file, setFile] = React.useState(null)
  const dispatch = useDispatch()
  const allProblemStatements = useSelector(selectProblemStatements)


  
  const [formValues, setFormValues] = React.useState(defaultValues);
  const [tags, setTags] = React.useState(defaultValues.tags)


  const uploadingError = useSelector(selectUploadingError)
  const ref = React.useRef();

  React.useEffect(() => {
    dispatch(loadProblemStatements())
  }, [])

  React.useEffect(() => {
    console.log(formValues)
  }, [formValues])


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(uploadVideo({
      file: file,
      problemStatement: formValues.problemStatement,
      group: formValues.group,
      description: formValues.description,
      tags: tags.map(item => item.text)
    }))
    console.log(uploadingError)
    if(uploadingError){
      alert("Error uploadig video")
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
                        options={allProblemStatements}
                        inputValue={formValues.problemStatement}

                        value={formValues.problemStatement}
                        onInputChange={(event, newInputValue) => {
                          setFormValues({
                            ...formValues,
                            problemStatement: newInputValue
                          });
                        }}
                        renderInput={(params) => <TextField {...params} label="Project Name" />}
                      />

                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Autocomplete
                        disablePortal
                        id="group-name"
                        options={groupOptions}
                        inputValue={formValues.group}
                        value={formValues.group}
                        onInputChange={(event, newInputValue) => {
                          setFormValues({
                            ...formValues,
                            group: newInputValue
                          });
                        }}
                        renderInput={(params) => <TextField {...params} label="Group Name" />}
                      />

                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextareaAutosize
                        minRows={6}
                        aria-label="maximum height"
                        placeholder="Description of the Video"
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
                      <input accept="videos/*" id="contained-button-file" ref={ref} multiple type="file" onChange={handleFile} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <ReactTags
                        tags={tags}
                        inline
                        width="300"
                        delimiters={[Keys.TAB, Keys.SPACE, Keys.COMMA, Keys.ENTER]}
                        inputFieldPosition="top"
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

