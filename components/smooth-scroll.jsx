export default function SmoothScroll(scrollItem, nav) {
    const position = scrollItem.current.offsetTop;
    const navHeight = nav.current.offsetHeight;
    window.scrollTo({behavior: 'smooth', top: (position - navHeight) * getComputedStyle(document.querySelector('html')).zoom});
}