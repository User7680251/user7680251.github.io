(() => {
  const header = document.querySelector('.site-header');
  const links = [...document.querySelectorAll('.nav-links a')];
  const targets = links.map(link => ({link, section:document.getElementById(link.hash.slice(1))})).filter(x=>x.section);
  let ticking = false;
  const update = () => {
    ticking = false;
    let current = targets[0];
    for (const item of targets) if(item.section.getBoundingClientRect().top <= header.offsetHeight + 100) current=item;
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) current=targets.at(-1);
    for (const item of targets) {
      if (item===current) item.link.setAttribute('aria-current','location');
      else item.link.removeAttribute('aria-current');
    }
    header.classList.toggle('scrolled',scrollY>8);
  };
  const schedule = () => {if(!ticking){ticking=true;requestAnimationFrame(update);}};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('hashchange',schedule);update();
})();
