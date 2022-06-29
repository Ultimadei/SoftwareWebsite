function Token(type, text, startPos){
    this.type = type;
    this.text = text;
    this.startPos = startPos;
}

function tokenize(text, startPos){
    let type;

    if (text.length == 1 && /[+-*\/%]/.test(text)) type = "Operator";
    else if (/[(){}]/.test(text)) type = "Parenthetical";
    else if (/[0-9]+\.[0-9]+|[0-9]+/.test(text)) type = "NumericLiteral";
    else if (/"[\w\s]+"/.test(text)) type = "StringLiteral";
    else if (/true|false/.test(text)) type = "BooleanLiteral";
    else if (/[,;]/.test(text)) type = "Separator";
    else type = "Identifier";

    return new Token(type, text, startPos);
}

// input : string
function lexer(input){
    let tokens = [];

    let currentTokenStartPos = 0;
    let currentTokenText = "";
    for(let i = 0; i < input.length; i++){
        // Single character tokens
        if (/[+-*\/%()]/.test(input[i])) {
            // Push the current token
            if(currentTokenText.length > 0) tokens.push(tokenize(currentTokenText, currentTokenStartPos));
            currentTokenStartPos = i + 1;
            currentTokenText = "";

            // Also push the single character token
            tokens.push(tokenize(input[i], i));
        }
        // Whitespace test
        else if(/\s/.test(input[i]) && currentTokenText.length > 0) {
            if(currentTokenText.length > 0) tokens.push(tokenize(currentTokenText, currentTokenStartPos));
            currentTokenStartPos = i + 1;
            currentTokenText = "";
        }
        else currentTokenText += input[i];
    }

    return tokens;
}

function interpret(code) {

}