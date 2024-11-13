import { Main } from "@/modules/main/view";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main className="justify-center">
      {children}
    </Main>
  );
}
