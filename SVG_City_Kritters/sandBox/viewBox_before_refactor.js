
function NewKritter(name = "Finga Prin") {
    this.name = name;
    this.colorArray = createColorArray(name);
    this.newSymbol = generateNewSymbol(this.colorArray);
    this.useElement = generateUseElement(this);
    this.rectBuddy = generateRectBuddy(this.useElement);
    this.varyRender = (scale1 = 1, scale2 = 1, x = 0, y = 0) => {
        this.useElement.setAttribute('transform', `scale(${scale1}, ${scale2})`);
        this.useElement.setAttribute('x', `${x/scale1}px`);
        this.useElement.setAttribute('y', `${y/scale1}px`);
        return this;
    }

    this.resetViewbox = (allFourValues) => {
        this.newSymbol.setAttribute('viewBox', allFourValues);
    }

    this.drawNow = () => {
        let mainSvg = document.getElementById('main_svg'); 
        let useBox = document.getElementById('use_box');
        mainSvg.appendChild(this.newSymbol);
        useBox.append(this.useElement);
        return this;
    }
    this.createNestingGroupForUseElementAnimation = () => {
        let parent = this.useElement.parentElement;
        let svgNs = "http://www.w3.org/2000/svg";

        parent.removeChild(this.useElement);
        let newGTag = document.createElementNS(svgNs, 'g');
        newGTag.setAttribute('id', `${this.newSymbol.id}_animation`);

        newGTag.append(this.useElement);
        parent.appendChild(newGTag);

        return this;

    }
    function generateNewSymbol(colorArray) {
        //this early implementation of the function is built
        //around assuming a single character copied many times.
        //New implementation will be required for larger character base
        let svgNs = "http://www.w3.org/2000/svg";

        let originalSymbol = document.getElementById('whole_figure');
        let newSymbol = originalSymbol.cloneNode(true);

        newSymbol.id = `${name}_${newSymbol.id}`;
        let newSymGrp = newSymbol.querySelectorAll('g');
        newSymGrp[1].setAttribute('fill', colorArray[0]);
        newSymGrp[2].setAttribute('fill', colorArray[1]);
        newSymGrp[3].setAttribute('fill', colorArray[0]);
        newSymGrp[4].setAttribute('fill', colorArray[2]);
        //newSymGrp[5].setAttribute('fill', colorArray[3]);
        //right and left eye will be handled by a separate function
        return newSymbol;

    }

    function createColorArray(name) {
        const hashedUp = sha256(name);
        let colorArray = [];
        for (let i = 0; i < 60; i += 6) {
            colorArray.push(`#${hashedUp.slice(i, i + 6)}`);
        }
        return colorArray;
    }

    // function generateUseElement(newSym){
    function generateUseElement(newSym){
        let useElementId = `${newSym.name}_use_element`;
        let svgNs = 'http://www.w3.org/2000/svg';
        let useHref = `#${newSym.newSymbol.id}`;
        let useElem = document.createElementNS(svgNs, 'use');
        useElem.setAttribute('href', useHref);
        useElem.setAttribute('id', `${useElementId}`);
        // useElem.setAttribute('transform-origin', `230`);
        console.log(useElem);
        return useElem;
    }

    //a RectBuddy is what I'm calling my number dashboard I'm using to 
    //figure out how these values are all relating
    function generateRectBuddy(element){
        let displayDiv = document.createElement('div');
        displayDiv.setAttribute('id', 'cord_displays');

        let label1 = document.createElement('label');
        label1.setAttribute('for', 'rectX');
        label1.innerHTML = 'rectX: ';

        let display1 = document.createElement('input');
        display1.setAttribute('type', 'number');
        display1.setAttribute('id', 'rectX');

        let label2 = document.createElement('label');
        label2.setAttribute('for', 'offsetX');
        label2.innerHTML = 'offsetX: ';

        let display2 = document.createElement('input');
        display2.setAttribute('type', 'number');
        display2.setAttribute('id', 'offsetX');

        let label3 = document.createElement('label');
        label3.setAttribute('for', 'bboxX');
        label3.innerHTML = 'BBoxX: ';

        let display3 = document.createElement('input');
        display3.setAttribute('type', 'number');
        display3.setAttribute('id', 'bboxX');

        displayDiv.appendChild(label1);
        displayDiv.appendChild(display1);
        displayDiv.appendChild(label2);
        displayDiv.appendChild(display2);
        displayDiv.appendChild(label3);
        displayDiv.appendChild(display3);

        return displayDiv;
    }

    function sha256(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        };

        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length'
        var i, j; // Used as a counter across the whole file
        var result = ''

        var words = [];
        var asciiBitLength = ascii[lengthProperty] * 8;

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
                hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }

        ascii += '\x80' // Append ??' bit (plus zero padding)
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j >> 8) return; // ASCII check: only accept characters in range 0-255
            words[i >> 2] |= j << ((3 - i) % 4) * 8;
        }
        words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
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
                    + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                    + k[i]
                    // Expand the message schedule if needed
                    + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
                    ) | 0
                    );
                // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                    + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

                hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
                hash[4] = (hash[4] + temp1) | 0;
            }

            for (i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i]) | 0;
            }
        }

        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                var b = (hash[i] >> (j * 8)) & 255;
                result += ((b < 16) ? 0 : '') + b.toString(16);
            }
        }
        return result;
    };
}








//ways to make a critter
// const kritter1 = new NewKritter('dave').varyRender(2, 2, 200, 200).drawNow();
// new NewKritter('vandalay').drawNow().varyRender(4, 4, 444, 333);



