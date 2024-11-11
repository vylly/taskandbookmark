import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Main } from "@/modules/main/view";
import { ui } from "@/store";

export default function Home() {
  const testStore = ui.$tst.hook()
  return (
    <Main>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ThemeToggle />
        <div>{testStore}</div>
      </main>
    </Main>
  );
}
