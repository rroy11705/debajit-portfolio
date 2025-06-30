import type { CollectionConfig } from 'payload';

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
  },
  access: {
    read: () => true, // Allow public reading for your own queries
    create: () => true, // Allow public creation from the contact form
    update: ({ req: { user } }: { req: { user: unknown } }) => !!user, // Only authenticated users can update
    delete: ({ req: { user } }: { req: { user: unknown } }) => !!user, // Only authenticated users can delete
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      maxLength: 200,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 2000,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Resolved',
          value: 'resolved',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          // Send notification email or trigger other actions
          console.log('New contact form submission:', doc);
          // You could integrate with email services like SendGrid, Mailgun, etc.
        }
      },
    ],
  },
};
