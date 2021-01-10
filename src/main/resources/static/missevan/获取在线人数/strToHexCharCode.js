// 字符串转16进制
function strToHexCharCode(str) {
    if (str === "") {
        return "";
    }

    const hexCharCode = [];
    hexCharCode.push("0x");
    for(let i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}

// hextoString  demo
var str1 = '335814757';  //0x323435373334353533
console.log(strToHexCharCode(str1));
