# Инструкция по настройке Supabase для ZhasaVet

Чтобы товары, добавленные через админ-панель, сохранялись и отображались на сайте, выполните следующие шаги:

## 1. Создание таблиц
Зайдите в **SQL Editor** в вашей панели Supabase и выполните следующий скрипт:

```sql
-- Таблица товаров
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL, -- medicines, hygiene, food, accessories, equipment
  animal_types TEXT[] NOT NULL, -- cats, dogs, birds, rodents
  article TEXT UNIQUE NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'available', -- available, preorder, out_of_stock
  is_featured BOOLEAN DEFAULT false
);

-- Таблица заказов
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'new',
  items JSONB NOT NULL -- Список товаров в заказе
);

-- Включаем публичный доступ (для простоты теста, в продакшене настройте RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Access" ON products FOR SELECT USING (true);
CREATE POLICY "Admin Insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update" ON products FOR UPDATE USING (true);
CREATE POLICY "Admin Delete" ON products FOR DELETE USING (true);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin View Orders" ON orders FOR SELECT USING (true);
```

## 2. Настройка переменных окружения
Убедитесь, что в AI Studio в разделе **Settings -> Secrets** добавлены:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 3. Как добавлять товары
1. Зайдите на страницу `/admin` вашего сайта.
2. Используйте логин `admin` и пароль `admin123`.
3. В разделе "Библиотека товаров" нажмите **"Добавить товар"**.
4. После сохранения товар появится в таблице `products` в вашем Supabase проекте и мгновенно отобразится в "Аптеке" на сайте.

## 4. Проверка данных в Supabase
Вы можете увидеть свои товары в разделе **Table Editor -> products**. Любые изменения там будут сразу видны на сайте.
