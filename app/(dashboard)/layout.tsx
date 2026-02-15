import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="@container/dashboard">
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-white dark:bg-black w-full px-8 pt-10 @max-sm/dashboard:px-4 @max-md/dashboard:px-4 relative">
          <SidebarTrigger className="absolute top-0 left-0 cursor-pointer" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
