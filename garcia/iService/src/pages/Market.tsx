import { useState, useMemo } from 'react';
import { useApp, Service } from '@/contexts/AppContext';
import { ServiceCard } from '@/components/ServiceCard';
import { RequestModal } from '@/components/RequestModal';

export default function Market() {
  const { services, filters, setFilters, user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalViewOnly, setModalViewOnly] = useState(false);

  const filteredServices = useMemo(() => {
    let list = services.filter((s) => {
      const termOk = !filters.term || 
        s.title.toLowerCase().includes(filters.term) || 
        s.desc.toLowerCase().includes(filters.term);
      const catOk = filters.cat === 'all' || s.cat === filters.cat;
      return termOk && catOk;
    });

    // Ranking simples
    list = list
      .map((s) => ({
        ...s,
        _score:
          (s.rating || 0) * 10 +
          (s.verified ? 15 : 0) +
          (user && s.location === user.location ? 8 : 0) +
          (s.tags?.includes('rápido') ? 4 : 0),
      }))
      .sort((a, b) => b._score - a._score);

    return list;
  }, [services, filters, user]);

  const handleSearch = () => {
    setFilters({ ...filters, term: searchTerm.trim().toLowerCase() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <main className="max-w-[1280px] mx-auto mb-16 px-18">
      <div className="flex flex-wrap items-end gap-8 mb-8">
        <h2 className="text-3xl font-semibold">Encontrar serviço</h2>
        <div className="flex items-center gap-1 bg-white dark:bg-[hsl(var(--panel))] px-3.5 py-2.5 border border-gray-200 dark:border-[hsl(var(--border))] rounded-[40px] flex-1">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Qual serviço você precisa?"
            className="flex-1 border-0 bg-transparent p-1 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[hsl(var(--accent))] text-white border-0 p-2.5 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center text-xl"
            aria-label="Pesquisar"
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-7">
        {['all', 'jardinagem', 'limpeza', 'manutencao', 'outros'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilters({ ...filters, cat })}
            className={`px-[18px] py-2 text-[13px] rounded-[26px] cursor-pointer tracking-wider transition-colors ${
              filters.cat === cat
                ? 'bg-[hsl(var(--brand))] text-white border border-[hsl(var(--brand))]'
                : 'bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] hover:bg-gray-100 dark:hover:bg-[hsl(var(--panel-alt))]'
            }`}
          >
            {cat === 'all' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <section className="grid gap-7 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {filteredServices.length === 0 ? (
          <p className="text-[hsl(var(--ink-light))] text-sm">Nenhum serviço encontrado.</p>
        ) : (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onRequest={(s) => {
                setSelectedService(s);
                setModalViewOnly(false);
              }}
              onViewProfile={(s) => {
                setSelectedService(s);
                setModalViewOnly(true);
              }}
            />
          ))
        )}
      </section>

      {selectedService && (
        <RequestModal
          service={selectedService}
          viewOnly={modalViewOnly}
          onClose={() => setSelectedService(null)}
        />
      )}
    </main>
  );
}
