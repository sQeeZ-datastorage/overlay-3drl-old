var blue1 = false;
var blue2 = false;
var blue3 = false;
var orange1 = false;
var orange2 = false;
var orange3 = false;

window.addEventListener('DOMContentLoaded', (event) => {
    blue1 = localStorage.getItem('blue-1') == 'true' ? true : false;
    blue2 = localStorage.getItem('blue-2') == 'true' ? true : false;
    blue3 = localStorage.getItem('blue-3') == 'true' ? true : false;
    orange1 = localStorage.getItem('orange-1') == 'true' ? true : false;
    orange2 = localStorage.getItem('orange-2') == 'true' ? true : false;
    orange3 = localStorage.getItem('orange-3') == 'true' ? true : false;
    updateSeries();
});

function toggleSeriesElement(id) {
    switch (id) {
        case 'blue-1':
            {
                blue1 = blue1 ? false : true;
                break;
            }
        case 'blue-2':
            {
                blue2 = blue2 ? false : true;
                break;
            }
        case 'blue-3':
            {
                blue3 = blue3 ? false : true;
                break;
            }
        case 'orange-1':
            {
                orange1 = orange1 ? false : true;
                break;
            }
        case 'orange-2':
            {
                orange2 = orange2 ? false : true;
                break;
            }
        case 'orange-3':
            {
                orange3 = orange3 ? false : true;
                break;
            }
        default:
            {
                break;
            }
    }
    updateSeries();
}

function resetSeries() {
    blue1 = false;
    blue2 = false;
    blue3 = false;
    orange1 = false;
    orange2 = false;
    orange3 = false;
    updateSeries();
}

function updateSeries() {
    localStorage.setItem('blue-1', blue1);
    localStorage.setItem('blue-2', blue2);
    localStorage.setItem('blue-3', blue3);
    localStorage.setItem('orange-1', orange1);
    localStorage.setItem('orange-2', orange2);
    localStorage.setItem('orange-3', orange3);
    document.getElementById('blue1').style.backgroundColor = blue1 ? 'blue' : 'transparent';
    document.getElementById('blue2').style.backgroundColor = blue2 ? 'blue' : 'transparent';
    document.getElementById('blue3').style.backgroundColor = blue3 ? 'blue' : 'transparent';
    document.getElementById('orange1').style.backgroundColor = orange1 ? 'orange' : 'transparent';
    document.getElementById('orange2').style.backgroundColor = orange2 ? 'orange' : 'transparent';
    document.getElementById('orange3').style.backgroundColor = orange3 ? 'orange' : 'transparent';
}