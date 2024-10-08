// import {NextPageContext} from "next"
// import { getSession} from 'next-auth/react'

// import Header from '@/components/Header';
// import NotificationsFeed from "@/components/NotificationsFeed";


// export async function getServerSideProps(context: NextPageContext){
//     const session = await getSession(context)

//     if(!session){
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             }
//         }
//     }
//     return {
//         props: {
//             session
//         }
//     }
// }


// const Notifications = () => {
//     return (
//         <>
//         <Header label = "Notification" showBackArrow/>
//         <NotificationsFeed/>
//         </>
//     )
// }

// export default Notifications

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Header from '@/components/Header';
import NotificationsFeed from '@/components/NotificationsFeed';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);  // Ensure context is passed correctly here

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session }, // Session data will be available as a prop
  };
};

const Notifications = () => {
  return (
    <>
      <Header label="Notification" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
