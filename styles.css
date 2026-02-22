@font-face{
  font-family: "Google Sans";
  src: url("./chillos/fonts/GoogleSans-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face{
  font-family: "Google Sans";
  src: url("./chillos/fonts/GoogleSans-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face{
  font-family: "Google Sans";
  src: url("./chillos/fonts/GoogleSans-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root{
  --font: "Google Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;

  --bg: #0a0c10;
  --text: rgba(255,255,255,.92);
  --muted: rgba(255,255,255,.70);
  --accent: #7cf0c5;

  --taskbar-h: 58px;
  --radius: 18px;

  --wallFadeMs: 520ms;
  --winOpenMs: 200ms;

  --taskIconPx: 22px;
  --startIconPx: 20px;

  --glassA: rgba(14,14,16,.66);
  --glassB: rgba(14,14,16,.44);
  --border: rgba(255,255,255,.12);
  --border2: rgba(255,255,255,.08);
  --shadow: 0 26px 80px rgba(0,0,0,.58);
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: var(--font);
  background:#000;
  color:var(--text);
  overflow:hidden;
  user-select:none;
}

/* ---------- Boot/Bios ---------- */
#bootRoot{ position:absolute; inset:0; background:#000; z-index:100; }

.biosPost{
  position:absolute; inset:0;
  background:#000;
  color:#fff;
  display:none;
}
.biosPost.show{ display:block; }
.biosPostHeader{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  padding: 16px 18px 10px;
  border-bottom: 1px solid rgba(255,255,255,.14);
}
.biosPostTitle{ font-weight:700; letter-spacing:.2px; }
.biosPostHint{ font-size:12px; opacity:.75; }
.biosPostLog{
  padding: 14px 18px;
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.55;
  white-space: pre-wrap;
  margin:0;
  color: rgba(255,255,255,.92);
}

.biosMenu{
  position:absolute; inset:0;
  display:none;
  background:#000;
  color:#fff;
}
.biosMenu.show{ display:block; }
.biosMenuTop{
  padding:16px 18px;
  border-bottom:1px solid rgba(255,255,255,.18);
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:14px;
}
.biosMenuTitle{ font-size:18px; font-weight:700; }
.biosMenuHint{ font-size:12px; opacity:.75; }

.biosGrid{
  display:grid;
  grid-template-columns: 220px 1fr;
  height: calc(100vh - 62px);
}
.biosNav{
  border-right:1px solid rgba(255,255,255,.18);
  padding:12px;
}
.biosNavItem{
  padding:10px 10px;
  border-radius: 10px;
  cursor:pointer;
  border:1px solid transparent;
  font-weight:600;
  color: rgba(255,255,255,.88);
}
.biosNavItem:hover{ background: rgba(255,255,255,.08); }
.biosNavItem.active{ background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.18); }

.biosPanel{ padding:14px; }
.biosPanelTitle{ font-size:14px; font-weight:700; opacity:.9; }
.biosEditor{
  width:100%;
  height: calc(100% - 120px);
  margin-top:10px;
  resize:none;
  border-radius: 14px;
  border:1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.04);
  color:#fff;
  padding:12px;
  outline:none;
  font-family: var(--mono);
  font-size:12px;
  line-height:1.5;
  user-select:text;
}
.biosActions{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:10px;
}
.biosNote{
  margin-top:10px;
  font-size:12px;
  opacity:.75;
  line-height:1.45;
}
.biosNote code{ font-family: var(--mono); }

/* Stage: black + logo */
.stageLogo{
  position:absolute; inset:0;
  background:#000;
  display:none;
  opacity: 0;
  transition: opacity 360ms ease;
}
.stageLogo.show{ display:block; }
.stageLogo.on{ opacity:1; }
.stageLogoCenter{
  position:absolute;
  left:50%; top:42%;
  transform: translate(-50%, -50%);
  display:grid;
  place-items:center;
  gap:10px;
}
.stageLogoCenter img{
  width: 56px;
  height: 56px;
  object-fit: contain;
  opacity: .96;
  filter: drop-shadow(0 8px 22px rgba(0,0,0,.45));
}
.stageLogoName{
  font-size:14px;
  color: rgba(255,255,255,.70);
}

/* Stage: blue loading */
.stageBlue{
  position:absolute; inset:0;
  background: #0b3dd1;
  display:none;
  opacity: 0;
  transition: opacity 360ms ease;
}
.stageBlue.show{ display:block; }
.stageBlue.on{ opacity:1; }
.stageBlueCenter{
  position:absolute;
  left:50%; top:46%;
  transform: translate(-50%, -50%);
  display:grid;
  place-items:center;
  gap:14px;
}
.stageBlueTitle{
  font-weight:700;
  font-size: 18px;
  letter-spacing:.2px;
  color: rgba(255,255,255,.95);
}

/* Spinner */
.spinner{
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 3px solid rgba(255,255,255,.22);
  border-top-color: rgba(255,255,255,.85);
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ---------- BSOD ---------- */
.bsod{
  position:absolute; inset:0;
  background:#000;
  color:#fff;
  z-index:9999;
  display:none;
}
.bsod.show{ display:block; }
.bsodCenter{
  position:absolute;
  left:50%;
  top: 46%;
  transform: translate(-50%, -50%);
  width: min(900px, calc(100vw - 50px));
  text-align:center;
}
.bsodTitle{ font-size: 18px; font-weight:700; line-height:1.4; }
.bsodSub{ margin-top:10px; font-size:13px; opacity:.78; }
.bsodBlock{
  margin: 18px auto 0;
  width:min(720px, 100%);
  text-align:left;
  border:1px solid rgba(255,255,255,.18);
  border-radius: 14px;
  padding: 12px;
  background: rgba(255,255,255,.04);
  font-size: 13px;
  line-height:1.55;
}
.bsodTrace{
  margin: 12px auto 0;
  width:min(720px, 100%);
  text-align:left;
  border:1px solid rgba(255,255,255,.18);
  border-radius: 14px;
  padding: 12px;
  background: rgba(255,255,255,.04);
  font-family: var(--mono);
  font-size: 12px;
  white-space: pre-wrap;
  line-height:1.45;
}
.bsodBtns{ margin-top:14px; display:flex; justify-content:center; gap:10px; flex-wrap:wrap; }

/* Buttons */
.btn{
  height:40px; padding:0 12px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.92);
  font-weight:700;
  cursor:pointer;
}
.btn:hover{ background: rgba(255,255,255,.10); }
.btn.primary{
  background: linear-gradient(135deg, rgba(124,240,197,.95), rgba(138,169,255,.95));
  color:#06111a;
  border:0;
}
.btn.danger{
  background: rgba(255,107,122,.14);
  border-color: rgba(255,107,122,.30);
}

/* ---------- Desktop ---------- */
.desktop{
  position:absolute; inset:0;
  background:#000;
  display:none;
  opacity: 0;
  transition: opacity 420ms ease;
}
.desktop.ready{ display:block; }
.desktop.on{ opacity: 1; }

.wallpaper{
  position:absolute; inset:0;
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
}
.wallA{ opacity:1; transition: opacity var(--wallFadeMs) ease; }
.wallB{ opacity:0; transition: opacity var(--wallFadeMs) ease; }
.wallOverlay{
  position:absolute; inset:0;
  pointer-events:none;
  background:
    radial-gradient(1100px 700px at 25% 25%, rgba(255,255,255,.06), transparent 60%),
    radial-gradient(900px 700px at 70% 20%, rgba(255,255,255,.04), transparent 65%);
  opacity:.55;
}

.watermark{
  position:absolute;
  top: 10px; right: 12px;
  max-width: min(620px, calc(100vw - 24px));
  padding: 8px 10px;
  border-radius: 14px;
  background: rgba(0,0,0,.42);
  border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(12px);
  font-size: 12px;
  line-height: 1.35;
  color: rgba(255,255,255,.92);
  z-index: 20;
}

.iconLayer{
  position:absolute;
  left: 14px;
  top: 14px;
  right: 14px;
  bottom: calc(14px + var(--taskbar-h) + 12px);
  z-index: 15;
}

/* Desktop icon - Win-like: no permanent frame */
.deskIcon{
  position:absolute;
  width: 86px;
  padding: 6px 6px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;
  cursor: default;
}
.deskIcon:hover{
  background: rgba(255,255,255,.06);
}
.deskIcon.selected{
  background: rgba(255,255,255,.10);
  border-color: rgba(255,255,255,.18);
}

.deskGlyph{
  width:44px; height:44px;
  display:grid; place-items:center;
  overflow:hidden;
}
.deskGlyph img, .deskGlyph svg{
  width: 40px;
  height: 40px;
  display:block;
  filter: drop-shadow(0 10px 22px rgba(0,0,0,.35));
}

.deskLabel{
  font-size:12px;
  text-align:center;
  max-width: 110px;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 2px 10px rgba(0,0,0,.35);
  color: rgba(255,255,255,.92);
}

.selectionBox{
  position:absolute;
  border:1px solid rgba(124,240,197,.65);
  background: rgba(124,240,197,.12);
  border-radius: 8px;
  display:none;
  z-index: 18;
}

/* Windows (Acrylic) */
.windowLayer{
  position:absolute; inset:0;
  z-index: 30;
  pointer-events:none;
}
.win{
  position:absolute;
  width: 780px;
  height: 540px;
  border-radius: var(--radius);

  background: linear-gradient(180deg, var(--glassA), var(--glassB));
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);

  overflow:hidden;
  display:flex;
  flex-direction:column;
  pointer-events:auto;

  opacity: 0;
  transform: translateY(10px) scale(.985);
  animation: winIn var(--winOpenMs) ease forwards;
}
@keyframes winIn{ to { opacity:1; transform: translateY(0) scale(1); } }
.win.hidden{ display:none; }

