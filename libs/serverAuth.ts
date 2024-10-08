// import { NextApiRequest } from 'next';
// import {getSession} from 'next-auth/react'
// import prisma from '@/libs/prismadb'

// const serverAuth = async (req: NextApiRequest)=> {
//     const session = await getSession({req});

//     if(!session?.user?.email){
//         throw new Error('Not signed in')
//     }

//     const currentUser = await prisma.user.findUnique({
//         where: {
//             email: session.user.email
//         }
//     });

//     if(!currentUser){
//         throw new Error('Not signed in')
//     }

//     return {currentUser}
// }

// export default serverAuth

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'; // Import the authOptions
import prisma from '@/libs/prismadb';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    // Use getServerSession instead of getSession
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser };
};

export default serverAuth;
