// iService SPA logic (sem backend real - dados em memória)
(function(){
  const state = {
    user: null, // {email, role, name, phone, location, stats, servicesOwn, history, feedback, jobsOwn?, composite, responseTimes:[]}
    services: [], // {id,title,cat,desc,price,eta,avail,rating,count,ownerEmail,tags:[],location,verified:boolean}
    jobs: [],   // {id, svcId, title, proEmail, clientEmail, status, createdAt, acceptedAt, finishedAt, scheduledFor, messages:[], sla:{responseMs?:number}}
    nextId: 1,
    nextJobId: 1,
    filters: { term:'', cat:'all' },
    chat: { open:false, jobId:null }
  };

  const $ = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];

  // Persistência -------------------------------------------------
  const STORAGE_KEY = 'iservice_state_v1';
  loadPersisted();

  function persist(){
    const safe = {
      user: state.user,
      services: state.services,
      jobs: state.jobs,
      nextId: state.nextId,
      nextJobId: state.nextJobId
    };
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(safe)); }catch(_){ }
  }
  function loadPersisted(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return;
      const data = JSON.parse(raw);
      Object.assign(state, data);
    } catch(_){ }
  }

  // Seed inicial de serviços (apenas se vazio)
  seed();

  function seed(){
    if(state.services.length) return;
    const examples = [
      {title:'Corte de Grama Rápido',cat:'jardinagem',desc:'Corte e aparo de gramado residencial até 150m².',price:70,eta:2,avail:'manha',rating:4.8,count:54},
      {title:'Limpeza de Cozinha',cat:'limpeza',desc:'Higienização completa: azulejos, fogão e pisos.',price:120,eta:3,avail:'tarde',rating:4.6,count:87},
      {title:'Conserto Elétrico Básico',cat:'manutencao',desc:'Troca de tomadas, interruptores e pequenos reparos.',price:90,eta:1.5,avail:'integral',rating:4.9,count:112},
      {title:'Montagem de Móveis',cat:'manutencao',desc:'Montagem de móveis planos padrão (até 2h).',price:150,eta:2,avail:'tarde',rating:4.7,count:65},
      {title:'Faxina Expressa',cat:'limpeza',desc:'Limpeza rápida de apartamento até 60m².',price:110,eta:2.5,avail:'manha',rating:4.5,count:140},
    ];
    examples.forEach(s => state.services.push({...s,id:state.nextId++,ownerEmail:'pro@seed',tags:['rápido'],location:'Centro',verified:true}));
    persist();
  }

  // Routing --------------------------------------------------
  function show(view){
    $$('.view').forEach(v=>{ v.hidden = v.id !== 'view-'+view; v.classList.toggle('active', v.id === 'view-'+view); });
    $$('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.route===view));
  }

  function updateUserArea(){
    const area = $('#userArea');
    if(!state.user){
    area.innerHTML = '<button class="btn tiny outline" data-route="auth">Entrar</button>';
      return;
    }
    area.innerHTML = `<span class="user-chip" title="${state.user.email}">${state.user.name||'Usuário'}</span>`;
  }

  // Auth + Signup toggle -------------------------------------
  let authMode = 'login'; // 'login' | 'signup'
  const wrapName = $('#wrapName');
  const wrapPhone = $('#wrapPhone');
  const authTitle = $('#authTitle');
  const authSubtitle = $('#authSubtitle');
  const authSubmit = $('#authSubmit');
  const modeLine = $('#modeLine');
  const authStatus = $('#authStatus');

  $('#toggleAuthMode')?.addEventListener('click', ()=>{
    authMode = authMode === 'login' ? 'signup' : 'login';
    const up = authMode === 'signup';
  wrapName.classList.toggle('hidden', !up);
  wrapPhone.classList.toggle('hidden', !up);
    authTitle.textContent = up ? 'Criar conta' : 'Entrar no iService';
    authSubtitle.textContent = up ? 'Preencha os dados para começar.' : 'Escolha como deseja usar a plataforma.';
    authSubmit.textContent = up ? 'Cadastrar e entrar' : 'Entrar';
    modeLine.innerHTML = up ? 'Já tem conta? <button type="button" class="link-btn" id="toggleAuthMode">Entrar</button>' : 'Primeira vez? <button type="button" class="link-btn" id="toggleAuthMode">Criar conta</button>';
    // rebind the new button inside modeLine
    modeLine.querySelector('#toggleAuthMode').addEventListener('click', ()=> $('#toggleAuthMode').click());
  });

  $('#loginForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    authStatus.textContent='';
    const email = $('#email').value.trim();
    const pwd = $('#password').value.trim();
    if(!email || !pwd){ authStatus.textContent='Preencha email e senha.'; return; }
    const role = document.querySelector('input[name="role"]:checked').value;
    if(authMode==='signup'){
  const name = $('#fullName').value.trim();
  const phoneRaw = $('#phone').value.trim();
      if(!name){ authStatus.textContent='Informe seu nome.'; return; }
  if(!/\d{8,}/.test(phoneRaw.replace(/\D/g,''))){ authStatus.textContent='Informe um telefone válido.'; return; }
      if(state.user && state.user.email===email){ authStatus.textContent='Esse email já está logado.'; return; }
      state.user = createUser(email, role);
      state.user.name = name;
  state.user.phone = phoneRaw;
      authStatus.textContent='Conta criada!';
    } else {
      // login simples (sem backend) — recria se email diferente
      if(!state.user || state.user.email!==email) state.user = createUser(email, role);
    }
    state.user.role = role;
    state.user.lastLogin = Date.now();
    updateUserArea();
    refreshProfile();
    show('market');
    renderServices();
    persist();
  });

  function createUser(email, role){
    return {
      email,
      role,
      name: email.split('@')[0],
      phone: '',
      location: 'Centro',
      responseTimes: [],
      stats: { servicesDone:0, hired:0, rating:0, ratingCount:0 },
      composite: { qualidade:0, pontualidade:0, comunicacao:0 },
      servicesOwn:[],
      history:[],
      feedback:[]
    };
  }

  $('#logoutBtn')?.addEventListener('click', ()=>{
    state.user = null;
    updateUserArea();
  show('auth');
  persist();
  });

  // Navigation click
  document.addEventListener('click', e=>{
    const t = e.target.closest('[data-route]');
    if(!t) return;
    const route = t.dataset.route;
    if(route==='home') {
      if(state.user) show('market'); else show('auth');
      return;
    }
    if(!state.user && route!=='auth'){ show('auth'); return; }
    show(route);
  if(route==='market') renderServices();
  if(route==='profile') { refreshProfile(); renderJobs(); }
  });

  // Services listing -----------------------------------------
  function renderServices(){
    const wrap = $('#serviceResults');
    if(!wrap) return;
    wrap.innerHTML = '';
  let list = state.services.filter(s => {
      const termOk = !state.filters.term || (s.title.toLowerCase().includes(state.filters.term)||s.desc.toLowerCase().includes(state.filters.term));
      const catOk = state.filters.cat==='all'|| s.cat===state.filters.cat;
      return termOk && catOk;});
  // Ranking / matching simples: ordenar por matchScore
  list = list.map(s=>({...s, _score: scoreService(s)})).sort((a,b)=> b._score - a._score);
    if(!list.length){ wrap.innerHTML = '<p class="muted">Nenhum serviço encontrado.</p>'; return; }
    const tpl = $('#tplServiceCard');
    list.forEach(s=>{
      const node = tpl.content.cloneNode(true);
      node.querySelector('.svc-title').textContent = s.title;
      node.querySelector('.svc-desc').textContent = s.desc;
      node.querySelector('.cat').textContent = s.cat;
      node.querySelector('.rating-val').textContent = s.rating.toFixed(1);
      node.querySelector('.count').textContent = s.count + ' feitos';
      node.querySelector('.service-card').dataset.id = s.id;
      if(s.verified){ node.querySelector('.svc-title').innerHTML += ' <ion-icon name="shield-checkmark" style="color:var(--accent);font-size:14px"></ion-icon>'; }
      wrap.appendChild(node);
    });
  }

  function scoreService(s){
    let score = 0;
    score += (s.rating||0) * 10;
    if(s.verified) score += 15;
    if(state.user && s.location===state.user.location) score += 8;
    if(s.tags?.includes('rápido')) score += 4;
    return score;
  }

  $('#searchBtn')?.addEventListener('click', ()=>{
    state.filters.term = $('#searchInput').value.trim().toLowerCase();
    renderServices();
  });
  $('#searchInput')?.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); $('#searchBtn').click(); }});

  $('#filters')?.addEventListener('click', e=>{
    const btn = e.target.closest('.pill'); if(!btn) return;
    $$('#filters .pill').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    state.filters.cat = btn.dataset.filter;
    renderServices();
  });

  // Service actions (delegation)
  document.addEventListener('click', e=>{
    const ask = e.target.closest('.ask-btn');
    if(ask){
      const card = ask.closest('.service-card');
      const svc = state.services.find(s=>s.id==card.dataset.id);
      if(!svc) return;
      openRequestModal(svc);
    }
    const proBtn = e.target.closest('.profile-btn');
    if(proBtn){
      const card = proBtn.closest('.service-card');
      const svc = state.services.find(s=>s.id==card.dataset.id);
      if(!svc) return;
      openRequestModal(svc, true);
    }
  });

  // Modal de Solicitação ------------------------------------
  const modal = $('#requestModal');
  const reqBody = $('#reqBody');
  let pendingSvc = null;
  function openRequestModal(svc, viewOnly=false){
    if(!state.user){ show('auth'); return; }
    pendingSvc = svc;
    modal.classList.remove('hidden');
    document.body.style.overflow='hidden';
  const phoneLine = svc.ownerEmail===state.user.email ? '' : `<p class=\"tiny\"><strong>Contato:</strong> ${state.user.phone||'—'}</p>`;
  reqBody.innerHTML = `
      <div class="pro-preview">
        <div class="pro-avatar"><ion-icon name="person-outline"></ion-icon></div>
        <div class="pro-details">
          <h4>${escapeHtml(svc.title)}</h4>
          <p><strong>Profissional:</strong> ${svc.ownerEmail}</p>
          <p class="price-line">R$ ${svc.price} • ~${svc.eta}h • ${svc.avail}</p>
          <p>${escapeHtml(svc.desc)}</p>
          <p class="tiny">Avaliação: ${svc.rating.toFixed(1)} (${svc.count} serviços)</p>
      ${phoneLine}
        </div>
      </div>
      ${viewOnly?'<div class="confirm-summary">Visualização do profissional.</div>':'<div class="confirm-summary">Confirme para enviar a solicitação ao profissional. Você poderá acompanhar no seu perfil.</div>'}
    `;
    $('#confirmReq').toggleAttribute('disabled', viewOnly);
  }
  function closeModal(){
    modal.classList.add('hidden');
    document.body.style.overflow='';
    pendingSvc = null;
  }
  $('#closeReq')?.addEventListener('click', closeModal);
  $('#cancelReq')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
  $('#confirmReq')?.addEventListener('click', ()=>{
    if(!pendingSvc) return;
    hireService(pendingSvc);
    closeModal();
  });

  function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }

  function hireService(svc){
    if(!state.user){ show('auth'); return; }
    state.user.history.unshift({ ts: Date.now(), action: 'Solicitou', title: svc.title });
    state.user.stats.hired++;
    // Criar job
    const job = { id: state.nextJobId++, svcId: svc.id, title: svc.title, proEmail: svc.ownerEmail, clientEmail: state.user.email, status:'solicitado', createdAt: Date.now(), messages:[], sla:{} };
    state.jobs.unshift(job);
    // SLA: medir tempo de resposta (simulação aceitação automática depois de 1s)
    // Simulação de execução e avaliação
    setTimeout(()=>{
      job.status='aceito'; job.acceptedAt=Date.now(); job.sla.responseMs = job.acceptedAt - job.createdAt; recordResponseTime(job.proEmail, job.sla.responseMs);
      setTimeout(()=>{
        job.status='concluido'; job.finishedAt=Date.now();
      state.user.history.unshift({ ts: Date.now(), action: 'Concluído', title: svc.title });
      state.user.stats.servicesDone++;
      const rating = 4 + Math.random();
      state.user.feedback.unshift({ title: svc.title, rating: rating.toFixed(1), comment: 'Serviço concluído com sucesso.' });
      state.user.stats.ratingCount++;
      state.user.stats.rating = ((state.user.stats.rating*(state.user.stats.ratingCount-1))+rating)/state.user.stats.ratingCount;
      refreshProfile();
        renderJobs();
        persist();
      }, 1000);
      renderJobs(); persist();
    }, 1000);
    refreshProfile();
    renderJobs();
    persist();
  }

  function recordResponseTime(proEmail, ms){
    if(!state.user || state.user.email!==proEmail) return; // só mede do logado se ele for pro
    state.user.responseTimes.push(ms);
    if(state.user.responseTimes.length>20) state.user.responseTimes.shift();
  }

  // Theme toggle --------------------------------------------
  const themeToggle = $('#themeToggle');
  themeToggle?.addEventListener('click', ()=>{
    const dark = document.body.classList.toggle('dark');
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.innerHTML = dark ? '<ion-icon name="sunny"></ion-icon>' : '<ion-icon name="moon"></ion-icon>';
  });

  // Phone mask ----------------------------------------------
  $('#phone')?.addEventListener('input', e=>{
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    if(v.length>2) v='('+v.slice(0,2)+') '+v.slice(2);
    if(v.length>10){
      const core = v.replace(/[()\s]/g,'');
      const ddd=core.slice(0,2), rest=core.slice(2);
      if(rest.length>5) v = '('+ddd+') '+rest.slice(0,5)+'-'+rest.slice(5,9);
    }
    e.target.value=v;
  });

  // Post service ---------------------------------------------
  $('#postForm')?.addEventListener('submit', e=>{
    e.preventDefault();
    if(!state.user){ show('auth'); return; }
    const title = $('#svcTitle').value.trim();
    const cat = $('#svcCat').value;
    const desc = $('#svcDesc').value.trim();
    const price = parseFloat($('#svcPrice').value);
    const eta = parseFloat($('#svcEta').value);
    const avail = $('#svcAvail').value;
    if(!title||!cat||!desc||isNaN(price)||isNaN(eta)){
      $('#postStatus').textContent = 'Preencha todos os campos.'; return;
    }
    const svc = { id: state.nextId++, title, cat, desc, price, eta, avail, rating:5, count:0, ownerEmail: state.user.email, tags:[], location: state.user.location, verified:false };
    state.services.unshift(svc);
    state.user.servicesOwn.unshift(svc);
    $('#postStatus').textContent = 'Serviço publicado!';
    e.target.reset();
    renderMyServices();
    if(state.user.role==='cliente') alert('Você publicou um serviço, considere mudar seu tipo para PROFISSIONAL/AMBOS para destacá-lo.');
    persist();
  });

  function renderMyServices(){
    const box = $('#myServices'); if(!box) return;
    box.innerHTML = '';
    if(!state.user || !state.user.servicesOwn.length){ box.innerHTML = '<p class="muted">Nenhum serviço publicado.</p>'; return; }
    state.user.servicesOwn.forEach(s=>{
      const div = document.createElement('div');
      div.className = 'mini';
      div.innerHTML = `<strong>${s.title}</strong><span class="tiny">${s.cat}</span><span class="tiny">R$ ${s.price}</span>`;
      box.appendChild(div);
    });
  }

  // Jobs rendering ------------------------------------------
  function renderJobs(){
    const list = $('#jobsList'); if(!list) return;
    list.innerHTML = '';
    const myJobs = state.jobs.filter(j=> j.clientEmail === (state.user?.email) || j.proEmail === (state.user?.email));
    if(!myJobs.length){ list.innerHTML = '<li class="muted tiny">Nenhum trabalho ainda.</li>'; return; }
    myJobs.slice(0,30).forEach(job=>{
      const li = document.createElement('li');
      const svc = state.services.find(s=>s.id===job.svcId);
      const flow = job.status;
      li.innerHTML = `<span><strong>${svc?svc.title:job.title}</strong><br/><span class="tiny">${job.clientEmail===state.user.email?'Você → '+job.proEmail: job.clientEmail+' → Você'}</span></span><span class="job-flow">${flow}</span>`;
      // Ações de chat
      const actions = document.createElement('div'); actions.className='job-actions';
      const chatBtn = document.createElement('button'); chatBtn.className='btn tiny outline'; chatBtn.textContent='Chat'; chatBtn.addEventListener('click', ()=> openChat(job.id));
      actions.appendChild(chatBtn);
      if(job.status==='solicitado' && job.proEmail===state.user.email){
        const acceptBtn = document.createElement('button'); acceptBtn.className='btn tiny primary alt'; acceptBtn.textContent='Aceitar'; acceptBtn.addEventListener('click',()=>{ job.status='aceito'; job.acceptedAt=Date.now(); job.sla.responseMs=job.acceptedAt-job.createdAt; recordResponseTime(job.proEmail, job.sla.responseMs); persist(); renderJobs(); });
        actions.appendChild(acceptBtn);
      }
      if(job.status==='aceito' && (job.clientEmail===state.user.email || job.proEmail===state.user.email)){
        const finishBtn = document.createElement('button'); finishBtn.className='btn tiny outline'; finishBtn.textContent='Concluir'; finishBtn.addEventListener('click',()=>{ job.status='concluido'; job.finishedAt=Date.now(); persist(); renderJobs(); });
        actions.appendChild(finishBtn);
      }
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  // Chat -----------------------------------------------------
  const chatPanel = $('#chatPanel');
  const chatMessages = $('#chatMessages');
  const chatForm = $('#chatForm');
  function openChat(jobId){
    state.chat.open=true; state.chat.jobId=jobId; chatPanel.classList.remove('hidden'); renderChat(); }
  function closeChat(){ state.chat.open=false; state.chat.jobId=null; chatPanel.classList.add('hidden'); }
  $('#closeChat')?.addEventListener('click', closeChat);
  chatPanel?.addEventListener('keydown', e=>{ if(e.key==='Escape') closeChat(); });
  chatForm?.addEventListener('submit', e=>{ e.preventDefault(); const input=$('#chatInput'); const msg=input.value.trim(); if(!msg) return; pushMsg(msg,'me'); input.value=''; });
  document.addEventListener('click', e=>{ const btn=e.target.closest('.qreply'); if(!btn) return; pushMsg(btn.dataset.msg,'me'); });
  function pushMsg(text, who){
    const job = state.jobs.find(j=>j.id===state.chat.jobId); if(!job) return;
    job.messages.push({ id:Date.now()+Math.random(), who, text, ts: Date.now() });
    // Simular resposta automática
    if(who==='me') setTimeout(()=>{ job.messages.push({ id:Date.now()+Math.random(), who:'other', text:'Ok!', ts: Date.now() }); renderChat(); persist(); }, 700);
    renderChat(); persist();
  }
  function renderChat(){
    chatMessages.innerHTML='';
    const job = state.jobs.find(j=>j.id===state.chat.jobId); if(!job){ chatMessages.textContent='Sem mensagens.'; return; }
    job.messages.slice(-100).forEach(m=>{
      const div=document.createElement('div'); div.className='bubble '+(m.who==='me'?'me':'other');
      div.textContent=m.text; chatMessages.appendChild(div);
    });
    chatMessages.scrollTop=chatMessages.scrollHeight;
  }

  // Profile --------------------------------------------------
  function refreshProfile(){
    if(!state.user) return;
    $('#profName').textContent = state.user.name;
    $('#profRole').textContent = 'Papel: '+ state.user.role;
    $('#statServices').textContent = state.user.stats.servicesDone;
    $('#statHired').textContent = state.user.stats.hired;
  $('#statRating').textContent = state.user.stats.rating.toFixed(1);
    renderMyServices();
    // history
    const h = $('#historyList'); if(h){ h.innerHTML=''; state.user.history.slice(0,12).forEach(item=>{
      const li = document.createElement('li');
      const d = new Date(item.ts).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      li.innerHTML = `<span>${item.action}: <strong>${item.title}</strong></span><time class="tiny">${d}</time>`;
      h.appendChild(li);
    }); }
    const f = $('#feedbackList'); if(f){ f.innerHTML=''; state.user.feedback.slice(0,8).forEach(r=>{
      const li = document.createElement('li');
      li.innerHTML = `<span>★ ${r.rating} – ${r.title}</span><span class="tiny muted">${r.comment}</span>`;
      f.appendChild(li);
    }); }
  }

  // Initial view
  if(state.user){ updateUserArea(); show('market'); renderServices(); refreshProfile(); renderJobs(); } else { show('auth'); updateUserArea(); }

})();
