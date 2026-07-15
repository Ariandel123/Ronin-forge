// EN / UK dictionaries. Component text pulls from t = translations[lang].
export const translations = {
  en: {
    nav: { collection: 'Collection', path: 'The Path', anatomy: 'Anatomy', craft: 'Craft', order: 'Order' },
    hero: {
      eyebrow: 'HAND-FORGED · TAMAHAGANE STEEL',
      line1: 'MASTER', line2: 'THE', line3: 'BLADE',
      sub: 'Authentic Japanese katana, folded and clay-tempered by hand. One smith. One blade. One spirit.',
      hudScroll: 'SCROLL ↓',
    },
    path: {
      index: '◇ THE PATH',
      title: 'From fire to your hands',
      steps: [
        { n: '01', title: 'CHOOSE THE BLADE', body: 'Browse the forged collection. Each katana lists its steel, hardness, and hamon — pick the one whose spirit matches yours.' },
        { n: '02', title: 'FORGE TO ORDER', body: 'A master smith folds, clay-tempers and polishes your blade by hand. Choose the tsuka wrap, saya lacquer and tsuba fittings.' },
        { n: '03', title: 'DELIVERED WORLDWIDE', body: 'Your katana ships insured in a paulownia box with an authenticity certificate. Slow craft, safely to your door.' },
      ],
    },
    catalog: {
      index: '◇ THE COLLECTION',
      title: 'Four blades\nFour spirits',
      steel: 'STEEL', hardness: 'HARDNESS', nagasa: 'NAGASA', hamon: 'HAMON',
      forge: 'Forge this →', placeholder: 'PLACEHOLDER',
      subtitles: { ryu: 'Dragon', yuki: 'Snow', kaen: 'Flame', kage: 'Shadow' },
    },
    anatomy: {
      index: '◇ ANATOMY OF THE BLADE',
      title: 'Every part\nhas a name',
      parts: [
        'the tip — where geometry decides the cut',
        'the temper line, drawn in clay and fire',
        'the ridge that carries the blade’s light',
        'the guard — the smith’s quiet signature',
        'the handle, wrapped in silk over rayskin',
        'the scabbard, lacquered to hold the calm',
      ],
    },
    craft: {
      quote: 'To master the sword is to master the self. A blade is only as calm as the hand that forged it.',
      blocks: [
        { ch: 'CH. 01 — STEEL', body: 'We start with tamahagane smelted in a tatara furnace, then fold the billet up to sixteen times. Each fold halves impurity and doubles the layers you can read in the grain.' },
        { ch: 'CH. 02 — FIRE', body: 'Clay is painted along the spine before quenching. The edge cools faster than the back, and the hamon — that temper line — is born where hard meets soft.' },
        { ch: 'CH. 03 — POLISH', body: 'Weeks of hand-polishing on graded stones reveal the blade’s true surface. Nothing is added. Everything is uncovered.' },
      ],
    },
    cta: {
      title: 'Your katana awaits',
      sub: 'Commission a katana forged to your hand. Consultation is free.',
      btn: 'Start a commission',
    },
    footer: {
      collection: 'COLLECTION', house: 'HOUSE', contact: 'CONTACT',
      craft: 'The Craft', path: 'The Path', anatomy: 'Anatomy',
      atelier: 'Kyoto Atelier',
      base1: '© 2026 RONIN FORGE · KYOTO', base2: '浪 HAND-FORGED · JS-LIGHT · CSS-FIRST',
    },
    modal: {
      index: '◇ COMMISSION',
      titleDefault: 'Start a commission',
      titleForge: (name) => `Forge the ${name}`,
      name: 'Your name', email: 'Email',
      message: 'Tell us about the blade you imagine…',
      send: 'Send request',
      sending: 'Sending…',
      note: 'We usually reply within one business day.',
      successTitle: 'Request received',
      successMsg: 'Thank you — a master smith will be in touch shortly.',
      errorMsg: 'Something went wrong. Please try again.',
      retry: 'Try again',
    },
  },

  uk: {
    nav: { collection: 'Колекція', path: 'Шлях', anatomy: 'Анатомія', craft: 'Ремесло', order: 'Замовити' },
    hero: {
      eyebrow: 'РУЧНЕ КУВАННЯ · СТАЛЬ ТАМАХАГАНЕ',
      line1: 'ОПАНУЙ', line2: 'СВІЙ', line3: 'КЛИНОК',
      sub: 'Автентична японська катана, згорнута й загартована в глині вручну. Один коваль. Один клинок. Один дух.',
      hudScroll: 'ГОРТАЙ ↓',
    },
    path: {
      index: '◇ ШЛЯХ',
      title: 'Від вогню до твоїх рук',
      steps: [
        { n: '01', title: 'ОБЕРИ КЛИНОК', body: 'Переглянь ковану колекцію. Кожна катана має сталь, твердість і хамон — обери ту, чий дух співзвучний твоєму.' },
        { n: '02', title: 'КУВАННЯ НА ЗАМОВЛЕННЯ', body: 'Майстер-коваль вручну згортає, гартує в глині та полірує твій клинок. Обери обмотку цука, лак сая та гарду цуба.' },
        { n: '03', title: 'ДОСТАВКА ПО СВІТУ', body: 'Катана їде застрахованою в коробці з павловнії із сертифікатом автентичності. Повільне ремесло — безпечно до твоїх дверей.' },
      ],
    },
    catalog: {
      index: '◇ КОЛЕКЦІЯ',
      title: 'Чотири клинки\nЧотири духи',
      steel: 'СТАЛЬ', hardness: 'ТВЕРДІСТЬ', nagasa: 'НАҐАСА', hamon: 'ХАМОН',
      forge: 'Викувати →', placeholder: 'ПЛЕЙСХОЛДЕР',
      subtitles: { ryu: 'Дракон', yuki: 'Сніг', kaen: 'Полумʼя', kage: 'Тінь' },
    },
    anatomy: {
      index: '◇ АНАТОМІЯ КЛИНКА',
      title: 'Кожна частина\nмає імʼя',
      parts: [
        'вістря — де геометрія вирішує різ',
        'лінія гарту, намальована глиною й вогнем',
        'ребро, що несе світло клинка',
        'гарда — тихий підпис коваля',
        'руківʼя, обмотане шовком по шкірі ската',
        'піхви, вкриті лаком, що тримає спокій',
      ],
    },
    craft: {
      quote: 'Опанувати меч — означає опанувати себе. Клинок спокійний рівно настільки, наскільки спокійна рука, що його кувала.',
      blocks: [
        { ch: 'РОЗДІЛ 01 — СТАЛЬ', body: 'Ми починаємо з тамахагане, виплавленої в печі татара, і згортаємо заготовку до шістнадцяти разів. Кожен згин удвічі зменшує домішки та подвоює шари, які читаються у візерунку.' },
        { ch: 'РОЗДІЛ 02 — ВОГОНЬ', body: 'Перед гартуванням уздовж обуха наносять глину. Лезо холоне швидше за спинку — і хамон, ця лінія гарту, народжується там, де тверде зустрічає мʼяке.' },
        { ch: 'РОЗДІЛ 03 — ПОЛІРУВАННЯ', body: 'Тижні ручного полірування на каменях різної зернистості відкривають справжню поверхню клинка. Нічого не додається. Все лише відкривається.' },
      ],
    },
    cta: {
      title: 'Твоя катана чекає',
      sub: 'Замов катану, викувану під твою руку. Консультація безкоштовна.',
      btn: 'Почати замовлення',
    },
    footer: {
      collection: 'КОЛЕКЦІЯ', house: 'ДІМ', contact: 'КОНТАКТИ',
      craft: 'Ремесло', path: 'Шлях', anatomy: 'Анатомія',
      atelier: 'Ательє в Кіото',
      base1: '© 2026 RONIN FORGE · КІОТО', base2: '浪 РУЧНЕ КУВАННЯ · JS-LIGHT · CSS-FIRST',
    },
    modal: {
      index: '◇ ЗАМОВЛЕННЯ',
      titleDefault: 'Почати замовлення',
      titleForge: (name) => `Викувати ${name}`,
      name: 'Твоє імʼя', email: 'Email',
      message: 'Розкажи, який клинок ти уявляєш…',
      send: 'Надіслати запит',
      sending: 'Надсилаємо…',
      note: 'Зазвичай відповідаємо протягом одного робочого дня.',
      successTitle: 'Заявку отримано',
      successMsg: 'Дякуємо — майстер-коваль звʼяжеться з тобою найближчим часом.',
      errorMsg: 'Щось пішло не так. Спробуй ще раз.',
      retry: 'Спробувати ще раз',
    },
  },
}
