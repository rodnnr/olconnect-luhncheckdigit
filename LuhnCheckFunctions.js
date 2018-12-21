//Calculate the Luhn Check Digit
function luhnCheckDigitCalculate(code) {
	code+="0";
    var codeLength = code.length;
    var codeLengthParity = codeLength % 2;
    var luhnChecksum = 0;
    var luhnCheckDigit;
    for (var i = codeLength-1; i >= 0; i--) {
        var luhnDigit = parseInt(code.charAt(i));
        if (i % 2 == codeLengthParity){luhnDigit *= 2;}
        if (luhnDigit > 9){luhnDigit -= 9;}
        luhnChecksum += luhnDigit;
    }
    luhnCheckDigit = luhnChecksum %10;
    return (luhnCheckDigit == 0) ? 0 : 10 - luhnCheckDigit;
}


//Retun the full Luhn including the check digit
function luhnFullCodeCalculate(code){
    return code.toString() + luhnCheckDigitCalculate(code).toString();
}

//Check whether the full code is compliant
function luhnValidate(fullCode){
    return luhnCheckDigitCalculate(fullCode) == 0;
}
