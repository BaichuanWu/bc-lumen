import Bt, {type ButtonProps} from '@mui/material/Button'

const Button = (props: ButtonProps) => {
    return <Bt variant="contained" size="small" {...props} />
}
export default Button