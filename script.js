/* ============================================================
   Нұртас Оңдасынов — сайт логикасы
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Навигация ---------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  navLinks.forEach(link => link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
  }));

  /* Белсенді сілтемені белгілеу (scroll-spy) */
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  });

  /* ---------- 2. Хронология сүзгісі ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const tlItems = document.querySelectorAll(".tl-item");

  filterBtns.forEach(btn => btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    tlItems.forEach(item => {
      const show = (f === "all" || item.dataset.period === f);
      item.classList.toggle("hidden", !show);
    });
  }));

  /* ---------- 3. Галерея лайтбоксы ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightboxContent");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const ph = item.querySelector(".gallery-ph");
      const img = item.querySelector("img");
      if (img) {
        lightboxContent.innerHTML = `<img src="${img.src}" alt="" style="max-width:88vw;max-height:84vh;border-radius:12px" />`;
      } else if (ph) {
        lightboxContent.innerHTML = `<div>${ph.firstChild.textContent}</div><span>${ph.querySelector("span").textContent}</span>`;
      }
      lightbox.classList.add("open");
    });
  });
  const closeLb = () => lightbox.classList.remove("open");
  lightboxClose.addEventListener("click", closeLb);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLb(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

  /* ---------- 4. Scroll-reveal анимациясы ---------- */
  const revealEls = document.querySelectorAll(
    ".legacy-card, .work-card, .fact-card, .library-item, .gallery-item, .tl-item"
  );
  revealEls.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  /* ============================================================
     5. ЖИ ЧАТ-БОТ  (кілт сөздерге негізделген, қазақ тілінде)
     ============================================================ */
  const chatWindow = document.getElementById("chatWindow");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chips = document.querySelectorAll("#chatSuggestions .chip");

  // Білім базасы: {кілт сөздер, жауап}
  const knowledge = [
    {
      keys: ["кім", "ол кім", "танысты", "жалпы", "өмірбаян", "кто"],
      answer: "Нұртас Дәндібайұлы Оңдасынов (1904–1989) — қазақтың көрнекті мемлекет әрі қоғам қайраткері, ғалым-сөздіктанушы. Ол Қазақ КСР үкіметін басқарып, кейін қазақ тіліндегі араб-парсы сөздерін зерттеуге арнаған түсіндірме сөздіктер құрастырды."
    },
    {
      keys: ["туған", "қашан туды", "туылды", "дүниеге", "туған күн", "туған жер"],
      answer: "Нұртас Оңдасынов 1904 жылы 26 қазанда Түркістан өңіріндегі Үшқайық ауылында қарапайым шаруа отбасында дүниеге келген."
    },
    {
      keys: ["сөздік", "еңбек", "кітап", "туынды", "жазды", "шығарма", "арабша", "парсыша"],
      answer: "Негізгі еңбектері: «Арабша-қазақша түсіндірме сөздік» (1969), «Парсыша-қазақша түсіндірме сөздік» (1974), «Араб текті қазақ есімдері», сондай-ақ «Арабша-қазақша түсіндірме сөздіктің» көп томдық басылымы (1984, 1989, 2011)."
    },
    {
      keys: ["қызмет", "лауазым", "басқар", "үкімет", "төраға", "жұмыс", "саяси"],
      answer: "Атқарған қызметтері: Қазақ КСР Халық Комиссарлары Кеңесінің төрағасы — үкімет басшысы (1938–1951), Қазақ КСР Жоғарғы Кеңесі Төралқасының төрағасы (1954), КСРО Жоғарғы Кеңесі Төралқасы төрағасының орынбасары, Гурьев (Атырау) облыстық партия комитетінің бірінші хатшысы (1957–1962)."
    },
    {
      keys: ["мұра", "үлес", "маңыз", "рухани", "құндылық", "наследие"],
      answer: "Мұрасы: қазақ тілін сақтау мен дамыту, түсіндірме сөздіктер жасау, ұлттық мәдениет пен өнерді қолдау, 1946 жылы Қазақ КСР Ғылым академиясын құруға атсалысу. Ол ана тілін құрметтеу мен халыққа адал қызмет етуді өнеге етіп қалдырды."
    },
    {
      keys: ["қайтыс", "өлді", "дүниеден", "жерлен", "өмірден", "қаза"],
      answer: "Нұртас Оңдасынов 1989 жылы 1 қарашада Мәскеу қаласында 85 жасында дүниеден өтті. Туған жері Түркістанға жерленді."
    },
    {
      keys: ["білім", "оқыды", "оқу", "техникум", "институт", "мектеп"],
      answer: "Білімі: Ташкенттегі №14 мектеп-интернатта, кейін Ташкент орман шаруашылығы техникумында (1923–1927) және Ташкенттегі Ирригация институтында (1930–1934) оқыды."
    },
    {
      keys: ["ғылым", "академия", "ғалым"],
      answer: "1946 жылы Қазақ КСР Ғылым академиясының құрылуына белсене атсалысты әрі ғылым мен білімнің дамуын ел болашағы үшін маңызды деп санап, ұлттық мамандарды даярлауға көңіл бөлді."
    },
    {
      keys: ["тіл", "ана тіл", "қазақ тіл"],
      answer: "Нұртас Оңдасынов қазақ тілінің байлығын зерттеп, сөздік қорын жүйеледі. «Ана тілдің даму қамы — ортақ міндет» деген қағиданы ұстанды."
    },
    {
      keys: ["рахмет", "рақмет", "сау бол", "сәлем", "саламатсыз", "ассалаумаға"],
      answer: "Қуана көмектесемін! Нұртас Оңдасынов туралы тағы бір нәрсе білгіңіз келсе, сұрай беріңіз. 😊"
    }
  ];

  const fallback = "Кешіріңіз, бұл сұрақ бойынша нақты ақпаратым жоқ. Нұртас Оңдасыновтың өмірбаяны, сөздіктері, қызметі немесе мұрасы туралы сұрап көріңіз.";

  function getAnswer(text) {
    const q = text.toLowerCase();
    let best = null, bestScore = 0;
    knowledge.forEach(item => {
      let score = 0;
      item.keys.forEach(k => { if (q.includes(k)) score++; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    return best ? best.answer : fallback;
  }

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "chat-msg " + sender;
    msg.innerHTML = `
      <div class="chat-avatar">${sender === "bot" ? "🤖" : "🙂"}</div>
      <div class="chat-bubble">${text}</div>`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function botRespond(question) {
    // "теру" индикаторы
    const typing = document.createElement("div");
    typing.className = "chat-msg bot";
    typing.innerHTML = `<div class="chat-avatar">🤖</div>
      <div class="chat-bubble typing"><span></span><span></span><span></span></div>`;
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage(getAnswer(question), "bot");
    }, 700);
  }

  function handleQuestion(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    botRespond(text);
  }

  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    handleQuestion(chatInput.value);
    chatInput.value = "";
  });

  chips.forEach(chip => chip.addEventListener("click", () => {
    handleQuestion(chip.textContent);
  }));
   <script>
