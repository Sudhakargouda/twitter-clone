// import React from 'react'
// import CommentItem from './CommentItem'

// interface CommentFeedProps{
//     comments?: Record<string, any>[];
// }


// const CommentFeed: React.FC<CommentFeedProps> = ({comments = []}) => {
//   return (
//     <>
//     {comments.map((comment) => (
//        <CommentItem key = {comment.id} data = {comment} />
//     ))}
//     </>
//   )
// }

// export default CommentFeed


import React from 'react';
import CommentItem from './CommentItem';

// Define an interface for the user
interface User {
    id: string | number; // Assuming user ID can be either string or number
    name: string;
    username: string;
}

// Define an interface for the comment
interface Comment {
    id: string | number;   // Assuming id can be either string or number
    body: string;          // Content of the comment
    user: User;           // User object associated with the comment
    createdAt: string;     // Date the comment was created
}

interface CommentFeedProps {
    comments?: Comment[]; // Use the defined Comment type
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
    return (
        <>
            {comments.map((comment) => (
                <CommentItem key={comment.id} data={comment} />
            ))}
        </>
    );
}

export default CommentFeed;
