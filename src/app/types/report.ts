export type AppReport = {
    id: string
    title: string
    createBy: string
    category: string
    date: string
    city: string
    place: string
    description: string
    hostPhotoURL: string
    users: User[]
}

export type User = {
    id: string
    name: string
    photoURL: string
}