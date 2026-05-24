// Single source of truth for all case figures.
// Numbers replicate the analytical memo + appendix calculations.

export const HEADLINE = {
  storesCount: 10,
  storeAreaM2: 180,
  capexPerStoreMln: 17.8,
  capexTotalMln: 178,
  revenueY1Mln: 924,
  ebitdaMarginY1: 7.1,
  ebitdaMarginY5: 8.1,
  npvMln: 8.5,
  irrPct: 22.1,
  dppYears: 4.7,
  breakevenY1Mln: 611,
  safetyMarginPct: 51,
  wacc: 20,
  taxRate: 25,
};

export const SEGMENTS = [
  {
    name: "Soft discounter / магазин у дома с готовой едой",
    short: "Soft discounter + готовая еда",
    score: 4.1,
    verdict: "Выбрать",
    status: "green" as const,
    rationale:
      "Победитель: компактный формат 180 м², акцент на готовую еду и СТМ, плотные жилые районы.",
    criteria: {
      growth: 4.5,
      competition: 4.0,
      unit: 4.0,
      capex: 4.5,
      ops: 3.5,
    },
  },
  {
    name: "Жёсткий дискаунтер",
    short: "Жёсткий дискаунтер",
    score: 3.93,
    verdict: "Не сейчас",
    status: "yellow" as const,
    rationale: "Требует масштаба и логистики уровня Чижика; на 10 магазинах юнит-экономика не закроется.",
    criteria: {
      growth: 5.0,
      competition: 3.0,
      unit: 3.5,
      capex: 4.5,
      ops: 3.5,
    },
  },
  {
    name: "Премиум convenience / здоровое питание",
    short: "Премиум / ЗОЖ",
    score: 3.3,
    verdict: "Узкая ниша",
    status: "yellow" as const,
    rationale: "Высокая маржа, но трафик и LTV ниже; ниша ВкусВилла плотно занята.",
    criteria: {
      growth: 3.5,
      competition: 3.0,
      unit: 3.5,
      capex: 3.0,
      ops: 3.5,
    },
  },
  {
    name: "Классический супермаркет 500+ м²",
    short: "Супермаркет 500+ м²",
    score: 2.55,
    verdict: "Отклонить",
    status: "red" as const,
    rationale: "Формат уходит из СПб (Призма, Карусель, Лэнд); CAPEX и арендный риск растут.",
    criteria: {
      growth: 2.0,
      competition: 2.0,
      unit: 3.0,
      capex: 2.5,
      ops: 3.5,
    },
  },
];

export const SCORING_WEIGHTS = [
  { key: "growth", label: "Потенциал роста", weight: 30 },
  { key: "competition", label: "Конкуренция / окно входа", weight: 25 },
  { key: "unit", label: "Unit-экономика", weight: 25 },
  { key: "capex", label: "CAPEX-эффективность", weight: 10 },
  { key: "ops", label: "Операционный fit", weight: 10 },
];

export const COHORT_STEPS = [
  {
    label: "Новые клиенты",
    value: 5000,
    unit: "/ год",
    note: "посетителей, ставших покупателями",
  },
  {
    label: "Новые repeat",
    value: 2500,
    unit: "/ год",
    note: "клиенты с 3+ визитами за период",
    arrow: { op: "× 50%", caption: "repeat-конверсия" },
  },
  {
    label: "Active repeats",
    value: 7500,
    unit: "база",
    note: "steady-state на магазин",
    arrow: { op: "× 3 года", caption: "lifetime repeat-клиента (36 мес.)" },
  },
  {
    label: "Orders от repeats",
    value: 180000,
    unit: "/ год",
    note: "вся когорта × частота заказов",
    arrow: { op: "× 24 заказа", caption: "2 / месяц × 12 мес." },
  },
  {
    label: "Всего orders",
    value: 182500,
    unit: "/ год",
    note: "база для расчёта выручки",
    arrow: { op: "+ 2 500", caption: "one-time orders" },
  },
];

