document.addEventListener('DOMContentLoaded', () => {
    
    // Modal / Bottom Sheet Functionality
    const modalOverlay = document.getElementById('details-modal');
    if (modalOverlay) {
        const modalText = document.getElementById('modal-text');
        const closeBtn = modalOverlay.querySelector('.close-btn');
        const knowMoreButtons = document.querySelectorAll('.know-more-btn');

        const openModal = (details) => {
            modalText.textContent = details;
            modalOverlay.classList.add('show');
        };

        const closeModal = () => {
            modalOverlay.classList.remove('show');
        };

        knowMoreButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const card = event.target.closest('.package-card');
                const details = card.getAttribute('data-details');
                openModal(details);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // "Book Now" Button & Toast Notification Functionality
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    const toast = document.getElementById('toast-notification');
    let toastTimeout;

    const showToast = (packageName) => {
        if (!toast) return;
        const toastMessage = toast.querySelector('.toast-message');
        
        toastMessage.textContent = `'${packageName}' has been added.`;
        
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    };

    bookNowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.package-card');
            const packageName = card.querySelector('h3').textContent;
            showToast(packageName);
        });
    });
    
    if (toast) {
        const toastCloseBtn = toast.querySelector('.toast-close');
        toastCloseBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }
        });
    }

    // Filter Capsule Click Functionality
    const capsules = document.querySelectorAll('.capsule');
    capsules.forEach(capsule => {
        capsule.addEventListener('click', () => {
            capsules.forEach(c => c.classList.remove('active'));
            capsule.classList.add('active');
        });
    });

    // Capsule Scroll Arrow Functionality
    const capsulesContainer = document.querySelector('.filter-capsules');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');

    if (capsulesContainer && scrollLeftBtn && scrollRightBtn) {
        const SCROLL_AMOUNT = 300;

        scrollLeftBtn.addEventListener('click', () => {
            capsulesContainer.scrollBy({
                left: -SCROLL_AMOUNT,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            capsulesContainer.scrollBy({
                left: SCROLL_AMOUNT,
                behavior: 'smooth'
            });
        });

        const updateArrowVisibility = () => {
            const isScrollable = capsulesContainer.scrollWidth > capsulesContainer.clientWidth;
            if (!isScrollable) {
                scrollLeftBtn.classList.add('hidden');
                scrollRightBtn.classList.add('hidden');
                return;
            }

            const atStart = capsulesContainer.scrollLeft < 5;
            const maxScroll = capsulesContainer.scrollWidth - capsulesContainer.clientWidth;
            const atEnd = capsulesContainer.scrollLeft >= maxScroll - 5;

            scrollLeftBtn.classList.toggle('hidden', atStart);
            scrollRightBtn.classList.toggle('hidden', atEnd);
        };

        capsulesContainer.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);
        
        setTimeout(updateArrowVisibility, 100);
    }

});