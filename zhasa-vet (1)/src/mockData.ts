import { Product, Doctor, BlogPost, Service } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Витаминный комплекс для кошек',
    description: 'Полноценный набор витаминов для поддержания иммунитета и блестящей шерсти.',
    price: 3500,
    category: 'medicines',
    animal_types: ['cats'],
    article: 'ZV-001',
    image_url: 'https://picsum.photos/seed/catvit/400/400',
    status: 'preorder',
    is_featured: true,
    reviews: [
      { id: 'r1', user_name: 'Анна', rating: 5, comment: 'Отличные витамины!', date: '01.03.2024' }
    ]
  },
  {
    id: '2',
    title: 'Гипоаллергенный корм для собак',
    description: 'Идеален для питомцев с чувствительным пищеварением.',
    price: 12500,
    category: 'food',
    animal_types: ['dogs'],
    article: 'ZV-002',
    image_url: 'https://picsum.photos/seed/dogfood/400/400',
    status: 'available',
    is_featured: true,
  },
  {
    id: '3',
    title: 'Капли от блох и клещей',
    description: 'Эффективная защита на 30 дней.',
    price: 2400,
    category: 'medicines',
    animal_types: ['cats', 'dogs'],
    article: 'ZV-003',
    image_url: 'https://picsum.photos/seed/flea/400/400',
    status: 'available',
  },
  {
    id: '4',
    title: 'Шампунь для щенков',
    description: 'Бережное очищение кожи и шерсти без слез.',
    price: 1800,
    category: 'hygiene',
    animal_types: ['dogs'],
    article: 'ZV-004',
    image_url: 'https://picsum.photos/seed/shampoo/400/400',
    status: 'preorder',
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Яша Оржов',
    specialty: 'Главный ветеринарный врач, хирург',
    bio: 'Более 15 лет опыта в лечении мелких домашних животных. Эксперт в сложной хирургии и реабилитации.',
    experience: '15 лет',
    image_url: 'https://picsum.photos/seed/doctor/400/500',
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Первичный осмотр',
    description: 'Комплексный осмотр питомца, сбор анамнеза и первичные рекомендации.',
    price_range: 'от 3000 ₸',
  },
  {
    id: '2',
    title: 'Вакцинация',
    description: 'Прививки от бешенства и основных инфекционных заболеваний.',
    price_range: 'от 5000 ₸',
  },
  {
    id: '3',
    title: 'Хирургия',
    description: 'Стерилизация, кастрация и другие виды хирургического вмешательства.',
    price_range: 'от 12000 ₸',
  },
  {
    id: '4',
    title: 'Лабораторная диагностика',
    description: 'Анализы крови, мочи и кала для точной постановки диагноза.',
    price_range: 'от 2500 ₸',
  }
];

export const MOCK_BLOG: BlogPost[] = [
  {
    id: '1',
    title: 'Как подготовить питомца к весне?',
    excerpt: 'Основные советы по профилактике клещей и весенней линьке.',
    content: 'Весна — это не только время солнца, но и период активности паразитов...',
    date: '15.03.2024',
    image_url: 'https://picsum.photos/seed/spring/800/400',
    slug: 'spring-preparation'
  },
  {
    id: '2',
    title: 'Правильное питание: сухой корм или натуралка?',
    excerpt: 'Разбираем плюсы и минусы популярных систем кормления.',
    content: 'Вопрос питания питомца часто становится предметом споров...',
    date: '10.03.2024',
    image_url: 'https://picsum.photos/seed/diet/800/400',
    slug: 'diet-guide'
  }
];
