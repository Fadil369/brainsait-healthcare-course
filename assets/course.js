// Shared BrainSait course utilities (EN/AR toggle + persistence)
// Keeps behavior consistent across index + all module pages.

(function () {
  let currentLang = 'en';

  function syncGlobal() {
    // Some pages (e.g., index.html) rely on a global `currentLang`.
    // Keep it in sync without requiring every page to re-implement language logic.
    window.currentLang = currentLang;
    window.dispatchEvent(
      new CustomEvent('courseLangChanged', {
        detail: { lang: currentLang },
      })
    );
  }

  function setHtmlLang(lang) {
    const html = document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
    }
  }

  function updateIndicator() {
    const el = document.getElementById('lang-indicator');
    if (el) el.textContent = currentLang === 'ar' ? 'AR' : 'EN';
  }

  function updateContent() {
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach((el) => {
      const text = currentLang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
  }

  function applyLanguage(lang) {
    currentLang = lang === 'ar' ? 'ar' : 'en';
    setHtmlLang(currentLang);
    updateIndicator();
    updateContent();
    localStorage.setItem('courseLang', currentLang);
    syncGlobal();
  }

  // Expose toggle for onclick handlers
  window.toggleLanguage = function toggleLanguage() {
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
  };

  // Optional helper for scripts that need the current language.
  window.getCourseLang = function getCourseLang() {
    return currentLang;
  };

  window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('courseLang');
    applyLanguage(saved === 'ar' ? 'ar' : 'en');
  });
})();
