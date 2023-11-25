import { Timestamp } from "firebase/firestore";

export const sampleData = [
    {
        id: '1',
        title: 'Kehilangan iPhone 14 Pro',
        date: Timestamp.fromDate(new Date(Date.now()+30 *8640000 )),
        category: 'lostphone',
        description: 'Terahir lihat di perpus, HPnya warna hitam.',
        city: 'Depok, IDN',
        place: 'Perpus UI',
        createBy: 'Ruben',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        users: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        title: 'Nemu Handphone iPhone 14',
        date: Timestamp.fromDate(new Date(Date.now()+ 60 * 8640000 )),
        category: 'lostphone',
        description: 'bagi yang kehilangan iPhone di perpus, tadi dah saya kasih ke petugasnya ya',
        city: 'Depok',
        place: 'Satpam Perpus UI',
        createBy: 'Tomi',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        users: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    }
];
