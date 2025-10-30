import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';

export default function Post() {
  const { user, addService, setUser, persist, incrementId } = useApp();
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [eta, setEta] = useState('');
  const [avail, setAvail] = useState('manha');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    if (!user) return;
    if (!title || !cat || !desc || !price || !eta) {
      setStatus('Preencha todos os campos.');
      return;
    }

    const priceNum = parseFloat(price);
    const etaNum = parseFloat(eta);
    if (isNaN(priceNum) || isNaN(etaNum)) {
      setStatus('Preço e tempo devem ser números.');
      return;
    }

    const newService = {
      title,
      cat,
      desc,
      price: priceNum,
      eta: etaNum,
      avail,
      rating: 5,
      count: 0,
      ownerEmail: user.email,
      tags: [],
      location: user.location,
      verified: false,
    };

    addService(newService);

    // Atualizar servicesOwn do usuário
    const updatedUser = {
      ...user,
      servicesOwn: [{ ...newService, id: incrementId() }, ...user.servicesOwn],
    };
    setUser(updatedUser);

    setStatus('Serviço publicado!');
    setTitle('');
    setCat('');
    setDesc('');
    setPrice('');
    setEta('');
    setAvail('manha');

    if (user.role === 'cliente') {
      setTimeout(() => {
        alert('Você publicou um serviço, considere mudar seu tipo para PROFISSIONAL/AMBOS para destacá-lo.');
      }, 500);
    }

    persist();
  };

  return (
    <main className="max-w-[1280px] mx-auto mb-16 px-6 md:px-18">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Oferecer um serviço</h2>
        <p className="text-[hsl(var(--ink-light))]">
          Cadastre um novo serviço e comece a receber solicitações de clientes.
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-[2.5rem] p-8 shadow-sm mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2 text-sm font-medium">
              <span className="flex items-center gap-2">
                <ion-icon name="create-outline" class="text-lg"></ion-icon>
                Título do serviço
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={60}
                required
                placeholder="Ex: Corte de grama residencial"
                className="p-4 border border-gray-300 dark:border-[hsl(var(--border))] rounded-[16px] bg-white dark:bg-[hsl(var(--panel))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              <span className="flex items-center gap-2">
                <ion-icon name="grid-outline" class="text-lg"></ion-icon>
                Categoria
              </span>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                required
                className="p-4 border border-gray-300 dark:border-[hsl(var(--border))] rounded-[16px] bg-white dark:bg-[hsl(var(--panel))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
              >
                <option value="">Selecione uma categoria</option>
                <option value="jardinagem">🌱 Jardinagem</option>
                <option value="limpeza">🧹 Limpeza</option>
                <option value="manutencao">🔧 Manutenção</option>
                <option value="outros">📦 Outros</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium">
            <span className="flex items-center gap-2">
              <ion-icon name="document-text-outline" class="text-lg"></ion-icon>
              Descrição detalhada
            </span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              maxLength={400}
              required
              placeholder="Descreva o que está incluído no serviço, materiais necessários, etc."
              className="p-4 border border-gray-300 dark:border-[hsl(var(--border))] rounded-[16px] bg-white dark:bg-[hsl(var(--panel))] resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
            />
            <span className="text-xs text-[hsl(var(--ink-light))]">{desc.length}/400 caracteres</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="flex flex-col gap-2 text-sm font-medium">
              <span className="flex items-center gap-2">
                <ion-icon name="cash-outline" class="text-lg"></ion-icon>
                Preço base (R$)
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="1"
                required
                placeholder="0"
                className="p-4 border border-gray-300 dark:border-[hsl(var(--border))] rounded-[16px] bg-white dark:bg-[hsl(var(--panel))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              <span className="flex items-center gap-2">
                <ion-icon name="time-outline" class="text-lg"></ion-icon>
                Tempo médio (horas)
              </span>
              <input
                type="number"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                min="0.5"
                step="0.5"
                required
                placeholder="0"
                className="p-4 border border-gray-300 dark:border-[hsl(var(--border))] rounded-[16px] bg-white dark:bg-[hsl(var(--panel))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              <span className="flex items-center gap-2">
                <ion-icon name="calendar-outline" class="text-lg"></ion-icon>
                Disponibilidade
              </span>
              <select
                value={avail}
                onChange={(e) => setAvail(e.target.value)}
                required
                className="p-4 border border-gray-300 dark:border-[hsl(var(--border))] rounded-[16px] bg-white dark:bg-[hsl(var(--panel))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]"
              >
                <option value="manha">🌅 Manhã</option>
                <option value="tarde">☀️ Tarde</option>
                <option value="noite">🌙 Noite</option>
                <option value="integral">⏰ Integral</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[hsl(var(--accent))] text-white border-0 px-6 py-4 rounded-[16px] font-semibold tracking-wide cursor-pointer hover:brightness-90 transition-all shadow-md"
            >
              Publicar serviço
            </button>
          </div>

          {status && (
            <div className={`text-sm p-4 rounded-[16px] ${status.includes('publicado') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
              {status}
            </div>
          )}
        </form>
      </div>

      {/* Lista de serviços publicados */}
      <section>
        <h3 className="text-2xl font-bold mb-5">Meus serviços publicados</h3>
        {!user || !user.servicesOwn.length ? (
          <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-12 rounded-[2.5rem] text-center">
            <div className="w-16 h-16 rounded-full bg-[hsl(var(--accent-soft))] flex items-center justify-center text-3xl text-[hsl(var(--accent))] mx-auto mb-4">
              <ion-icon name="briefcase-outline"></ion-icon>
            </div>
            <p className="text-[hsl(var(--ink-light))]">Você ainda não publicou nenhum serviço.</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {user.servicesOwn.map((s, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-5 rounded-[24px] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--accent-soft))] flex items-center justify-center text-2xl text-[hsl(var(--accent))]">
                    <ion-icon name="checkmark-circle"></ion-icon>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Ativo
                  </span>
                </div>
                <h4 className="font-semibold text-base mb-2">{s.title}</h4>
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--ink-light))] mb-1">
                  <ion-icon name="pricetag-outline"></ion-icon>
                  <span className="capitalize">{s.cat}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--ink-light))]">
                  <ion-icon name="cash-outline"></ion-icon>
                  <span className="font-semibold text-[hsl(var(--accent))]">R$ {s.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
