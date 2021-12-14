const xAxisSlider = document.createElement('input');
xAxisSlider.setAttribute('type', 'range');
xAxisSlider.setAttribute('min', 0);
xAxisSlider.setAttribute('max', 1000);
xAxisSlider.setAttribute('id', 'x_axis_slider');
document.body.appendChild(xAxisSlider);

xAxisSlider.addEventListener('change', () => {
    let card1Svg = document.getElementById('card_1_svg');
    let viewBoxRawValue = card1Svg.getAttribute('viewBox');
    viewBoxRawValue = viewBoxRawValue.split(' ');
    viewBoxRawValue[2] = xAxisSlider.value;

    card1Svg.setAttribute('viewBox', ` 0 0 ${xAxisSlider.value} ${xAxisSlider.value} `);
})