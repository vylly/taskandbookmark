import { cookies } from 'next/headers';
import { getAllForUser } from '@/services/groups/api';
import { redirect } from 'next/navigation';
import { Group } from '@/services/groups/types';

export default async function Page() {
  const vyllyToken = JSON.parse((await cookies()).get('vyllyToken')?.value || '{}');
  const vyllyCurrentGroup = (await cookies()).get('vyllCurrentGroup')?.value;

  const allGroups = await getAllForUser(vyllyToken['accessToken'])
  console.log('allgroups: ', allGroups)

  const currGroupId = vyllyCurrentGroup

  if(currGroupId && allGroups.find((group: Group) => {
    return currGroupId === group.id.toString()
  })){
    redirect(`/dashboard/${currGroupId}`)
  }

  if(!allGroups.length) {
    redirect('/login')
  }
  redirect(`/dashboard/${allGroups[0].id}`)
  
}