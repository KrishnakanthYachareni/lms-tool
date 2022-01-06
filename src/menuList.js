import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import VideoLibrarySharpIcon from '@mui/icons-material/VideoLibrarySharp';
import PostAddIcon from '@mui/icons-material/PostAdd';

export const mainListItems = (
    <div>
        <ListItem  button component="a" href="/dsd4/#/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PersonSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
        </ListItem>
        <ListItem  button component="a" href="/dsd4/#/groups">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Templates" />
        </ListItem>
        <ListItem button component="a" href="/dsd4/#/problem-statements">
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Problem Statements" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Instructor Notes" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Upload Student's Content</ListSubheader>
        <ListItem button component="a" href="/dsd4/#/video">
            <ListItemIcon >
                <VideoLibrarySharpIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Videos" />
        </ListItem>
        <ListItem button component="a" href="/dsd4/#/presentation">
            <ListItemIcon>
                <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Presentations" />
        </ListItem>
       
    </div>
);