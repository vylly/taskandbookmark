import { getAllForUser, getGroup } from '@/services/groups/api';
import { Header } from '@/modules/header/molecules/header';
import { notFound, redirect } from 'next/navigation';
import { DashboardView } from '@/modules/dashboard/view/dashboard';
import { cookies } from 'next/headers';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  const vyllyToken = JSON.parse((await cookies()).get('vyllyToken')?.value || '{}');

  const currGroup = await getGroup(id, vyllyToken['accessToken'])
  if(currGroup.code === 460) {
    notFound()
  }
  const allGroup = await getAllForUser(vyllyToken['accessToken'])

  if(!allGroup.length) {
    redirect('/login')
  }


  return (
    <>
      <Header currGroup={currGroup} allGroup={allGroup}/>
      <DashboardView groupid={currGroup.id}/>
    </>
  );
}
