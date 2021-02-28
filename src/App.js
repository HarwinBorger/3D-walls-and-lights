import './App.css';
import * as THREE from 'three'
import Scene from "./Scene";
import {Canvas} from "react-three-fiber";

function App() {

	return (
		<>
			<Canvas shadowMap={{type:THREE.PCFSoftShadowMap}}>
				<Scene/>
			</Canvas>
		</>
	);
}

export default App;
