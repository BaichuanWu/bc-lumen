import { forwardRef, useImperativeHandle } from "react"
import { useForm, Controller } from "react-hook-form"


const Form = forwardRef(({onSubmit, defaultValues, items, children}: any, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues
  })
  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit)
  }))
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "12px" }}>
        {items.map((item: any) => {
          const Component = item.component
          return (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field }) => <Component {...field} label={item.label} />}
          />)
        })}
        {children}
    </form>
  )
})
export default Form