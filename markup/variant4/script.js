document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');

    burger.addEventListener('click', function() {
        burger.classList.toggle('open');
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !burger.contains(event.target)) {
            burger.classList.remove('open');
            sidebar.classList.remove('open');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close sidebar on mobile after clicking a link
                if (window.innerWidth < 768) {
                    burger.classList.remove('open');
                    sidebar.classList.remove('open');
                }
            }
        });
    });
});