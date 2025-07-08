import type { Field } from '@/modules/core/types/field';
import { Form, FormField } from '@/modules/core/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InferItem } from '@/modules/core/ui/inferField';
import { z } from 'astro/zod';
import { SupportedFields } from '@/modules/core/lib/field';
import { Button } from '@/modules/core/ui/button';

const contactFormSchema = z.object({
  names: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  institutionName: z.string().min(1, 'Institution name is required'),
  message: z.string().min(1, 'Message is required'),
});

const contactFormFields: Field<keyof z.infer<typeof contactFormSchema>>[] = [
  {
    name: 'names',
    label: 'First Name',
    type: SupportedFields.TEXT,
    placeholder: 'Enter your first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: SupportedFields.TEXT,
    placeholder: 'Enter your last name',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email address',
    type: SupportedFields.EMAIL,
  },
  {
    name: 'institutionName',
    label: 'Institution Name',
    type: SupportedFields.TEXT,
    placeholder: 'Enter your institution name',
  },
  {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message',
    type: SupportedFields.TEXTAREA,
  },
];

function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      names: '',
      lastName: '',
      email: '',
      institutionName: '',
      message: '',
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof contactFormSchema>> = (
    values,
  ) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-full p-4 md:p-8 rounded-lg border border-border shadow-xl bg-card"
      >
        {contactFormFields.map((field) => (
          <FormField
            key={`contact-form-${field.name}`}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <InferItem {...field} {...formField} />
            )}
          />
        ))}
        <Button type="submit" className="self-center">
          Enviar
        </Button>
      </form>
    </Form>
  );
}

export { ContactForm };
