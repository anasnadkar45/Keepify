import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/global/Sidebar";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="custom-scrollbar scroll-smooth">
            <div className="h-screen grid flex-1 md:grid-cols-[3.5rem_1fr]">
                <aside className="hidden w-14 h-full flex-col md:flex">
                    <Sidebar />
                </aside>
                <div>
                    <Navbar />
                    <div className="rounded-lg min-h-[88vh] bg-muted/20 border-2 m-3 pb-32 lg:pb-0 lg:m-4 ">
                        {children}
                    </div>
                </div>
                {/* <BottomBar /> */}
            </div>
        </div>
    );
}