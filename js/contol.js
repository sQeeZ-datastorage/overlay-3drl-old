var blue1 = false;
var blue2 = false;
var blue3 = false;
var orange1 = false;
var orange2 = false;
var orange3 = false;

function toggleSeriesElement(id) {
    switch (id) {
        case 'blue-1':
            {
                blue1 = blue1 ? false : true;
                localStorage.setItem('blue-1', blue1);
                if (blue1) {
                    document.getElementById('blue1').style.backgroundColor = "blue";
                } else {
                    document.getElementById('blue1').style.backgroundColor = "transparent";
                }
                break;
            }
        case 'blue-2':
            {
                blue2 = blue2 ? false : true;
                localStorage.setItem('blue-2', blue2);
                if (blue2) {
                    document.getElementById('blue2').style.backgroundColor = "blue";
                } else {
                    document.getElementById('blue2').style.backgroundColor = "transparent";
                }
                break;
            }
        case 'blue-3':
            {
                blue3 = blue3 ? false : true;
                localStorage.setItem('blue-3', blue3);
                if (blue3) {
                    document.getElementById('blue3').style.backgroundColor = "blue";
                } else {
                    document.getElementById('blue3').style.backgroundColor = "transparent";
                }
                break;
            }
        case 'orange-1':
            {
                orange1 = orange1 ? false : true;
                localStorage.setItem('orange-1', orange1);
                if (orange1) {
                    document.getElementById('orange1').style.backgroundColor = "orange";
                } else {
                    document.getElementById('orange1').style.backgroundColor = "transparent";
                }
                break;
            }
        case 'orange-2':
            {
                orange2 = orange2 ? false : true;
                localStorage.setItem('orange-2', orange2);
                if (orange2) {
                    document.getElementById('orange2').style.backgroundColor = "orange";
                } else {
                    document.getElementById('orange2').style.backgroundColor = "transparent";
                }
                break;
            }
        case 'orange-3':
            {
                orange3 = orange3 ? false : true;
                localStorage.setItem('orange-3', orange3);
                if (orange3) {
                    document.getElementById('orange3').style.backgroundColor = "orange";
                } else {
                    document.getElementById('orange3').style.backgroundColor = "transparent";
                }
                break;
            }
        default:
            {
                break;
            }
    }
}