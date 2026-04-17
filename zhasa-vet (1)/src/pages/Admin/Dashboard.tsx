import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Plus, Trash2, Edit2, LogOut, PackageSearch, ClipboardList, Newspaper } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_BLOG } from '../../mockData';
import { Product, BlogPost, Order } from '../../types';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [posts] = useState<BlogPost[]>(MOCK_BLOG);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'blog' | 'stats'>('products');

  // Mock Orders
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customer_name: 'Иван Петров',
      customer_phone: '+7 701 111 2233',
      items: [{ ...MOCK_PRODUCTS[0], quantity: 1 }],
      total: 3500,
      status: 'new',
      date: '2024-03-20 14:30'
    },
    {
      id: 'ORD-002',
      customer_name: 'Мария Сидорова',
      customer_phone: '+7 777 555 6677',
      items: [{ ...MOCK_PRODUCTS[1], quantity: 2 }],
      total: 25000,
      status: 'completed',
      date: '2024-03-19 10:15'
    }
  ]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const getTabTitle = () => {
    switch(activeTab) {
      case 'products': return 'Каталог товаров';
      case 'orders': return 'Заказы (Самовывоз)';
      case 'blog': return 'Управление блогом';
      case 'stats': return 'Аналитика';
      default: return 'Admin Panel';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-teal/20">Z</div>
          <span className="font-bold text-slate-800 tracking-tight">Admin ZhasaVet</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <TabButton 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
            icon={<ShoppingBag size={20} />} 
            label="Библиотека товаров" 
          />
          <TabButton 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
            icon={<ClipboardList size={20} />} 
            label="Заказы" 
            badge={orders.filter(o => o.status === 'new').length}
          />
          <TabButton 
            active={activeTab === 'blog'} 
            onClick={() => setActiveTab('blog')} 
            icon={<Newspaper size={20} />} 
            label="Статьи блога" 
          />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Система</div>
          <TabButton 
            active={activeTab === 'stats'} 
            onClick={() => setActiveTab('stats')} 
            icon={<LayoutDashboard size={20} />} 
            label="Аналитика" 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
          >
            <LogOut size={20} /> Выйти
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-10 glass">
          <h1 className="text-xl font-bold text-slate-800 font-display">{getTabTitle()}</h1>
          <div className="flex gap-3">
             {activeTab === 'blog' && (
                <button className="px-6 py-2.5 bg-brand-orange text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-brand-orange/20">
                  <Plus size={20} /> Написать статью
                </button>
             )}
             {activeTab === 'products' && (
                <button className="px-6 py-2.5 bg-brand-teal text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-brand-teal/20">
                  <Plus size={20} /> Добавить товар
                </button>
             )}
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {activeTab === 'products' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatBox icon={<PackageSearch className="text-blue-500" />} label="Всего товаров" value={products.length.toString()} />
                <StatBox icon={<ShoppingBag className="text-brand-orange" />} label="По предзаказу" value={products.filter(p => p.status === 'preorder').length.toString()} />
                <StatBox icon={<Trash2 className="text-red-400" />} label="Нет на складе" value="0" />
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Наименование</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Артикул</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Цена</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Статус</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Управление</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={product.image_url} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100 border" />
                            <span className="font-bold text-slate-700">{product.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 font-mono tracking-tighter">{product.article}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">{product.price.toLocaleString()} ₸</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${product.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-brand-orange/10 text-brand-orange'}`}>
                            {product.status === 'available' ? 'В наличии' : 'Предзаказ'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-brand-teal bg-slate-50 rounded-lg"><Edit2 size={16} /></button>
                            <button className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
               {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col md:flex-row gap-8 items-center shadow-sm hover:border-brand-teal/20 transition-all">
                     <div className="flex-grow space-y-4 w-full md:w-auto">
                        <div className="flex items-center justify-between">
                           <div className="space-y-1">
                              <h3 className="font-bold text-lg text-slate-800">Заказ {order.id}</h3>
                              <p className="text-xs text-slate-400">{order.date}</p>
                           </div>
                           <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest ${order.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                              {order.status === 'new' ? 'Новый' : 'Выполнен'}
                           </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-2xl">
                           <div>
                              <p className="text-slate-400 text-xs font-medium uppercase mb-1">Клиент</p>
                              <p className="font-bold text-slate-700">{order.customer_name}</p>
                              <p className="text-slate-500">{order.customer_phone}</p>
                           </div>
                           <div className="text-right sm:text-left">
                              <p className="text-slate-400 text-xs font-medium uppercase mb-1">Сумма заказа</p>
                              <p className="font-bold text-brand-teal text-xl">{order.total.toLocaleString()} ₸</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col gap-3 w-full md:w-48">
                        <button className="w-full py-3 bg-brand-teal text-white rounded-xl font-bold shadow-lg shadow-brand-teal/10 hover:bg-brand-teal-dark transition-all">Подтвердить</button>
                        <button className="w-full py-3 bg-white border border-slate-200 text-slate-400 rounded-xl font-bold hover:bg-slate-50 transition-all">Детали</button>
                     </div>
                  </div>
               ))}
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="grid grid-cols-1 gap-4">
               {posts.map(post => (
                  <div key={post.id} className="bg-white rounded-3xl border border-slate-200 p-4 flex gap-6 items-center hover:border-brand-teal/20 transition-all">
                     <img src={post.image_url} alt="" className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                     <div className="flex-grow">
                        <h4 className="font-bold text-slate-800 mb-1">{post.title}</h4>
                        <p className="text-xs text-slate-400 mb-4">{post.date}</p>
                        <div className="flex gap-2">
                           <button className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-brand-teal hover:text-white transition-all">Изменить</button>
                           <button className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all">Удалить</button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="bg-white rounded-[40px] p-20 text-center space-y-4 border-2 border-dashed border-slate-200">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <LayoutDashboard size={40} />
               </div>
               <h3 className="text-xl font-bold text-slate-400">Модуль статистики находится в разработке</h3>
               <p className="text-sm text-slate-400">Скоро здесь появятся графики продаж и посещаемости.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, badge }: { active: boolean, onClick: () => void, icon: ReactNode, label: string, badge?: number }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium transition-all ${active ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20' : 'text-slate-500 hover:bg-slate-50'}`}
    >
      <div className="flex items-center gap-3">
        {icon} 
        <span className="text-sm">{label}</span>
      </div>
      {badge && badge > 0 && (
         <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? 'bg-white text-brand-teal' : 'bg-brand-teal text-white'}`}>
            {badge}
         </span>
      )}
    </button>
  );
}

function StatBox({ icon, label, value }: { icon: ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-200 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 bg-slate-50 rounded-2xl transition-transform hover:scale-110">{icon}</div>
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl font-display font-bold text-slate-800 leading-none">{value}</div>
      </div>
    </div>
  );
}
