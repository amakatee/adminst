'use client'
import Image from 'next/image'
import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

export default function Home() {
  
    const onOpen = useStoreModal((state) => state.onOpen)
    const isOpen = useStoreModal((state) => state.isOpen)

    useEffect(() => {
        if(!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])

  return null
}
