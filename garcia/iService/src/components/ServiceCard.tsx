import { Service } from '@/contexts/AppContext';

interface ServiceCardProps {
  service: Service;
  onRequest: (service: Service) => void;
  onViewProfile: (service: Service) => void;
}

export function ServiceCard({ service, onRequest, onViewProfile }: ServiceCardProps) {
  return (
    <article className="bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-5 rounded-[24px] flex flex-col gap-3 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]">
      <header className="flex justify-between items-start gap-2">
        <h3 className="text-base font-semibold m-0 flex items-center gap-2">
          {service.title}
          {service.verified && (
            <ion-icon name="shield-checkmark" style={{ color: 'hsl(var(--accent))', fontSize: '14px' }}></ion-icon>
          )}
        </h3>
        <span className="bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))] text-[11px] px-2.5 py-1 rounded-[18px] tracking-wider font-semibold">
          {service.cat}
        </span>
      </header>

      <div className="text-4xl text-[hsl(var(--accent))]">
        <ion-icon name="construct-outline"></ion-icon>
      </div>

      <p className="m-0 text-[13px] leading-[1.35] text-[hsl(var(--ink-light))]">
        {service.desc}
      </p>

      <div className="flex gap-3 text-xs items-center">
        <span className="text-yellow-500 font-semibold">
          ★ {service.rating.toFixed(1)}
        </span>
        <span className="text-[hsl(var(--ink-light))]">
          {service.count} feitos
        </span>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onRequest(service)}
          className="flex-1 bg-transparent text-[hsl(var(--ink))] dark:text-[hsl(var(--ink-light))] border border-gray-300 dark:border-[hsl(var(--border))] px-3 py-1.5 text-xs rounded-[10px] font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-[hsl(var(--panel-alt))] transition-colors"
        >
          Solicitar
        </button>
        <button
          onClick={() => onViewProfile(service)}
          className="flex-1 bg-transparent text-[hsl(var(--accent))] border-0 px-3 py-1.5 text-xs rounded-[10px] font-medium cursor-pointer hover:bg-[hsl(var(--accent-soft))] transition-colors"
        >
          Ver mais
        </button>
      </div>
    </article>
  );
}
