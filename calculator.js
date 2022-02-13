function $(str) {
	return document.getElementById(str);
}
function $$(str) {
	return document.getElementsByClassName(str);
}
function $$$(str) {
	return document.getElementsByTagName(str);
}
$("audio").style.display = "none";
let buttons = $$$("button");
for (const button of buttons) {
	button.onclick = (event) => {
		$("audio").play();
		let char = event.target;
		// console.log(char.classList.contains("backspace"));
		let expressionNode = $("expression");
		let displayNode = $("result");
		let ch = char.innerText;
		let flag = char.classList.contains("backspace");
		let expression = expressionNode.innerText;
		if (ch == "Ac") {
			expressionNode.innerText = "";
			displayNode.innerText = "";
		} else if (flag == true) {
			expression = expression.substr(0, expression.length - 1);
			expressionNode.innerText = expression;
		} else if (ch == "=") {
			let exp = new postFix(expression);
			console.log(exp.result);
			if (isNaN(exp.result)) {
				displayNode.innerText = "*Invalid Expression";
				displayNode.style.color = "red";
				displayNode.style.fontSize = "16px";
			} else if (exp.result == Infinity) {
				displayNode.innerText = "*Math Error";
				displayNode.style.color = "red";
				displayNode.style.fontSize = "16px";
			} else {
				displayNode.innerText = `= ${exp.result}`;
				displayNode.style.color = "white";
				displayNode.style.fontSize = "32px";
			}
		} else expressionNode.innerText += ch;
	};
}
