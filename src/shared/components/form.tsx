import { cn } from '@/lib/utils'
import React, { Fragment, PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'

type FormProps = {
  onSubmit: VoidFunction
} & PropsWithChildren &  React.HTMLAttributes<HTMLFormElement>
function Form({ children, className, onSubmit }: FormProps ) {
  const form  = useFormContext()
  return (
    <Fragment>
      <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(className)}
        >

        {children}
        </form>
    </Fragment>
  )
}

export default Form
