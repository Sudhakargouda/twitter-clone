// import React, { useEffect } from 'react'
// import useCurrentUser from '@/hooks/useCurrentUser'
// import useNotifications from '@/hooks/useNotifications';
// import { BsTwitterX  } from 'react-icons/bs'


// const NotificationsFeed = () => {
//     const { data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
//     const { data: fetchedNotification = [] } = useNotifications(currentUser?.id);

//     useEffect(() => {
//         mutateCurrentUser()
//     },[mutateCurrentUser])

//     if(fetchedNotification.length === 0){
//         return (
//             <div
//             className='
//             text-neutral-600
//             text-center
//             p-6
//             text-xl
//             '
//             >
//                 No notification
//             </div>
//         )
//     }

//   return (
//     <div className='flex flex-col'>
//         {fetchedNotification.map((notification: Record<string, any>) => (
//             <div
//             key={notification.id}
//             className='
//             flex
//             flex-row
//             items-center
//             p-6
//             gap-4
//             border-b-[1px]
//             border-neutral-800
//             '
//             >
//             <BsTwitterX color= 'white' size={32}/>
//             <p className='text-white'>
//                 {notification.body}
//             </p>
//             </div>
//         ))}
//     </div>
//   )
// }

// export default NotificationsFeed

import React, { useEffect } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useNotifications from '@/hooks/useNotifications';
import { BsTwitterX } from 'react-icons/bs';

interface Notification {
    id: string | number;
    body: string;
}

const NotificationsFeed: React.FC = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotification = [] } = useNotifications(currentUser?.id);

    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser]);

    if (fetchedNotification.length === 0) {
        return (
            <div
                className='
                text-neutral-600
                text-center
                p-6
                text-xl
            '
            >
                No notification
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            {fetchedNotification.map((notification: Notification) => (
                <div
                    key={notification.id}
                    className='
                    flex
                    flex-row
                    items-center
                    p-6
                    gap-4
                    border-b-[1px]
                    border-neutral-800
                '
                >
                    <BsTwitterX color='white' size={32} />
                    <p className='text-white'>
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default NotificationsFeed;
