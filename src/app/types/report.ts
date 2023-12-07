export type AppReport = {
    id: string
    title: string
    createBy: string
    hostUid: string
    category: string
    date: string
    city: string
    place: string
    description: string
    hostPhotoURL: string
    isCancelled: boolean
    users: User[]
    usersIds:string[]
    isHost?:boolean
    isGoing?:boolean
}

export type User = {
    id: string
    name: string
    photoURL: string
}

export type ChatComment = {
    id: string
    displayName: string
    photoURL: string
    uid: string
    text: string
    date: number
    parentId: string | null
    childNodes: ChatComment[]
}