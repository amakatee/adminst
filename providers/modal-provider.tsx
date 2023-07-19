"use client"

import { useEffect, useState } from "react"

import { StoreModal } from "@/components/modals/store-modal"

type Param = {
    userId: string
}

export const ModalProvider = ({userId} : Param ) => {
    const [isMounted, setIsMounted] = useState(false)
    const [id, setId] = useState('')
    useEffect(() => {
        setId(userId as string)
    },[userId])


    useEffect(() => {
        setIsMounted(true)

    },[])

    if(!isMounted) {
        return null
    }
  

    return (
        <>
        <StoreModal id={id}  />
        </>
    )
}