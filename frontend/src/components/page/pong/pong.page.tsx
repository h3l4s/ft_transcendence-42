import React from 'react'
//import { Link } from 'react-router-dom'

import './../../../style/pong.css';

function PongPage()
{
	return (
		<body id="body">
			<div id="all">
				<h1 id="bandeau">Welcome to our FT_Transcendance !</h1>
				<p id="to-play">If you want to play to a simple pong please use the map 1.</p>
				<div id="choice">
					<button id="pong1" className="bouton" type="button" onClick={(e) => { e.preventDefault(); window.location.href = '/pong'; }}> simple pong </button>
					<button id="pong2" className="bouton" type="button" onClick={(e) => { e.preventDefault(); window.location.href = '/pong2'; }}> space pong </button>
					<button id="pong3" className="bouton" type="button" onClick={(e) => { e.preventDefault(); window.location.href = '/pong3'; }}> tennis pong </button>
				</div>
			</div>
		</body>

	);
}

window.addEventListener("load", function ()
{
	let all = this.document.querySelector("#all")! as HTMLElement;
	let pong1 = this.document.querySelector("#pong1")! as HTMLElement;
	let pong2 = this.document.querySelector("#pong2")! as HTMLElement;
	let pong3 = this.document.querySelector("#pong3")! as HTMLElement;

	all.style.textAlign = "center";
	pong1.style.fontFamily = "OCR A Std";
	pong2.style.fontFamily = "OCR A Std";
	pong3.style.fontFamily = "OCR A Std";
	pong1.style.fontSize = "18px";
	pong2.style.fontSize = "18px";
	pong3.style.fontSize = "18px";

	pong1.style.marginRight = "2%";
	pong1.style.marginTop = "10%";
	pong1.style.marginBottom = "37%";
	pong2.style.marginRight = "2%";
	pong2.style.marginBottom = "37%";
	pong3.style.marginRight = "2%";

	all.style.minHeight = this.window.innerHeight.toString();
});

export default PongPage;