import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Alert, Autocomplete, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider, MuiPickersUtilsProvider, } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@mui/material/styles';
import {  loadProblemStatements,  loadStudents, saveGroup } from '../../AppManager/slice';
import {  selectProblemStatements,  selectStudents } from '../../AppManager/selectors';

const defaultValues = {
    name: "",
    year: new Date(),
    term: "",
    teamMembers: [],
    problemStatement: ""
};

const Wrapper = styled('div')`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
`


export default function GroupModal() {
    const [formValues, setFormValues] = React.useState(defaultValues);
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(saveGroup({
            ...formValues,
            year: formValues.year.getFullYear()
        }))
    };

    const students = useSelector(selectStudents)
    const allProblemStatements = useSelector(selectProblemStatements)
    React.useEffect(() => {
        dispatch(loadStudents())
        dispatch(loadProblemStatements())
    }, [])




    return (
        <Wrapper >
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={8}>
                    <TextField id="outlined-basic" label="Group Name" variant="outlined" onChange={(event) => {
                        setFormValues({
                            ...formValues,
                            name: event.target.value
                        });
                    }} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <FormControl fullWidth>
                        <TextField
                            value={formValues.term}
                            onChange={(event) => {
                                setFormValues({
                                    ...formValues,
                                    term: event.target.value
                                });
                            }}
                            select // tell TextField to render select
                            label="Term"
                        >
                            <MenuItem value="spring">Spring</MenuItem>
                            <MenuItem value="summer">Summer</MenuItem>
                            <MenuItem value="fall">Fall</MenuItem>
                        </TextField>
                        {/* </Select> */}
                    </FormControl>
                </Grid>



                <Grid item xs={12} sm={8}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            inputFormat="yyyy"
                            views={['year']}
                            label="Year"
                            minDate={new Date('2012-03-01')}
                            maxDate={new Date('2023-06-01')}
                            value={formValues.year}
                            onChange={(event) => {
                                setFormValues({
                                    ...formValues,
                                    year: event.target.value
                                });
                            }}
                            renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Autocomplete
                        disablePortal
                        id="team-members"
                        options={students.map((option) => option.email)}
                        multiple
                        inputValue={formValues.group}
                        value={formValues.group}
                        onChange={(event, newInputValue) => {
                            setFormValues({
                                ...formValues,
                                teamMembers: newInputValue
                            });
                        }}

                        renderInput={(params) => <TextField {...params} label="Team Members" />}
                    />

                </Grid>
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

                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="medium"
                        onClick={handleSubmit}
                    >
                        Create Group
                    </Button>
                </Grid>

            </Grid>
        </Wrapper >
    )
}
