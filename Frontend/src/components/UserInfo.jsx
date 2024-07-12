import { useUserData } from '@/userZustand'

export default function UserInfo() {
  const { name: userName } = useUserData(state => state)
  
  return (
    <>
      {
        userName && <p>{userName}</p>
      }
    </>
  )
}
