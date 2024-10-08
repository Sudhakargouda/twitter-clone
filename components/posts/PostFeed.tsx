// import usePosts from '@/hooks/usePosts';
// import React from 'react'
// import PostItem from './PostItem';

// interface PostFeedProps{
//   userId?: string;
// }

// const PostFeed: React.FC<PostFeedProps> = ({userId}) => {

//   const {data: posts = []} = usePosts(userId)

//   return (
//     <>
//     {posts.map((post: Record<string, any>) => (
//       <PostItem
//       userId={userId}
//       key={post.id}
//       data={post}
//       />
//       ))}
      
//     </>
//   )
// }

// export default PostFeed


import usePosts from '@/hooks/usePosts';
import React from 'react';
import PostItem from './PostItem';

// Define an interface for the user
interface User {
    id: string | number; // Assuming user ID can be either string or number
    name: string;
    username: string;
}

// Define an interface for the post
interface Post {
    id: string | number;  // Assuming post ID can be either string or number
    body: string;         // Content of the post
    user: User;          // User object associated with the post
    createdAt: string;    // Date the post was created
    likedIds: (string | number)[]; // Array of user IDs who liked the post
}

interface PostFeedProps {
    userId?: string; // Optional userId prop
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    // Fetch posts using the userId
    const { data: posts = [] } = usePosts(userId);

    return (
        <>
            {posts.map((post: Post) => ( // Use the Post type
                <PostItem
                    userId={userId}
                    key={post.id}
                    data={post}
                />
            ))}
        </>
    );
}

export default PostFeed;
