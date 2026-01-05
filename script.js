
        // Initialize Icons
        lucide.createIcons();

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            toggleMenu();
        });

        function toggleMenu() {
            navLinks.classList.toggle('active');
            
            // Toggle icon between menu and x (optional refinement)
            const icon = navLinks.classList.contains('active') ? 'x' : 'menu';
            mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons(); // Re-render icon
        }

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if(navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Loader
        window.onload = () => {
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loader').style.display = 'none';
                }, 500);
            }, 800);
        };

        // Filter Logic with Pagination
        const filterBtns = document.querySelectorAll('.filter-btn');
        const allItems = document.querySelectorAll('.project-card');
        const showMoreBtn = document.getElementById('showMoreBtn');
        let currentFilter = 'all';
        let visibleCount = 8;
        const itemsPerPage = 8;

        // Initial setup - show only first 8 items
        function updateVisibility() {
            let filteredItems = Array.from(allItems).filter(item => {
                return currentFilter === 'all' || item.getAttribute('data-category') === currentFilter;
            });

            // Hide all items first
            allItems.forEach(item => item.style.display = 'none');

            // Show filtered items up to visibleCount
            filteredItems.forEach((item, index) => {
                if (index < visibleCount) {
                    item.style.display = 'block';
                }
            });

            // Show/hide "Show More" button
            if (filteredItems.length > visibleCount) {
                showMoreBtn.style.display = 'inline-flex';
            } else {
                showMoreBtn.style.display = 'none';
            }
        }

        // Initialize on page load
        updateVisibility();

        // Filter button click
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                currentFilter = btn.getAttribute('data-filter');
                visibleCount = itemsPerPage; // Reset to 8 when changing filter
                updateVisibility();
            });
        });

        // Show More button click
        showMoreBtn.addEventListener('click', () => {
            visibleCount += itemsPerPage;
            updateVisibility();
            lucide.createIcons();
        });

        // Product Modal Logic
        const modal = document.getElementById('productModal');
        const modalClose = document.getElementById('modalClose');

        // Use event delegation for inspect buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('inspect-btn') || e.target.closest('.inspect-btn')) {
                e.preventDefault();
                const button = e.target.classList.contains('inspect-btn') ? e.target : e.target.closest('.inspect-btn');
                const card = button.closest('.project-card');
                
                // Get data attributes
                const name = card.getAttribute('data-name');
                const desc = card.getAttribute('data-desc');
                const dimensions = card.getAttribute('data-dimensions');
                const material = card.getAttribute('data-material');
                const artisan = card.getAttribute('data-artisan');
                const price = card.getAttribute('data-price');
                const img = card.getAttribute('data-img');
                
                // Populate modal
                document.getElementById('modalTitle').textContent = name;
                document.getElementById('modalDescription').textContent = desc;
                document.getElementById('modalDimensions').textContent = dimensions;
                document.getElementById('modalMaterial').textContent = material;
                document.getElementById('modalArtisan').textContent = artisan;
                document.getElementById('modalPrice').textContent = price;
                document.getElementById('modalImage').src = img;
                document.getElementById('modalImage').alt = name;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Re-initialize icons in modal
                lucide.createIcons();
            }
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