export const PRODUCT_MIX = [
  { category: "Fresh, готовая еда, выпечка", share: 33, gm: 32, contribution: 10.6, color: "#5eead4" },
  { category: "Молочная гастрономия", share: 12, gm: 28, contribution: 3.4, color: "#22d3ee" },
  { category: "Бакалея и сухие товары", share: 32, gm: 22, contribution: 7.0, color: "#60a5fa" },
  { category: "Non-food (бытхимия, корм)", share: 10, gm: 25, contribution: 2.5, color: "#a78bfa" },
  { category: "Алкоголь и табак (огр.)", share: 5, gm: 18, contribution: 0.9, color: "#fb7185" },
  { category: "СТМ премиум", share: 8, gm: 33, contribution: 2.6, color: "#fbbf24" },
];

export const BLENDED_GM = 27.0;

export const PAYROLL = [
  { role: "Store Manager (директор)", fte: 1, netBonus: 85, loading: 1.4, cost: 1.43 },
  { role: "Assistant Manager", fte: 1, netBonus: 65, loading: 1.4, cost: 1.09 },
  { role: "Cashier", fte: 4, netBonus: 53, loading: 1.4, cost: 3.56 },
  { role: "Stock Associate", fte: 1, netBonus: 58, loading: 1.4, cost: 0.97 },
  { role: "Produce / Prepared Food Specialist", fte: 1, netBonus: 65, loading: 1.4, cost: 1.09 },
];

export const PAYROLL_TOTAL = 8.15;

export const CAPEX_BREAKDOWN = [
  { item: "Ремонт и подготовка помещения", value: 5.4, color: "#5eead4" },
  { item: "Холодильное и торговое оборудование", value: 4.6, color: "#22d3ee" },
  { item: "Стартовый товарный запас (NWC)", value: 4.2, color: "#60a5fa" },
  { item: "Резерв 7%", value: 1.2, color: "#a78bfa" },
  { item: "IT, POS, видеонаблюдение, весы", value: 1.1, color: "#fbbf24" },
  { item: "Вывеска, запуск, маркетинг открытия", value: 0.8, color: "#fb7185" },
  { item: "Pre-opening, подбор и обучение", value: 0.5, color: "#f97316" },
];

// 5-year pilot P&L (mln RUB, full pilot of 10 stores).
// Derived from README mid-case numbers + growth path Y2-Y5: 8/7/6/5%.
export const FIVE_YEAR_PNL = [
  { year: "Y1", revenue: 924, gm: 249.5, ebitda: 65.6, fcf: -120.0, margin: 7.1 },
  { year: "Y2", revenue: 998, gm: 269.5, ebitda: 74.8, fcf: 46.0, margin: 7.5 },
  { year: "Y3", revenue: 1068, gm: 288.4, ebitda: 82.3, fcf: 55.0, margin: 7.7 },
  { year: "Y4", revenue: 1132, gm: 305.6, ebitda: 89.4, fcf: 62.0, margin: 7.9 },
  { year: "Y5", revenue: 1189, gm: 321.0, ebitda: 96.3, fcf: 68.5, margin: 8.1 },
];

export const SCENARIOS = [
  {
    id: "base",
    name: "Base case (consensus)",
    tone: "positive" as const,
    drivers: [
      "Прогноз 2026: food-retail +6,6% (Альфа)",
      "ФОТ +7%/год",
      "Готовая еда работает",
    ],
    npv: 8.5,
    irr: 22.1,
    dpp: 4.7,
    dppLabel: "4,7 года",
  },
  {
    id: "stagflation",
    name: "Stagflation drag",
    tone: "negative" as const,
    drivers: [
      "Жёсткая ДКП дольше",
      "Реальные доходы стагнируют",
      "ФОТ +10%; маржа −1,5 п.п.; трафик −8%",
      "Рост −2 п.п./год",
    ],
    npv: -97.4,
    irr: -9.3,
    dpp: null,
    dppLabel: "не окупается",
  },
  {
    id: "easing",
    name: "Easing cycle",
    tone: "positive" as const,
    drivers: [
      "Ускоренное смягчение ДКП",
      "Реальная з/п +5%",
      "Средний чек +5%; маржа +1,5 п.п.",
      "Рост +2 п.п./год",
    ],
    npv: 88.8,
    irr: 39.5,
    dpp: 3.1,
    dppLabel: "3,1 года",
  },
  {
    id: "discount_race",
    name: "Discount race (sectoral)",
    tone: "negative" as const,
    drivers: [
      "Хард-дискаунтеры давят (+50%/+31% в 1П2025)",
      "Price match",
      "Маржа −2 п.п.; трафик −5%",
    ],
    npv: -62.3,
    irr: 3.4,
    dpp: null,
    dppLabel: "не окупается",
  },
];

