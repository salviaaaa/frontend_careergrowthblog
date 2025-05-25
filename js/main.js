document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const blogCards = document.querySelectorAll('.card');
    const categoryButtons = document.querySelectorAll('.category-filters button');

    // Add CSS for fixed mascot
    const style = document.createElement('style');
    style.textContent = `
        .fixed-mascot {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 100;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .fixed-mascot:hover {
            opacity: 1;
        }
        
        .mascot-img {
            width: 100px;
            height: auto;
        }
    `;
    document.head.appendChild(style);

    // Fungsi pencarian
    function searchBlogs() {
        const searchTerm = searchInput.value.toLowerCase();
        blogCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const content = card.querySelector('.card-text').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || content.includes(searchTerm);
            card.closest('.col-md-4').style.display = isVisible ? 'block' : 'none';
        });
    }

    // Event listener untuk tombol search
    searchButton.addEventListener('click', searchBlogs);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchBlogs();
        }
    });

    // Filter berdasarkan kategori
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Toggle active state pada button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            blogCards.forEach(card => {
                const cardCategory = card.querySelector('.badge').textContent;
                const cardContainer = card.closest('.col-md-4');
                
                if (category === 'all') {
                    cardContainer.style.display = 'block';
                } else {
                    cardContainer.style.display = cardCategory === category ? 'block' : 'none';
                }
            });
        });
    });
});

// Loader Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    const content = document.querySelectorAll('main, footer');
    
    // Hide loader
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        // Show content with animation
        content.forEach(element => {
            element.classList.add('content-hidden');
            setTimeout(() => {
                element.classList.add('content-visible');
            }, 50);
        });

        // Remove loader after animation
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 5);
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        sectionObserver.observe(section);
    });
}); 