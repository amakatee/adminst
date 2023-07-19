"use client"
import {useEffect, useState} from 'react'
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen, 
    onClose, 
    onConfirm, 
    loading
}) => {
    const [ isMounted, setIsMounted ] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <Modal
        title=" Are you sure? "
        description=" This action cant be undone"
        isOpen={isOpen}
        onClose={onClose}
        >
            <div className='flex items-center justify-end w-full pt-6 space-x-2' >
                <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
                > Cancel</Button>
                <Button
                disabled={loading}
                variant="destructive"
                onClick={onConfirm}
                >
                Delete
                </Button>

            </div>

        </Modal>
    )

}