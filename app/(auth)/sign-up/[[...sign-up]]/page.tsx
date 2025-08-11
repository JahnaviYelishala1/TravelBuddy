import { SignUp } from '@clerk/nextjs'
import { div } from 'motion/react-client'

export default function Page() {
  return (
    <div className='flex ietms-center justify-center h-screen'>
      <SignUp />
    </div>
  )
}