import { Container, Typography } from '@mui/material';
import { useState, useEffect } from "react";

import SelectUser from './components/SelectUser';
import ViewUser from './components/ViewUser';
import useFetch from './utils/useFetch';
export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  }
}

const UserList = () => {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const { data, error } = useFetch<User[]>(url)
  
  const [users, setUsers] = useState<User[]>()
  const [view, setView] = useState<User>()

  useEffect(() => {
    const usersData = data;
    setUsers(usersData)
  }, [data])

  if (error) return <p>There is an error.</p>
  if (!data) return <p>Loading...</p>

  return (
    <Container maxWidth="xs" sx={{ my: 4 }}>
      <Typography component="h1" variant="h3" gutterBottom>
        User List
      </Typography>
      <Typography sx={{mb: 1, display: 'block'}} component="small" variant="caption">
        from <a style={{color: '#777'}} target="_blank" rel="noreferrer" href={url}>{url}</a>
      </Typography>
      {users && <SelectUser {...{ users, setUsers, view, setView, url }} />}
      {view && <ViewUser {...{ users, setUsers, view, setView, url}} />}
    </Container>
  )
}

export default UserList;