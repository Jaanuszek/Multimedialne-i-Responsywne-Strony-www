const contentContainer = document.querySelectorAll('.content-item');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) {
                target.classList.add('visible');
            } else {
                target.classList.remove('visible');
            }
        });
    },
    { 
        threshold: 0.5
    }
);

contentContainer.forEach(item => observer.observe(item));
