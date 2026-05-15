import Image from 'next/image'

export default function Page() {
  return (
    <>
        <h1>Hello, Next.js!</h1>
        <Image src="/img.png" alt="Description of image" width={300} height={300} />
    </>
  )
}