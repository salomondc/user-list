import { Paper, Typography, TextField } from '@mui/material';
import get from 'lodash.get'
const isObj = (x: any) => typeof x === 'object'

interface Props {
  obj: object
  state: object

  hidden?: string[]
  parentKeys?: string[]
  onChange?: Function
  editing?: boolean
}

const RecursiveForm: any = ({obj, hidden = [], parentKeys, onChange = () => {}, editing, state} : Props) => {

  const keys = Object.keys(obj)

  return (keys.map(key => {
    
    const value = obj[key as keyof {}]
    const path = [...(parentKeys || []), key]

    return (hidden?.includes(key as string) ? <></> :
      isObj(value)
        ?
        <Paper key={key} sx={{ p: 2, my: 2 }}>
          <Typography color={'#777'} component="h3" variant="h6" gutterBottom>
            {key}
          </Typography>
          <RecursiveForm obj={value} parentKeys={path} {...{onChange, hidden, editing, state}} />
        </Paper>
        :
        <TextField key={key} sx={{ mb: 2 }}
          value={get(state, path)}
          onChange={(e) => onChange && onChange(e.target.value, path)}
          id={key}
          disabled={!editing}
          label={key}
          fullWidth
          variant="standard"
        />)
  })
  )
}

export default RecursiveForm;