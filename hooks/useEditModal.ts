import React from 'react'
import {create} from 'zustand'

interface EditModalStore{
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void
}

const useEditModal = create<EditModalStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useEditModal

// (()=>({})) above we used like this syntax see
