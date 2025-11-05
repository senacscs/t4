// vote.js - página de votação 1 vs 2 usando Supabase
// Requer: supabase/config.js com SUPABASE_URL e SUPABASE_ANON_KEY

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/esm/supabase.js';

// Pequeno contrato do app:
// - Tabela: votes (id uuid pk, option smallint check in (1,2), created_at timestamptz default now())
// - Operações: insert({ option }), select('option') para apurar, realtime em INSERT
// - Prevenção básica de múltiplos votos: localStorage (não infalível)

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elementos de UI
const elCount1 = document.getElementById('count-1');
const elCount2 = document.getElementById('count-2');
const elTotal  = document.getElementById('count-total');
const elPct1   = document.getElementById('pct-1');
const elPct2   = document.getElementById('pct-2');
const bar1     = document.getElementById('bar-1');
const bar2     = document.getElementById('bar-2');
const msg      = document.getElementById('msg');
const bt1      = document.getElementById('vote-1');
const bt2      = document.getElementById('vote-2');

let state = {
  c1: 0,
  c2: 0,
};

function render() {
  const total = state.c1 + state.c2;
  const p1 = total > 0 ? Math.round((state.c1 / total) * 100) : 0;
  const p2 = total > 0 ? 100 - p1 : 0;

  elCount1.textContent = String(state.c1);
  elCount2.textContent = String(state.c2);
  elTotal.textContent  = String(total);
  elPct1.textContent   = `${p1}%`;
  elPct2.textContent   = `${p2}%`;
  bar1.style.width     = `${p1}%`;
  bar2.style.width     = `${p2}%`;
  bar1.parentElement.setAttribute('aria-valuenow', String(p1));
  bar2.parentElement.setAttribute('aria-valuenow', String(p2));
}

async function loadCounts() {
  // Busca leve: obtém somente a coluna 'option' e agrega no cliente
  const { data, error } = await supabase.from('votes').select('option');
  if (error) {
    console.error('Erro ao buscar contagem:', error);
    showMsg('Não foi possível carregar o placar. Verifique as chaves do Supabase e as políticas.', 'err');
    return;
  }
  let c1 = 0, c2 = 0;
  for (const row of data) {
    if (row.option === 1) c1++;
    else if (row.option === 2) c2++;
  }
  state.c1 = c1;
  state.c2 = c2;
  render();
}

function showMsg(text, kind = 'ok') {
  msg.textContent = text;
  msg.classList.remove('ok', 'err');
  msg.classList.add(kind);
}

function alreadyVoted() {
  try { return Boolean(localStorage.getItem('voted_1v2')); }
  catch { return false; }
}

function markVoted(opt) {
  try { localStorage.setItem('voted_1v2', String(opt)); } catch {}
}

async function vote(option) {
  if (option !== 1 && option !== 2) return;
  if (alreadyVoted()) {
    showMsg('Você já votou neste navegador. Obrigado!', 'ok');
    return;
  }
  const { error } = await supabase.from('votes').insert({ option });
  if (error) {
    console.error('Erro ao votar:', error);
    showMsg('Falha ao registrar o voto. Veja o console e as políticas RLS.', 'err');
    return;
  }
  markVoted(option);
  showMsg('Voto registrado! ✅', 'ok');
  // Atualiza o placar rapidamente no cliente (otimista) e também virá pelo realtime
  if (option === 1) state.c1++; else state.c2++;
  render();
}

function setupRealtime() {
  // Assina inserções na tabela votes
  supabase
    .channel('votes-rt')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, (payload) => {
      const opt = payload?.new?.option;
      if (opt === 1) state.c1++;
      else if (opt === 2) state.c2++;
      render();
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        // opcional
      }
    });
}

function wireUI() {
  bt1.addEventListener('click', () => vote(1));
  bt2.addEventListener('click', () => vote(2));
}

// Boot
(async function init() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    showMsg('Configure as credenciais do Supabase em supabase/config.js', 'err');
    return;
  }
  wireUI();
  await loadCounts();
  setupRealtime();
})();
