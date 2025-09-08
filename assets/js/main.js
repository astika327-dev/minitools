// ---------- Utilities ----------
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const toast = (msg) => { const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),1200); };
const copy = async (text) => { try{ await navigator.clipboard.writeText(text||""); toast("Copied"); } catch{ alert("Clipboard blocked. Copy manually."); } };
const fmtMoney = (v, curr="IDR") => new Intl.NumberFormat(curr==="IDR"?"id-ID":"en-US", { style:"currency", currency: curr }).format(v);

// Theme toggle (persist)
// Theme toggle + persist
(() => {
  const html = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");
  if (saved) html.dataset.theme = saved;

  const updateBtn = () => {
    btn.textContent = html.dataset.theme === "light" ? "🌙" : "☀️";
  };

  updateBtn(); // set awal

  btn.addEventListener("click", () => {
    const next = html.dataset.theme === "light" ? "dark" : "light";
    html.dataset.theme = next;
    localStorage.setItem("theme", next);
    updateBtn();
  });
})();



// ---------- Quote Calculator ----------
(function quoteCalc(){
  const nights=$("#q-nights"), rate=$("#q-rate"), tax=$("#q-tax"), disc=$("#q-disc"), curr=$("#q-curr");
  const out=$("#q-out");

  const calc = () => {
    const n=+nights.value||0, r=+rate.value||0, t=+tax.value||0, d=+disc.value||0;
    const sub = n*r;
    const discount = sub*(d/100);
    const taxable = sub-discount;
    const taxAmt = taxable*(t/100);
    const total = taxable+taxAmt;

    const lines = [
      `Nights: ${n}`,
      `Rate: ${fmtMoney(r,curr.value)}`,
      `Subtotal: ${fmtMoney(sub,curr.value)}`,
      `Discount (${d}%): -${fmtMoney(discount,curr.value)}`,
      `Tax (${t}%): ${fmtMoney(taxAmt,curr.value)}`,
      `TOTAL: ${fmtMoney(total,curr.value)}`
    ];
    out.value = lines.join("\n");
    localStorage.setItem("quote_state", JSON.stringify({n,r,t,d,c:curr.value}));
  };

  $("#q-calc").addEventListener("click", calc);
  $("#q-copy").addEventListener("click", () => copy(out.value));
  $("#q-reset").addEventListener("click", () => { nights.value=1; rate.value=800000; tax.value=10; disc.value=0; curr.value="IDR"; out.value=""; localStorage.removeItem("quote_state"); });

  // restore
  const saved = JSON.parse(localStorage.getItem("quote_state")||"null");
  if (saved){ nights.value=saved.n; rate.value=saved.r; tax.value=saved.t; disc.value=saved.d; curr.value=saved.c; }
})();

