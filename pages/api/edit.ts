// import { NextApiRequest, NextApiResponse } from "next";
// import serverAuth from "@/libs/serverAuth";
// import prisma from '@/libs/prismadb'

// export default async function handler(
//     req: NextApiRequest, 
//     res: NextApiResponse
// )
//     {
//         if(req.method !== 'PATCH'){
//             return res.status(405).end()
//         }

//         try {
//             const { currentUser } = await serverAuth(req)
//             const {name, username, bio, profileImage, coverImage} = req.body

//             console.log(req.body);

//             if(!name || !username){
//                 throw new Error('Missing fields')
//             }

//             const updatedUser = await prisma.user.update({
//                 where: {
//                     id: currentUser.id
//                 },
//                 data: {
//                     name,
//                     username,
//                     bio,
//                     profileImage,
//                     coverImage,
//                 }
//             })

//             return res.status(200).json(updatedUser)
//         } catch (error) {
//             console.log(error);
//             return res.status(400).end()   
//         }
//     }


import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return res.status(405).end(); // Method Not Allowed
    }

    try {
        // Get current user from serverAuth
        const { currentUser } = await serverAuth(req, res);
        
        const { name, username, bio, profileImage, coverImage } = req.body;

        // console.log("Request Body:", req.body);  // Log the request body for debugging

        // Validate required fields
        if (!name || !username) {
            return res.status(400).json({ message: 'Missing fields: name and username are required.' });
        }

        // Update user details in the database
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        return res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error("API error:", error.message);
        return res.status(400).json({ message: error.message });
    }
}
