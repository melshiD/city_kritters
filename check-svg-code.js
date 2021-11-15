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
    changeHeadColor('orangered');
    updateHeadCode();
}, false);
//End of Slider 1 functionality




