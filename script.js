// SYMBOL TABLE 
// lexeme | token class
//


var alphabet = /[IVXLCDM]/;
var whiteSpace = /[ \t\n]+/g;

class LexicalAnalizer {
    constructor(source) {
        this.source = source;
        this.tokenList = [];
    }

    analize() {
        let sourceParts = this.source.split(whiteSpace);
        let currentPosition = 0, lastPosition = 0;

        for(let part of sourceParts) {
            lastPosition = currentPosition;
            currentPosition = lastPosition + part.length;
            console.log(part)
            if(whiteSpace.test(part)) continue;
            if(part === "") continue;

            if(alphabet.test(part))
                this.tokenList.push({type:"ROMANO", lexeme:part})
            else {
                this.error = `Identificador "${part}" na posição [${lastPosition}:${currentPosition}] não identificado.`;
                return false;
            }
        }
        return true;
    }

    createTableFromTokenList() {
        if(this.tokenList === null | this.tokenList.length === 0)
            return null;
        let tableElt = document.createElement("table");
        let tableRow, tableDataType, tableDataLexeme;

        tableRow = document.createElement("tr");
        tableDataType = document.createElement("th");
        tableDataLexeme = document.createElement("th");
        

        for(let token of this.tokenList) {
            tableRow = document.createElement("tr");
            tableDataType = document.createElement("td");
            tableDataLexeme = document.createElement("td");

            tableDataType.innerHTML = token.type;
            tableDataLexeme.innerHTML = token.lexeme;

            tableRow.appendChild(tableDataType);
            tableRow.appendChild(tableDataLexeme);
            tableElt.appendChild(tableRow);
        }
        console.log(tableElt)
        return tableElt;
    }
}

var textarea = document.querySelector("#source");
var message = document.querySelector("#message")

function analize() {
    let source = textarea.value;
    let lexAnalizer = new LexicalAnalizer(source);
    let result = lexAnalizer.analize()
        console.log(result)

    if(!result) {
        showError(lexAnalizer.error)
    } else {
        let tokenList = lexAnalizer.createTableFromTokenList();
        showTable(tokenList);
    }

}

function showError(error) {
    message.innerHTML = "";
    let divError = document.createElement("div");
    divError.classList.add("error");
    divError.innerHTML = error;
    message.appendChild(divError);
}

function showTable(tokenList) {
    message.innerHTML = "";
    let divTable = document.createElement("div");
    divTable.classList.add("table");
    divTable.appendChild(tokenList);
    message.appendChild(divTable);
}