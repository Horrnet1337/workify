# Деплой Workify (демо)

## Почему не работает filemanager.ai / htdocs

Сайт — **Node.js + Express** (сервер рендерит страницы, i18n, формы).

Хостинг с папкой `htdocs` — это **PHP/Apache** (только HTML/PHP). Node.js там **не запустится**.

Ошибка *«Extract path must be within an htdocs folder»* — нужно распаковывать **внутрь `htdocs`**, но даже так Express не заработает.

Архив **87 MB** — скорее всего в zip попали `node_modules` и `.tools`. На сервере зависимости ставят командой `npm install`, их не заливают.

---

## Рекомендация: Render.com (бесплатно, Node.js)

1. Зарегистрируйтесь на [render.com](https://render.com)
2. Создайте репозиторий на GitHub и залейте проект (без `node_modules` и `.tools`)
3. Render → **New → Web Service** → подключите репозиторий
4. Настройки:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. После деплоя в **Environment** добавьте:
   - `SITE_URL` = `https://ваш-сервис.onrender.com`
   - `ADMIN_PASSWORD` = надёжный пароль для панели `/admin`
   - `ADMIN_SECRET` — Render может сгенерировать сам (для cookie сессии)
6. Получите ссылку вида `https://workify-xxxx.onrender.com`

> **Панель заявок:** `/admin` (ссылка «Panel» в футере). Все отправки формы `/kontakt` сохраняются в `data/leads.json`. На бесплатном Render диск эфемерный — при redeploy данные могут сброситься.

> На бесплатном тарифе сервис «засыпает» без посещений ~15 мин. Первый заход после паузы — 30–60 сек.

В репозитории уже есть `render.yaml` — Render может подхватить настройки автоматически.

---

## Альтернатива: Replit (без GitHub)

1. [replit.com](https://replit.com) → Create Repl → **Node.js**
2. Загрузите архив `workify-deploy.zip` (см. ниже)
3. В Shell: `npm install` → `npm start`
4. Включите **Always On** (если есть) или используйте бесплатный URL Replit

---

## Собрать лёгкий архив для загрузки

```powershell
cd c:\Users\c8\Desktop\coding\workify
powershell -ExecutionPolicy Bypass -File .\scripts\create-deploy-zip.ps1
```

Появится `workify-deploy.zip` (~несколько MB без node_modules).

---

## Что не заливать на хостинг

- `node_modules/` — ставится через `npm install`
- `.tools/` — локальный Node для Windows
- `.env` — секреты только в настройках хостинга
- `workify.zip` 87 MB — пересоберите через скрипт выше

---

## Локальная проверка перед деплоем

```bash
npm install
npm start
```

Откройте `http://localhost:3000`
