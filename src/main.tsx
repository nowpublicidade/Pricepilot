import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import LandingPageV2 from "./app/LandingPageV2.tsx";
import "./styles/index.css";

// Rota simples baseada no pathname
// /         → Landing v1 (original)
// /v2        → Landing v2 (facilities/manutenção TI)

const path = window.location.pathname;
const Page = path.startsWith("/v2") ? LandingPageV2 : App;

createRoot(document.getElementById("root")!).render(<Page />);