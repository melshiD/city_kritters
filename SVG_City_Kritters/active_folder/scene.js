const container = document.querySelector('svg');

let svgLinkNs = 'http://www.w3.org/1999/xlink';
let svgNs = 'http://www.w3.org/2000/svg';

//just have one instance on the DOM and make copies of it, resetting 
//the needed attributes and resolving any clashing ids

// const theCopy = (index) => {
//     let copyMe = document.getElementById('whole_figure');
//     let theCopy = copyMe.cloneNode(true);
//     theCopy.setAttribute('id', `whole_figure_${index}`);
//     theCopy.setAttributeNS(svgLinkNs, 'viewBox', '-1000 0 3024 4032');
//     console.log(theCopy);
//     return theCopy;
// }

function generateCopies(numCopies){
    //numCopies between yatta and yadda
    let copyMe = document.getElementById('whole_figure');


    for(let i = 0; i < numCopies; i++){
        let theCopy = copyMe.cloneNode(true);
        container.appendChild(theCopy);
        theCopy.setAttribute('id', `whole_figure_${i}`);
        // theCopy.setAttribute('viewBox', '-1000 0 3024 4032');
        theCopy.setAttribute('viewBox', `0 0 ${3024/(i+1)} ${4032/(i+1)}`);
        //need to make function to set viewBox per 'suitableLocations'

    }
}   

generateCopies(4);



//now create the section to call the symbols
let use = document.createElementNS(svgNs, 'use');

use.setAttributeNS(svgLinkNs, 'href', '#whole_figure_0');
use.setAttribute('transform', 'scale(10)');
use.setAttribute('fill', 'pink');

document.getElementById('use_symbol').appendChild(use);





use = document.createElementNS(svgNs, 'use');
document.getElementById('use_symbol').appendChild(use);
use.setAttributeNS(svgLinkNs, 'href', '#whole_figure_1');



let changeClass = document.getElementById('whole_figure_0');
let svgGroup = changeClass.firstElementChild;
svgGroup.classList.toggle('animate-me');