// ---------- SOP Printer ----------
(function sopPrinter(){
  const TPLS = {
    pre: `ROOM: {{room}}
INSPECTOR: {{by}}
PRE-CHECK-IN INSPECTION:
- Doors, locks, and handles inspected
- Bed linen clean & properly arranged
- Amenities replaced (soap/shampoo/tissue)
- Bathroom cleaned & disinfected
- AC & lights functional
- Floor swept/mopped/vacuumed
- Trash bins emptied`,
    clean: `ROOM: {{room}}
INSPECTOR: {{by}}
ROOM CLEANING STEPS:
- Strip linen; pre-treat stains; make the bed
- Dust high-to-low; wipe switches & surfaces
- Bathroom: descale; disinfect touchpoints
- Mop with neutral cleaner; dry surfaces
- Restock amenities; final odor check`,
    checkout: `ROOM: {{room}}
INSPECTOR: {{by}}
GUEST CHECK-OUT SOP:
- Verify minibar & inventory
- Lost & found sweep (wardrobe/drawers/bathroom)
- Reset AC to eco; lights off
- Report damages/incidents; handoff to HK`
  };
  const fill = (tpl, data) => tpl.replace(/{{(.*?)}}/g, (_,k)=> (data[k.trim()]||""));

  const room=$("#sop-room"), by=$("#sop-by"), tplSel=$("#sop-tpl"), out=$("#sop-out");

  const gen = () => {
    const text = fill(TPLS[tplSel.value], { room: room.value.trim()||"-", by: by.value.trim()||"-" });
    out.value = text;
    localStorage.setItem("sop_state", JSON.stringify({room:room.value, by:by.value, tpl:tplSel.value, out:text}));
  };
  $("#sop-gen").addEventListener("click", gen);
  $("#sop-copy").addEventListener("click", () => copy(out.value));
  $("#sop-print").addEventListener("click", () => {
    const w = window.open("","_blank","noopener,noreferrer");
    w.document.write(`<pre style="font:14px/1.6 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;">${out.value.replaceAll("&","&amp;").replaceAll("<","&lt;")}</pre>`);
    w.document.close(); w.focus(); w.print();
  });
  $("#sop-download").addEventListener("click", () => {
    const blob = new Blob([out.value||""], {type:"text/plain"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "sop.txt"; a.click();
    URL.revokeObjectURL(a.href);
  });

  // restore
  const saved = JSON.parse(localStorage.getItem("sop_state")||"null");
  if (saved){ room.value=saved.room||""; by.value=saved.by||""; tplSel.value=saved.tpl||"pre"; out.value=saved.out||""; }
})();

// ---------- Name Helper ----------
(function nameHelper(){
  const full=$("#nm-full"), out=$("#nm-out");
  const titleCase = s => s.replace(/\w\S*/g, w=> w[0].toUpperCase()+w.slice(1).toLowerCase());

  $("#nm-format").addEventListener("click", () => {
    const name = full.value.trim();
    const parts = name.split(/\s+/).filter(Boolean);
    const first = parts[0]||"", last = parts.slice(1).join(" ");
    const slug = name.toLowerCase().replace(/\s+/g,".");
    const email1 = `${first.toLowerCase()}.${(last||"").split(" ").slice(-1)[0]||""}`.replace(/\.+$/,"");
    out.value = [
      `First name: ${titleCase(first)}`,
      `Last name : ${titleCase(last)}`,
      `Title Case: ${titleCase(name)}`,
      `Email slug: ${slug}`,
      `Email idea: ${email1}@example.com`
    ].join("\n");
  });
  $("#nm-copy").addEventListener("click", () => copy(out.value));
})();

// ---------- WhatsApp Link ----------
(function waLink(){
  const phone=$("#wa-phone"), text=$("#wa-text"), link=$("#wa-link");
  const build = () => {
    const p = (phone.value||"").replace(/[^\d]/g,"");
    const t = encodeURIComponent(text.value||"");
    return p ? `https://wa.me/${p}?text=${t}` : "";
  };
  $("#wa-make").addEventListener("click", () => { link.value = build(); });
  $("#wa-copy").addEventListener("click", () => copy(link.value));
  $("#wa-open").addEventListener("click", () => { const u=build(); if(u) window.open(u,"_blank","noopener"); else toast("Phone required"); });
})();

// ---------- Mailto Builder ----------
(function mailto(){
  const to=$("#ml-to"), sub=$("#ml-sub"), body=$("#ml-body"), link=$("#ml-link");
  const build = () => {
    const t = (to.value||"").trim();
    const s = encodeURIComponent(sub.value||"");
    const b = encodeURIComponent(body.value||"");
    return t ? `mailto:${t}?subject=${s}&body=${b}` : "";
  };
  $("#ml-make").addEventListener("click", () => { link.value = build(); });
  $("#ml-copy").addEventListener("click", () => copy(link.value));
  $("#ml-open").addEventListener("click", () => { const u=build(); if(u) location.href=u; else toast("Recipient required"); });
})();
