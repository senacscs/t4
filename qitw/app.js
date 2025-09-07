// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtWFNigoxJm1Xe0-c35kYoH8a3Kmv5gMI",
  authDomain: "qiwt-4057d.firebaseapp.com",
  databaseURL: "https://qiwt-4057d-default-rtdb.firebaseio.com",
  projectId: "qiwt-4057d",
  storageBucket: "qiwt-4057d.firebasestorage.app",
  messagingSenderId: "537828280006",
  appId: "1:537828280006:web:f88814543a1d3c15adf9c7",
  measurementId: "G-T84KMKVQRJ"
};

// Dataset (achatado em categoria/subcategoria/item)
const DATASET = {
  'Missão': { 'Geral': ['Missão'] },
  'Veículos': {
    'Veículos': ['Lazar 3 APC','M1117 Guarduão','Chamada da aeronave de combate AC-130','M142 HIMARS','Pantsir S1','Type 625E','Patriot AA'],
    'Hovercrafts': ['PACV-78 Rampage','PACV-77 Windshear','AVH Reaper'],
    'Tanques': ['M3 Bradley','Wiesel 1 MK20','Wiesel 1 TOW-II','T-72','ADATS','Wiesel 1 Anti-Air','M1 Abrams','Leopard 2A7','LOSAT','T-90','PL-01','MAUS','T-14 Armata','Challenger II Black Night','KF-51 Panther'],
    'Helicópteros': ['UH-60 Black Hawk','Eurocopter Tiger','Invictus','AH-64 Apache','KA-52 Alligator','Super Stallion','AH-1Z Viper','Raider X','A129 Mangusta'],
    'Aviões': ['B-29 Superfortress','F-14 Tomcat','Ju 87 Stuka','F-4 Phantom','Mig-29 Fulcrum','A-10 Warthog','JAS-39 Gripen','F-15E Strike Eagle','F-18 Hornet','Su-57 Felon','Eurofighter Typhoon','Dassault Rafale','F-16 Falcon','F-22 Raptor','Nighthawk','SR-72 Darkstar','J-36'],
    'Barcos': ['PG-02','Fairmile','USS Douglas','Pr. 206','USS Independence'],
    'Submarinos': ['Classe Los Angeles'],
    'Drones': ['Drone de mala','Carro RC'],
    'Armamento': ['Javelin','Granada de Gás','Ataque Aéreo A-10','M14','M1903 Springfield','M1918 BAR','QBZ-95','Explosivo C4','QBJ-LMG','KSG 12','Equipamento do Vietnã','PP-19 Bizon']
  },
  'Game Pass': {
    'Veículos': ['Humvee Rápido','JLTV','Boxer CRV','Abrams X','MI 28 Havoc','F-35 Lightning','HACV Overlord','USS Zumwalt','Drone Destruidor'],
    'Armamentos': ['Desert Eagle','Barret M82','FAL','WW2 US Army Pack','Sniper Explosiva'],
    'Boost & Extra': ['10k Shield','Double HP Armor','Personalizador de Camo','2x Cash','Auto Collect','Speedy Oil Extrector']
  },
  'Limiteds': {
    'Premiums': ['Mi24 Superhind','F-117N Seahawk','AH-64 Apache Longbow','TOS-01 Buratino','BMD-4M'],
    'Veículos': ['EA-18 Growler','M1A2 SEP Tusk II','T-72 Moderna','E-100','Sherman Calliope','BTR-80 Kliver','M2A2 Bradley Linebacker','M35 Gun Truck'],
    'Armas': ['AA-12','AS-VAL']
  },
  'Roleta': {
    'Veiculos': ['B-2 Spirit','LAV-AD','SU-25 Frogfoot','BMPT Terminator'],
    'Armas': ['AWP']
  }
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch {}
const db = getDatabase(app);

// Elements
const form = document.getElementById('ratingForm');
const chipsContainer = document.getElementById('chips');
const statusEl = document.getElementById('status');
const panel = document.getElementById('panel');
const panelItemName = document.getElementById('panelItemName');
const panelPath = document.getElementById('panelPath');
const rangeInput = document.getElementById('rangeInput');
const numberInput = document.getElementById('numberInput');
const liveValue = document.getElementById('liveValue');
const roundBtn = document.getElementById('roundBtn');
const clearRatingBtn = document.getElementById('clearRating');
const closePanelBtn = document.getElementById('closePanel');
const searchGlobal = document.getElementById('globalSearch');

let currentSelection = null; // {category, subcategory, name, slug}

function slugify(str){
  return str.toLowerCase().normalize('NFD').replace(/[^\w\s-]/g,'').replace(/[\s_-]+/g,'-').replace(/^-+|-+$/g,'');
}

function setStatus(msg, ok=true){
  statusEl.textContent = msg;
  statusEl.className = 'status ' + (ok? 'ok':'err');
}

function flattenDataset(){
  const list = [];
  Object.entries(DATASET).forEach(([cat, subs])=>{
    Object.entries(subs).forEach(([sub, items])=>{
      items.forEach(item=>{
        list.push({ category:cat, subcategory:sub, name:item, slug:slugify(cat+' '+sub+' '+item) });
      });
    });
  });
  return list;
}

const ALL_ITEMS = flattenDataset();

function normalize(str){
  return str.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g,'');
}

