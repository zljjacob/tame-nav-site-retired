'use strict';
const $=id=>document.getElementById(id);
const video=$('research-video');
video.addEventListener('error',()=>{
  $('video-status').textContent='The video could not load. You can use the download link below.';
});
const allVideos=[...document.querySelectorAll('video')];
allVideos.forEach(media=>media.addEventListener('play',()=>{
  allVideos.forEach(other=>{if(other!==media&&!other.paused)other.pause();});
}));
$('copy-citation').addEventListener('click',async()=>{
  try{
    await navigator.clipboard.writeText($('bibtex').textContent);
    $('copy-status').textContent='BibTeX copied.';
  }catch{
    const range=document.createRange();
    range.selectNodeContents($('bibtex'));
    const selection=window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    $('copy-status').textContent='Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});
