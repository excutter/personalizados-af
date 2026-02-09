import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-white dark:bg-black w-full px-8 py-10 relative">
          <SidebarTrigger className="absolute top-0 left-0 cursor-pointer" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
