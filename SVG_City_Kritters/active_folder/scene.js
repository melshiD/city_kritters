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
        theCopy.setAttribute('viewBox', '-1000 0 3024 4032');
    }
}   

generateCopies(4);

let use = document.createElementNS(svgNs, 'use');
document.getElementById('use_symbol').appendChild(use);
use.setAttributeNS(svgLinkNs, 'href', '#whole_figure_0');
use.setAttribute('transform', 'scale(4)');
use.setAttribute('fill', 'red');




use = document.createElementNS(svgNs, 'use');
document.getElementById('use_symbol').appendChild(use);
use.setAttributeNS(svgLinkNs, 'href', '#whole_figure_1');



