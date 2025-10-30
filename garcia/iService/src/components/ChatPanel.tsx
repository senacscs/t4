import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';

interface ChatPanelProps {
  jobId: number;
  onClose: () => void;
}

export function ChatPanel({ jobId, onClose }: ChatPanelProps) {
  const { user, jobs, setJobs, persist } = useApp();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const job = jobs.find((j) => j.id === jobId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [job?.messages]);

  if (!user || !job) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage = {
      from: user.email,
      text: text.trim(),
      ts: Date.now(),
    };

    const updatedJob = {
      ...job,
      messages: [...job.messages, newMessage],
    };

    const newJobs = jobs.map((j) => (j.id === jobId ? updatedJob : j));
    setJobs(newJobs);
    persist();
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(message);
  };

  const handleQuickReply = (msg: string) => {
    handleSend(msg);
  };

  return (
    <aside className="fixed bottom-4 right-4 w-80 max-h-[70vh] bg-[hsl(var(--panel))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-[20px] flex flex-col shadow-[0_8px_32px_-6px_rgba(0,0,0,0.25)] z-[120]">
      <header className="flex items-center justify-between p-2.5 border-b border-gray-200 dark:border-[hsl(var(--border))]">
        <h3 className="m-0 text-base font-semibold">Chat</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border-0 cursor-pointer text-[hsl(var(--ink-light))] hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Fechar chat"
        >
          <ion-icon name="close" class="text-lg"></ion-icon>
        </button>
      </header>

      <div className="flex-1 overflow-auto p-3 flex flex-col gap-2 text-[13px]">
        {job.messages.length === 0 ? (
          <p className="text-[hsl(var(--ink-light))] text-xs text-center">
            Nenhuma mensagem ainda. Comece a conversa!
          </p>
        ) : (
          job.messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-[14px] max-w-[75%] leading-tight ${
                msg.from === user.email
                  ? 'self-end bg-[hsl(var(--accent))] text-white'
                  : 'self-start bg-[hsl(var(--accent-soft))] text-[hsl(var(--ink))]'
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-1 p-1 pt-0 flex-wrap px-2.5">
        <button
          onClick={() => handleQuickReply('Chego em 30 min')}
          className="bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))] border-0 text-[11px] px-2 py-1 rounded-xl cursor-pointer hover:brightness-95"
        >
          30 min
        </button>
        <button
          onClick={() => handleQuickReply('Envie foto do problema')}
          className="bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))] border-0 text-[11px] px-2 py-1 rounded-xl cursor-pointer hover:brightness-95"
        >
          Foto?
        </button>
        <button
          onClick={() => handleQuickReply('Podemos reagendar para amanhã?')}
          className="bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))] border-0 text-[11px] px-2 py-1 rounded-xl cursor-pointer hover:brightness-95"
        >
          Reagendar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-1.5 p-2.5 border-t border-gray-200 dark:border-[hsl(var(--border))]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensagem"
          className="flex-1 p-2.5 border border-gray-300 dark:border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--panel-alt))]"
        />
        <button
          type="submit"
          className="bg-[hsl(var(--accent))] text-white border-0 px-4 py-2.5 rounded-xl font-medium cursor-pointer hover:brightness-90 transition-all"
        >
          Enviar
        </button>
      </form>
    </aside>
  );
}