.titlebar{
  height: 46px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  padding: 8px 10px 8px 12px;
  background: rgba(0,0,0,.26);
  border-bottom: 1px solid var(--border2);
  cursor: grab;
}
.titlebar:active{ cursor:grabbing; }
.tleft{ display:flex; align-items:center; gap:10px; min-width:0; }
.appdot{
  width: 32px; height: 32px;
  border-radius: 12px;
  display:grid; place-items:center;
  background: rgba(255,255,255,.06);
  overflow:hidden;
}
.appdot img, .appdot svg{ width:18px; height:18px; }
.wtitle{
  font-size: 13px;
  font-weight:600;
  white-space:nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
  max-width: 560px;
}

.tctrl{ display:flex; gap:8px; align-items:center; }
.wbtn{
  width: 34px; height: 34px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.92);
  display:grid; place-items:center;
  font-weight: 800;
  cursor:pointer;
}
.wbtn:hover{ background: rgba(255,255,255,.10); }
.wbtn.close:hover{ background: rgba(255,107,122,.18); }

.winBody{
  flex:1;
  padding: 14px;
  overflow:auto;
  background: rgba(0,0,0,.12);
}
.resizeGrip{
  position:absolute; right:7px; bottom:7px;
  width:16px; height:16px;
  opacity:.65;
  cursor:nwse-resize;
}

