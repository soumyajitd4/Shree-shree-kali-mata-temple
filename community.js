// YouTube needs a real web referrer. A file:// document cannot supply one.
function loadYouTubePreview() {
  const container = document.querySelector('#youtube-preview');
  const player = container?.querySelector('iframe[data-src]');
  if (!player) return;
  if (!['http:', 'https:'].includes(window.location.protocol)) {
    const note = document.createElement('p');
    note.className = 'local-video-note';
    note.textContent = 'YouTube cannot play in a file preview. Open the HTTP local preview or the published website to watch here. You can also use the video link below.';
    player.replaceWith(note);
    container.classList.add('is-local-file');
    return;
  }
  const url = new URL(player.dataset.src);
  url.searchParams.set('origin', window.location.origin);
  player.src = url.href;
}

// Load the Instagram preview automatically; retain the direct profile fallback.
function loadInstagramPreview() {
  const container = document.querySelector('#instagram-preview');
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = 'true';
  const quote = document.createElement('blockquote');
  quote.className = 'instagram-media';
  quote.dataset.instgrmPermalink = 'https://www.instagram.com/reel/Ddj9DSdyz71/';
  quote.dataset.instgrmVersion = '14';
  const link = document.createElement('a');
  link.href = quote.dataset.instgrmPermalink;
  link.textContent = 'Watch the Trust’s temple construction Reel on Instagram';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  quote.append(link);
  container.append(quote);
  const script = document.createElement('script');
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  script.onload = () => { window.instgrm?.Embeds?.process(); };
  script.onerror = () => { container.textContent = 'The preview could not be loaded. Please use the Instagram profile link below.'; };
  document.body.append(script);
}

function loadCommunityPreviews() {
  const section = document.querySelector('#community');
  const load = () => {
    loadYouTubePreview();
    loadInstagramPreview();
  };
  if (section && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    }, { rootMargin: '600px 0px' });
    observer.observe(section);
  } else {
    load();
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCommunityPreviews, { once: true });
} else {
  loadCommunityPreviews();
}
