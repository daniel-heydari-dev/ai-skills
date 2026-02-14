import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ExplorePage } from "./pages/ExplorePage";
import { GuidePage } from "./pages/GuidePage";
import { CategoryPage } from "./pages/CategoryPage";
import { SkillPage } from "./pages/SkillPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="guide" element={<GuidePage />} />
        <Route path=":category" element={<CategoryPage />} />
        <Route path=":category/:skill" element={<SkillPage />} />
      </Route>
    </Routes>
  );
}
