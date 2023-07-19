
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prisma from '../../../../../lib/prismadb'
import SettingsForm from './components/settings-form'


interface SettingPageProps {
    params: {
        storeid: string 
    }
}

export default async function SettingPage ({params} : SettingPageProps) {
    const {userId} = auth()
    console.log(userId)
    if(!userId) {
        redirect('/')
    }

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeid,
            userId
        }
    })
  
    if(!store) {
        redirect('/')
    }
    return (
        <div className='flex-col'>
            <div className='flex-1 p-8 pr-6 space-4'> 
            <SettingsForm initialData={store} userId={userId}/>
            </div>
        </div>
    )
}


