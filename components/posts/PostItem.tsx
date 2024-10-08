// import useCurrentUser from '@/hooks/useCurrentUser'
// import useLoginModal from '@/hooks/useLoginModal'
// import { formatDistanceToNowStrict } from 'date-fns'
// import { useRouter } from 'next/router'
// import React, { useCallback, useMemo } from 'react'
// import Avatar from '../Avatar'
// import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
// import useLike from '@/hooks/useLike'

// interface PostItemProps{
//     data: Record<string, any>;
//     userId?: string;
// }

// const PostItem: React.FC<PostItemProps> = ({data, userId}) => {
//     const router = useRouter()
//     const loginModal = useLoginModal()

//     const {data: currentUser} = useCurrentUser()
//     const {hasLiked, toggleLike} = useLike({postId: data.id, userId})
    
//     const goToUser = useCallback((event: any) => {
//         event.stopPropagation()

//         router.push(`/users/${data.user.id}`)
//     },[router, data.user.id])

//     const goToPost = useCallback(() => {
//         router.push(`/posts/${data.id}`)
//     },[router, data.id])

//     const onLike = useCallback((event: any) => {
//         event.stopPropagation()

//         if(!currentUser){
//             return  loginModal.onOpen()
//         }
//         toggleLike()
//     },[loginModal, currentUser, toggleLike])

//     const createdAt = useMemo(() => {
//         if(!data?.createdAt){
//             return null
//         }

//         return formatDistanceToNowStrict(new Date(data.createdAt))
//     },[data?.createdAt])
    
//     const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

//   return (
//     <div
//     onClick={goToPost}
//     className='
//     border-b-[1px]
//     border-neutral-800
//     p-5
//     cursor-pointer
//     hover: bg-neutral-900
//     transition
//     '
//     >
//         <div className='flex flex-row items-start gap-3'>
//             <Avatar userId={data.userid}/>
//             <div>
//                 <div className='
//                 flex flex-row items-center gap-2
//                 '>
//                 <p
//                 onClick={goToUser}
//                 className='
//                 text-white
//                 font-semibold
//                 cursor-pointer
//                 hover:underline 
//                 '
//                 >{data.user.name}</p>
//                 <span 
//                 onClick={goToUser}
//                 className='
//                 text-neutral-500
//                 cursor-pointer
//                 hover: underline
//                 hidden
//                 md:block
//                 '>
//                     @{data.user.username}
//                 </span>
//                 <span className='text-neutral-500 text-sm'>
//                     {createdAt}
//                 </span>
//                 </div>
//                 <div className='text-white mt-1'>
//                     {data.body}
//                 </div>
//                 <div className='flex flex-row items-center mt-3 gap-10'>
//                     <div
//                     className='
//                     flex
//                     flex-row
//                     items-center
//                     text-neutral-500
//                     gap-2
//                     cursor-pointer
//                     transition
//                     hover:text-sky-500
//                     '>
//                         <AiOutlineMessage size={20}/>
//                         <p>
//                             {data.comments?.length || 0}
//                         </p>
//                     </div>

//                     <div
//                     onClick={onLike}
//                     className='
//                     flex
//                     flex-row
//                     items-center
//                     text-neutral-500
//                     gap-2
//                     cursor-pointer
//                     transition
//                     hover:text-red-500
//                     '>
//                         <LikeIcon size={20} color={hasLiked ? 'red' : ''}/>
//                         <p>
//                             {data.likedIds.length}

//                         </p>
//                     </div>


//                 </div>
//             </div>
//         </div>

//     </div>
//   )
// }

// export default PostItem


import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import Avatar from '../Avatar';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import useLike from '@/hooks/useLike';

// Define an interface for the user
interface User {
    id: string | number; // Assuming user ID can be either string or number
    name: string;
    username: string;
}

// Define an interface for a comment
interface Comment {
    id: string | number;
    body: string;
    userId: string | number;
    postId: string | number;
    createdAt: string;
}

// Define an interface for the post
interface Post {
    id: string | number;        // Assuming post ID can be either string or number
    body: string;               // Content of the post
    user: User;                 // User object associated with the post
    createdAt: string;          // Date the post was created
    comments?: Comment[];       // Array of comments
    likedIds: (string | number)[]; // Array of user IDs who liked the post
}

interface PostItemProps {
    data: Post;           // Use the defined Post type
    userId?: string;      // Optional userId prop
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    
    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: String(data.id), userId }); // Convert postId to string
    
    const goToUser = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`);
    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }
        toggleLike();
    }, [loginModal, currentUser, toggleLike]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <div
            onClick={goToPost}
            className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'
        >
            <div className='flex flex-row items-start gap-3'>
                <Avatar userId={String(data.user.id)} /> {/* Convert userId to string */}
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <p
                            onClick={goToUser}
                            className='text-white font-semibold cursor-pointer hover:underline'
                        >
                            {data.user.name}
                        </p>
                        <span 
                            onClick={goToUser}
                            className='text-neutral-500 cursor-pointer hover:underline hidden md:block'
                        >
                            @{data.user.username}
                        </span>
                        <span className='text-neutral-500 text-sm'>
                            {createdAt}
                        </span>
                    </div>
                    <div className='text-white mt-1'>
                        {data.body}
                    </div>
                    <div className='flex flex-row items-center mt-3 gap-10'>
                        <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
                            <AiOutlineMessage size={20} />
                            <p>{data.comments?.length || 0}</p>
                        </div>
                        <div
                            onClick={onLike}
                            className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
                        >
                            <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
                            <p>{data.likedIds.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
