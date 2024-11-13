import { Main } from "@/modules/main/view";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      {children}
    </Main>
  );
}
