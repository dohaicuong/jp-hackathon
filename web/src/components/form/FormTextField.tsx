import React from 'react'

import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField'
import { useFormContext } from 'react-hook-form'

type TextFieldProps = Omit<MuiTextFieldProps, 'inputRef'>
const TextField: React.FC<TextFieldProps> = props => {
  const { register, formState } = useFormContext()
  const { isSubmitting } = formState

  return (
    <MuiTextField
      {...props}
      variant={props.variant as any}
      inputRef={register}
      disabled={isSubmitting || props.disabled}
    />
  )
}
export default TextField