// 5x5 sensitivity matrix: rows = GM delta (п.п.), cols = revenue multiplier.
export const SENSITIVITY_REVENUE_AXIS = [0.9, 0.95, 1.0, 1.05, 1.1];
export const SENSITIVITY_GM_AXIS = [-1.5, -0.5, 0.0, 0.5, 1.5];
export const SENSITIVITY_NPV: number[][] = [
  [-73, -51, -28, -6, 17],
  [-51, -28, -4, 20, 44],
  [-40, -16, 9, 33, 57],
  [-29, -4, 21, 46, 71],
  [-7, 19, 45, 71, 98],
];

export const PEERS = [
  {
    name: "Лента (группа) 2024",
    short: "Лента",
    area: 687,
    density: 372,
    gm: 21.7,
    ebitda: 7.7,
    ebitdaNote: "Q4'24: 8,1%",
    group: "benchmark" as const,
  },
  { name: "Лента - Монетка (у дома)", short: "Монетка", area: 272, density: 346, gm: null, ebitda: null, group: "peer" as const },
  { name: "X5 - Пятёрочка (у дома)", short: "Пятёрочка", area: 300, density: 422, gm: 24, ebitda: 6.5, ebitdaNote: "сегм. ~6-7%", group: "peer" as const },
  { name: "X5 - Чижик (хард-дискаунтер)", short: "Чижик", area: 350, density: null, gm: null, ebitda: 0, ebitdaNote: "~0%", group: "peer" as const },
  { name: "Магнит (группа) 2024", short: "Магнит", area: 250, density: 280, gm: null, ebitda: 5.5, group: "peer" as const },
  { name: "ВкусВилл (с дарксторами)", short: "ВкусВилл", area: 150, density: null, gm: null, ebitda: 5, ebitdaNote: "оценка", group: "peer" as const },
  { name: "О'КЕЙ - гипермаркеты 2024", short: "О'КЕЙ", area: 5500, density: null, gm: null, ebitda: 9.1, group: "peer" as const },
  { name: "Пилот XYZ - Y1", short: "Пилот Y1", area: 180, density: 513, gm: 27, ebitda: 7.1, group: "pilot" as const },
  { name: "Пилот XYZ - Y5 (зрелая фаза)", short: "Пилот Y5", area: 180, density: 705, gm: 27, ebitda: 8.1, group: "pilot" as const },
];

export const GO_NO_GO = [
  {
    title: "Трафик на магазин",
    threshold: "≥ 480 чеков/день",
    horizon: "к 6-му месяцу",
    why: "Ниже → выручка −10% от плана, NPV в минус",
    icon: "Users",
    tone: "cyan" as const,
  },
  {
    title: "Валовая маржа",
    threshold: "≥ 25%",
    horizon: "стабильно",
    why: "Ниже → GM −1,5 п.п. от базы 27%, NPV в минус",
    icon: "Percent",
    tone: "green" as const,
  },
  {
    title: "Аренда",
    threshold: "≤ 2,5 тыс. ₽/м²/мес.",
    horizon: "контракт",
    why: "Выше → EBITDA не дотягивает до целевых 7%",
    icon: "Building2",
    tone: "amber" as const,
  },
  {
    title: "CAPEX",
    threshold: "≤ 20 млн ₽/магазин",
    horizon: "вкл. резерв",
    why: "Выше → каждые +10% CAPEX обнуляют NPV",
    icon: "Hammer",
    tone: "violet" as const,
  },
  {
    title: "ФОТ",
    threshold: "≤ 9 млн ₽/магазин/год",
    horizon: "Y1",
    why: "Выше → индексация ФОТ съедает EBITDA уже в Y1",
    icon: "Wallet",
    tone: "rose" as const,
  },
];

