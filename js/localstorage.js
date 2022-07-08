window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('blue-1').style.visibility = localStorage.getItem('blue-1') == 'true' ? 'visible' : 'hidden';
    document.getElementById('blue-2').style.visibility = localStorage.getItem('blue-2') == 'true' ? 'visible' : 'hidden';
    document.getElementById('blue-3').style.visibility = localStorage.getItem('blue-3') == 'true' ? 'visible' : 'hidden';
    document.getElementById('orange-1').style.visibility = localStorage.getItem('orange-1') == 'true' ? 'visible' : 'hidden';
    document.getElementById('orange-2').style.visibility = localStorage.getItem('orange-2') == 'true' ? 'visible' : 'hidden';
    document.getElementById('orange-3').style.visibility = localStorage.getItem('orange-3') == 'true' ? 'visible' : 'hidden';
});

window.addEventListener('storage', function() {
    document.getElementById('blue-1').style.visibility = localStorage.getItem('blue-1') == 'true' ? 'visible' : 'hidden';
    document.getElementById('blue-2').style.visibility = localStorage.getItem('blue-2') == 'true' ? 'visible' : 'hidden';
    document.getElementById('blue-3').style.visibility = localStorage.getItem('blue-3') == 'true' ? 'visible' : 'hidden';
    document.getElementById('orange-1').style.visibility = localStorage.getItem('orange-1') == 'true' ? 'visible' : 'hidden';
    document.getElementById('orange-2').style.visibility = localStorage.getItem('orange-2') == 'true' ? 'visible' : 'hidden';
    document.getElementById('orange-3').style.visibility = localStorage.getItem('orange-3') == 'true' ? 'visible' : 'hidden';
}, false);