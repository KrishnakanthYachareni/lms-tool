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

const paths = {
    dashboard: '/dsd4/#/dashboard',
    groups : '/dsd4/#/groups',
    templates: '/dsd4/#/templates',
    problemStatements: '/dsd4/#/problem-statements',
    videos:  '/dsd4/#/video',
    presentations:  '/dsd4/#/presentation',
}

export const mainListItems =(currentPath)=> (
    <div>
        <ListItem  button component="a" href="/dsd4/#/dashboard" selected={paths.dashboard === currentPath}>
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
        <ListItem  button component="a" href="/dsd4/#/groups"  selected={paths.groups === currentPath}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
        </ListItem>
        <ListItem button  selected={paths.templates === currentPath}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Templates" />
        </ListItem>
        <ListItem button component="a" href="/dsd4/#/problem-statements"  selected={paths.problemStatements === currentPath}>
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

export const secondaryListItems =(currentPath)=> (
   <div>
        <ListSubheader inset>Upload Student's Content</ListSubheader>
        <ListItem button component="a" href="/dsd4/#/video"  selected={paths.videos === currentPath}>
            <ListItemIcon >
                <VideoLibrarySharpIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Videos" />
        </ListItem>
        <ListItem button component="a" href="/dsd4/#/presentation"  selected={paths.presentations === currentPath}>
            <ListItemIcon>
                <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Presentations" />
        </ListItem>
       
    </div>
);