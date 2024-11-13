import { cookies } from 'next/headers';
import { getAllForUser } from '@/services/groups/api';
import { redirect } from 'next/navigation';
import { Group } from '@/services/groups/types';

export default async function Page() {
  const vyllyToken = JSON.parse((await cookies()).get('vyllyToken')?.value || '{}');
  const vyllyCurrentGroup = (await cookies()).get('vyllCurrentGroup')?.value;
  console.log('vyllyCurrentGroup: ', vyllyCurrentGroup)

  const allGroups = await getAllForUser(vyllyToken['accessToken'])
  console.log('allgroup:', allGroups)

  const currGroupId = vyllyCurrentGroup

  if(currGroupId && allGroups.map((group: Group) => {
    return currGroupId === group.id.toString()
  }).length){
    redirect(`/dashboard/${currGroupId}`)
  }

  redirect(`/dashboard/${allGroups[0].id}`)
}