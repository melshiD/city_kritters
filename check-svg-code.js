//Color swatch array generation:
const componentToHex =function (c){
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

function rgtToHex(r, g, b){
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

const hashFunc = function(){
    var hash = 0;
    if (this.length === 0) return hash;
    for(i=0;i<this.length;i++){
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
}



//begin control of head/stroke slider (called Slider 1);
const headColorSlider = document.getElementById('head_color_slider');

const changeStrokeColor = (newStrokeColorNumber) =>{
    let allStrokes = document.getElementById('whole_figure_uniqueId');
    allStrokes.setAttribute('stroke', newStrokeColorNumber);
    allStrokes.setAttribute('stroke-width', '5px');
}

const changeHeadColor = (newHeadColorNumber) => {
    let kritterHead = document.getElementById('g_head');
    kritterHead.setAttribute('fill', newHeadColorNumber);
}

const updateHeadCode = () => {
    document.getElementById("head_code").textContent = headColorSlider.value;
}

headColorSlider.addEventListener("change", function() {
    changeStrokeColor('red');
    changeHeadColor('pink');
    updateHeadCode();
}, false);
//End of Slider 1 functionality




//Slider 2, body
