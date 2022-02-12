function $(str) {
	return document.getElementById(str);
}
function $$(str) {
	return document.getElementsByClassName(str);
}
function $$$(str) {
	return document.getElementsByTagName(str);
}

let buttons = $$$("button");
for (const button of buttons) {
	button.onclick = (event) => {
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
			if (isNaN(exp.result) || exp.result == Infinity) {
				displayNode.innerText = "*Invalid Expression or Math Error";
				displayNode.style.color = "red";
				displayNode.style.fontSize = "16px";
			} else {
				displayNode.innerText = `= ${exp.result}`;
			}
		} else expressionNode.innerText += ch;
	};
}
