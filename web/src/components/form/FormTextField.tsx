import React from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { useFormContext } from 'react-hook-form'

type FormTextFieldProps = TextFieldProps & {
  
}
const FormTextField: React.FC<FormTextFieldProps> = props => {
  const { register } = useFormContext()

  return (
    <TextField {...props} inputRef={register} />
  )
}
export default FormTextField
