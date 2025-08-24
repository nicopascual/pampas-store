import { createFileRoute } from '@tanstack/react-router'
import { useAppForm } from '../hooks/demo.form'

export const Route = createFileRoute('/wizard')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      storeName: '',
      storeSlug: '',
      currency: '',
      language: '',
      logoUrl: '',
    },
    validators: {
      onBlur: ({ value }) => {
        const errors = { fields: {} } as { fields: Record<string, string> }

        if (!value.storeName?.trim()) {
          errors.fields.storeName = 'Store name is required'
        }
        if (!value.storeSlug?.trim()) {
          errors.fields.storeSlug = 'Store slug is required'
        }
        if (!value.currency?.trim()) {
          errors.fields.currency = 'Currency is required'
        }
        if (!value.language?.trim()) {
          errors.fields.language = 'Language is required'
        }

        return errors
      },
    },
    onSubmit: ({ value }) => {
      console.log('Submitting tenant creation:', value)
      alert(`Store "${value.storeName}" created successfully!`)
      // TODO: Call GraphQL mutation createTenant(name, slug, settings)
    },
  })

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-12">
      {/* Stepper Progress */}
      <div className="flex w-full max-w-md gap-1.5 mb-16">
        <div className="flex-1 h-0.5 bg-black rounded"></div>
        <div className="flex-1 h-0.5 bg-gray-200 rounded"></div>
        <div className="flex-1 h-0.5 bg-gray-200 rounded"></div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1.5">
            Create Your Store
          </h1>
          <p className="text-gray-600 text-base">
            Fill in the details to set up your store.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-3"
        >
          <form.AppField name="storeName">
            {(field) => <field.TextField label="Store Name" />}
          </form.AppField>

          <form.AppField
            name="storeSlug"
            validators={{
              onBlur: ({ value }) => {
                if (!/^[a-z0-9-]+$/.test(value)) {
                  return 'Slug must be lowercase, alphanumeric, and dashes only'
                }
                return undefined
              },
            }}
          >
            {(field) => (
              <field.TextField label="Store Slug" placeholder="my-store" />
            )}
          </form.AppField>

          <form.AppField name="currency">
            {(field) => (
              <field.Select
                label="Default Currency"
                values={[
                  { label: 'USD ($)', value: 'USD' },
                  { label: 'BRL (R$)', value: 'BRL' },
                  { label: 'MXN (Mex$)', value: 'MXN' },
                  { label: 'ARS (AR$)', value: 'ARS' },
                ]}
                placeholder="Select a currency"
              />
            )}
          </form.AppField>

          <form.AppField name="language">
            {(field) => (
              <field.Select
                label="Default Language"
                values={[
                  { label: 'English', value: 'en' },
                  { label: 'Português (BR)', value: 'pt' },
                  { label: 'Español', value: 'es' },
                ]}
                placeholder="Select a language"
              />
            )}
          </form.AppField>

          <form.AppField name="logoUrl">
            {(field) => (
              <field.TextField
                label="Logo URL"
                placeholder="https://example.com/logo.png"
              />
            )}
          </form.AppField>

          <div className="pt-6">
            <form.AppForm>
              <form.SubscribeButton label="Create Store" />
            </form.AppForm>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RouteComponent
