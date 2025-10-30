import { useApp } from '@/contexts/AppContext';
import { useTheme } from 'next-themes';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const { user } = useApp();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[hsl(var(--brand))] text-white rounded-[3.5rem] mx-auto my-3 max-w-[1280px] px-10 py-2.5 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)] sticky top-2 z-50">
      <div className="flex items-center gap-10">
        <div 
          className="flex items-center gap-2 font-semibold cursor-pointer"
          onClick={() => navigate(user ? '/market' : '/')}
          role="button"
          tabIndex={0}
        >
          <span className="text-xl" aria-hidden="true">
            <ion-icon name="construct-outline" class="text-xl"></ion-icon>
          </span>
          <span className="tracking-wider text-[17px]">iService</span>
        </div>
        
        {user && (
          <nav className="flex-1" aria-label="Navegação principal">
            <ul className="flex gap-2 list-none m-0 p-0">
              <li>
                <button
                  onClick={() => navigate('/market')}
                  className={`bg-transparent text-white border-0 px-[18px] py-2.5 rounded-[30px] font-medium cursor-pointer text-sm tracking-wider transition-all hover:bg-white/10 ${
                    isActive('/market') ? 'bg-white !text-[hsl(var(--brand))] font-semibold' : ''
                  }`}
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/post')}
                  className={`bg-transparent text-white border-0 px-[18px] py-2.5 rounded-[30px] font-medium cursor-pointer text-sm tracking-wider transition-all hover:bg-white/10 ${
                    isActive('/post') ? 'bg-white !text-[hsl(var(--brand))] font-semibold' : ''
                  }`}
                >
                  Oferecer
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/profile')}
                  className={`bg-transparent text-white border-0 px-[18px] py-2.5 rounded-[30px] font-medium cursor-pointer text-sm tracking-wider transition-all hover:bg-white/10 ${
                    isActive('/profile') ? 'bg-white !text-[hsl(var(--brand))] font-semibold' : ''
                  }`}
                >
                  Perfil
                </button>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="bg-transparent text-white border-0 px-[18px] py-2.5 rounded-[30px] font-medium cursor-pointer text-sm tracking-wider hover:bg-white/10"
            aria-label="Alternar tema"
          >
            <ion-icon name={theme === 'dark' ? 'sunny' : 'moon'} class="text-lg"></ion-icon>
          </button>
          {user && (
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium" title={user.email}>
              {user.name || 'Usuário'}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
