(() => {
  const repo = 'Clipdescript/BlueFox';
  const downloadBtn = document.getElementById('downloadBtn');
  const versionInfo = document.getElementById('versionInfo');
  const fallback = document.getElementById('fallback');

  async function init() {
    try {
      downloadBtn.textContent = 'Recherche de la derniere version...';
      const res = await fetch(
        'https://api.github.com/repos/' + repo + '/releases/latest',
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error('API ' + res.status);
      const json = await res.json();
      const assets = Array.isArray(json.assets) ? json.assets : [];
      const exe = assets.find(a => /\.exe$/i.test(a.name) && !/blockmap/i.test(a.name));
      if (exe && exe.browser_download_url) {
        downloadBtn.href = exe.browser_download_url;
        downloadBtn.textContent = 'Telecharger BlueFox pour Windows';
        downloadBtn.addEventListener('click', (e) => {
          e.preventDefault();
          downloadBtn.textContent = 'Telechargement...';
          window.location.href = exe.browser_download_url;
          setTimeout(() => { downloadBtn.textContent = 'Telecharger BlueFox pour Windows'; }, 2000);
        }, { once: true });
        versionInfo.textContent = 'Version ' + (json.tag_name || '');
      } else {
        throw new Error('Aucun exe');
      }
    } catch (e) {
      downloadBtn.href = 'https://github.com/' + repo + '/releases/latest';
      downloadBtn.textContent = 'Voir la derniere version sur GitHub';
      downloadBtn.setAttribute('target', '_blank');
      fallback.classList.remove('hidden');
    }
  }
  init();
})();
