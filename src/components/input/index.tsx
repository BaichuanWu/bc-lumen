import {TextField} from '@mui/material'

const TextInput = (props: any) => {
  return <TextField size="small" {...props} />
}

const NumberInput = (props: any) => {
  return <TextField size="small" {...props} type="number" />
}
export { TextInput, NumberInput }