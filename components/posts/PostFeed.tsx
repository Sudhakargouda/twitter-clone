import usePosts from '@/hooks/usePosts';
import React from 'react'
import PostItem from './PostItem';

interface PostFeedProps{
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({userId}) => {

  const {data: posts = []} = usePosts(userId)

  return (
    <>
    {posts.map((post: Record<string, any>) => (
      <PostItem
      userId={userId}
      key={post.id}
      data={post}
      />
      ))}
      
    </>
  )
}

export default PostFeed



// import usePosts from '@/hooks/usePosts';
// import React from 'react';
// import PostItem from './PostItem';

// interface PostFeedProps {
//   userId?: string;
// }

// const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
//   const { data: posts = [] } = usePosts(userId);

//   // Ensure posts is an array before using map
//   if (!Array.isArray(posts)) {
//     return null; // Or you can return a fallback UI, like a loading message
//   }

//   return (
//     <>
//       {posts.map((post: Record<string, any>) => (
//         <PostItem
//           userId={userId}
//           key={post.id}
//           data={post}
//         />
//       ))}
//     </>
//   );
// };

// export default PostFeed;
