import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from '../Header/index.js';
import Sider from '../Sider/index.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { loadGroups } from '../AppManager/slice'
import { useSelector } from 'react-redux';
import { selectGroups } from '../AppManager/selectors';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { WithContext as ReactTags } from 'react-tag-input';
import { uploadPresentation } from './slice.js';
import { selectUploadingError } from './selectors.js';


const Keys = {
  TAB: 9,
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



export default function Presentations() {
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
  const groups = useSelector(selectGroups)
  React.useEffect(() => {
    dispatch(loadGroups())
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    let tagsObject = [];
    tags.map(item => {
      tagsObject.push(item.text)
    })
    dispatch(uploadPresentation({
      file: file,
      group: formValues.group,
      description: formValues.description,
      tags: tagsObject
    }))
    if (uploadingError) {
      alert("Error uploadig Presentation")
    }
    if (!uploadingError) {
      alert("Upload Successfull")
      setFormValues(defaultValues)
      ref.current.value = ""
      setTags([])
    }


  };

  const handleFile = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0])

    }
  }

  const handleAddition = (tag) => {
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

                >``
                  <Grid container spacing={2} justifyContent="center" alignItems="center">


                    <Grid item xs={12} sm={8}>
                      <Autocomplete
                        disablePortal
                        id="group-name"
                        options={groups}
                        getOptionLabel={(option) => option.name || ""}
                        inputValue={formValues.group}
                        value={formValues.group}
                        onChange={(event, newInputValue) => {
                          setFormValues({
                            ...formValues,
                            group: newInputValue?.name || ""
                          });
                        }}
                        renderInput={(params) => <TextField {...params} label="Select a Group" />}
                      />

                    </Grid>


                    <Grid item xs={12} sm={8}>
                      <TextareaAutosize
                        minRows={6}
                        aria-label="maximum height"
                        placeholder="Description of the Presentation"
                        style={{ width: "100%" }}
                        onChange={(event) => {
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
                        Upload Presentation
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

