
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResearcherProfile from "./pages/ResearcherProfile";
import Publications from "./pages/Publications";
import ResearchStatistics from "./pages/ResearchStatistics";
import DataCollection from "./pages/DataCollection";
import EthicsProtocols from "./pages/EthicsProtocols";
import ResearchProjects from "./pages/ResearchProjects";
import TrainingSeminars from "./pages/TrainingSeminars";
import AttendanceRecords from "./pages/AttendanceRecords";
import KPIRecords from "./pages/KPIRecords";
import DepartmentOverview from "./pages/DepartmentOverview";
import QueryReports from "./pages/QueryReports";
import UserManagement from "./pages/UserManagement";
import RoleSettings from "./pages/RoleSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/researcher-profile" element={<ResearcherProfile />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/research-statistics" element={<ResearchStatistics />} />
            <Route path="/data-collection" element={<DataCollection />} />
            <Route path="/ethics-protocols" element={<EthicsProtocols />} />
            <Route path="/research-projects" element={<ResearchProjects />} />
            <Route path="/training-seminars" element={<TrainingSeminars />} />
            <Route path="/attendance-records" element={<AttendanceRecords />} />
            <Route path="/kpi-records" element={<KPIRecords />} />
            <Route path="/department-overview" element={<DepartmentOverview />} />
            <Route path="/query-reports" element={<QueryReports />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/role-settings" element={<RoleSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
