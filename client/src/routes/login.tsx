import { createFileRoute } from '@tanstack/react-router'
import {z} from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {useAppForm} from "@/hooks/demo.form.ts";
import {m} from "@/lib/paraglide/messages"

const schema = z.object({
    email: z.string().min(1, 'Title is required'),
    password: z.string().min(1, 'Description is required'),
})

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onBlur: schema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
            // Show success message
            alert('Form submitted successfully!')
        },
    })

  return  <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
          <Card>
              <CardHeader>
                  <CardTitle>{m.example_message({username: "Nico"})}</CardTitle>
                  <CardDescription>
                      Enter your email below to login to your account
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      form.handleSubmit()
                  }}>
                      <div className="flex flex-col gap-6">
                          <div className="grid gap-3">
                              <form.AppField name="email">
                                  {(field) => <field.TextField label="Email" />}
                              </form.AppField>
                          </div>
                          <div className="grid gap-3">
                              <form.AppField name="password">
                                  {(field) => <field.TextField label="Password" />}
                              </form.AppField>
                          </div>
                          <form.AppForm>
                              <form.SubscribeButton label="Submit" />
                          </form.AppForm>
                      </div>
                      <div className="mt-4 text-center text-sm">
                          Don&apos;t have an account?{" "}
                          <a href="#" className="underline underline-offset-4">
                              Sign up
                          </a>
                      </div>
                  </form>
              </CardContent>
          </Card>
      </div>
  </div>
}
