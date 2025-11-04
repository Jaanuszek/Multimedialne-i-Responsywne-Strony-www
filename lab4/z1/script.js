const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(({ target: video, isIntersecting }) => {
            isIntersecting 
                ? video.play().catch(() => console.log('Video play failed'))
                : video.pause();
        });
    },
    { 
        root: null,
        threshold: 1.0
    }
);

document.querySelectorAll('video').forEach(video => observer.observe(video));