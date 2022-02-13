//This Class takes a string as an infix expression & convert it to postfix expression & evaluate it.
class postFix {
	constructor(str) {
		this.str = str;
		//exp is an array containing each element of infix expression
		// this.exp = [];
		this.postfix = [];
		this.map = new Map();
		this.map.set("+", 1);
		this.map.set("-", 1);
		this.map.set("*", 2);
		this.map.set("/", 2);
		this.map.set("^", 3);
		this.infix = this.exp = this.stringToInfix();
		this.postfix = this.infixToPostfix();
		this.result = this.postfixToResult();
	}
	calculate(u, v, char) {
		if (char == "+") return u + v;
		else if (char == "-") return u - v;
		else if (char == "*") return u * v;
		else if (char == "/") return u / v;
		else if (char == "^") return Math.pow(u, v);
		else return NaN;
	}
	//This function converts the given string to 'infix' notation.
	stringToInfix() {
		let tt = "( ";
		for (const elm of this.str) {
			if (
				elm == "(" ||
				elm == ")" ||
				elm == "+" ||
				elm == "-" ||
				elm == "*" ||
				elm == "/" ||
				elm == "^"
			)
				tt = tt + ` ${elm} `;
			else tt += elm;
		}
		tt += " )";
		this.infix = this.exp = tt.split(" ");
		return this.infix;
	}
	//This function converts given infix expression to postfix expression
	infixToPostfix() {
		let arr = [];
		for (const elm of this.exp) {
			if (elm == "(") arr.push(elm);
			else if (elm == ")") {
				let sz = arr.length;
				if (sz == 0) return [];
				while (arr[sz - 1] != "(") {
					this.postfix.push(arr.pop());
					sz--;
				}
				arr.pop();
			} else if (
				elm == "+" ||
				elm == "-" ||
				elm == "/" ||
				elm == "*" ||
				elm == "^"
			) {
				while (1) {
					let sz = arr.length;
					let top = arr[sz - 1];
					if (top == "(" || sz == 0) break;
					let u = this.map.get(top);
					let v = this.map.get(elm);
					if (v <= u) {
						this.postfix.push(arr.pop());
					} else break;
				}
				arr.push(elm);
			} else if (!isNaN(parseFloat(elm))) this.postfix.push(elm);
		}
		return this.postfix;
	}
	//This function evaluaate postfix expression
	postfixToResult() {
		let stk = [];
		for (const elm of this.postfix) {
			if (elm == "+" || elm == "-" || elm == "*" || elm == "/" || elm == "^") {
				if (stk.length < 2) return (this.result = NaN);
				let v = parseFloat(stk.pop());
				let u = parseFloat(stk.pop());
				stk.push(this.calculate(u, v, elm));
			} else if (elm != "") stk.push(elm);
		}
		this.result = parseFloat(stk[0]);
		return parseFloat(this.result.toPrecision(12));
	}
}
//Sample Input
//Expression contains number & '(' & ')' & '+' & '-' & '/' & '*' & '.' & '^',
