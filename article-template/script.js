// Article template — the two interactive bits: Copy link and the image drop zone.
(function () {
  // Copy link: copies the page URL, shows "Link copied" for 2 s.
  var copyBtn = document.getElementById('copy-link');
  if (copyBtn) {
    var label = copyBtn.querySelector('.copy-label');
    var icCopy = copyBtn.querySelector('.ic-copy');
    var icDone = copyBtn.querySelector('.ic-done');
    var timer;
    copyBtn.addEventListener('click', function () {
      try { if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).catch(function () {}); } catch (e) {}
      label.textContent = 'Link copied';
      icCopy.hidden = true; icDone.hidden = false;
      clearTimeout(timer);
      timer = setTimeout(function () {
        label.textContent = 'Copy link';
        icCopy.hidden = false; icDone.hidden = true;
      }, 2000);
    });
  }

  // Drop zone: highlight while a file is dragged over it, then show the file name
  // and the "Open in the editor" row. Handing the file to the extension is not built yet (see README).
  var drop = document.getElementById('drop');
  if (drop) {
    var input = document.getElementById('drop-input');
    var idle = drop.querySelector('.drop-idle');
    var done = drop.querySelector('.drop-done');
    var title = drop.querySelector('.drop-title');
    var fileEl = drop.querySelector('.drop-file');
    var actions = document.getElementById('drop-actions');

    function setDragging(on) {
      drop.classList.toggle('on', on);
      title.textContent = on ? 'Drop the image here' : 'Drop an image to annotate it';
    }
    function takeFile(file) {
      if (!file) return;
      if (!/^image\/(png|jpeg)$/.test(file.type)) {
        title.textContent = 'Use a PNG or JPEG file';
        return;
      }
      fileEl.textContent = file.name;
      idle.hidden = true; done.hidden = false; actions.hidden = false;
      // TODO (dev): pass the file to Screenshot Extension's editor (Add image flow).
    }

    drop.addEventListener('dragover', function (e) { e.preventDefault(); setDragging(true); });
    drop.addEventListener('dragleave', function () { setDragging(false); });
    drop.addEventListener('drop', function (e) {
      e.preventDefault(); setDragging(false);
      takeFile(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
    });
    input.addEventListener('change', function () { takeFile(input.files && input.files[0]); });
  }
})();
