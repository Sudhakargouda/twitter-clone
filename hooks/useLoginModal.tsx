import React from 'react'
import {create} from 'zustand'

interface LoginModalStore{
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void
}

const useLoginModal = create<LoginModalStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useLoginModal

// (()=>({})) above we used like this syntax see
