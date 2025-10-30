import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, jobs, setUser, persist } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const myJobs = jobs.filter(
    (j) => j.clientEmail === user.email || j.proEmail === user.email
  );

  const asClient = myJobs.filter((j) => j.clientEmail === user.email);
  const asPro = myJobs.filter((j) => j.proEmail === user.email);

  const handleLogout = () => {
    setUser(null);
    persist();
    navigate('/auth');
  };

  return (
    <main className="max-w-[1280px] mx-auto mb-16 px-6 md:px-18">
      {/* Header do perfil */}
      <div className="bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent-soft))] rounded-[2.5rem] p-8 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl text-white">
              <ion-icon name="person"></ion-icon>
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-white/80 text-sm mb-2">{user.email}</p>
              <div className="flex gap-3 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">{user.phone}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full capitalize">{user.role}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 text-white border-0 px-6 py-2.5 rounded-[14px] font-medium cursor-pointer transition-all backdrop-blur-sm"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Dashboard de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-6 rounded-[24px] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl text-blue-600 dark:text-blue-400">
              <ion-icon name="checkmark-done"></ion-icon>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.stats.servicesDone}</p>
              <p className="text-sm text-[hsl(var(--ink-light))]">Serviços Concluídos</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-6 rounded-[24px] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl text-green-600 dark:text-green-400">
              <ion-icon name="briefcase"></ion-icon>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.stats.hired}</p>
              <p className="text-sm text-[hsl(var(--ink-light))]">Serviços Contratados</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-6 rounded-[24px] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-2xl text-yellow-600 dark:text-yellow-400">
              <ion-icon name="star"></ion-icon>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.stats.rating.toFixed(1)}</p>
              <p className="text-sm text-[hsl(var(--ink-light))]">Avaliação Média</p>
            </div>
          </div>
        </div>
      </div>

      {/* Serviços como Cliente */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Meus Pedidos</h2>
          <span className="text-sm text-[hsl(var(--ink-light))]">{asClient.length} serviços</span>
        </div>
        <div className="space-y-3">
          {asClient.length === 0 ? (
            <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-8 rounded-[24px] text-center">
              <p className="text-[hsl(var(--ink-light))]">Você ainda não solicitou nenhum serviço.</p>
            </div>
          ) : (
            asClient.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-5 rounded-[24px] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <p className="text-sm text-[hsl(var(--ink-light))] mb-2">
                      Profissional: {job.proEmail}
                    </p>
                    <div className="flex gap-2 items-center">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          job.status === 'concluido'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : job.status === 'aceito'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {job.status}
                      </span>
                      <span className="text-xs text-[hsl(var(--ink-light))]">
                        {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Serviços como Profissional */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Serviços Prestados</h2>
          <span className="text-sm text-[hsl(var(--ink-light))]">{asPro.length} serviços</span>
        </div>
        <div className="space-y-3">
          {asPro.length === 0 ? (
            <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-8 rounded-[24px] text-center">
              <p className="text-[hsl(var(--ink-light))]">Você ainda não prestou nenhum serviço.</p>
            </div>
          ) : (
            asPro.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] p-5 rounded-[24px] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <p className="text-sm text-[hsl(var(--ink-light))] mb-2">
                      Cliente: {job.clientEmail}
                    </p>
                    <div className="flex gap-2 items-center">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          job.status === 'concluido'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : job.status === 'aceito'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {job.status}
                      </span>
                      <span className="text-xs text-[hsl(var(--ink-light))]">
                        {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Histórico recente */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Atividade Recente</h2>
        <div className="bg-white dark:bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-[24px] p-6">
          {user.history.length === 0 ? (
            <p className="text-[hsl(var(--ink-light))] text-center">Nenhuma atividade ainda.</p>
          ) : (
            <div className="space-y-3">
              {user.history.slice(0, 5).map((h, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-[hsl(var(--border))] last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-[hsl(var(--accent-soft))] flex items-center justify-center text-[hsl(var(--accent))] flex-shrink-0">
                    <ion-icon name="time-outline"></ion-icon>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{h.action}</p>
                    <p className="text-xs text-[hsl(var(--ink-light))]">{h.title}</p>
                    <p className="text-xs text-[hsl(var(--ink-light))]">
                      {new Date(h.ts).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
