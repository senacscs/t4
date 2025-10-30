import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'cliente' | 'pro' | 'ambos';

export interface User {
  email: string;
  role: UserRole;
  name: string;
  phone: string;
  location: string;
  responseTimes: number[];
  stats: {
    servicesDone: number;
    hired: number;
    rating: number;
    ratingCount: number;
  };
  composite: {
    qualidade: number;
    pontualidade: number;
    comunicacao: number;
  };
  servicesOwn: Service[];
  history: HistoryEntry[];
  feedback: FeedbackEntry[];
  lastLogin?: number;
}

export interface Service {
  id: number;
  title: string;
  cat: string;
  desc: string;
  price: number;
  eta: number;
  avail: string;
  rating: number;
  count: number;
  ownerEmail: string;
  tags: string[];
  location: string;
  verified: boolean;
}

export interface Job {
  id: number;
  svcId: number;
  title: string;
  proEmail: string;
  clientEmail: string;
  status: 'solicitado' | 'aceito' | 'concluido';
  createdAt: number;
  acceptedAt?: number;
  finishedAt?: number;
  scheduledFor?: number;
  messages: ChatMessage[];
  sla: {
    responseMs?: number;
  };
}

export interface ChatMessage {
  from: string;
  text: string;
  ts: number;
}

export interface HistoryEntry {
  ts: number;
  action: string;
  title: string;
}

export interface FeedbackEntry {
  title: string;
  rating: string;
  comment: string;
}

interface AppState {
  user: User | null;
  services: Service[];
  jobs: Job[];
  nextId: number;
  nextJobId: number;
  filters: {
    term: string;
    cat: string;
  };
  chat: {
    open: boolean;
    jobId: number | null;
  };
}

interface AppContextType extends AppState {
  setUser: (user: User | null) => void;
  setServices: (services: Service[]) => void;
  setJobs: (jobs: Job[]) => void;
  setFilters: (filters: { term: string; cat: string }) => void;
  setChat: (chat: { open: boolean; jobId: number | null }) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  addJob: (job: Omit<Job, 'id'>) => void;
  persist: () => void;
  incrementId: () => number;
  incrementJobId: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'iservice_state_v1';

const seedServices = (): Service[] => [
  { id: 1, title: 'Corte de Grama Rápido', cat: 'jardinagem', desc: 'Corte e aparo de gramado residencial até 150m².', price: 70, eta: 2, avail: 'manha', rating: 4.8, count: 54, ownerEmail: 'pro@seed', tags: ['rápido'], location: 'Centro', verified: true },
  { id: 2, title: 'Limpeza de Cozinha', cat: 'limpeza', desc: 'Higienização completa: azulejos, fogão e pisos.', price: 120, eta: 3, avail: 'tarde', rating: 4.6, count: 87, ownerEmail: 'pro@seed', tags: ['rápido'], location: 'Centro', verified: true },
  { id: 3, title: 'Conserto Elétrico Básico', cat: 'manutencao', desc: 'Troca de tomadas, interruptores e pequenos reparos.', price: 90, eta: 1.5, avail: 'integral', rating: 4.9, count: 112, ownerEmail: 'pro@seed', tags: ['rápido'], location: 'Centro', verified: true },
  { id: 4, title: 'Montagem de Móveis', cat: 'manutencao', desc: 'Montagem de móveis planos padrão (até 2h).', price: 150, eta: 2, avail: 'tarde', rating: 4.7, count: 65, ownerEmail: 'pro@seed', tags: ['rápido'], location: 'Centro', verified: true },
  { id: 5, title: 'Faxina Expressa', cat: 'limpeza', desc: 'Limpeza rápida de apartamento até 60m².', price: 110, eta: 2.5, avail: 'manha', rating: 4.5, count: 140, ownerEmail: 'pro@seed', tags: ['rápido'], location: 'Centro', verified: true },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        return {
          ...data,
          filters: { term: '', cat: 'all' },
          chat: { open: false, jobId: null },
          services: data.services?.length ? data.services : seedServices(),
          nextId: data.nextId || 6,
        };
      }
    } catch {}
    
    return {
      user: null,
      services: seedServices(),
      jobs: [],
      nextId: 6,
      nextJobId: 1,
      filters: { term: '', cat: 'all' },
      chat: { open: false, jobId: null },
    };
  });

  const persist = () => {
    try {
      const safe = {
        user: state.user,
        services: state.services,
        jobs: state.jobs,
        nextId: state.nextId,
        nextJobId: state.nextJobId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    } catch {}
  };

  useEffect(() => {
    persist();
  }, [state.user, state.services, state.jobs, state.nextId, state.nextJobId]);

  const incrementId = () => {
    const id = state.nextId;
    setState(s => ({ ...s, nextId: s.nextId + 1 }));
    return id;
  };

  const incrementJobId = () => {
    const id = state.nextJobId;
    setState(s => ({ ...s, nextJobId: s.nextJobId + 1 }));
    return id;
  };

  const value: AppContextType = {
    ...state,
    setUser: (user) => setState(s => ({ ...s, user })),
    setServices: (services) => setState(s => ({ ...s, services })),
    setJobs: (jobs) => setState(s => ({ ...s, jobs })),
    setFilters: (filters) => setState(s => ({ ...s, filters })),
    setChat: (chat) => setState(s => ({ ...s, chat })),
    addService: (service) => {
      const id = state.nextId;
      setState(s => ({
        ...s,
        services: [{ ...service, id }, ...s.services],
        nextId: s.nextId + 1,
      }));
    },
    addJob: (job) => {
      const id = state.nextJobId;
      setState(s => ({
        ...s,
        jobs: [{ ...job, id }, ...s.jobs],
        nextJobId: s.nextJobId + 1,
      }));
    },
    persist,
    incrementId,
    incrementJobId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
