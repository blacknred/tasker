import { Merge } from 'type-fest'

export interface User {
  id: number
  email: string
  name: string | null
}

export interface ApiAllUsers {
  allUsers: Merge<User, { postCount: number }>[]
}
