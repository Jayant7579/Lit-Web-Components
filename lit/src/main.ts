import './components/main-router.ts';
import './components/tshirt-customizer.ts';
import './components/three-viewer.ts';

// Alt + Q theme switcher
let themeIndex = 0;
const themes = ['theme-1', 'theme-2', 'theme-3'];
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key.toLowerCase() === 'q') {
    themeIndex = (themeIndex + 1) % themes.length;
    document.documentElement.setAttribute('data-theme', themes[themeIndex]);
  }
});
