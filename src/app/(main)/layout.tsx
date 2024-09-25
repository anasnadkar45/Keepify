import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/global/Sidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="custom-scrollbar scroll-smooth">
      <div className="h-screen w-full flex">
        <aside className="h-full md:block">
          <Sidebar />
        </aside>
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex-1 rounded-lg bg-background pb-32 lg:pb-0 p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
