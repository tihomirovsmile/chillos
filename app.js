(() => {
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  };
  const clamp = (n,a,b) => Math.max(a, Math.min(b,n));
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const now = () => performance.now();

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // Elements
  const bootRoot = $("bootRoot");
  const biosPost = $("biosPost");
  const biosPostTitle = $("biosPostTitle");
  const biosPostLog = $("biosPostLog");
  const biosMenu = $("biosMenu");
  const biosNav = $("biosNav");
  const biosEditor = $("biosEditor");
  const biosPanelTitle = $("biosPanelTitle");
  const biosApply = $("biosApply");
  const biosSave = $("biosSave");
  const biosDownload = $("biosDownload");
  const biosReset = $("biosReset");
  const biosExit = $("biosExit");

  const stageLogo = $("stageLogo");
  const bootLogoImg = $("bootLogoImg");
  const stageLogoName = $("stageLogoName");
  const stageBlue = $("stageBlue");
  const stageBlueTitle = $("stageBlueTitle");

  const userCss = $("userCss");

  const bsod = $("bsod");
  const bsodType = $("bsodType");
  const bsodMsg  = $("bsodMsg");
  const bsodSrc  = $("bsodSrc");
  const bsodTrace = $("bsodTrace");
  const bsodCopy = $("bsodCopy");
  const bsodReboot = $("bsodReboot");

  const desktop = $("desktop");
  const wallA = $("wallA");
  const wallB = $("wallB");
  const watermark = $("watermark");
  const iconLayer = $("iconLayer");
  const selectionBox = $("selectionBox");
  const windowLayer = $("windowLayer");

  const startBtn = $("startBtn");
  const startIconImg = $("startIconImg");
  const startMenu = $("startMenu");
  const startSearch = $("startSearch");
  const startGrid = $("startGrid");
  const startBadge = $("startBadge");

  const ctxMenu = $("ctxMenu");
  const taskApps = $("taskApps");
  const taskHover = $("taskHover");
  const taskCenterWrap = $("taskCenterWrap");

  const fsBtn = $("fsBtn");
  const powerBtn = $("powerBtn");
  const clock = $("clock");

  // Keys
  const SETTINGS_OVR_KEY = "chillos_settings_override_v085";
  const CSS_OVR_KEY = "chillos_css_override_v085";
  const WP_OVR_KEY = "chillos_wallpaper_selected_v085";
  const ICON_POS_KEY = "chillos_desktop_icon_pos_v085";

  // Version / repo
  const META = {
    version: "0.8.5-alpha",
    channel: "Alpha (pre-release)",
    repo: "https://github.com/tihomirovsmile/chillos"
  };

  // Defaults (fallback)
  const defaults = {
    system: {
      osName: "ChillOS",
      testWatermark: "ChillOS версии 0.8.5-alpha (кодовое название: Journey)",
      boot: {
        autoFullscreen: true,
        keepFullscreenOnReboot: true,
        biosSeconds: 2.6,
        biosPostLines: 18,
        biosTypingMs: 18,
        logoUrl: "./chillos/icons/start.png",
        fallbackLogoUrl: "./chillos/icons/start.png",
        logoStageSeconds: 1.5,
        blueStageSeconds: 3.0,
        rebootSeconds: 10,
        language: "ru"
      },
      sounds: {
        welcome: "./chillos/sounds/welcome.mp3",
        goodbye: "./chillos/sounds/goodbye.mp3"
      },
      ui: {
        fontFamily: "Google Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        accent: "#7cf0c5",
        theme: "dark",
        wallpaperFadeMs: 520,
        windowOpenMs: 200,
        taskIconSize: 22,
        startIconSize: 20,
        desktopGrid: { enabled:true, cell:96, padding:18 }
      },
      features: {
        desktopSelection: true,
        desktopDragIcons: true,
        taskbarHoverMenu: true
      }
    },
    wallpapers: {
      default: "relaxzone",
      wallpapers: [
        { id:"relaxzone", name:"Relax Zone", url:"./chillos/wallpapers/relaxzone.png" },
        { id:"anime1", name:"Anime 1", url:"./chillos/wallpapers/anime1.jpg" },
        { id:"anime2", name:"Anime 2", url:"./chillos/wallpapers/anime2.jpg" },
        { id:"anime3", name:"Anime 3", url:"./chillos/wallpapers/anime3.jpg" },
        { id:"anime4", name:"Anime 4", url:"./chillos/wallpapers/anime4.jpg" },
        { id:"undertale1", name:"Undertale", url:"./chillos/wallpapers/undertale1.png" },
        { id:"sonic1", name:"Sonic the Hedgehog", url:"./chillos/wallpapers/sonic1.jpg" },
        { id:"sonic2", name:"Funny", url:"sonic2.jpg" }
      ]
    },
    apps: {
      startIcon: "./chillos/icons/start.png",
      apps: [
        { id:"settings", name:"Параметры", icon:"./chillos/icons/settings.png" },
        { id:"wallpapers", name:"Обои", icon:"./chillos/icons/wallpapers.png" },
        { id:"notes", name:"Заметки", icon:"./chillos/icons/notes.png" },
        { id:"about", name:"О системе", icon:"./chillos/icons/about.png" }
      ],
      desktop: [
        { appId:"settings", x:24, y:24 },
        { appId:"wallpapers", x:24, y:128 },
        { appId:"notes", x:24, y:232 },
        { appId:"about", x:24, y:336 }
      ]
    }
  };

  // State
  const state = {
    cfg: structuredClone(defaults),
    wallFront: "A",
    z: 30,
    wins: new Map(), // id -> {el, taskEl, minimized}
    activeWin: null,

    iconEls: new Map(),
    selectedIcons: new Set(),
    dragIcons: null,

    selecting: false,
    selStart: null,

    biosTab: "system"
  };

  // Toast
  function toast(msg){
    const t = $("toast");
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => t.style.opacity = "0", 1400);
  }

  function downloadText(filename, text){
    const blob = new Blob([text], { type:"text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Merge
  function deepMerge(base, patch){
    if (!patch || typeof patch !== "object") return base;
    if (Array.isArray(base) || Array.isArray(patch)) return patch;
    const out = { ...base };
    for (const k of Object.keys(patch)){
      const bv = base?.[k];
      const pv = patch[k];
      out[k] = (bv && typeof bv === "object" && !Array.isArray(bv)) ? deepMerge(bv, pv) : pv;
    }
    return out;
  }

  function readOverrides(){
    try{
      const raw = localStorage.getItem(SETTINGS_OVR_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  }

  function applyCssOverrides(){
    const css = localStorage.getItem(CSS_OVR_KEY) || "";
    userCss.textContent = css;
  }

  function applySystemToCssVars(){
    const r = document.documentElement;
    const ui = state.cfg.system.ui || {};
    r.style.setProperty("--accent", ui.accent || "#7cf0c5");
    r.style.setProperty("--wallFadeMs", (ui.wallpaperFadeMs || 520) + "ms");
    r.style.setProperty("--winOpenMs", (ui.windowOpenMs || 200) + "ms");
    r.style.setProperty("--font", ui.fontFamily || defaults.system.ui.fontFamily);
    r.style.setProperty("--taskIconPx", (ui.taskIconSize ?? 22) + "px");
    r.style.setProperty("--startIconPx", (ui.startIconSize ?? 20) + "px");
  }

  // Strict local wallpaper rule
  function normalizeWallpapers(wcfg){
    const allowedPrefix = "./chillos/wallpapers/";
    const list = (wcfg?.wallpapers || []).filter(w => typeof w.url === "string" && w.url.startsWith(allowedPrefix));
    const out = { ...wcfg, wallpapers: list };
    // ensure default exists
    if (!list.find(x => x.id === out.default)) out.default = list[0]?.id || "relaxzone";
    return out;
  }

  async function fetchJson(url){
    const bust = url.includes("?") ? "&" : "?";
    const res = await fetch(url + bust + "t=" + Date.now(), { cache:"no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  }

  async function loadConfigStrict(){
    let system = defaults.system;
    let wallpapers = defaults.wallpapers;
    let apps = defaults.apps;

    try{
      system = await fetchJson("./chillos/settings/system.json");
      wallpapers = await fetchJson("./chillos/settings/wallpapers.json");
      apps = await fetchJson("./chillos/settings/apps.json");
    } catch {
      // Если file:// — fetch может быть заблокирован. Fallback остаётся.
      toast("JSON не загрузился (возможно file://). Использую встроенный fallback.");
    }

    // force local wallpapers only
    wallpapers = normalizeWallpapers(wallpapers);

    const ovr = readOverrides();
    state.cfg = {
      system: deepMerge(system, ovr?.system || null),
      wallpapers: normalizeWallpapers(deepMerge(wallpapers, ovr?.wallpapers || null)),
      apps: deepMerge(apps, ovr?.apps || null)
    };

    applySystemToCssVars();
    applyCssOverrides();

    watermark.textContent = state.cfg.system.testWatermark || "";
    startIconImg.src = state.cfg.apps.startIcon || defaults.apps.startIcon;
    startIconImg.onerror = () => startIconImg.removeAttribute("src");

    const osName = state.cfg.system.osName || "ChillOS";
    biosPostTitle.textContent = osName + " BIOS";
    $("biosMenuTitle").textContent = osName + " BIOS Setup";
    stageLogoName.textContent = osName;

    startBadge.textContent = "Alpha";
  }

  // Sound manager (welcome only when desktop ready)
  const Sound = {
    unlocked: false,
    queue: [],
    desktopReady: false,
    playedWelcome: false,

    enqueue(tag, url, volume=0.9){
      if (!url) return;
      Sound.queue = Sound.queue.filter(x => x.tag !== tag);
      Sound.queue.push({ tag, url, volume });
    },
    drop(tag){ Sound.queue = Sound.queue.filter(x => x.tag !== tag); },

    playNow(url, volume=0.9){
      if (!url) return;
      const a = new Audio(url);
      a.volume = volume;
      a.play().catch(() => {});
    },

    tryPlay(tag, url, volume=0.9){
      if (!url) return;
      if (tag === "welcome" && !Sound.desktopReady) { Sound.enqueue(tag, url, volume); return; }
      if (tag === "welcome" && Sound.playedWelcome) return;

      if (!Sound.unlocked){ Sound.enqueue(tag, url, volume); return; }
      Sound.playNow(url, volume);
      if (tag === "welcome") Sound.playedWelcome = true;
    },

    unlockOnce(){
      if (Sound.unlocked) return;
      Sound.unlocked = true;

      const q = Sound.queue.splice(0);
      for (const it of q){
        if (it.tag === "welcome" && !Sound.desktopReady){
          Sound.enqueue(it.tag, it.url, it.volume);
          continue;
        }
        Sound.playNow(it.url, it.volume);
        if (it.tag === "welcome") Sound.playedWelcome = true;
      }
    }
  };
  window.addEventListener("pointerdown", () => Sound.unlockOnce(), { once:true, capture:true });
  window.addEventListener("keydown", () => Sound.unlockOnce(), { once:true, capture:true });

  // Fullscreen
  async function ensureFullscreen(){
    try{
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    } catch {
      // В некоторых браузерах без жеста нельзя — тогда просто молчим
    }
  }
  async function toggleFullscreen(){
    try{
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      toast("Fullscreen недоступен без жеста.");
    }
  }

  // BSOD
  function hideCtxMenu(){
    ctxMenu.classList.remove("show");
    ctxMenu.innerHTML = "";
    ctxMenu.style.left = "-9999px";
    ctxMenu.style.top = "-9999px";
  }
  function toggleStart(force){
    const show = (typeof force === "boolean") ? force : !startMenu.classList.contains("show");
    startMenu.classList.toggle("show", show);
    if (show){
      startSearch.value = "";
      renderStartApps("");
      setTimeout(() => startSearch.focus(), 0);
    }
  }
  function taskHoverHide(){
    taskHover.classList.remove("show");
    taskHover.innerHTML = "";
    taskHover.style.left = "-9999px";
    taskHover.style.top = "-9999px";
    taskHover._pinned = false;
  }

  function showBsod(payload){
    hideCtxMenu();
    toggleStart(false);
    taskHoverHide();

    bsodType.textContent = payload.type || "Error";
    bsodMsg.textContent = payload.message || "—";
    bsodSrc.textContent = payload.source || "—";
    bsodTrace.textContent = payload.stack || "—";

    bsod.classList.add("show");
  }

  function setupCrashHandlers(){
    window.addEventListener("error", (e) => {
      const err = e.error;
      const msg = err?.message || e.message || "Unknown error";
      const hasDetails = Boolean(err?.stack) || Boolean(e.filename);

      if (msg === "Script error." && !hasDetails) return;

      showBsod({
        type: err?.name || "Error",
        message: msg,
        source: (e.filename ? `${e.filename}:${e.lineno}:${e.colno}` : "window.onerror"),
        stack: err?.stack || "—"
      });
    });

    window.addEventListener("unhandledrejection", (e) => {
      const r = e.reason;
      showBsod({
        type: r?.name || "UnhandledPromiseRejection",
        message: r?.message || String(r),
        source: "unhandledrejection",
        stack: r?.stack || "—"
      });
    });
  }

  bsodCopy.addEventListener("click", async () => {
    const text =
`[ChillOS Black Screen of Death]
Type: ${bsodType.textContent}
Message: ${bsodMsg.textContent}
Source: ${bsodSrc.textContent}

${bsodTrace.textContent}`;
    try{
      await navigator.clipboard.writeText(text);
      toast("Скопировано ✅");
    } catch {
      downloadText("chillos-bsod.txt", text);
      toast("Сохранено файлом ✅");
    }
  });

  // Soft reboot from BSOD
  bsodReboot.addEventListener("click", async () => {
    bsod.classList.remove("show");
    await softReboot();
  });

  // Context menu (custom)
  function showCtxMenu(x, y, items){
    ctxMenu.innerHTML = "";
    for (const it of items){
      if (it.sep){
        ctxMenu.appendChild(el("div","cSep"));
        continue;
      }
      const row = el("div","cItem");
      const a = el("div"); a.textContent = it.label;
      const h = el("div","cHint"); h.textContent = it.hint || "";
      row.append(a,h);
      row.addEventListener("click", (ev) => {
        ev.stopPropagation();
        hideCtxMenu();
        try{ it.action?.(); } catch (err){
          showBsod({
            type: err?.name || "ActionError",
            message: err?.message || String(err),
            source: "ContextMenuAction",
            stack: err?.stack || "—"
          });
        }
      });
      ctxMenu.appendChild(row);
    }

    ctxMenu.classList.add("show");
    requestAnimationFrame(() => {
      const pad = 12;
      const rect = ctxMenu.getBoundingClientRect();
      const left = clamp(x, pad, window.innerWidth - rect.width - pad);
      const top  = clamp(y, pad, window.innerHeight - rect.height - pad);
      ctxMenu.style.left = left + "px";
      ctxMenu.style.top = top + "px";
    });
  }

  // Block native context menu except inputs
  window.addEventListener("contextmenu", (e) => {
    const allow = e.target.closest("textarea, input, [contenteditable='true']");
    if (allow) return;
    if (e.target.closest(".desktop") || e.target.closest(".win") || e.target.closest(".taskbar")) {
      e.preventDefault();
    }
  }, true);

  window.addEventListener("mousedown", (e) => {
    if (!e.target.closest("#ctxMenu")) hideCtxMenu();
    if (!e.target.closest("#startMenu") && !e.target.closest("#startBtn")) toggleStart(false);
    if (!e.target.closest("#taskHover")) { /* hover self handles */ }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
      toggleStart(false);
      hideCtxMenu();
      taskHoverHide();
    }
  });

  // Wallpaper helpers
  function getWallpaperById(id){
    const list = state.cfg.wallpapers.wallpapers || [];
    return list.find(w => w.id === id) || null;
  }

  function preloadImg(url){
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function setWallpaper(id){
    const wp = getWallpaperById(id);
    if (!wp) return;

    const ok = await preloadImg(wp.url);
    if (!ok){
      toast("Не удалось загрузить обои. Проверь файл.");
      return;
    }

    const fadeMs = state.cfg.system.ui?.wallpaperFadeMs || 520;

    if (state.wallFront === "A"){
      wallB.style.backgroundImage = `url("${wp.url}")`;
      wallB.style.transitionDuration = fadeMs + "ms";
      wallA.style.transitionDuration = fadeMs + "ms";
      wallB.style.opacity = "1";
      wallA.style.opacity = "0";
      state.wallFront = "B";
    } else {
      wallA.style.backgroundImage = `url("${wp.url}")`;
      wallA.style.transitionDuration = fadeMs + "ms";
      wallB.style.transitionDuration = fadeMs + "ms";
      wallA.style.opacity = "1";
      wallB.style.opacity = "0";
      state.wallFront = "A";
    }

    localStorage.setItem(WP_OVR_KEY, id);
  }

  async function applyInitialWallpaper(){
    const saved = localStorage.getItem(WP_OVR_KEY);
    const id = saved || state.cfg.wallpapers.default || "relaxzone";
    const wp = getWallpaperById(id) || state.cfg.wallpapers.wallpapers?.[0];
    if (!wp) return;

    const ok = await preloadImg(wp.url);
    if (!ok) return;

    wallA.style.backgroundImage = `url("${wp.url}")`;
    wallA.style.opacity = "1";
    wallB.style.opacity = "0";
    state.wallFront = "A";
  }

  // Boot flow
  function genBiosLines(osName){
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : "—";
    const scr = `${screen.width}x${screen.height}`;

    const base = [
      `${osName} BIOS v0.9 (UEFI-Compatible)`,
      `CPU: Detected ${cores} logical cores`,
      `MEM: ${mem} detected`,
      `GPU: Display ${scr}`,
      `USB: Initializing controller... OK`,
      `SATA: Scanning devices... OK`,
      `NET: Adapter init... OK`,
      `ACPI: Tables loaded`,
      `Boot: Launching ${osName} Loader...`,
      `Hint: Press F2 for BIOS Setup`
    ];

    const extras = [
      `PCIe: Enumerating buses...`,
      `HID: Keyboard detected`,
      `HID: Mouse detected`,
      `Audio: Codec init... OK`,
      `TPM: Present`,
      `RTC: OK`,
      `SecureBoot: OFF`,
      `DMI: OK`,
      `Cache: L1/L2 OK`
    ];

    const out = [];
    for (const b of base){
      out.push(b);
      if (Math.random() > 0.55) out.push(extras[Math.floor(Math.random()*extras.length)]);
    }
    return out;
  }

  async function typeBiosLog(lines, typingMs, maxLines){
    biosPostLog.textContent = "";
    const show = lines.slice(0, Math.max(6, Math.min(lines.length, maxLines)));
    for (const line of show){
      biosPostLog.textContent += line + "\n";
      await sleep(typingMs);
    }
  }

  async function showStage(node){
    node.classList.add("show");
    await sleep(20);
    node.classList.add("on");
  }
  async function hideStage(node){
    node.classList.remove("on");
    await sleep(360);
    node.classList.remove("show");
  }

  async function bootFlow(){
    await loadConfigStrict();
    setupCrashHandlers();
    applyCssOverrides();

    if (state.cfg.system.boot?.autoFullscreen) {
      ensureFullscreen();
    }

    // BIOS POST
    const osName = state.cfg.system.osName || "ChillOS";
    biosPostTitle.textContent = osName + " BIOS";
    biosPost.classList.add("show");

    let biosOpen = false;

    const onKey = (e) => {
      if (e.key === "F2"){
        e.preventDefault();
        biosOpen = true;
        openBiosMenu();
      }
      if (e.key === "Escape"){
        e.preventDefault();
        biosOpen = false;
        biosPost.classList.remove("show");
        startStages();
      }
    };
    window.addEventListener("keydown", onKey);

    const boot = state.cfg.system.boot || {};
    const biosSec = (boot.biosSeconds ?? 2.6);
    const typingMs = (boot.biosTypingMs ?? 18);
    const maxLines = (boot.biosPostLines ?? 18);

    const lines = genBiosLines(osName);
    await typeBiosLog(lines, typingMs, maxLines);

    const t0 = now();
    while (!biosOpen && now() - t0 < biosSec*1000){
      await sleep(40);
    }

    window.removeEventListener("keydown", onKey);

    if (!biosOpen){
      biosPost.classList.remove("show");
      await startStages();
    }
  }

  async function startStages(mode="boot"){
    const boot = state.cfg.system.boot || {};
    const logoUrl = boot.logoUrl || defaults.system.boot.logoUrl;
    const fallback = boot.fallbackLogoUrl || defaults.system.boot.fallbackLogoUrl;

    bootLogoImg.src = logoUrl;
    bootLogoImg.onerror = () => { bootLogoImg.src = fallback; };

    stageLogoName.textContent = state.cfg.system.osName || "ChillOS";

    await showStage(stageLogo);
    await sleep((boot.logoStageSeconds ?? 1.5) * 1000);
    await hideStage(stageLogo);

    stageBlueTitle.textContent = (mode === "reboot") ? "Перезагрузка" : "Загрузка";
    await showStage(stageBlue);

    if (mode === "reboot"){
      const sec = Math.max(4, Number(boot.rebootSeconds ?? 10));
      await sleep(sec * 1000);
    } else {
      await sleep((boot.blueStageSeconds ?? 3.0) * 1000);
    }

    await hideStage(stageBlue);

    bootRoot.style.display = "none";
    await showDesktop();
  }

  // BIOS setup (with CSS overrides tab)
  function openBiosMenu(){
    biosPost.classList.remove("show");
    biosMenu.classList.add("show");

    const tabs = [
      { id:"system", title:"System", get: () => state.cfg.system, set: (v) => state.cfg.system = v, mode:"json" },
      { id:"wallpapers", title:"Wallpapers", get: () => state.cfg.wallpapers, set: (v) => state.cfg.wallpapers = normalizeWallpapers(v), mode:"json" },
      { id:"apps", title:"Apps", get: () => state.cfg.apps, set: (v) => state.cfg.apps = v, mode:"json" },
      { id:"css", title:"CSS Overrides", get: () => localStorage.getItem(CSS_OVR_KEY) || "", set: (v) => localStorage.setItem(CSS_OVR_KEY, v), mode:"css" }
    ];

    function setActiveTab(id){
      state.biosTab = id;
      biosNav.querySelectorAll(".biosNavItem").forEach(x => x.classList.remove("active"));
      biosNav.querySelector(`[data-tab="${id}"]`)?.classList.add("active");

      const tab = tabs.find(t => t.id === id) || tabs[0];
      biosPanelTitle.textContent = tab.title;

      biosEditor.value = (tab.mode === "css") ? tab.get() : JSON.stringify(tab.get(), null, 2);
    }

    biosNav.innerHTML = "";
    for (const t of tabs){
      const item = el("div","biosNavItem" + (state.biosTab === t.id ? " active" : ""));
      item.textContent = t.title;
      item.dataset.tab = t.id;
      item.addEventListener("click", () => setActiveTab(t.id));
      biosNav.appendChild(item);
    }
    setActiveTab(state.biosTab || "system");

    function applyFromEditor(){
      const tab = tabs.find(t => t.id === state.biosTab) || tabs[0];

      if (tab.mode === "css"){
        tab.set(biosEditor.value);
        applyCssOverrides();
        toast("CSS применён (localStorage)");
        return true;
      }

      let obj;
      try{ obj = JSON.parse(biosEditor.value); }
      catch { toast("JSON ошибка: проверь запятые/кавычки."); return false; }

      tab.set(obj);

      applySystemToCssVars();
      watermark.textContent = state.cfg.system.testWatermark || "";
      stageLogoName.textContent = state.cfg.system.osName || "ChillOS";
      startIconImg.src = state.cfg.apps.startIcon || defaults.apps.startIcon;

      toast("Применено");
      return true;
    }

    biosApply.onclick = () => applyFromEditor();

    biosSave.onclick = () => {
      const tab = tabs.find(t => t.id === state.biosTab) || tabs[0];

      if (tab.mode === "css"){
        localStorage.setItem(CSS_OVR_KEY, biosEditor.value);
        applyCssOverrides();
        toast("CSS сохранён");
        return;
      }

      let obj;
      try{ obj = JSON.parse(biosEditor.value); }
      catch { toast("JSON ошибка"); return; }

      const ovr = readOverrides() || {};
      ovr[state.biosTab] = obj;
      localStorage.setItem(SETTINGS_OVR_KEY, JSON.stringify(ovr));
      toast("Сохранено в localStorage");
    };

    biosDownload.onclick = () => {
      const tab = tabs.find(t => t.id === state.biosTab) || tabs[0];
      if (tab.mode === "css"){
        downloadText("chillos-css-overrides.css", biosEditor.value);
        toast("Скачано");
        return;
      }
      try{
        const obj = JSON.parse(biosEditor.value);
        downloadText(`chillos-${state.biosTab}.json`, JSON.stringify(obj, null, 2));
        toast("Скачано");
      } catch { toast("JSON ошибка"); }
    };

    biosReset.onclick = () => {
      localStorage.removeItem(SETTINGS_OVR_KEY);
      localStorage.removeItem(CSS_OVR_KEY);
      toast("Overrides сброшены");
      softReboot();
    };

    biosExit.onclick = () => {
      biosMenu.classList.remove("show");
      biosPost.classList.remove("show");
      startStages();
    };

    const biosKey = (e) => {
      if (e.key === "Escape"){ e.preventDefault(); biosExit.click(); }
      if (e.key === "F10"){ e.preventDefault(); biosSave.click(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s"){
        e.preventDefault();
        biosDownload.click();
      }
    };
    window.addEventListener("keydown", biosKey, { once:false });

    const obs = new MutationObserver(() => {
      if (!biosMenu.classList.contains("show")){
        window.removeEventListener("keydown", biosKey);
        obs.disconnect();
      }
    });
    obs.observe(biosMenu, { attributes:true, attributeFilter:["class"] });
  }

  // Desktop show
  async function showDesktop(){
    desktop.classList.add("ready");
    await applyInitialWallpaper();

    renderStartApps("");
    renderDesktopIconsFromConfig();

    tickClock();
    setInterval(tickClock, 15000);

    Sound.desktopReady = true;
    Sound.tryPlay("welcome", state.cfg.system.sounds?.welcome, 0.9);
    if (!Sound.unlocked) toast("Звук включится после первого клика/клавиши 🙂");

    await sleep(20);
    desktop.classList.add("on");

    layoutTaskCenter();
  }

  // Soft reboot (keeps fullscreen state)
  async function softReboot(){
    // drop queued welcome to avoid welcome+goodbye together
    Sound.drop("welcome");

    Sound.tryPlay("goodbye", state.cfg.system.sounds?.goodbye, 0.9);

    toggleStart(false);
    hideCtxMenu();
    taskHoverHide();

    // close windows
    for (const [id] of state.wins){
      closeWindow(id, true);
    }

    // fade out desktop
    desktop.classList.remove("on");
    await sleep(420);

    // reset state bits
    state.selectedIcons.clear();
    state.iconEls.clear();
    iconLayer.innerHTML = "";
    windowLayer.innerHTML = "";
    taskApps.innerHTML = "";
    state.wins.clear();
    state.activeWin = null;
    state.z = 30;

    Sound.desktopReady = false;
    Sound.playedWelcome = false;

    // boot root visible again
    bootRoot.style.display = "block";
    biosPost.classList.remove("show");
    biosMenu.classList.remove("show");

    // fullscreen: try to keep it; no exit calls anywhere
    if (state.cfg.system.boot?.autoFullscreen) ensureFullscreen();

    // reload configs to respect JSON changes
    await loadConfigStrict();

    // reboot stages (longer)
    await startStages("reboot");
  }

  // Clock
  function tickClock(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,"0");
    const mm = String(d.getMinutes()).padStart(2,"0");
    clock.textContent = `${hh}:${mm}`;
  }

  // Task center layout: centered, but shifts left when width grows
  function layoutTaskCenter(){
    requestAnimationFrame(() => {
      const tb = $("taskbar").getBoundingClientRect();
      const wrap = taskCenterWrap.getBoundingClientRect();
      const right = $("taskbar").querySelector(".taskRight").getBoundingClientRect();

      const pad = 14;
      const maxRight = right.left - 10;
      const desiredCenterLeft = tb.left + tb.width/2 - wrap.width/2;

      // If centered group would overlap right area, push it left.
      let left = desiredCenterLeft;
      if (left + wrap.width > maxRight) left = maxRight - wrap.width;

      // Prevent going too far left (keep some margin)
      left = Math.max(tb.left + pad, left);

      // Convert to taskbar-relative px
      const relLeft = left - tb.left;

      taskCenterWrap.style.left = relLeft + "px";
      taskCenterWrap.style.transform = "translateX(0)"; // once we control px, no translate
    });
  }
  window.addEventListener("resize", layoutTaskCenter);

  // Start menu
  function renderStartApps(q){
    const query = (q || "").trim().toLowerCase();
    startGrid.innerHTML = "";
    for (const a of state.cfg.apps.apps){
      if (query && !(a.name.toLowerCase().includes(query))) continue;

      const btn = el("div","appBtn");
      const ico = el("div","appIco");
      ico.appendChild(loadImgOrSvg(a.icon));
      const txt = el("div","appTxt");
      txt.innerHTML = `<div class="appName">${escapeHtml(a.name)}</div><div class="appDesc">Открыть приложение</div>`;
      btn.append(ico, txt);

      btn.addEventListener("click", () => {
        toggleStart(false);
        openApp(a.id);
      });

      startGrid.appendChild(btn);
    }
  }

  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hideCtxMenu();
    taskHoverHide();
    toggleStart();
  });
  startMenu.addEventListener("mousedown", (e) => e.stopPropagation());
  startSearch.addEventListener("input", () => renderStartApps(startSearch.value));

  // Hover menu
  function taskHoverShow(anchorEl, items){
    taskHover.innerHTML = "";
    taskHover._pinned = true;

    for (const it of items){
      const row = el("div","hItem");
      const a = el("div"); a.textContent = it.label;
      const h = el("div","hHint"); h.textContent = it.hint || "";
      row.append(a,h);
      row.addEventListener("mousedown", (ev) => ev.stopPropagation());
      row.addEventListener("click", (ev) => {
        ev.stopPropagation();
        taskHoverHide();
        it.action?.();
      });
      taskHover.appendChild(row);
    }

    taskHover.classList.add("show");
    requestAnimationFrame(() => {
      const rectA = anchorEl.getBoundingClientRect();
      const rectM = taskHover.getBoundingClientRect();
      const pad = 12;

      const x = rectA.left + rectA.width/2 - rectM.width/2;
      const y = rectA.top - rectM.height - 10;

      taskHover.style.left = clamp(x, pad, window.innerWidth - rectM.width - pad) + "px";
      taskHover.style.top  = clamp(y, pad, window.innerHeight - rectM.height - pad) + "px";
    });
  }
  function scheduleHoverHide(){
    clearTimeout(taskHover._tm);
    taskHover._tm = setTimeout(() => {
      if (taskHover.matches(":hover")) return;
      taskHoverHide();
    }, 180);
  }
  taskHover.addEventListener("mouseenter", () => clearTimeout(taskHover._tm));
  taskHover.addEventListener("mouseleave", () => scheduleHoverHide());

  // Window manager helpers
  function svgFallback(){
    const wrap = document.createElement("div");
    wrap.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6h14v12H5z"/></svg>`;
    return wrap.firstElementChild;
  }
  function loadImgOrSvg(iconUrl){
    const img = document.createElement("img");
    img.alt = "";
    img.decoding = "async";
    img.src = iconUrl;
    img.onerror = () => {
      img.removeAttribute("src");
      img.replaceWith(svgFallback());
    };
    return img;
  }

  function clampWindowIntoView(win){
    const rect = win.getBoundingClientRect();
    const pad = 12;
    const maxX = window.innerWidth - pad;
    const maxY = window.innerHeight - pad - 70;
    const w = rect.width, h = rect.height;
    win.style.left = clamp(rect.left, pad, maxX - w) + "px";
    win.style.top  = clamp(rect.top, pad, maxY - h) + "px";
  }

  window.addEventListener("resize", () => {
    for (const [,w] of state.wins) clampWindowIntoView(w.el);
  });

  let drag = null;
  function startDragWindow(e, id, win){
    if (e.button !== 0) return;
    setActiveWin(id);
    const rect = win.getBoundingClientRect();
    drag = { type:"move", id, sx:e.clientX, sy:e.clientY, ol:rect.left, ot:rect.top };
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", stopDrag);
  }
  function startResizeWindow(e, id, win){
    if (e.button !== 0) return;
    setActiveWin(id);
    const rect = win.getBoundingClientRect();
    drag = { type:"resize", id, sx:e.clientX, sy:e.clientY, ow:rect.width, oh:rect.height };
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", stopDrag);
  }
  function onDragMove(e){
    if (!drag) return;
    const rec = state.wins.get(drag.id);
    if (!rec) return;
    const win = rec.el;

    if (drag.type === "move"){
      const dx = e.clientX - drag.sx;
      const dy = e.clientY - drag.sy;
      const pad = 10;
      const rect = win.getBoundingClientRect();
      win.style.left = clamp(drag.ol + dx, pad, window.innerWidth - pad - rect.width) + "px";
      win.style.top  = clamp(drag.ot + dy, pad, window.innerHeight - pad - 90 - rect.height) + "px";
    } else {
      const dx = e.clientX - drag.sx;
      const dy = e.clientY - drag.sy;
      const minW = 440, minH = 300;
      win.style.width  = clamp(drag.ow + dx, minW, window.innerWidth - 40) + "px";
      win.style.height = clamp(drag.oh + dy, minH, window.innerHeight - 140) + "px";
    }
  }
  function stopDrag(){
    drag = null;
    window.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", stopDrag);
  }

  function setActiveWin(id){
    state.activeWin = id;
    for (const [wid, w] of state.wins){
      w.taskEl.classList.toggle("active", wid === id && !w.minimized);
    }
    const rec = state.wins.get(id);
    if (rec) rec.el.style.zIndex = String(++state.z);
  }

  function minimizeWindow(id){
    const w = state.wins.get(id);
    if (!w) return;
    w.el.classList.add("hidden");
    w.minimized = true;
    w.taskEl.classList.remove("active");
    if (state.activeWin === id) state.activeWin = null;
  }

  function closeWindow(id, silent=false){
    const w = state.wins.get(id);
    if (!w) return;
    w.el.remove();
    w.taskEl.remove();
    state.wins.delete(id);
    if (state.activeWin === id) state.activeWin = null;
    if (!silent) taskHoverHide();
    layoutTaskCenter();
  }

  function createWindow({ id, title, iconUrl, width=780, height=540, x=220, y=130, contentEl }){
    if (state.wins.has(id)){
      const w = state.wins.get(id);
      w.el.classList.remove("hidden");
      w.minimized = false;
      setActiveWin(id);
      w.taskEl.classList.add("active");
      layoutTaskCenter();
      return w;
    }

    const win = el("div","win");
    win.style.width = width + "px";
    win.style.height = height + "px";
    win.style.left = x + "px";
    win.style.top = y + "px";
    win.style.zIndex = String(++state.z);

    const tb = el("div","titlebar");
    const left = el("div","tleft");
    const dot = el("div","appdot");
    dot.appendChild(loadImgOrSvg(iconUrl));
    const tt = el("div","wtitle");
    tt.textContent = title;
    left.append(dot, tt);

    const ctrls = el("div","tctrl");
    const minBtn = el("button","wbtn");
    minBtn.textContent = "—";
    const closeBtn = el("button","wbtn close");
    closeBtn.textContent = "×";
    ctrls.append(minBtn, closeBtn);

    tb.append(left, ctrls);

    const body = el("div","winBody");
    body.appendChild(contentEl);

    const grip = el("div","resizeGrip");

    win.append(grip, tb, body);
    windowLayer.appendChild(win);

    const t = el("div","taskAppIcon active");
    t.appendChild(loadImgOrSvg(iconUrl));
    taskApps.appendChild(t);

    const rec = { el: win, taskEl: t, minimized:false };
    state.wins.set(id, rec);
    setActiveWin(id);

    win.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      setActiveWin(id);
      hideCtxMenu();
      toggleStart(false);
      taskHoverHide();
    });

    tb.addEventListener("mousedown", (e) => startDragWindow(e, id, win));
    grip.addEventListener("mousedown", (e) => startResizeWindow(e, id, win));
    minBtn.addEventListener("click", (e) => { e.stopPropagation(); minimizeWindow(id); });
    closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeWindow(id); });

    t.addEventListener("click", (e) => {
      e.stopPropagation();
      const w = state.wins.get(id);
      if (!w) return;
      if (w.minimized || w.el.classList.contains("hidden")){
        w.el.classList.remove("hidden");
        w.minimized = false;
        setActiveWin(id);
      } else {
        minimizeWindow(id);
      }
      layoutTaskCenter();
    });

    t.addEventListener("mouseenter", () => {
      if (!state.cfg.system.features?.taskbarHoverMenu) return;
      clearTimeout(taskHover._tm);
      taskHoverShow(t, [
        { label: "Свернуть", hint:"Minimize", action: () => minimizeWindow(id) },
        { label: "Закрыть", hint:"Close", action: () => closeWindow(id) }
      ]);
    });
    t.addEventListener("mouseleave", () => scheduleHoverHide());

    clampWindowIntoView(win);
    layoutTaskCenter();
    return rec;
  }

  // Apps
  function getAppById(id){
    return state.cfg.apps.apps.find(a => a.id === id) || null;
  }
  function openApp(appId){
    const a = getAppById(appId);
    if (!a) return;

    if (appId === "settings") return openSettings(a);
    if (appId === "wallpapers") return openWallpapers(a);
    if (appId === "notes") return openNotes(a);
    if (appId === "about") return openAbout(a);
  }

  function openSettings(app){
    const c = el("div");
    c.innerHTML = `
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn" id="fs">${document.fullscreenElement ? "Выйти из Fullscreen" : "Fullscreen"}</button>
        <button class="btn" id="bios">BIOS Setup</button>
        <button class="btn" id="reloadCfg">Перечитать JSON</button>
        <button class="btn danger" id="reboot">Перезагрузка</button>
      </div>
      <div style="height:14px"></div>
      <div style="opacity:.78;font-size:13px;line-height:1.6;">
        <b>ChillOS ${META.version}</b> • ${META.channel}<br/>
        Все настройки читаются из JSON. Если ты запускаешь через <b>file://</b>, браузер может блокировать fetch — тогда включится fallback.
      </div>
    `;

    c.querySelector("#fs").onclick = () => toggleFullscreen();
    c.querySelector("#bios").onclick = () => openBiosMenu();
    c.querySelector("#reloadCfg").onclick = async () => {
      await loadConfigStrict();
      toast("JSON перечитан");
      renderStartApps(startSearch.value);
      renderDesktopIconsFromConfig();
      layoutTaskCenter();
    };
    c.querySelector("#reboot").onclick = async () => softReboot();

    createWindow({
      id: "settings",
      title: app.name,
      iconUrl: app.icon,
      width: 820,
      height: 380,
      x: 240,
      y: 140,
      contentEl: c
    });
  }

  function openWallpapers(app){
    const c = el("div");
    const list = state.cfg.wallpapers.wallpapers || [];
    const selected = localStorage.getItem(WP_OVR_KEY) || state.cfg.wallpapers.default;

    c.innerHTML = `
      <div style="font-weight:800;margin-bottom:10px;">Обои</div>
      <div style="opacity:.75;font-size:13px;margin-bottom:12px;line-height:1.55;">
        В версии ${META.version} поддерживаются <b>только локальные</b> обои из <code>./chillos/wallpapers/</code>.
      </div>
      <div id="wGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;"></div>
    `;

    const g = c.querySelector("#wGrid");
    for (const w of list){
      const card = el("div");
      card.style.border = "1px solid rgba(255,255,255,.10)";
      card.style.borderRadius = "16px";
      card.style.background = "rgba(0,0,0,.18)";
      card.style.padding = "10px";
      card.style.cursor = "pointer";
      card.style.outline = (w.id === selected) ? "2px solid rgba(255,255,255,.18)" : "none";

      const img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      img.style.width = "100%";
      img.style.height = "120px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "14px";
      img.style.border = "1px solid rgba(255,255,255,.10)";
      img.style.background = "rgba(0,0,0,.22)";
      img.src = w.url;

      const name = el("div");
      name.style.marginTop = "8px";
      name.style.fontWeight = "800";
      name.textContent = w.name;

      const meta = el("div");
      meta.style.marginTop = "2px";
      meta.style.opacity = ".7";
      meta.style.fontSize = "12px";
      meta.textContent = w.url;

      card.append(img, name, meta);
      card.addEventListener("click", async () => {
        await setWallpaper(w.id);
        [...g.children].forEach(ch => ch.style.outline = "none");
        card.style.outline = "2px solid rgba(255,255,255,.18)";
      });

      g.appendChild(card);
    }

    createWindow({
      id: "wallpapers",
      title: app.name,
      iconUrl: app.icon,
      width: 940,
      height: 640,
      x: 260,
      y: 120,
      contentEl: c
    });
  }

  function openNotes(app){
    const KEY = "chillos_notes_v085";
    const c = el("div");
    c.innerHTML = `
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn primary" id="save">Сохранить</button>
        <button class="btn" id="clear">Очистить</button>
      </div>
      <div style="height:10px"></div>
      <textarea id="area" spellcheck="false"
        style="width:100%;min-height:360px;resize:vertical;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.22);color:rgba(255,255,255,.92);padding:12px;outline:none;font-family:var(--mono);font-size:13px;line-height:1.5;user-select:text;"></textarea>
    `;
    const area = c.querySelector("#area");
    area.value = localStorage.getItem(KEY) || "";

    c.querySelector("#save").onclick = () => { localStorage.setItem(KEY, area.value); toast("Сохранено"); };
    c.querySelector("#clear").onclick = () => { area.value = ""; localStorage.setItem(KEY, ""); toast("Очищено"); };

    createWindow({
      id: "notes",
      title: app.name,
      iconUrl: app.icon,
      width: 900,
      height: 660,
      x: 240,
      y: 120,
      contentEl: c
    });
  }

  function openAbout(app){
    const osName = state.cfg.system.osName || "ChillOS";
    const c = el("div");

    const changes = [
      "Windows 11 glass: переработанные окна и панель задач",
      "Иконки рабочего стола без рамок (Win-style)",
      "Кнопка Пуск без рамок + центрирование с умным смещением",
      "Настройки читаются из JSON (fallback для file://)",
      "Обои только локальные (./chillos/wallpapers)",
      "Soft reboot: перезагрузка без выхода из fullscreen",
      "Обновлённая вкладка “О системе”"
    ];

    c.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
        <div>
          <div style="font-size:18px;font-weight:900;letter-spacing:.2px;">${escapeHtml(osName)}</div>
          <div style="opacity:.78;margin-top:4px;font-size:13px;">
            Версия: <b>${META.version}</b> • Статус: <b>${META.channel}</b>
          </div>
        </div>
        <div style="text-align:right;opacity:.78;font-size:12px;line-height:1.4;">
          GitHub репозиторий<br/>
          <a href="${META.repo}" target="_blank" style="color:rgba(255,255,255,.92);text-decoration:underline;">${META.repo}</a>
        </div>
      </div>

      <div style="height:14px"></div>

      <div style="border:1px solid rgba(255,255,255,.10);border-radius:16px;background:rgba(0,0,0,.16);padding:12px;">
        <div style="font-weight:900;margin-bottom:8px;">Что нового в ${META.version}</div>
        <ul style="margin:0;padding-left:18px;opacity:.9;line-height:1.7;">
          ${changes.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      </div>

      <div style="height:12px"></div>

      <div style="border:1px solid rgba(255,255,255,.10);border-radius:16px;background:rgba(0,0,0,.16);padding:12px;">
        <div style="font-weight:900;margin-bottom:6px;">Системная информация (диагностика)</div>
        <div style="opacity:.82;font-size:13px;line-height:1.7;">
          <div><b>Browser:</b> ${escapeHtml(navigator.userAgent)}</div>
          <div><b>Language:</b> ${escapeHtml(navigator.language || "—")}</div>
          <div><b>Screen:</b> ${screen.width}×${screen.height}</div>
          <div><b>Cores:</b> ${navigator.hardwareConcurrency || "—"}</div>
          <div><b>DeviceMemory:</b> ${navigator.deviceMemory ? navigator.deviceMemory + " GB" : "—"}</div>
        </div>
      </div>

      <div style="height:10px"></div>
      <div style="opacity:.72;font-size:12px;">
        Если что-то упадёт — BSoD покажет тип/сообщение/стек. Нажми “Скопировать” и кидай сюда.
      </div>
    `;

    createWindow({
      id: "about",
      title: app.name,
      iconUrl: app.icon,
      width: 920,
      height: 650,
      x: 260,
      y: 110,
      contentEl: c
    });
  }

  // Desktop icons: drag & snap
  function loadIconPositions(){
    try{
      const raw = localStorage.getItem(ICON_POS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  }
  function saveIconPositions(map){
    localStorage.setItem(ICON_POS_KEY, JSON.stringify(map));
  }

  function gridSnap(x, y){
    const grid = state.cfg.system.ui?.desktopGrid || defaults.system.ui.desktopGrid;
    if (!grid?.enabled) return { x, y };

    const cell = grid.cell ?? 96;
    const pad = grid.padding ?? 18;

    const nx = Math.round((x - pad) / cell) * cell + pad;
    const ny = Math.round((y - pad) / cell) * cell + pad;
    return { x: Math.max(pad, nx), y: Math.max(pad, ny) };
  }

  function clearIconSelection(){
    state.selectedIcons.clear();
    for (const [,iconEl] of state.iconEls){
      iconEl.classList.remove("selected");
    }
  }
  function toggleIconSelected(appId, on){
    if (on){
      state.selectedIcons.add(appId);
      state.iconEls.get(appId)?.classList.add("selected");
    } else {
      state.selectedIcons.delete(appId);
      state.iconEls.get(appId)?.classList.remove("selected");
    }
  }

  function startDragSelectedIcons(e){
    if (e.button !== 0) return;

    const ids = [...state.selectedIcons];
    if (ids.length === 0) return;

    const base = {};
    for (const id of ids){
      const iconEl = state.iconEls.get(id);
      base[id] = {
        left: parseFloat(iconEl.style.left || "0"),
        top: parseFloat(iconEl.style.top || "0")
      };
    }

    state.dragIcons = { ids, basePositions: base, startX: e.clientX, startY: e.clientY };
    window.addEventListener("mousemove", onDragIconsMove);
    window.addEventListener("mouseup", stopDragIcons);
  }

  function onDragIconsMove(e){
    if (!state.dragIcons) return;
    const dx = e.clientX - state.dragIcons.startX;
    const dy = e.clientY - state.dragIcons.startY;

    for (const id of state.dragIcons.ids){
      const iconEl = state.iconEls.get(id);
      const b = state.dragIcons.basePositions[id];
      const nl = clamp(b.left + dx, 10, window.innerWidth - 120);
      const nt = clamp(b.top + dy, 10, window.innerHeight - 140);
      iconEl.style.left = nl + "px";
      iconEl.style.top  = nt + "px";
    }
  }

  function stopDragIcons(){
    if (!state.dragIcons) return;

    const p = loadIconPositions();
    for (const id of state.dragIcons.ids){
      const iconEl = state.iconEls.get(id);
      const left = Math.round(parseFloat(iconEl.style.left));
      const top  = Math.round(parseFloat(iconEl.style.top));
      const snapped = gridSnap(left, top);
      iconEl.style.left = snapped.x + "px";
      iconEl.style.top  = snapped.y + "px";
      p[id] = { x: snapped.x, y: snapped.y };
    }
    saveIconPositions(p);

    state.dragIcons = null;
    window.removeEventListener("mousemove", onDragIconsMove);
    window.removeEventListener("mouseup", stopDragIcons);
  }

  function renderDesktopIconsFromConfig(){
    iconLayer.innerHTML = "";
    state.iconEls.clear();
    state.selectedIcons.clear();

    const pos = loadIconPositions();

    for (const di of (state.cfg.apps.desktop || [])){
      const app = getAppById(di.appId);
      if (!app) continue;

      const baseX = Number.isFinite(pos[app.id]?.x) ? pos[app.id].x : di.x;
      const baseY = Number.isFinite(pos[app.id]?.y) ? pos[app.id].y : di.y;
      const snapped = gridSnap(baseX, baseY);

      const icon = el("div","deskIcon");
      icon.dataset.appId = app.id;
      icon.style.left = snapped.x + "px";
      icon.style.top  = snapped.y + "px";

      const g = el("div","deskGlyph");
      g.appendChild(loadImgOrSvg(app.icon));
      const lab = el("div","deskLabel");
      lab.textContent = app.name;

      icon.append(g, lab);

      icon.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        if (!e.shiftKey && !state.selectedIcons.has(app.id)) clearIconSelection();
        toggleIconSelected(app.id, true);

        if (state.cfg.system.features?.desktopDragIcons) startDragSelectedIcons(e);
      });

      icon.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        openApp(app.id);
      });

      icon.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        showCtxMenu(e.clientX, e.clientY, [
          { label: "Открыть", hint:"Open", action: () => openApp(app.id) },
          { sep:true },
          { label: "Сбросить позицию", hint:"Reset", action: () => {
              const p = loadIconPositions();
              delete p[app.id];
              saveIconPositions(p);
              renderDesktopIconsFromConfig();
            }
          }
        ]);
      });

      iconLayer.appendChild(icon);
      state.iconEls.set(app.id, icon);
    }
  }

  function rectsIntersect(r1, r2){
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
  }

  // Selection rectangle
  desktop.addEventListener("mousedown", (e) => {
    if (!state.cfg.system.features?.desktopSelection) return;
    if (e.button !== 0) return;
    if (e.target.closest(".win") || e.target.closest(".taskbar") || e.target.closest(".startMenu") || e.target.closest(".deskIcon")) return;

    toggleStart(false);
    hideCtxMenu();
    taskHoverHide();

    clearIconSelection();
    state.selecting = true;
    state.selStart = { x: e.clientX, y: e.clientY };

    selectionBox.style.display = "block";
    selectionBox.style.left = e.clientX + "px";
    selectionBox.style.top = e.clientY + "px";
    selectionBox.style.width = "0px";
    selectionBox.style.height = "0px";
  });

  desktop.addEventListener("mousemove", (e) => {
    if (!state.selecting) return;
    const x0 = state.selStart.x, y0 = state.selStart.y;
    const x1 = e.clientX, y1 = e.clientY;

    const left = Math.min(x0, x1);
    const top  = Math.min(y0, y1);
    const w = Math.abs(x1 - x0);
    const h = Math.abs(y1 - y0);

    selectionBox.style.left = left + "px";
    selectionBox.style.top  = top + "px";
    selectionBox.style.width = w + "px";
    selectionBox.style.height = h + "px";

    const selRect = selectionBox.getBoundingClientRect();
    for (const [appId, iconEl] of state.iconEls){
      const r = iconEl.getBoundingClientRect();
      const hit = rectsIntersect(selRect, r);
      if (hit) toggleIconSelected(appId, true);
      else toggleIconSelected(appId, false);
    }
  });

  window.addEventListener("mouseup", () => {
    if (!state.selecting) return;
    state.selecting = false;
    state.selStart = null;
    selectionBox.style.display = "none";
  });

  // Desktop context menu
  desktop.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".win") || e.target.closest(".taskbar") || e.target.closest(".startMenu") || e.target.closest(".deskIcon")) return;
    e.preventDefault();
    toggleStart(false);
    taskHoverHide();
    showCtxMenu(e.clientX, e.clientY, [
      { label:"Обои", hint:"Wallpapers", action: () => openApp("wallpapers") },
      { label:"Параметры", hint:"Settings", action: () => openApp("settings") },
      { sep:true },
      { label: document.fullscreenElement ? "Выйти из полноэкранного" : "Полноэкранный режим", hint:"Fullscreen", action: () => toggleFullscreen() },
      { sep:true },
      { label:"Перезагрузка", hint:"Reboot", action: () => softReboot() }
    ]);
  });

  // Power buttons
  fsBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleFullscreen(); });

  powerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showCtxMenu(e.clientX, e.clientY, [
      { label:"Перезагрузка", hint:"Reboot", action: () => softReboot() },
      { sep:true },
      { label: document.fullscreenElement ? "Выйти из полноэкранного" : "Полноэкранный режим", hint:"Fullscreen", action: () => toggleFullscreen() }
    ]);
  });

  // Init
  applyCssOverrides();
  setupCrashHandlers();
  bootFlow();
})();
