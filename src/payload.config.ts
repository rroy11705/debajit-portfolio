// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Contacts } from './collections/Contacts'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Icon: './graphics/Icon/index.tsx#Icon',
        Logo: './graphics/Logo/index.tsx#Logo',
      },
    },
    meta: {
      description: 'Expert motion graphics designer with 6+ years experience specializing in 2D/3D animation, visual effects, and kinetic typography. Transform your brand with dynamic visual storytelling.',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/avatar.png',
        },
      ],
      openGraph: {
        description: 'Expert motion graphics designer with 6+ years experience specializing in 2D/3D animation, visual effects, and kinetic typography. Transform your brand with dynamic visual storytelling.',
        images: [
          {
            height: 600,
            url: '/avatar.png',
            width: 800,
          },
        ],
        title: 'Debajit Dey - Motion Graphics Designer | 6+ Years Experience',
      },
      titleSuffix: '- Debajit Dey - Motion Graphics Designer | 6+ Years Experience',
    },
  },
  collections: [Users, Media, Pages, Contacts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
