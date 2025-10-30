import { useState } from 'react';
import { useApp, UserRole } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const { setUser, persist } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [role, setRole] = useState<UserRole>('cliente');
  const [status, setStatus] = useState('');

  const isSignup = mode === 'signup';

  const handlePhoneInput = (value: string) => {
    let v = value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
    if (v.length > 10) {
      const core = v.replace(/[()\s]/g, '');
      const ddd = core.slice(0, 2);
      const rest = core.slice(2);
      if (rest.length > 5) v = '(' + ddd + ') ' + rest.slice(0, 5) + '-' + rest.slice(5, 9);
    }
    setPhone(v);
  };

  const handleCnpjInput = (value: string) => {
    let v = value.replace(/\D/g, '').slice(0, 14);
    if (v.length > 2) v = v.slice(0, 2) + '.' + v.slice(2);
    if (v.length > 6) v = v.slice(0, 6) + '.' + v.slice(6);
    if (v.length > 10) v = v.slice(0, 10) + '/' + v.slice(10);
    if (v.length > 15) v = v.slice(0, 15) + '-' + v.slice(15);
    setCnpj(v);
  };

  const createUser = (email: string, role: UserRole, name?: string, phone?: string) => ({
    email,
    role,
    name: name || email.split('@')[0],
    phone: phone || '',
    location: 'Centro',
    responseTimes: [],
    stats: { servicesDone: 0, hired: 0, rating: 0, ratingCount: 0 },
    composite: { qualidade: 0, pontualidade: 0, comunicacao: 0 },
    servicesOwn: [],
    history: [],
    feedback: [],
    lastLogin: Date.now(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    if (!email || !password) {
      setStatus('Preencha email e senha.');
      return;
    }

    if (isSignup) {
      if (!name) {
        setStatus('Informe seu nome.');
        return;
      }
      if (!/\d{8,}/.test(phone.replace(/\D/g, ''))) {
        setStatus('Informe um telefone válido.');
        return;
      }
      if ((role === 'pro' || role === 'ambos') && cnpj.replace(/\D/g, '').length !== 14) {
        setStatus('Informe um CNPJ válido ou cadastre-se como MEI.');
        return;
      }
      const user = createUser(email, role, name, phone);
      setUser(user);
      setStatus('Conta criada!');
    } else {
      const user = createUser(email, role);
      setUser(user);
    }

    persist();
    navigate('/market');
  };

  return (
    <main className="max-w-[1280px] mx-auto mb-16 px-18">
      <section className="bg-[hsl(var(--panel))] p-10 rounded-[2.5rem] max-w-[560px] mx-auto my-12 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)]">
        <h1 className="font-semibold text-3xl mb-2">
          {isSignup ? 'Criar conta' : 'Entrar no iService'}
        </h1>
        <p className="text-[hsl(var(--ink-light))] text-sm mb-6">
          {isSignup ? 'Preencha os dados para começar.' : 'Escolha como deseja usar a plataforma.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
          {isSignup && (
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Nome
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                className="p-3.5 border border-gray-300 rounded-[14px] bg-white dark:bg-[hsl(var(--panel))] dark:border-[hsl(var(--border))]"
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3.5 border border-gray-300 rounded-[14px] bg-white dark:bg-[hsl(var(--panel))] dark:border-[hsl(var(--border))]"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3.5 border border-gray-300 rounded-[14px] bg-white dark:bg-[hsl(var(--panel))] dark:border-[hsl(var(--border))]"
            />
          </label>

          {isSignup && (
            <>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Contato (WhatsApp / Telefone)
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneInput(e.target.value)}
                  maxLength={16}
                  placeholder="(DDD) 90000-0000"
                  className="p-3.5 border border-gray-300 rounded-[14px] bg-white dark:bg-[hsl(var(--panel))] dark:border-[hsl(var(--border))]"
                />
              </label>

              {(role === 'pro' || role === 'ambos') && (
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  CNPJ
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => handleCnpjInput(e.target.value)}
                    maxLength={18}
                    placeholder="00.000.000/0000-00"
                    className="p-3.5 border border-gray-300 rounded-[14px] bg-white dark:bg-[hsl(var(--panel))] dark:border-[hsl(var(--border))]"
                  />
                  <a 
                    href="https://www.portalmeimicroempreendedor.com/abrir-mei/?IsForm=S" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-[hsl(var(--accent))] hover:underline"
                  >
                    Não tenho CNPJ? Cadastre-se como MEI
                  </a>
                </label>
              )}
            </>
          )}

          <fieldset className="border border-gray-200 dark:border-[hsl(var(--border))] rounded-[14px] p-3 flex gap-6 flex-wrap">
            <legend className="px-1.5 text-xs font-semibold tracking-wider uppercase">Tipo de acesso</legend>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="cliente" checked={role === 'cliente'} onChange={(e) => setRole(e.target.value as UserRole)} />
              Cidadão
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="pro" checked={role === 'pro'} onChange={(e) => setRole(e.target.value as UserRole)} />
              Profissional
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="ambos" checked={role === 'ambos'} onChange={(e) => setRole(e.target.value as UserRole)} />
              Ambos
            </label>
          </fieldset>

          {status && <div className="text-sm text-[hsl(var(--accent))] min-h-[18px]">{status}</div>}

          <button
            type="submit"
            className="w-full bg-[hsl(var(--accent))] text-white border-0 px-5 py-2.5 rounded-[14px] font-medium tracking-wider cursor-pointer hover:brightness-90 transition-all"
          >
            {isSignup ? 'Cadastrar e entrar' : 'Entrar'}
          </button>

          <p className="text-[13px] text-center m-0">
            {isSignup ? 'Já tem conta? ' : 'Primeira vez? '}
            <button
              type="button"
              onClick={() => setMode(isSignup ? 'login' : 'signup')}
              className="bg-transparent border-0 text-[hsl(var(--accent))] cursor-pointer p-1 hover:underline"
            >
              {isSignup ? 'Entrar' : 'Criar conta'}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}
