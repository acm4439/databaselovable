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
import TrainingSeminars from "./pages/TrainingSeminars";
import DepartmentOverview from "./pages/DepartmentOverview";
import NotFound from "./pages/NotFound";
import ResearcherDetails from "./pages/ResearcherDetails";

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
            <Route path="/researcher/:id" element={<ResearcherDetails />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/research-statistics" element={<ResearchStatistics />} />
            <Route path="/data-collection" element={<DataCollection />} />
            <Route path="/ethics-protocols" element={<EthicsProtocols />} />
            <Route path="/training-seminars" element={<TrainingSeminars />} />
            <Route path="/department-overview" element={<DepartmentOverview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
