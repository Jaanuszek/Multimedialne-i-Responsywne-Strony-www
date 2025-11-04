
const thresholdInput = document.getElementById('threshold');
const rootMarginInput = document.getElementById('rootMargin');
const thresholdValue = document.getElementById('thresholdValue');
const rootMarginValue = document.getElementById('rootMarginValue');

// Observer dla wszystkich image-item
let observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(({ target, isIntersecting}) => {
            const img = target.querySelector('img');
            if (isIntersecting) {
                img.classList.remove('hidden');
            } else {
                img.classList.add('hidden');
            }
        });
    },
    { 
        threshold: parseFloat(thresholdInput.value),
        rootMargin: '0px'
    }
);

document.querySelectorAll('.image-item').forEach(item => observer.observe(item));

thresholdInput.addEventListener('input', (e) => {
    thresholdValue.textContent = e.target.value;
    updateObserver();
});

rootMarginInput.addEventListener('input', (e) => {
    rootMarginValue.textContent = `${e.target.value}px`;
    updateObserver();
});

function updateObserver() {
    observer?.disconnect();

    const threshold = parseFloat(thresholdInput.value);
    const rootMargin = `${rootMarginInput.value}px`;

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(({ target, isIntersecting }) => {
                const img = target.querySelector('img');
                if (isIntersecting) {
                    img.classList.remove('hidden');
                } else {
                    img.classList.add('hidden');
                }
            });
        },
        { 
            threshold: threshold,
            rootMargin 
        }
    );
    
    document.querySelectorAll('.image-item').forEach(item => observer.observe(item));
}