function renderChips(filter=''){
  const raw = filter.trim();
  const norm = normalize(raw);
  const frag = document.createDocumentFragment();
  let count=0;
  ALL_ITEMS.forEach(obj => {
    if(!norm){
      // no filter => show all
    } else {
      const nameNorm = normalize(obj.name);
      const catNorm = normalize(obj.category);
      const subNorm = normalize(obj.subcategory);
      if(!(nameNorm.includes(norm) || catNorm.includes(norm) || subNorm.includes(norm))) return; // skip
    }
    const div = document.createElement('button');
    div.type='button';
    div.className='chip';
    div.setAttribute('data-slug', obj.slug);
    div.innerHTML = `<span class="main">${obj.name}</span><span class="sub">${obj.category} / ${obj.subcategory}</span>`;
    div.addEventListener('click', ()=> openPanel(obj, div));
    frag.appendChild(div);
    count++;
  });
  chipsContainer.innerHTML='';
  chipsContainer.appendChild(frag);
  if(count===0){
    chipsContainer.innerHTML='<p style="opacity:.7;font-size:.8rem;">Nenhum item encontrado.</p>';
  }
}

function openPanel(itemObj, chipEl){
  document.querySelectorAll('.chip.active').forEach(c=>c.classList.remove('active'));
  chipEl.classList.add('active');
  currentSelection = itemObj;
  panelItemName.textContent = itemObj.name;
  panelPath.textContent = `${itemObj.category} / ${itemObj.subcategory}`;
  panel.classList.add('show');
  panel.classList.remove('hidden');
  panel.setAttribute('aria-hidden','false');
  rangeInput.value = '0';
  numberInput.value = '0';
  liveValue.textContent = '0.0';
  setStatus('');
}

function closePanel(){
  panel.classList.remove('show');
  panel.setAttribute('aria-hidden','true');
  setTimeout(()=>panel.classList.add('hidden'),300);
  document.querySelectorAll('.chip.active').forEach(c=>c.classList.remove('active'));
  currentSelection = null;
}

rangeInput.addEventListener('input', ()=>{
  numberInput.value = rangeInput.value;
  liveValue.textContent = Number(rangeInput.value).toFixed(1);
});
numberInput.addEventListener('input', ()=>{
  let v = parseFloat(numberInput.value);
  if(isNaN(v)) v = 0;
  if(v<0) v=0; if(v>10) v=10;
  rangeInput.value = v.toString();
  liveValue.textContent = v.toFixed(1);
});
roundBtn.addEventListener('click', ()=>{
  let v = parseFloat(numberInput.value)||0;
  const base = Math.floor(v);
  const diff = v - base;
  let rounded;
  if(diff < 0.25) rounded = base;
  else if(diff < 0.75) rounded = base + 0.5;
  else rounded = base + 1;
  if(rounded>10) rounded=10;
  numberInput.value = rounded.toFixed(1);
  rangeInput.value = rounded.toString();
  liveValue.textContent = Number(rounded).toFixed(1);
});
clearRatingBtn.addEventListener('click', ()=>{
  numberInput.value='0'; rangeInput.value='0'; liveValue.textContent='0.0';
});
closePanelBtn.addEventListener('click', closePanel);
searchGlobal.addEventListener('input', ()=> renderChips(searchGlobal.value));

document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape' && panel.classList.contains('show')) closePanel();
});

renderChips();

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(!currentSelection){
  setStatus('Selecione um item clicando em uma das pílulas listadas.', false);
    return;
  }
  const nick = form.nick.value.trim();
  const atHandle = form.atHandle.value.trim();
  if(!nick || !atHandle){
  setStatus('Informe Nick e @ do Roblox (campos obrigatórios).', false);
    return;
  }
  const ratingVal = parseFloat(numberInput.value);
  if(isNaN(ratingVal) || ratingVal<0 || ratingVal>10){
  setStatus('Nota inválida: insira um valor entre 0 e 10.', false);
    return;
  }
  setStatus('Registrando avaliação...');
  const comment = document.getElementById('comment').value.trim();
  const now = new Date();
  const submission = {
    nick,
    at: atHandle.startsWith('@')? atHandle : '@'+atHandle,
    item: currentSelection,
    rating: Number(ratingVal.toFixed(2)),
    comment: comment || null,
    meta: {
      ts: now.getTime(),
      iso: now.toISOString(),
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour12: false }),
      tzOffsetMinutes: new Date().getTimezoneOffset()*-1,
      userAgent: navigator.userAgent,
      submittedAtServer: serverTimestamp()
    }
  };
  try {
    const listRef = ref(db,'avaliacoes_decimais');
    const newRef = push(listRef);
    await set(newRef, submission);
  setStatus('Avaliação registrada com sucesso. Obrigado pela contribuição!');
    document.getElementById('comment').value='';
  } catch(err){
    console.error(err);
  setStatus('Ocorreu um erro ao registrar. Tente novamente em instantes.', false);
  }
});

// Reset global (não fecha painel se aberto)
form.addEventListener('reset', ()=>{
  setTimeout(()=>{ setStatus(''); searchGlobal.value=''; renderChips(); },0);
});
