import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import "./Assets/css/bootstrap.min.css";
import "./Assets/css/animate.min.css";
import "./Assets/css/fontawesome-all.min.css";
import "./Assets/css/flaticon.css";
import "./Assets/css/aos.css";
import "./Assets/css/default.css";
import "./Assets/css/style.css";
import "./Assets/css/responsive.css";

function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
