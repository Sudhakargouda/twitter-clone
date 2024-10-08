// import useCurrentUser from '@/hooks/useCurrentUser';
// import useEditModal from '@/hooks/useEditModal';
// import useUser from '@/hooks/useUser';
// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react'
// import toast from 'react-hot-toast';
// import Modal from '../Modal';
// import Input from '@/components/Intput'
// import ImageUpload from '../ImageUpload';


// const EditModal = () => {

//     const {data: currentUser} = useCurrentUser();
//     const {mutate: mutateFetchedUser} = useUser(currentUser?.id)
//     const editModal = useEditModal()

//     const [profileImage, setProfileImage] = useState('')
//     const [coverImage, setCoverImage] = useState('')
//     const [name, setName] = useState('')
//     const [username, setUsername] = useState('')
//     const [bio, setBio] = useState('')

//     useEffect(() => {
//         setProfileImage(currentUser?.profileImage);
//         setCoverImage(currentUser?.coverImage);
//         setName(currentUser?.name);
//         setUsername(currentUser?.username);
//         setBio(currentUser?.bio)
//     },[currentUser])

//     const [isLoading, setIsLoading] = useState(false)

//     const onSubmit = useCallback(async () => {
//         try {
//             setIsLoading(true)
//              // Log the data being sent
//         console.log({
//             name,
//             username,
//             bio,
//             profileImage,
//             coverImage
//         });

//             await axios.patch('/api/edit', {
//                 name,
//                 username,
//                 bio,
//                 profileImage,
//                 coverImage
//             })
//             mutateFetchedUser()
//             toast.success('Updated')
//             editModal.onClose()
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error('Something went wrong')
//         }finally{
//             setIsLoading(false)
//         }
//     },[bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser])

//     const bodyContent =(
//         <div className='flex flex-col gap-4'>
//             <ImageUpload
//             value={profileImage}
//             disabled={isLoading}
//             onChange={(image) => setProfileImage(image)}
//             label="Upload profile image"
//             />

//             <ImageUpload
//             value={coverImage}
//             disabled={isLoading}
//             onChange={(image) => setCoverImage(image)}
//             label="Upload coverImage image"
//             />


//             <Input
//             placeholder="Name"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             disabled={isLoading} 
//             />

//             <Input
//             placeholder="Username"
//             onChange={(e) => setUsername(e.target.value)}
//             value={username}
//             disabled={isLoading} 
//             />

//             <Input
//             placeholder="Bio"
//             onChange={(e) => setBio(e.target.value)}
//             value={bio}
//             disabled={isLoading} 
//             />
//         </div>
//     )


//   return (
//     <Modal
//     disabled={isLoading}
//     isOpen={editModal.isOpen}
//     title='Edit your profile'
//     actionLabel='Save'
//     onClose={editModal.onClose}
//     onSubmit={onSubmit}
//     body={bodyContent}
    
//     />
//   )
// }

// export default EditModal


import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import Input from '@/components/Intput';
import ImageUpload from '../ImageUpload';

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            // Ensure name and username are not empty
            if (!name || !username) {
                toast.error('Name and Username are required');
                setIsLoading(false);
                return;
            }

            // Log the data being sent for debugging
            // console.log({
            //     name,
            //     username,
            //     bio,
            //     profileImage,
            //     coverImage
            // });

            // Make the PATCH request to the API
            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });

            // Mutate the fetched user to update the local cache
            mutateFetchedUser();
            toast.success('Profile updated successfully');
            editModal.onClose();
        } catch (error: any) {
            console.error('Error:', error.response?.data || error.message);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload profile image"
            />

            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload cover image"
            />

            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />

            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />

            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title='Edit your profile'
            actionLabel='Save'
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

export default EditModal;
