// Insira somente os dígitos do telefone real com DDI e DDD, por exemplo: 5541999999999.
const WHATSAPP_NUMBER = '5541996138842';
const MESSAGE = 'Olá! Vim pelo site da LB Eletromecânica e gostaria de um orçamento para concertina ou cerca elétrica.';

document.querySelectorAll('[data-budget]').forEach(button => {
  button.addEventListener('click', () => {
    if (WHATSAPP_NUMBER) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    const note = button.classList.contains('whatsapp-floating')
      ? document.querySelector('.floating-contact-note')
      : button.closest('.services-cta, .regions-contact, .faq-contact, .footer-contact')?.querySelector('.budget-note') || document.getElementById('budget-note');
    note.hidden = false;
  });
});

// Movimento aplicado somente à cena; as luzes são descendentes dela e acompanham a imagem.
const scene = document.querySelector('.scene');
const sceneImage = scene.querySelector('img');
const lightPairs = [...scene.querySelectorAll('.light-pair')];
function alignLights() {
  const width = scene.clientWidth;
  const height = scene.clientHeight;
  const sourceWidth = sceneImage.naturalWidth || 1672;
  const sourceHeight = sceneImage.naturalHeight || 940;
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const renderedWidth = sourceWidth * scale;
  const renderedHeight = sourceHeight * scale;
  // Mobile uses the same 68% object-position as the CSS background image.
  const positionX = window.matchMedia('(max-width: 650px)').matches ? .68 : .5;
  const offsetX = (width - renderedWidth) * positionX;
  const offsetY = (height - renderedHeight) * .5;
  for (const pair of lightPairs) {
    const wallX = Number(pair.dataset.wallX) * scale + offsetX;
    const wallY = Number(pair.dataset.wallY) * scale + offsetY;
    const groundX = Number(pair.dataset.groundX) * scale + offsetX;
    const groundY = Number(pair.dataset.groundY) * scale + offsetY;
    pair.style.setProperty('--wall-x', `${wallX}px`);
    pair.style.setProperty('--wall-y', `${wallY}px`);
    pair.style.setProperty('--ground-x', `${groundX}px`);
    pair.style.setProperty('--ground-y', `${groundY}px`);
    pair.hidden = wallX < -60 || wallX > width + 60;
  }
}
if (sceneImage.complete) alignLights();
else sceneImage.addEventListener('load', alignLights, {once: true});
window.addEventListener('resize', alignLights, {passive: true});
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
window.addEventListener('pointermove', event => {
  if (!finePointer.matches || reducedMotion.matches) return;
  const x = (event.clientX / window.innerWidth - .5) * 9;
  const y = (event.clientY / window.innerHeight - .5) * 7;
  scene.style.setProperty('--scene-x', `${x.toFixed(1)}px`);
  scene.style.setProperty('--scene-y', `${y.toFixed(1)}px`);
}, {passive:true});
window.addEventListener('pointerleave', () => {
  scene.style.removeProperty('--scene-x');
  scene.style.removeProperty('--scene-y');
});

// Entrada única por elemento; o conteúdo não depende da animação para ser acessível.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }, {threshold: .12});
  document.querySelectorAll('.services .reveal').forEach(element => {
    element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      revealObserver.disconnect();
      document.querySelectorAll('.reveal-ready').forEach(element => element.classList.add('is-visible'));
    }
  });
}

