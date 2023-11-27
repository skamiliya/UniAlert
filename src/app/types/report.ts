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
    isCancelled: boolean
    users: User[]
}

export type User = {
    uid: string | undefined
    email: string | null
    displayName: string | null
    providerData: any
    id: string
    name: string
    photoURL: string
}