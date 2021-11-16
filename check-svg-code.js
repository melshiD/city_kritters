//Color swatch array generation and useful hex manipulation functions:
const componentToHex = function (c){
    var hex = c.toString(16);
    console.log(hex);
    return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b){
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function hashToColorArray(inputHash){
    let colorArray = [];
    let i = 0;
    while(i < 60){
        colorArray.push(`#${inputHash.slice(i, i + 6)}`);
        i += 6;
    }
    return colorArray;
}

//const colorArray = custInput => hashToColorArray(sha256(custInput));

//const submitFormTarget = document.getElementById('form_user_input');
//submitFormTarget.addEventListener('submit', manifestNewKritter);

function manifestNewKritter(){
    let userInput = document.getElementById('text_user_input').value;
    let colorArray = hashToColorArray(sha256(userInput));
    changeHeadFill(colorArray[0]);

}

function makeColorSwatch(userInput){
    let userInputToColorArray = hashToColorArray(sha256(userInput));
    let swatchNode = document.getElementsByClassName('color-swatch')[0];
    //let swatchCode = document.getElementsByClassName('color-swatch')[0];
    for(let i=0; i<userInputToColorArray.length;i++){
        let newNode = document.createElement('div');
        newNode.setAttribute('class', 'individual-swatch');
        newNode.style.backgroundColor = userInputToColorArray[i];
        swatchNode.appendChild(newNode);
    }
    return swatchNode;
}
//Change head fill and all stroke
const changeHeadFill = (newHeadColorNumber) => {
    let kritterHead = document.getElementById('g_head');
    kritterHead.setAttribute('fill', newHeadColorNumber);
}
const changeStrokeColor = (newStrokeColorNumber) => {
    let allStrokes = document.getElementById('whole_figure_uniqueId');
    allStrokes.setAttribute('stroke', newStrokeColorNumber);
    allStrokes.setAttribute('stroke-width', '5px');
}

//change body color
const changeBellyFill = (newBellyColorNumber) => {
    let bellyBulges = document.getElementById('g_belly').querySelectorAll('[class*="belly-"]');
    bellyBulges[0].style.fill = newBellyColorNumber;
    let colorShift = hexToRgb(newBellyColorNumber);
    let colorTwo = colorShift.g>115?colorShift.g-20:colorshift+20;
    colorTwo = rgbToHex(colorTwo);
    bellyBulges[1].style.fill = colorTwo;
    bellyBulges[2].style.fill = colorTwo;
}
































//sha256 implementation in JS for generating color sets
//https://geraintluff.github.io/sha256/
const sha256 = (ascii) => {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};