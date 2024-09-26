import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/global/Sidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="custom-scrollbar scroll-smooth min-h-screen">
      <div className="min-h-screen w-full flex">
        <aside className="md:block">
          <Sidebar />
        </aside>
        <div className="flex flex-col flex-1 bg-card">
          <Navbar />
          <div className="flex-1 rounded-lg p-2">
            <div className="bg-background h-full w-full rounded-[20px] p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
