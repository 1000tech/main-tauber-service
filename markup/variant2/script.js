document.getElementById('burger').addEventListener('click', function() {
    const topnav = document.getElementById('topnav');
    if (topnav.style.display === 'block') {
        topnav.style.display = 'none';
    } else {
        topnav.style.display = 'block';
    }
});