

export interface WithPaginationType {
  total: number,
  page: number,
  totalPages: number
}
export interface UserType {
  id: string
  lastName: string
  firstName: string
  email: string
  role: string
  createdAt: string
}

export interface UsersType extends WithPaginationType {
  users: UserType[]; // Lista de usuarios
}