// Efeito cenográfico de energia: arcos curtos entre fios, alinhados à imagem original.
// Somente desenha durante a descarga e quando a imagem está visível.
(() => {
  const figure = document.querySelector('.services-visual');
  const canvas = figure?.querySelector('.fence-energy');
  const context = canvas?.getContext('2d');
  if (!context) return;
  const image = figure.querySelector('img');
  const sourceWidth = 1536, sourceHeight = 1024;
  let visible = false, timer = 0, frame = 0, cycle = 0;
  // Pontos de passagem dos cinco fios na imagem aprovada, do poste esquerdo ao direito.
  const wires = [[300,460,1235,145],[300,499,1235,292],[300,550,1235,443],[300,598,1235,580],[300,653,1235,734]];
  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = figure.clientWidth, height = figure.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(width * ratio / sourceWidth, 0, 0, height * ratio / sourceHeight, 0, 0);
  }
  function clear() {context.clearRect(0,0,sourceWidth,sourceHeight);}
  function stop() {
    clearTimeout(timer); cancelAnimationFrame(frame); clear();
    canvas.dataset.active = 'false';
  }
  function canRun() {return visible && !document.hidden && !reducedMotion.matches;}
  function schedule(delay = 4800 + Math.random()*2300) {
    clearTimeout(timer);
    if(canRun()) timer = setTimeout(burst, delay);
  }
  function point(wire, x) {
    return {x, y:wire[1]+(x-wire[0])/(wire[2]-wire[0])*(wire[3]-wire[1])};
  }
  function geometry(start,end) {
    const points=[];
    for(let i=0;i<=16;i++) {
      const t=i/16, spread=Math.sin(Math.PI*t);
      points.push({x:start.x+(end.x-start.x)*t+(Math.random()-.5)*24*spread,y:start.y+(end.y-start.y)*t+(Math.random()-.5)*13*spread});
    }
    return points;
  }
  function line(points, color, width, blur) {
    context.beginPath(); context.moveTo(points[0].x,points[0].y);
    points.slice(1).forEach(p=>context.lineTo(p.x,p.y));
    context.strokeStyle=color;context.lineWidth=width;context.shadowColor='#68bfff';context.shadowBlur=blur;context.stroke();
  }
  function burst() {
    if(!canRun()) return;
    const positions=[{x:1070,wire:0},{x:880,wire:1},{x:1135,wire:2}];
    const position=positions[cycle++%positions.length];
    const start=point(wires[position.wire],position.x);
    const end=point(wires[position.wire+1],position.x+18);
    const began=performance.now();
    let shape=geometry(start,end), lastShape=0;
    canvas.dataset.active='true';
    function draw(now) {
      if(!canRun()) {stop();return;}
      const progress=(now-began)/480;
      clear();
      if(progress>=1) {canvas.dataset.active='false';schedule();return;}
      if(now-lastShape>65) {shape=geometry(start,end);lastShape=now;}
      // Uma subida e uma queda suaves de luz; a linha muda organicamente durante o arco.
      context.globalAlpha=Math.pow(Math.sin(Math.PI*progress),.6);
      context.globalCompositeOperation='lighter';context.lineJoin='round';context.lineCap='round';
      line(shape,'rgba(65,148,255,.25)',9,20);
      line(shape,'rgba(122,207,255,.7)',4,9);
      line(shape,'rgba(247,253,255,.96)',2.1,3);
      const branch=shape[7];
      line([branch,{x:branch.x-11,y:branch.y+7},{x:branch.x-7,y:branch.y+18}],'rgba(159,221,255,.5)',1.2,5);
      context.shadowBlur=0;context.globalAlpha=1;context.globalCompositeOperation='source-over';
      frame=requestAnimationFrame(draw);
    }
    frame=requestAnimationFrame(draw);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(figure);
  else window.addEventListener('resize',resize,{passive:true});
  image.addEventListener('load',resize);resize();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries=>{
      visible=entries[0].isIntersecting;
      if(visible) schedule(1200); else stop();
    },{threshold:.25}).observe(figure);
  } else {visible=true;schedule(1200);}
  document.addEventListener('visibilitychange',()=>{if(document.hidden) stop(); else schedule(1200);});
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches) stop();else schedule(1200);});
})();

// Filtros locais: não alteram nem recortam as imagens.
const projectCards = [...document.querySelectorAll('.project-card')];
const projectFilters = [...document.querySelectorAll('[data-filter]')];
projectFilters.forEach(button => button.addEventListener('click', () => {
  projectFilters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  projectCards.forEach(card => {
    card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('.project-count').textContent = `${visible} ${visible === 1 ? 'foto' : 'fotos'}`;
}));
// Diálogo nativo mantém foco, aceita Escape e mostra a foto inteira.
const projectDialog = document.querySelector('.project-dialog');
let projectTrigger;
document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
  projectTrigger = button;
  const source = button.querySelector('img');
  const image = projectDialog.querySelector('img');
  image.src = source.src;
  image.alt = source.alt;
  projectDialog.querySelector('p').textContent = button.querySelector('.project-caption').firstChild.textContent;
  projectDialog.showModal();
}));
projectDialog.querySelector('.project-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
  const rect = projectDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) projectDialog.close();
});
projectDialog.addEventListener('close', () => projectTrigger?.focus());

// A seleção atualiza o mapa público e o link externo sem carregar bibliotecas.
const cityButtons = [...document.querySelectorAll('[data-city]')];
cityButtons.forEach(button => button.addEventListener('click', () => {
  cityButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const query = encodeURIComponent(`${button.dataset.city}, Paraná, Brasil`);
  const map = document.querySelector('.regions-map iframe');
  map.src = `https://maps.google.com/maps?q=${query}&z=11&output=embed`;
  map.title = `Google Maps: ${button.dataset.city}, Paraná`;
  document.querySelector('.regions-map-link').href = `https://www.google.com/maps/search/?api=1&query=${query}`;
}));