export const ASSUMPTIONS = [
  { key: "Площадь магазина", value: "180 м²" },
  { key: "Аренда", value: "2 200 ₽/м²/мес. (СПб)" },
  { key: "Индексация аренды", value: "5% / год" },
  { key: "Индексация ФОТ", value: "7% / год" },
  { key: "Maintenance CAPEX", value: "1% выручки с Y2" },
  { key: "ΔNWC", value: "2% от прироста выручки" },
  { key: "Налог на прибыль", value: "25%" },
  { key: "WACC", value: "20%" },
  { key: "Рост выручки Y2–Y5", value: "8% / 7% / 6% / 5%" },
  { key: "Ramp-up Y1", value: "3 мес. линейно, фактор 93,75%" },
  { key: "Средний чек", value: "540 ₽" },
  { key: "Loading ФОТ", value: "1,40 (НДФЛ 13% + взносы ~30%)" },
];

export const SOURCES = [
  {
    name: "Совкомбанк - Рынок продуктового ритейла",
    use: "Объём рынка 26,5 трлн ₽; плотность X5 367,5 тыс. ₽/м²; LFL-динамика лидеров",
    type: "PDF",
  },
  {
    name: "Альфа-Банк - Российский ритейл и Ecom 2026 (март 2026)",
    use: "Прогноз 2026: food-retail +6,6%; FMCG +7-7,5%; e-grocery +21%; фокус на готовую еду",
    type: "PDF · OCR",
  },
  {
    name: "Нильсен - FMCG 2025",
    use: "Демография; индекс оптимизма 106; СПб 48% соло-домохозяйств; готовая еда +30%",
    type: "PDF",
  },
  {
    name: "ДРС - Локтев",
    use: "СПб среднедушевой доход 71,9 тыс. ₽/мес. (+19,6% г/г); 38% бюджета на FMCG",
    type: "PDF",
  },
  {
    name: "Аналитика индустрии Food Retail (Яндекс / INFOLine)",
    use: "Прогноз food retail 30 трлн ₽ в 2025; доля онлайн 4,8%; рост дискаунтеров",
    type: "PDF",
  },
  {
    name: "Росстат / Петростат / mojgorod.ru",
    use: "Оборот розничной торговли СПб 2,908 трлн ₽ (2024); доля food 35,3%",
    type: "Open",
  },
  {
    name: "РБК Петербург + AVG Недвижимость",
    use: "Сокращение продуктовых магазинов в СПб (−10% в 2024, −22% к декабрю 2025)",
    type: "Open",
  },
  {
    name: "Fontanka / NF Group",
    use: "Уход гипермаркетов (Призма, Карусель, Лэнд) из СПб",
    type: "Open",
  },
  {
    name: "Retail.ru / INFOLine 2024-2025",
    use: "Динамика форматов, доля дискаунтеров",
    type: "Open",
  },
  {
    name: "ЦИАН / Яндекс Недвижимость",
    use: "Ставки аренды торговых помещений СПб 1,5-3,5 тыс. ₽/м²/мес.",
    type: "Open",
  },
  {
    name: "Dream Job / Авито Работа",
    use: "Зарплаты ритейла СПб (+24-42% г/г)",
    type: "Open",
  },
  {
    name: "Ведомости + smartlab.news - X5 МСФО 2024",
    use: "Выручка 3,908 трлн ₽, EBITDA margin 6,4%, LFL +14,4%",
    type: "Open",
  },
  {
    name: "МКПАО Лента МСФО 2024",
    use: "Выручка 888,3 млрд ₽, EBITDA 68,1 млрд ₽ (7,7%), Монетка 271,6 млрд ₽",
    type: "Open",
  },
];

