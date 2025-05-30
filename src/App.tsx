
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResearchActivities from "./pages/ResearchActivities";
import DataCollection from "./pages/DataCollection";
import EthicsProtocols from "./pages/EthicsProtocols";
import Publications from "./pages/Publications";
import KPIRecords from "./pages/KPIRecords";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/research-activities" element={<ResearchActivities />} />
          <Route path="/data-collection" element={<DataCollection />} />
          <Route path="/ethics-protocols" element={<EthicsProtocols />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/kpi-records" element={<KPIRecords />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