/* Taskbar */
.taskbar{
  position:absolute;
  left: 14px; right: 14px;
  bottom: 14px;
  height: var(--taskbar-h);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(14,14,16,.72), rgba(14,14,16,.52));
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: 0 18px 55px rgba(0,0,0,.45);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  z-index: 60;
}

.taskbarInner{
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;
  padding: 8px 10px;
}

/* Center group: starts centered, shifts left when too wide (JS will adjust left) */
.taskCenterWrap{
  display:flex;
  align-items:center;
  gap:10px;
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: left 180ms ease, transform 180ms ease;
}

.taskApps{ display:flex; align-items:center; gap:8px; }

.taskRight{
  position:absolute;
  right: 10px;
  display:flex;
  align-items:center;
  gap:10px;
}

.startBtn{
  width: 46px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: transparent; /* no frame */
  display:grid;
  place-items:center;
  cursor:pointer;
}
.startBtn:hover{ background: rgba(255,255,255,.10); }
.startBtn img{
  width: var(--startIconPx);
  height: var(--startIconPx);
  display:block;
}

.taskAppIcon{
  width: 46px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: rgba(0,0,0,.10);
  display:grid;
  place-items:center;
  cursor:pointer;
  position:relative;
}
.taskAppIcon:hover{ background: rgba(255,255,255,.08); }
.taskAppIcon.active{ background: rgba(255,255,255,.12); }
.taskAppIcon img, .taskAppIcon svg{
  width: var(--taskIconPx);
  height: var(--taskIconPx);
  display:block;
}

