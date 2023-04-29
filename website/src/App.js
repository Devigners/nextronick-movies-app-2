import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./Assets/css/animate.min.css";
import "./Assets/css/aos.css";
import "./Assets/css/bootstrap.min.css";
import "./Assets/css/default.css";
import "./Assets/css/flaticon.css";
import "./Assets/css/fontawesome-all.min.css";
import "./Assets/css/responsive.css";
import "./Assets/css/style.css";
import AppRoutes from "./Routes/AppRoutes";
import store from "./Store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRoutes />
				<Toaster />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
