function hexCharCodeToStr(hexCharCodeStr) {
    const trimStr = hexCharCodeStr.trim();
    const rawStr = trimStr.substr(0, 2).toLowerCase() === "0x" ? trimStr.substr(2) : trimStr;
    const len = rawStr.length;
    if (len % 2 !== 0) {
        return "";
    }
    let curCharCode;
    const resultStr = [];
    for (let i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}

const str4 = '0x323437333438323737';
console.log(hexCharCodeToStr(str4));