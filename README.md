# XYZ Store · Interactive Dashboard

Интерактивный дашборд для кейса «Пилот продуктового ритейла XYZ в
Санкт-Петербурге» - та же аналитическая записка и приложение с расчётами,
но в формате кликабельного high-tech дашборда: NPV / IRR / DPP-счётчики,
сегментный светофор, концепт-галерея, чувствительность, сценарии,
peer-сравнение, stage-gate.

## Стек

- **Vite + React 18 + TypeScript** - статичный SPA
- **Tailwind CSS** - дизайн-система (тёмная тема + glassmorphism)
- **Framer Motion** - анимации появления, hover, layout
- **Recharts** - графики (pie, bar, radar, composed, scatter)
- **Lucide-react** - иконки

## Локальный запуск

```bash
npm install
npm run dev          # http://localhost:5173
```

Билд:

```bash
npm run build        # → ./dist
npm run preview      # http://localhost:4173
```

## Деплой на Render

В репозитории есть `render.yaml` (Blueprint). Шаги:

1. Запушить репо на GitHub.
2. Зайти на [Render Dashboard](https://dashboard.render.com) → **New → Blueprint** → выбрать репо.
3. Render автоматически прочитает `render.yaml` и создаст **Static Site**
   со следующими настройками:
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `./dist`
   - SPA-rewrite: `/* → /index.html`
4. Нажать **Apply** - через 1-2 минуты будет live URL вида
   `https://xyz-store.onrender.com`.

Альтернативно - вручную: **New → Static Site** → подключить репо →
указать те же Build / Publish, добавить rewrite `/* → /index.html`.

## Структура

```
xyz-store/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── render.yaml
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── data/
    │   └── caseData.ts        ← все цифры из README/записки
    └── components/
        ├── AnimatedNumber.tsx
        ├── Section.tsx
        ├── Navigation.tsx     ← sticky-навигация
        ├── Hero.tsx           ← счётчики NPV/IRR/DPP/CAPEX
        ├── Recommendation.tsx ← headline + риски
        ├── Segments.tsx       ← светофор + радар
        ├── FinancialModel.tsx ← 6 вкладок: когорта/mix/ФОТ/CAPEX/P&L/допущения
        ├── Scenarios.tsx      ← 4 макросценария
        ├── SensitivityMatrix.tsx ← 5×5 heatmap NPV
        ├── Peers.tsx          ← peer-сравнение
        ├── StageGate.tsx      ← 5 порогов go/no-go
        ├── Sources.tsx        ← источники, ИИ, итерации
        └── Footer.tsx
```

## Что внутри

| Секция | Что показывает |
|---|---|
| Hero | Анимированные счётчики ключевых метрик (NPV, IRR, DPP, CAPEX) |
| Recommendation | Headline-рекомендация + риски + защитный механизм |
| Segments | 4 сегмента, балльная оценка, переключаемая radar-диаграмма |
| Financial Model | 6 вкладок: cohort funnel, product mix donut, payroll, CAPEX bar, 5Y P&L, assumptions |
| Scenarios | 4 макросценария с переключением и mini bar chart NPV |
| Sensitivity | 5×5 heatmap NPV (выручка × маржа), интерактивная |
| Peers | Bubble chart площадь×плотность + таблица 9 ритейлеров |
| Stage-gate | 5 порогов go/no-go с цветовой кодировкой |
| Sources | 13 источников с фильтром + ИИ-disclosure + 8 итераций |

Все цифры - single source of truth в `src/data/caseData.ts` и
соответствуют корневому `README.md` / Excel-модели / записке.