// Carrossel: cartões com altura igual, texto inteiro e rolagem nativa no toque.
const reviewSlides = [...document.querySelectorAll('.review-slide')];
const reviewStage = document.querySelector('.review-stage');
let reviewPosition = 0;
function syncReviewIndicator() {
  const step = reviewSlides[1].offsetLeft - reviewSlides[0].offsetLeft;
  reviewPosition = Math.max(0, Math.min(reviewLastIndex(), Math.round(reviewStage.scrollLeft / step)));
  const indicator = document.querySelector('.review-index');
  indicator.textContent = `${String(reviewPosition + 1).padStart(2, '0')} / 06`;
  indicator.setAttribute('aria-label', `Avaliação ${reviewPosition + 1} de 6`);
}
function showReview(direction) {
  const last = reviewLastIndex();
  const index = (reviewPosition + direction + last + 1) % (last + 1);
  const left = reviewSlides[index].offsetLeft - reviewSlides[0].offsetLeft;
  reviewStage.scrollTo({left, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
document.querySelector('.review-prev').addEventListener('click', () => showReview(-1));
document.querySelector('.review-next').addEventListener('click', () => showReview(1));
reviewStage.addEventListener('scroll', syncReviewIndicator, {passive: true});
function sizeReviewCards() {
  const index = reviewPosition;
  reviewStage.style.removeProperty('--review-card-height');
  const height = Math.ceil(Math.max(...reviewSlides.map(slide => slide.scrollHeight + 2)));
  reviewStage.style.setProperty('--review-card-height', `${height}px`);
  reviewStage.scrollTo({left: reviewSlides[index].offsetLeft - reviewSlides[0].offsetLeft, behavior: 'instant'});
}
new ResizeObserver(sizeReviewCards).observe(reviewStage);
document.fonts.ready.then(sizeReviewCards);

// Mantém o menu legível e evita esconder títulos ao navegar pelas âncoras.
const fixedHeader = document.querySelector('.site-header');
function updateHeaderState() {
  fixedHeader.classList.toggle('is-scrolled', window.scrollY > 20);
  // O rodapé empurra o cabeçalho para fora da tela, encerrando sua área fixa.
  const footerTop = document.querySelector('.site-footer').getBoundingClientRect().top;
  const height = fixedHeader.offsetHeight;
  const offset = Math.max(-height, Math.min(0, footerTop - window.innerHeight));
  fixedHeader.style.setProperty('--header-end-offset', `${offset}px`);
}
window.addEventListener('resize', updateHeaderState, {passive: true});
window.addEventListener('scroll', updateHeaderState, {passive: true});
updateHeaderState();
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--header-offset', `${Math.ceil(fixedHeader.getBoundingClientRect().height) + 20}px`);
}).observe(fixedHeader);

function reviewLastIndex() {
  const step = reviewSlides[1].offsetLeft - reviewSlides[0].offsetLeft;
  return Math.round((reviewStage.scrollWidth - reviewStage.clientWidth) / step);
}
// Textos longos podem ser lidos completos sem alterar o tamanho dos cartões.
const reviewDetail = document.querySelector('.review-detail');
let reviewReadTrigger;
reviewSlides.forEach(slide => {
  const paragraph = slide.querySelector('blockquote p');
  if (paragraph.textContent.length < 120) return;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'review-read'; button.textContent = 'Ler avaliação completa';
  slide.querySelector('blockquote').after(button);
  button.addEventListener('click', () => {
    reviewReadTrigger = button;
    reviewDetail.querySelector('.review-detail-text').textContent = paragraph.textContent;
    reviewDetail.querySelector('.review-detail-name').textContent = slide.querySelector('.review-author').textContent;
    reviewDetail.showModal();
  });
});
reviewDetail.querySelector('button').addEventListener('click', () => reviewDetail.close());
reviewDetail.addEventListener('close', () => reviewReadTrigger?.focus());
sizeReviewCards();

// Pausa o giro e o reflexo quando o selo sai da tela.
const goldSeal = document.querySelector('.about-seal');
if (goldSeal) {
  const sealObserver = new IntersectionObserver(entries => {
    goldSeal.classList.toggle('is-visible', entries[0].isIntersecting);
  }, {threshold: 0.1});
  sealObserver.observe(goldSeal);
}

// Os três destaques entram uma única vez, na ordem, quando ficam visíveis.
const aboutHighlights = document.querySelector('.about-highlights');
if (aboutHighlights && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const highlightsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      aboutHighlights.classList.add('is-revealed');
      highlightsObserver.disconnect();
    }
  }, {threshold: 0.2});
  highlightsObserver.observe(aboutHighlights);
}
