'use strict';
const company=[['profile','회사개요'],['greeting','인사말'],['history','연혁'],['organ','조직도'],['license','면허 및 인력현황'],['certi','인증 및 수상'],['ci','CI/BI'],['talent','채용정보'],['location','찾아오시는길']];
const business=[['business','건축공사'],['business02','토목공사'],['business03','관급공사']];
const groups={company:{title:'회사소개',items:company},business:{title:'사업분야',items:business},result:{title:'공사실적',items:[['result','공사실적현황'],['portfolio','포트폴리오']]},customer:{title:'고객센터',items:[['notice','뉴스 & 공지'],['resources','자료실'],['location','찾아오시는길']]}};
const $=s=>document.querySelector(s);
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const links=items=>items.map(([id,title])=>`<a href="?page=${id}">${title}</a>`).join('');
$('#company-menu').innerHTML=links(company);$('#business-menu').innerHTML=links(business);
$('#all-menu').innerHTML=Object.values(groups).map(g=>`<section><h2>${g.title}</h2>${links(g.items)}</section>`).join('');
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'전체 메뉴 닫기':'전체 메뉴 열기');$('#all-menu').hidden=!open});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','전체 메뉴 열기');$('#all-menu').hidden=true}});
const projects=[
 {name:'(주)에이앤지 테크놀로지 시화MTV 신축공사',image:'slide_image09.jpg',type:'건축공사',code:'2307190001'},
 {name:'시화MTV 친환경에너지타운 조성공사',image:'slide_image10.jpg',type:'관급공사',code:'2306050001'},
 {name:'㈜SPC삼립 시화공장 증축공사',image:'slide_image11.jpg',type:'건축공사',code:'1905270001'},
 {name:'(주)한국EREC 나주공장 신축공사',image:'slide_image12.jpg',type:'건축공사',code:'2112090003'},
 {name:'(주)엔엘티 서산공장 신축공사',image:'slide_image03.jpg',type:'건축공사',code:'1804020003'}
];
const projectCard=(p,i)=>`<button class="project-card" data-project="${i}" aria-label="${escapeHTML(p.name)} 상세 보기"><div class="project-image"><img src="assets/${p.image}" alt="${escapeHTML(p.name)} 전경" loading="lazy"></div><span class="project-type">${p.type}</span><h3>${escapeHTML(p.name)}</h3></button>`;
const projectCarousel=(id)=>`<div class="project-carousel" data-carousel aria-roledescription="캐러셀" aria-label="공사실적 사진"><div class="project-carousel-track" id="${id}" data-carousel-track>${projects.map(projectCard).join('')}</div><div class="project-carousel-controls"><span class="project-carousel-count" data-carousel-count>01 / 05</span><span class="project-carousel-rule"></span><button type="button" data-carousel-prev aria-label="이전 공사실적" aria-controls="${id}">‹</button><button type="button" data-carousel-next aria-label="다음 공사실적" aria-controls="${id}">›</button><button type="button" data-carousel-play aria-label="공사실적 자동 넘김 정지" aria-controls="${id}">Ⅱ</button></div></div>`;
$('#home-projects').classList.remove('project-grid');
$('#home-projects').innerHTML=projectCarousel('home-project-track');
const organ=`<div class="sub-content-head"><h2>앞선 기술력과 창조적인 혁신으로<br>업계를 선도합니다.</h2></div><div class="org-chart" aria-label="유연종합건설 조직도"><div class="org-executive"><div class="org-node"><span>유연종합건설 주식회사</span><strong>대표이사</strong></div><div class="org-node secondary"><strong>전무이사</strong></div></div><div class="org-branches"><section class="org-branch"><h3>기술담당임원</h3><div class="org-depts"><section class="org-dept"><h4>공사부</h4><ul><li>현장공정관리</li><li>공종별 인력관리</li><li>자재 관리</li></ul></section><section class="org-dept"><h4>공무부</h4><ul><li>공정관리 · 계획</li><li>하도업체관리</li><li>현장기성관리</li><li>기술영업</li></ul></section></div></section><section class="org-branch"><h3>관리담당임원</h3><div class="org-depts"><section class="org-dept"><h4>관리부</h4><ul><li>자재</li><li>업무</li><li>산재관리</li></ul></section><section class="org-dept"><h4>총무부</h4><ul><li>총무</li><li>인사</li><li>경리</li><li>대·내외공문관리</li></ul></section></div></section></div></div>`;
const page=new URLSearchParams(location.search).get('page');
if(page){
 $('#home-view').hidden=true;$('#sub-view').hidden=false;
 const special={portfolio:['포트폴리오','result'],notice:['뉴스 & 공지','customer'],resources:['자료실','customer']};
 const data=window.SITE_DATA[page];const title=data?.title||special[page]?.[0]||'페이지 안내';const group=groups[data?.group||special[page]?.[1]||'company'];
 document.title=`${title} | 유연종합건설`;
 $('#sub-group').textContent=group.title; $('#sub-view').dataset.group=data?.group||special[page]?.[1]||'company';$('#sub-title').textContent=title;
 $('#sub-tabs').innerHTML=group.items.map(([id,label])=>`<a href="?page=${id}" ${id===page?'class="active" aria-current="page"':''}>${label}</a>`).join('');
 $('#breadcrumb').textContent=`홈  /  ${group.title}  /  ${title}`;
 const content=$('#sub-content');
 if(page==='organ')content.innerHTML=organ;
 else if(page==='result'){
  content.innerHTML=`<div class="sub-content-head"><h2>공사실적현황</h2><p>유연종합건설의 공사실적을 확인하실 수 있습니다.</p></div>${projectCarousel("results-project-track")}<div class="results-tools"><label class="sr-only" for="project-search">공사명 또는 발주처 검색</label><input type="search" id="project-search" placeholder="공사명 또는 발주처 검색"><label class="sr-only" for="year-filter">공사 연도</label><select id="year-filter"><option value="">전체 연도</option>${Array.from({length:31},(_,i)=>2026-i).map(y=>`<option>${y}</option>`).join('')}</select><span class="result-count" id="result-count"></span></div><div class="table-overflow"><table class="results-table"><thead><tr><th scope="col">공사명</th><th scope="col">발주처</th><th scope="col">공사기간</th><th scope="col">대지위치</th></tr></thead><tbody id="results-body"></tbody></table></div><p id="no-results" class="empty-state" hidden>검색 조건에 맞는 공사실적이 없습니다.</p>`;
  const draw=()=>{const search=$('#project-search').value.trim().toLowerCase(),year=$('#year-filter').value;const rows=data.rows.filter(r=>r.join(' ').toLowerCase().includes(search)&&(!year||r[2].startsWith(year)));$('#results-body').innerHTML=rows.map(r=>`<tr>${r.map(c=>`<td>${escapeHTML(c)}</td>`).join('')}</tr>`).join('');$('#result-count').textContent=`총 ${rows.length}건`;$('#no-results').hidden=rows.length>0};
  $('#project-search').addEventListener('input',draw);$('#year-filter').addEventListener('change',draw);draw();
 }else if(page==='portfolio')content.innerHTML=`<div class="sub-content-head"><h2>주요 시공 프로젝트</h2><p>기존 홈페이지에 소개된 유연종합건설의 시공 사례입니다.</p></div>${projectCarousel("portfolio-project-track")}`;
 else if(page==='location')content.innerHTML=`<div class="sub-content-head"><h2>찾아오시는길</h2><p>약도 및 연락처를 안내드립니다.</p></div><div class="location-panel"><div><h3>유연종합건설 주식회사</h3><p>경기도 부천시 원미구 부일로 761<br>(역곡1동 111-5번지)</p><a class="link-button" href="https://map.naver.com/p/search/경기도%20부천시%20부일로%20761" target="_blank" rel="noopener">네이버 지도에서 보기 <span>↗</span></a></div><div><h3>대표전화</h3><a class="phone" href="tel:0323440255">032.344.0255</a><p>FAX 032.343.2134</p></div></div>`;
 else if(page==='notice')content.innerHTML=`<div class="sub-content-head"><h2>뉴스 & 공지</h2></div><div class="notice-body"><h3>홈페이지를 오픈하였습니다.</h3><p>유연종합건설 홈페이지에 오신 것을 환영합니다.</p><a class="link-button" href="http://www.yuyeon96.co.kr/customer/notice.php?ptype=view&idx=5129" target="_blank" rel="noopener">기존 홈페이지 공지 원문 보기 <span>↗</span></a></div>`;
 else if(page==='resources')content.innerHTML=`<div class="sub-content-head"><h2>자료실</h2></div><div class="resource-list"><a href="http://www.yuyeon96.co.kr/customer/data.php?ptype=view&idx=5233" target="_blank" rel="noopener"><span>(주)에이앤지테크놀로지 관련 자료</span><span>원문 보기 ↗</span></a><a href="http://www.yuyeon96.co.kr/customer/data.php?ptype=view&idx=5232" target="_blank" rel="noopener"><span>(주)에이앤지테크놀로지 관련 자료</span><span>원문 보기 ↗</span></a><a href="http://www.yuyeon96.co.kr/ebook/ebook.html" target="_blank" rel="noopener"><span>회사 카탈로그</span><span>원문 보기 ↗</span></a></div>`;
 else if(data)content.innerHTML=`<div class="sub-content-head"><h2>${title}</h2></div><div class="source-content">${data.html}</div>`;
 else content.innerHTML='<p>요청하신 페이지를 찾을 수 없습니다.</p><a class="link-button" href="index.html">홈으로 돌아가기</a>';
}else{
 let current=0,paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches,timer;
 const slides=['main_visual08.jpg','main_visual09.jpg','main_visual10.jpg','main_visual11.jpg'];
 const drawSlide=()=>{$('#hero-photo').style.backgroundImage=`url('assets/${slides[current]}')`;$('#slide-number').textContent=String(current+1).padStart(2,'0');$('#slide-progress').style.width=`${(current+1)*25}%`;$('#hero-project').innerHTML=`${escapeHTML(projects[current].name)} <span>↗</span>`;$('#hero-project').href='?page=portfolio';};
 const updateTimer=()=>{clearInterval(timer);if(!paused&&!document.hidden)timer=setInterval(()=>{current=(current+1)%4;drawSlide()},6500)};
 $('#prev-slide').onclick=()=>{current=(current+3)%4;drawSlide();updateTimer()};$('#next-slide').onclick=()=>{current=(current+1)%4;drawSlide();updateTimer()};
 const drawPause=()=>{$('#pause-slide').setAttribute('aria-label',paused?'자동 전환 재생':'자동 전환 정지');$('#pause-slide').innerHTML=paused?'▷':'Ⅱ'};
 $('#pause-slide').onclick=()=>{paused=!paused;drawPause();updateTimer()};document.addEventListener('visibilitychange',updateTimer);drawPause();updateTimer();
}
document.addEventListener('click',e=>{const card=e.target.closest('[data-project]');if(!card)return;const p=projects[Number(card.dataset.project)];$('#dialog-image').src='assets/'+p.image;$('#dialog-image').alt=p.name;$('#dialog-title').textContent=p.name;$('#dialog-source').href=`http://www.yuyeon96.co.kr/result/result.php?ptype=view&prdcode=${p.code}`;$('#project-dialog').showModal()});
$('#close-dialog').onclick=()=>$('#project-dialog').close();$('#project-dialog').addEventListener('click',e=>{if(e.target===$('#project-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});

// 원본 프로젝트 5건을 사진 캐러셀로 표시. 터치·트랙패드 및 키보드 사용 지원.
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
 if(carousel.closest('[hidden]'))return;
 const track=carousel.querySelector('[data-carousel-track]');
 const cards=[...track.children];
 const play=carousel.querySelector('[data-carousel-play]');
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let paused=reduceMotion, hovering=false, focusing=false, timer, scrollFrame;
 const geometry=()=>{const stride=cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap||0);return {stride,index:Math.round(track.scrollLeft/stride),max:Math.max(0,Math.ceil((track.scrollWidth-track.clientWidth-2)/stride))}};
 const updateCount=()=>{const {index}=geometry();carousel.querySelector('[data-carousel-count]').textContent=`${String(index+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`};
 const move=direction=>{const {stride,index,max}=geometry();const next=direction>0?(index>=max?0:index+1):(index<=0?max:index-1);track.scrollTo({left:next*stride,behavior:reduceMotion?'instant':'smooth'})};
 const restart=()=>{clearInterval(timer);if(!paused&&!hovering&&!focusing&&!document.hidden)timer=setInterval(()=>move(1),5500)};
 carousel.querySelector('[data-carousel-prev]').addEventListener('click',()=>{move(-1);restart()});
 carousel.querySelector('[data-carousel-next]').addEventListener('click',()=>{move(1);restart()});
 const renderPlay=()=>{play.textContent=paused?'▷':'Ⅱ';play.setAttribute('aria-label',paused?'공사실적 자동 넘김 재생':'공사실적 자동 넘김 정지')};
 play.addEventListener('click',()=>{paused=!paused;renderPlay();restart()});
 carousel.addEventListener('mouseenter',()=>{hovering=true;restart()});carousel.addEventListener('mouseleave',()=>{hovering=false;restart()});
 carousel.addEventListener('focusin',()=>{focusing=true;restart()});carousel.addEventListener('focusout',e=>{focusing=carousel.contains(e.relatedTarget);restart()});
 track.addEventListener('scroll',()=>{cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(updateCount)},{passive:true});
 track.addEventListener('touchstart',()=>{clearInterval(timer)},{passive:true});track.addEventListener('touchend',restart,{passive:true});
 document.addEventListener('visibilitychange',restart);window.addEventListener('resize',updateCount);
 renderPlay();updateCount();restart();
});
