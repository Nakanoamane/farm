This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Style

You can use sass.
When referring to it by name from a component, prefix it with `*.module.scss`.

### Image

```.js
import Image from 'next/image'
import imagePath from '../lib/image';

export default function Foo() {
	return (
		<Image src={imagePath('image.svg')} />
  )
}
```

## Deploy to Github Pages

Push to branch `main`. Then Github Actions will deploy it automatically.
The configuration for deployment is in `.github/nextjs.yml`.

The following changes are made to `next.confg.js` to make it a static app.

```.js
const nextConfig = {
	output: 'export' // add
}
```
