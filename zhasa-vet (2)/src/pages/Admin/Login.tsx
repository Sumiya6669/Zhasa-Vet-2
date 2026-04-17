import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Вход в панель</h2>
          <p className="text-slate-500">Только для авторизованных сотрудников</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Логин</label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin" 
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-medium" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-medium" 
                />
              </div>
            </div>
          </div>

          <button className="w-full py-5 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl transform active:scale-[0.98]">
            Войти в систему
          </button>
        </form>

        <button 
          onClick={() => navigate('/')}
          className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}