(function () {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;

  var imgs = Array.prototype.slice.call(grid.querySelectorAll('img'));
  var current = 0, lastFocus = null;

  // Wrap every image in a button (keyboard + screen reader friendly)
  imgs.forEach(function (img, i) {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'gallery-item';
  btn.setAttribute('aria-label', (img.alt || 'Сурет ' + (i + 1)) + ' – үлкейту');
  img.parentNode.insertBefore(btn, img);
  btn.appendChild(img);

  if (img.alt) {
    var cap = document.createElement('span');
    cap.className = 'gallery-cap';
    cap.textContent = img.alt;
    btn.appendChild(cap);
  }
  btn.addEventListener('click', function () { open(i, btn); });
});

  // Build lightbox
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Галерея');
  lb.innerHTML =
    '<button class="lb-close" aria-label="Жабу">&times;</button>' +
    '<button class="lb-prev" aria-label="Алдыңғы">&#8249;</button>' +
    '<figure class="lb-figure"><img class="lb-img" alt="">' +
    '<figcaption class="lb-count"></figcaption></figure>' +
    '<button class="lb-next" aria-label="Келесі">&#8250;</button>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector('.lb-img');
  var lbCount = lb.querySelector('.lb-count');

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[current].currentSrc || imgs[current].src;
    lbImg.alt = imgs[current].alt;
    lbCount.textContent = (imgs[current].alt ? imgs[current].alt + ' · ' : '') +
      (current + 1) + ' / ' + imgs.length;
  }
  function open(i, trigger) {
    lastFocus = trigger;
    show(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Swipe on phones
  var startX = null;
  lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
</script>

  /* ---------- 6. Жыл автоматты түрде футерде ---------- */
  // (қазірше статикалық, қажет болса өзгертуге болады)
});
