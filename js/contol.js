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
}