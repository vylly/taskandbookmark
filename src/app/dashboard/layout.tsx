import { Header } from "@/modules/header/molecules/header";
import { Main } from "@/modules/main/view";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <Header />
      {children}
    </Main>
  );
}
