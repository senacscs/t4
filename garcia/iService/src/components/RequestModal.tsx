import { useApp, Service } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

interface RequestModalProps {
  service: Service;
  viewOnly?: boolean;
  onClose: () => void;
}

export function RequestModal({ service, viewOnly = false, onClose }: RequestModalProps) {
  const { user, addJob, setUser, jobs, setJobs, persist } = useApp();
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!user || viewOnly) return;

    // Atualizar histórico e stats do usuário
    const updatedUser = {
      ...user,
      history: [{ ts: Date.now(), action: 'Solicitou', title: service.title }, ...user.history],
      stats: { ...user.stats, hired: user.stats.hired + 1 },
    };
    setUser(updatedUser);

    // Criar job
    const newJob = {
      svcId: service.id,
      title: service.title,
      proEmail: service.ownerEmail,
      clientEmail: user.email,
      status: 'solicitado' as const,
      createdAt: Date.now(),
      messages: [],
      sla: {},
    };
    addJob(newJob);

    // Simular aceitação automática após 1s
    setTimeout(() => {
      const acceptedJob = {
        ...newJob,
        id: jobs.length + 1,
        status: 'aceito' as const,
        acceptedAt: Date.now(),
        sla: { responseMs: 1000 },
      };
      
      // Simular conclusão após mais 1s
      setTimeout(() => {
        const finishedJob = {
          ...acceptedJob,
          status: 'concluido' as const,
          finishedAt: Date.now(),
        };

        const rating = 4 + Math.random();
        const updatedUserFinal = {
          ...updatedUser,
          history: [
            { ts: Date.now(), action: 'Concluído', title: service.title },
            ...updatedUser.history,
          ],
          stats: {
            ...updatedUser.stats,
            servicesDone: updatedUser.stats.servicesDone + 1,
            ratingCount: updatedUser.stats.ratingCount + 1,
            rating:
              ((updatedUser.stats.rating * updatedUser.stats.ratingCount) + rating) /
              (updatedUser.stats.ratingCount + 1),
          },
          feedback: [
            { title: service.title, rating: rating.toFixed(1), comment: 'Serviço concluído com sucesso.' },
            ...updatedUser.feedback,
          ],
        };
        setUser(updatedUserFinal);
        persist();
      }, 1000);
    }, 1000);

    persist();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5 z-[100]"
    >
      <div className="bg-white dark:bg-[hsl(var(--panel))] dark:border dark:border-[hsl(var(--border))] w-full max-w-[560px] rounded-[30px] p-7 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)] flex flex-col gap-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-transparent border-0 cursor-pointer text-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          aria-label="Fechar"
        >
          <ion-icon name="close" class="text-xl"></ion-icon>
        </button>

        <header>
          <h3 className="m-0 text-[22px] font-semibold">Confirmar Solicitação</h3>
        </header>

        <div className="text-sm leading-relaxed flex flex-col gap-[18px]">
          <div className="flex gap-[18px] items-start">
            <div className="w-[84px] h-[84px] rounded-[24px] bg-[hsl(var(--accent-soft))] flex items-center justify-center text-[42px] text-[hsl(var(--accent))]">
              <ion-icon name="person-outline" class="text-[42px]"></ion-icon>
            </div>
            <div className="flex-1">
              <h4 className="m-0 mb-1 text-lg font-semibold">{service.title}</h4>
              <p className="m-0 mb-1.5 text-[13px]">
                <strong>Profissional:</strong> {service.ownerEmail}
              </p>
              <p className="m-0 mb-1.5 text-[15px] font-semibold">
                R$ {service.price} • ~{service.eta}h • {service.avail}
              </p>
              <p className="m-0 mb-1.5 text-[13px]">{service.desc}</p>
              <p className="m-0 text-xs">
                Avaliação: {service.rating.toFixed(1)} ({service.count} serviços)
              </p>
              {!viewOnly && user && (
                <p className="m-0 text-xs mt-1.5">
                  <strong>Contato:</strong> {user.phone || '—'}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-[hsl(var(--panel-alt))] p-3.5 rounded-2xl text-[13px]">
            {viewOnly
              ? 'Visualização do profissional.'
              : 'Confirme para enviar a solicitação ao profissional. Você poderá acompanhar no seu perfil.'}
          </div>
        </div>

        <footer className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-transparent text-[hsl(var(--ink))] dark:text-[hsl(var(--ink-light))] border border-gray-300 dark:border-[hsl(var(--border))] px-5 py-2.5 rounded-[14px] font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-[hsl(var(--panel-alt))] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={viewOnly}
            className="bg-[hsl(var(--accent))] text-white border-0 px-5 py-2.5 rounded-[14px] font-medium cursor-pointer hover:brightness-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar
          </button>
        </footer>
      </div>
    </div>
  );
}
