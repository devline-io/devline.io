export default function SmoothScroll(position, navHeight) {
    window.scrollTo({behavior: 'smooth', top: (position - navHeight) * getComputedStyle(document.querySelector('html')).zoom});
}