import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import MainLayout from "./components";
import NotFound from "./components/NotFound";
import DragAndDrop from "./components/Drag_and_drop";
import DataMapping from "./components/Data_Mapping";
import NestedDragApp from "./components/New_Drag_Drop/nested-drap-app";
import CertificationDndAPP from "./components/New_Drag_Drop/examples/certification-dnd-app";
import MuiTreeDndApp from "./components/New_Drag_Drop/muiTree/mui-tree-app";
import AtlaskitDragTree from "./components/Atlaskit/AtlaskitDragTree";
import KendoDragDrop from "./components/Kendo/KendoDragDrop";

import "@progress/kendo-theme-default/dist/all.css";

function App() {
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        bgcolor: blue[100],
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/dragdrop" element={<DragAndDrop />} />
          <Route path="/datamapping" element={<DataMapping />} />
          <Route path="/newdragdrop" element={<NestedDragApp />} />
          <Route path="/newnewdragdrop" element={<CertificationDndAPP />} />
          <Route path="/muidragdrop" element={<MuiTreeDndApp />} />
          <Route path="/atlasdragdrop" element={<AtlaskitDragTree />} />
          <Route path="/kendodragdrop" element={<KendoDragDrop />} />
          <Route path="*" element={<NotFound />} />
          <Route />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