.sysBtn{
  width: 46px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: rgba(0,0,0,.18);
  color: rgba(255,255,255,.92);
  cursor:pointer;
  display:grid;
  place-items:center;
}
.sysBtn:hover{ background: rgba(255,255,255,.10); }

.clock{
  font-size: 12px;
  padding: 0 10px;
  height: 44px;
  display:flex;
  align-items:center;
  border-radius: 12px;
  border: 1px solid transparent;
  background: rgba(0,0,0,.18);
}

/* Task hover menu */
.taskHover{
  position:absolute;
  min-width: 180px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(16,16,18,.95), rgba(16,16,18,.72));
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 24px 70px rgba(0,0,0,.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  padding: 8px;
  display:none;
  z-index: 120;
}
.taskHover.show{ display:block; }
.hItem{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  padding: 10px 10px;
  border-radius: 12px;
  cursor:pointer;
  border: 1px solid transparent;
  font-weight:600;
  font-size: 13px;
}
.hItem:hover{ background: rgba(255,255,255,.10); }
.hHint{ opacity:.7; font-size:12px; }

/* Start menu */
.startMenu{
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(14px + var(--taskbar-h) + 10px);
  width: min(560px, calc(100vw - 36px));
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(16,16,18,.94), rgba(16,16,18,.72));
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 24px 70px rgba(0,0,0,.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 12px;
  display:none;
  z-index: 70;
}
.startMenu.show{ display:block; }
.startTop{ padding: 8px 8px 10px; }

.startHeader{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom: 10px;
}
.startTitle{ font-weight:800; letter-spacing:.2px; }
.startBadge{
  font-size:12px;
  font-weight:800;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(124,240,197,.18);
  border: 1px solid rgba(124,240,197,.30);
  color: rgba(255,255,255,.92);
}

.startSearch{
  width:100%;
  height:44px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.22);
  color: var(--text);
  padding:0 12px;
  outline:none;
  user-select:text;
}
.startSearch::placeholder{ color: rgba(255,255,255,.55); }
.startGrid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
  padding:4px;
}
.appBtn{
  display:flex; gap:12px; align-items:center;
  padding:10px 12px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(0,0,0,.18);
  cursor:pointer;
}
.appBtn:hover{ background: rgba(255,255,255,.08); }
.appIco{
  width:38px; height:38px;
  border-radius:14px;
  background: rgba(0,0,0,.18);
  display:grid; place-items:center;
  overflow:hidden;
  flex:0 0 auto;
}
.appIco img, .appIco svg{ width:18px; height:18px; }
.appTxt{ min-width:0; }
.appName{ font-size:13px; font-weight:800; }
.appDesc{ font-size:12px; opacity:.7; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

/* Context menu */
.ctxMenu{
  position:absolute;
  min-width: 240px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(16,16,18,.95), rgba(16,16,18,.72));
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 24px 70px rgba(0,0,0,.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  padding: 8px;
  display:none;
  z-index: 140;
}
.ctxMenu.show{ display:block; }
.cItem{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  padding: 10px 10px;
  border-radius: 12px;
  cursor:pointer;
  font-weight:700;
  font-size: 13px;
  border: 1px solid transparent;
}
.cItem:hover{ background: rgba(255,255,255,.10); }
.cHint{ opacity:.65; font-size:12px; }
.cSep{ height:1px; background: rgba(255,255,255,.12); margin:6px 6px; border-radius:999px; }

/* Toast */
.toast{
  position:absolute;
  left:50%;
  bottom: calc(14px + var(--taskbar-h) + 18px);
  transform: translateX(-50%);
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(0,0,0,.55);
  border: 1px solid rgba(255,255,255,.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  font-size: 13px;
  z-index: 150;
  opacity:0;
  transition: opacity .18s ease;
  pointer-events:none;
  max-width: min(560px, calc(100vw - 28px));
  text-align:center;
}

@media (max-width: 860px){
  .startGrid{ grid-template-columns: 1fr; }
  .biosGrid{ grid-template-columns: 1fr; }
  .biosNav{
    border-right:none;
    border-bottom:1px solid rgba(255,255,255,.18);
    display:flex;
    gap:10px;
    overflow:auto;
  }
}
@media (max-width: 520px){
  .clock{ display:none; }
}
