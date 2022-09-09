import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Typography, Button, Box } from '@mui/material';
import {useState, useEffect} from 'react'

import { User } from '../App';

const newUser = (id: number) => {
 return {
    id: id,
      name: '',
        username: '',
          email: '',
            address: {
      street: '',
        suite: '',
          city: '',
            zipcode: '',
              geo: {
        lat: '',
          lng: '',
      }
    },
    phone: '',
      website: '',
        company: {
      name: '',
        catchPhrase: '',
          bs: '',
    }
  }
}

interface Props {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>
  view: User | undefined
  setView: React.Dispatch<React.SetStateAction<User | undefined>>
  url: string
}

const SelectUser = ({ users, setUsers, view, setView, url }: Props) => {

  const [value, setValue] = useState('');

  const handleChange = (_: any, value: any) => {
    const user = users?.filter(u => u.name === value)[0] as User
    setValue(value)
    setView(user)
  }

  const handleDelete = () => {
    fetch(url + `/${view?.id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status !== 200) 
          return
        console.log('User deleted succesfully')
        setUsers(users => users?.filter(user => user.id !== view?.id));
        setView(undefined);
        setValue('')
      })
  }

  const handleCreate = () => {
    const highestId = users.length ? Math.max(...users.map(u => u.id)) : 1
    console.log(highestId)
    setView(newUser(highestId + 1))
  }

  useEffect(() => {
    setValue(view?.name || '')
  }, [view?.name])

  return <><Paper sx={{ p: 2 }}>
    <Typography component="h2" variant="h5" gutterBottom>
      Users: {users?.length}
    </Typography>
    <Autocomplete
      disablePortal
      blurOnSelect

      value={value}
      onChange={handleChange}
      id="userSelect"
      options={users?.map(user => user.name)}
      renderInput={(params) => <TextField
        {...params}
        required
        label="Select a user"
        fullWidth
        variant="standard"
      />}
    />
  </Paper>
    <Box display="flex" sx={{ mt: 2 }}>
      {view ?
        <Button onClick={handleDelete} color="error" variant="outlined" sx={{ mr: "auto" }} >
          DELETE
        </Button>
        : <>
        <Button onClick={handleCreate} variant="outlined" sx={{ ml: "auto" }} >
          CREATE
          </Button>
        </>
      }
    </Box>
  </>
}

export default SelectUser;