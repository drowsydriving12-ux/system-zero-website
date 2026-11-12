(() => {
  'use strict';

  // Keep these destinations fixed. Incoming URL parameters are never used.
  const STORE_URLS = Object.freeze({
    android: 'https://play.google.com/store/apps/details?id=com.bakul.thesystem&pcampaignid=web_share',
    ios: 'https://apps.apple.com/nl/app/system-zero/id6801821275',
  });

  const container = document.querySelector('.store-links');
  if (!container) return;

  for (const link of container.querySelectorAll('[data-store]')) {
    const destination = STORE_URLS[link.dataset.store];
    if (destination) link.href = destination;
  }

  // Detection only changes presentation. Static links also work without JS.
  const agent = navigator.userAgent || '';
  const platform = /Android/i.test(agent) ? 'android'
    : /iPhone|iPad|iPod/i.test(agent)
      || (/Macintosh/i.test(agent) && navigator.maxTouchPoints > 1) ? 'ios'
    : null;

  if (!platform) return;
  const preferred = container.querySelector(`[data-store="${platform}"]`);
  if (!preferred) return;
  // Move the actual element so keyboard and visual order remain consistent.
  container.prepend(preferred);
  for (const link of container.querySelectorAll('[data-store]')) {
    link.classList.toggle('is-secondary', link !== preferred);
  }
})();
