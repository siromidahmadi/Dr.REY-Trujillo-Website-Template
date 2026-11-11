/* Format 3: professional service cards and an accessible three-second slideshow. */
(()=>{if(!document.body.classList.contains('format-three'))return;
 const section=document.querySelector('#milestone-gallery'),gallery=section.querySelector('.spotlight-milestones'),nav=section.querySelector('.milestone-thumbnails'),controls=section.querySelector('.spotlight-controls'),thumbs=[...nav.querySelectorAll('button')];
 section.classList.add('photo-slideshow');section.setAttribute('aria-roledescription','carousel');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let paused=motion.matches,focused=false,visible=false,timer=null;
 const toggle=document.createElement('button');toggle.type='button';toggle.className='slideshow-toggle';toggle.dataset.languageSpecial='slideshow-control';
 const note=document.createElement('span');note.className='slideshow-note';note.dataset.languageSpecial='slideshow-note';controls.insertBefore(note,controls.querySelector('button'));controls.insertBefore(toggle,controls.querySelector('button'));
 function current(){return Math.max(0,thumbs.findIndex(b=>b.getAttribute('aria-pressed')==='true'));}
 function labels(){const es=document.documentElement.lang==='es';toggle.textContent=paused?(es?'Reproducir':'Play'):(es?'Pausar':'Pause');toggle.setAttribute('aria-label',paused?(es?'Reproducir presentación de fotos':'Play photo slideshow'):(es?'Pausar presentación de fotos':'Pause photo slideshow'));toggle.setAttribute('aria-pressed',String(!paused));note.textContent=motion.matches?(es?'Movimiento reducido':'Reduced motion'):(es?'Cada 3 segundos':'Every 3 seconds');section.setAttribute('aria-label',es?'Hitos profesionales en fotos':'Professional milestones in photos');}
 function stop(){if(timer!==null){clearInterval(timer);timer=null;}}
 function sync(){stop();labels();const canRun=!paused&&!focused&&visible&&!document.hidden&&!document.querySelector('.milestone-lightbox[open]');section.dataset.slideshowPlaying=String(canRun);section.querySelector('.milestone-position').setAttribute('aria-live',canRun?'off':'polite');if(canRun)timer=setInterval(()=>{if(document.hidden||document.querySelector('.milestone-lightbox[open]')){sync();return;}thumbs[(current()+1)%thumbs.length].click();},3000);}
 toggle.addEventListener('click',()=>{paused=!paused;focused=false;sync();});
 // Pause for keyboard interaction; the visible pause control stops automatic rotation.
 section.addEventListener('focusin',e=>{focused=e.target!==toggle;sync();});section.addEventListener('focusout',()=>requestAnimationFrame(()=>{focused=section.contains(document.activeElement)&&document.activeElement!==toggle;sync();}));
 controls.addEventListener('click',e=>{if(e.target!==toggle)sync();});nav.addEventListener('click',e=>{if(e.isTrusted)sync();});
 document.addEventListener('visibilitychange',sync);motion.addEventListener('change',()=>{paused=motion.matches;sync();});document.addEventListener('sitelanguagechange',labels);
 const dialog=document.querySelector('.milestone-lightbox');if(dialog){new MutationObserver(sync).observe(dialog,{attributes:true,attributeFilter:['open']});dialog.addEventListener('close',sync);}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.25}).observe(gallery);labels();
 const grid=document.querySelector('#work-together .connect-grid');grid.classList.add('product-connections');
 const categories=['Advisory','Leadership','Mentorship','Entrepreneurship','Speaking','Partnerships','Giving','Contact'];
 const paths=[
 '<path d="M8 24h32M12 40V24m10 16V14m10 26V8m8 32H8"/>',
 '<rect x="8" y="10" width="32" height="30" rx="5"/><path d="M16 6v8m16-8v8M8 21h32m-24 9 5 5 11-11"/>',
 '<path d="M24 40V16M7 10c8-3 12-1 17 4 5-5 9-7 17-4v25c-8-3-12-1-17 4-5-5-9-7-17-4z"/>',
 '<path d="M28 7c8-1 13-1 13-1s0 5-1 13L26 33 15 22zM15 22l-8 2v11l10-4m9 2-2 8H13l4-10m-6 6-5 5"/><circle cx="31" cy="16" r="4"/>',
 '<rect x="18" y="6" width="12" height="24" rx="6"/><path d="M12 22v2a12 12 0 0 0 24 0v-2M24 36v7m-8 0h16"/>',
 '<path d="m6 17 10-8 8 6 8-6 10 8-9 15-9 8L7 24m9-15-6 14 10 9 7-6m-3-11-7 8 6 5 7-8M32 9l7 13"/>',
 '<path d="m5 19 19-11 19 11-19 11zM12 24v12c8 6 16 6 24 0V24m7-5v16"/>',
 '<rect x="6" y="11" width="36" height="26" rx="5"/><path d="m7 14 17 14 17-14"/>'
 ];
 [...grid.querySelectorAll('.connect-card')].forEach((card,i)=>{const title=card.querySelector('h3'),desc=card.querySelector('.lanyard-copy p'),link=card.querySelector('a'),number=card.querySelector('.connect-number');card.className='connect-card product-contact-card';title.id='connection-title-'+i;card.setAttribute('aria-labelledby',title.id);const inner=document.createElement('div');inner.className='product-card-surface';const category=document.createElement('div');category.className='product-card-category';category.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+paths[i]+'</svg><span>'+categories[i]+'</span>';const art=document.createElement('div');art.className='product-card-art';art.setAttribute('aria-hidden','true');art.innerHTML='<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'+paths[i]+'</svg>';const copy=document.createElement('div');copy.className='product-card-copy';copy.append(title,desc);inner.append(category,number,art,copy);link.querySelector('span')?.remove();link.insertAdjacentHTML('beforeend','<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>');card.replaceChildren(inner,link);});
})();
