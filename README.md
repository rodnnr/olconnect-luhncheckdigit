<object data="https://github.com/rodnnr/olconnect-luhncheckdigit/blob/master/How%20To%20Caclculate%20the%20Luhn%20Check%20Digit%20in%20OL%20Connect.pdf" width="700px" height="700px">
    <embed src="https://github.com/rodnnr/olconnect-luhncheckdigit/blob/master/How%20To%20Caclculate%20the%20Luhn%20Check%20Digit%20in%20OL%20Connect.pdf">
        <p>Please download the guide in PDF format: <a href="https://github.com/rodnnr/olconnect-luhncheckdigit/blob/master/How%20To%20Caclculate%20the%20Luhn%20Check%20Digit%20in%20OL%20Connect.pdf">Download Calculate the Luhn Check Digit in Connect Designer</a>.</p>
    </embed>
</object>

## How to Calculate the Luhn Check Digit in Connect Designer
### Introduction
The Luhn algorithm was developed by German computer scientist Hans Peter Luhn in 1954. It calculates simple checksum formula used to validate identification numbers such as credit card numbers, IMEI numbers, etc... The algorithm was designed to protect against accidental errors, such as a digit mistyping. It will detect any single-digit error, as well as almost all transpositions of adjacent digits. It will not, however, detect transposition of the two-digit sequence 09 to 90 (or vice versa).

More information is available here: [https://en.wikipedia.org/wiki/Luhn_algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)

Several users have recently requested ways to calculate the Luhn Checksum in Connect

### The Luhn Check Digit Algorithm

This algorithm allows checking credit card numbers MasterCard/AMEX/Visa of IMEI codes for example by using a control key checksum. If one character is mistyped, the Luhn algorithm can detect it.

**Example**: 18-digit number without Luhn Check Digit: 872560021439746445

**Step 1**:

The algorithm starts at the end of the number, from the most right digit to the first left digit.
Double all digits of even rank.
```cs
    8	7	2	5	6	0	0	2	1	4	3	9	7	4	6	4	4	5
		x2		x2		x2		x2		x2		x2		x2		x2		x2
	8	14	2	10	6	0	0	4	1	8	3	18	7	8	6	8	4	10
 
```
**Step 2**

If the double of a digit is equal or greater than 10, replace the result by the sum of digits in the double. Alternatively, simply take away 9 from the result of the double.
```cs
    8	7	2	5	6	0	0	2	1	4	3	9	7	4	6	4	4	5
		x2		x2		x2		x2		x2		x2		x2		x2		x2
	8	14	2	10	6	0	0	4	1	8	3	18	7	8	6	8	4	10
	8	1+4	2	1+0	6	0	0	8	1	8	3	1+8	7	8	6	8	4	1+0
```
Then sum all the digits: 
```cs
> 8+(**1+4**)+2+(**1+0**)+6+(**0**)+0+(**4**)+1+(**8**)+3+(**1+8**)+7+(**8**)+6+(**8**)+4+(**1+0**) = 81
```
**Step 3**

The control digit number is equal to 10-(sum%10):
```cs
> 10-(81%10) =10-1=9
```
The Luhn Check Digit at position 19 will, therefore, be 9.
 

### Calculation of the Luhn Check Digit
The below functions can be called in the Connect Data Mapper, Template and output presets to calculate Luhn Check digit, the full code as well for verifying whether a code satisfies the Luhn Algorithm.
```cs
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
```
