import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom"
import { FaPlay } from "react-icons/fa"
import { Home } from "./pages"
import "./GlobalStyle.css"

function Welcome() {
	const navigate = useNavigate()

	return (
		<div>
			<img
				src="logo.png"
				alt="To Do List"
				className="logo todo-image"
				draggable="false"
			/>
			<h1>Welcome to Do The List</h1>
			<p>
				Created by <span className="high-light">Cinco, Daniela Faith</span> as
				ITEC 106 Individual Activity.
			</p>
			<button className="img-show" onClick={() => navigate("/home")}>
				<FaPlay className="icon" />
				Start
			</button>
		</div>
	)
}

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</Router>
	)
}
