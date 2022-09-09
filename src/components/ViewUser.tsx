import { useState, useEffect } from "react";
import set from 'lodash.set'
import { Paper, Typography, Button, Box } from '@mui/material';

import { User } from '../App';
import RecursiveForm from './RecursiveForm';

interface Props {
  users: User[] | undefined
  setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>
  view: User
  setView: React.Dispatch<React.SetStateAction<User | undefined>>
  editable?: boolean
  url: string
}

const ViewUser = ({ view, setView, setUsers, editable = false, users, url }: Props) => {
  const [editing, setEditing] = useState(editable)

  const handleChange = (value: any, path :any) => {
    setView(current => {
      let mutable = structuredClone(current)
      set(mutable, path, value)
      return mutable
    })
  }
  
  const handleEdit = async () => {
    setEditing(x => !x)
    if (!editing) return

    

    if (users?.find(u => u.id === view.id)) {
      // EDIT
      await fetch(url + `/${view?.id}`, { method: 'PUT', body: JSON.stringify(view) })
      .then(res => {
        if (res.status !== 200) 
          return console.log('there was an error ' + res.status)
        console.info('User edited succesfully')
        setUsers(users => users?.map(user => user.id === view.id ? view : user))
        setView(undefined);
      })
    } else {
      // ADD NEW
      await fetch(url, { method: 'POST', body: JSON.stringify(view) })
      .then(res => {
        if (res.status !== 201) 
          return console.log('there was an error ' + res.status)
        console.info('User created succesfully')
        setUsers(users => users?.map(user => user.id === view.id ? view : user))
        setView(undefined);
      })
      setUsers(users => [...(users || []), view])
    }
  }

  useEffect(() => {
    setEditing(editable)
  }, [view.id, editable])

  return <>
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box display='flex' alignItems='center'>
        <Typography component="h2" variant="h5" gutterBottom>
          {view?.name || 'New User'}
        </Typography>
        <Button sx={{ml: 'auto'}} onClick={handleEdit} variant={editing ? 'contained' : 'outlined'}>
          {editing ? "SAVE" : "EDIT"}
        </Button>
      </Box>

      {view && <RecursiveForm onChange={handleChange} state={view} obj={view as object} hidden={['id']} editing={editing} />}
    </Paper>
  </>
}

export default ViewUser;