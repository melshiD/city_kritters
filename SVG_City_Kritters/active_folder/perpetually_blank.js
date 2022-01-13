
function NewKritter(name = "Finga Prin") {
    this.name = name;
    this.colorArray = createColorArray(name);
    this.newSymbol = generateNewSymbol(this.colorArray);
    this.useElement = generateUseElement(this);
    this.rectBuddy = generateRectBuddy(this.useElement);
    this.drawNow = () => {
        if(!document.getElementById('use_box')){ newContainer() }
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
        newSymGrp[1].setAttribute('fill', colorArray[4]);
        newSymGrp[2].setAttribute('fill', colorArray[3]);
        newSymGrp[3].setAttribute('fill', colorArray[6]);
        newSymGrp[4].setAttribute('fill', colorArray[3]);
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

    function getViewBox(symbol){
        return symbol.getAttribute('viewBox');
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

    function generateRectBuddy(element){
        
    //a RectBuddy is what I'm calling my number dashboard I'm using to 
    //figure out how these values are all relating
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

        ascii += '\x80' // Append Ƈ' bit (plus zero padding)
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

function newContainer(){
    let div = document.createElement('div'),
        svgNs = "http://www.w3.org/2000/svg",
        useBox = document.createElementNS(svgNs, 'svg');
    
    div.setAttribute('class', 'container');
    useBox.setAttribute('id', 'use_box');
    useBox.setAttribute('width', '700px');
    useBox.setAttribute('height', '933px');

    div.appendChild(useBox);

    document.body.appendChild(div);
}

function addInteractivity(frameWidth = 700, frameHeight = 933, scaleFactor = 0.46, kritterObject){
    resetViewBox(`-500 -500 ${frameWidth/scaleFactor} 
                          ${frameHeight/scaleFactor}`, 
                          kritterObject.newSymbol);
                          //why does this need to run first to get the thing to work?

    function resetViewBox(allFourValues, symbol){
        symbol.setAttribute('viewBox', allFourValues);
        // console.log(allFourValues);
    }

    let hovering = false,
        dragging = false,
        cursorOnCharX = 0,
        cursorOnCharY = 0;

    let pue = kritterObject.useElement;

    pue.addEventListener('mouseenter', ()=>{
        hovering = true;
        // console.log(hovering);
    });
    pue.addEventListener('mouseleave', ()=>{
        hovering = false;
        document.getElementById('circle_button').style.opacity = 0;
    });

    pue.onmousedown = function (e) {
        // changeUseOrder(pue); //bring this element to front
        //get offset of cursor from left edge of box
        dragging = true;
        if(hovering === true){
            cursorOnCharX = (e.offsetX - pue.getBBox().x)/scaleFactor;
            cursorOnCharY = (e.offsetY - pue.getBBox().y)/scaleFactor;
        }
        function onMouseMove(e) {
            resetViewBox(`${-(e.offsetX/scaleFactor - cursorOnCharX)} ${-(e.offsetY/scaleFactor - cursorOnCharY)} ${frameWidth/scaleFactor} ${frameHeight/scaleFactor}`, kritterObject.newSymbol);
            moveBringToFrontButton(pue);
            //how pissed does this script get when I don't add the button first
        }

        //set pue's x property to x.offset - cursorOnCharX
        pue.addEventListener('mousemove', onMouseMove);

        pue.onmouseup = function () {
            pue.removeEventListener('mousemove', onMouseMove);
            pue.onmouseup = null;
            dragging = false;
            console.log("IN ON MOUSE UP");
        };
        pue.onmouseleave = function () {
            pue.removeEventListener('mousemove', onMouseMove);
            pue.onmouseup = null;
            dragging = false;
        };
        pue.addEventListener('wheel', (e) =>{
            // console.log(e.deltaY);
            scaleFactor += e.deltaY*0.0001;
            resetViewBox(`${-(e.offsetX/scaleFactor - cursorOnCharX)} ${-(e.offsetY/scaleFactor - cursorOnCharY)} ${frameWidth/scaleFactor} ${frameHeight/scaleFactor}`, kritterObject.newSymbol);
        }, {passive: true});
        moveBringToFrontButton(pue);
    }
}

function getViewBox(kritterObject){
    return kritterObject.newSymbol.getAttribute('viewBox');
}



function changeUseOrder(clickedElement){
    let parent = clickedElement.parentElement;
    parent.removeChild(clickedElement);
    parent.appendChild(clickedElement);
}

function makeBringToFrontButton(){
    let symbol = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    symbol.setAttribute('href', '#circle_button');
    symbol.setAttribute('to_front', 'uninitiated');
    symbol.innerHTML = 'FRONT';
    symbol.addEventListener('mousedown', ()=>{

        let elementToMove = document.getElementById('circle_button');
        elementToMove = elementToMove.getAttribute('to_front');
        elementToMove = document.getElementById(elementToMove);

        changeUseOrder(elementToMove);
        console.log('in the listener');
        changeUseOrder(symbol);
    });

    document.getElementById('use_box').appendChild(symbol);
}

function moveBringToFrontButton(connectedElement){
    let circleButton = document.getElementById('circle_button'),
        rectValues = connectedElement.getBBox();
    circleButton.style.opacity = 1;
    circleButton.setAttribute('viewBox', `-${rectValues.x -46} -${rectValues.y -30} 700 933`);
    circleButton.setAttribute('to_front', connectedElement.id);
}

function createAnimationCaptureButton(){
    let newButton = document.createElement('button');
    newButton.type = 'button';
    newButton.innerHTML = 'Capture Position';
    newButton.id = 'capture_position';
    newButton.setAttribute('onclick', 'newTimeLine(this)'); //name incidental with html file
    // newButton.onclick = 'newTimeLine(this)'; //name incidental with html file
    document.querySelector('.container').appendChild(newButton);
}

// const AnimationTimeline = () => {
const AnimationTimeline = () => {
    let tl = anime.timeline({
        easing: 'easingOutExpo',
        autoplay: false
    });
    let eventCount = 0;
    //maybe just keep object of values and send to a generateTimeline function
    function AddsToTimeline(buttonPressed = false) {
        //get ahold of viewBox for each character in use_box
        //commit the values to a new tl event
        if (buttonPressed) {
            let useBox = document.getElementById('use_box');
            for (let i = 0; i < useBox.childElementCount; i++) {
                let child = useBox.children[i];
                console.log(child);
                let childSymbol = document.getElementById(child.getAttribute('href')
                                                                .slice(1));
                let viewBoxValues = childSymbol.getAttribute('viewBox');
                console.log(viewBoxValues);
                console.log(typeof(viewBoxValues));
                let newEvent = anime({
                    targets: `#${childSymbol.id}`,
                    duration: 3000,
                    viewBox: `${viewBoxValues}`
                    // viewBox: '-424.7745361328125 -275.0632629394531 700 933'
                });
                tl.add(newEvent);
                eventCount ++;
            }
        }
        tl.restart();
        return tl;
    }
    return AddsToTimeline;
}

function playTimeline(timeline){
    return timeline.play();
}
//Design to be easily scaled per requirements of containing element