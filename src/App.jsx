import { useState, useEffect, useRef } from "react";

const FONT = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap";

const CSS = `
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{--blue:#0ea5e9;--indigo:#6366f1;--green:#10b981;--amber:#f59e0b;--red:#ef4444;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
  @keyframes lineGrow{from{width:0}to{width:100%}}
  @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin2{to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(14,165,233,0.4)}50%{box-shadow:0 0 0 10px rgba(14,165,233,0)}}
  @keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  @keyframes livePulse{0%,100%{opacity:1;box-shadow:0 0 6px rgba(16,185,129,0.8)}50%{opacity:0.6;box-shadow:0 0 12px rgba(16,185,129,0.4)}}
  @keyframes liveScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .nav-lnk{transition:color 0.2s;text-decoration:none;font-size:14px;font-weight:500;color:#555;}
  .nav-lnk:hover{color:#0ea5e9!important;}
  .svc-card{transition:all 0.3s ease;cursor:pointer;}
  .svc-card:hover{transform:translateY(-6px)!important;box-shadow:0 20px 48px rgba(14,165,233,0.12)!important;border-color:rgba(14,165,233,0.4)!important;}
  .faq-row{transition:border-color 0.25s;cursor:pointer;}
  .faq-row:hover{border-color:rgba(14,165,233,0.35)!important;}
  .cta-btn{transition:all 0.2s ease;}
  .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(14,165,233,0.4)!important;}
  .proc-card{transition:all 0.3s;}
  .proc-card:hover{transform:translateY(-5px)!important;}
  .choice-opt{transition:all 0.2s;}
  .choice-opt:hover{border-color:#0ea5e9!important;background:rgba(14,165,233,0.06)!important;}
`;

const Logo = ({ size = 32, dark = false }) => {
  const bg   = dark ? "#0f172a" : "transparent";
  const node = dark ? "white"   : "#0f172a";
  const dot  = dark ? "#0f172a" : "white";
  const ring = dark ? "white"   : "#0f172a";
  const blue = dark ? "#38bdf8" : "#0ea5e9";
  const s    = size;
  // icon fits a 64×64 grid scaled to `size`
  const sc   = s / 64;
  const p    = (v) => v * sc;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {dark && <rect width={s} height={s} rx={p(14)} fill="#0f172a"/>}
      {/* diagonal faint helpers */}
      <line x1={p(8)}  y1={p(8)}  x2={p(56)} y2={p(56)} stroke={node} strokeWidth={p(0.5)} opacity="0.18"/>
      <line x1={p(56)} y1={p(8)}  x2={p(8)}  y2={p(56)} stroke={node} strokeWidth={p(0.5)} opacity="0.18"/>
      {/* connector lines */}
      <line x1={p(10)} y1={p(10)} x2={p(32)} y2={p(32)} stroke={node}  strokeWidth={p(1.5)} opacity="0.5"/>
      <line x1={p(54)} y1={p(10)} x2={p(32)} y2={p(32)} stroke={node}  strokeWidth={p(1.5)} opacity="0.5"/>
      <line x1={p(10)} y1={p(54)} x2={p(32)} y2={p(32)} stroke={node}  strokeWidth={p(1.5)} opacity="0.5"/>
      <line x1={p(54)} y1={p(54)} x2={p(32)} y2={p(32)} stroke={blue}  strokeWidth={p(2)}   opacity="0.9"/>
      {/* outer nodes: 3 dark/white + 1 blue */}
      <circle cx={p(4)}  cy={p(4)}  r={p(6.5)} fill={node} opacity="0.9"/>
      <circle cx={p(60)} cy={p(4)}  r={p(6.5)} fill={node} opacity="0.9"/>
      <circle cx={p(4)}  cy={p(60)} r={p(6.5)} fill={node} opacity="0.9"/>
      <circle cx={p(60)} cy={p(60)} r={p(6.5)} fill={blue}/>
      {/* inner white/dark dots */}
      <circle cx={p(4)}  cy={p(4)}  r={p(2.4)} fill={dot}/>
      <circle cx={p(60)} cy={p(4)}  r={p(2.4)} fill={dot}/>
      <circle cx={p(4)}  cy={p(60)} r={p(2.4)} fill={dot}/>
      <circle cx={p(60)} cy={p(60)} r={p(2.4)} fill={dot}/>
      {/* center ring */}
      <circle cx={p(32)} cy={p(32)} r={p(11)}  fill={bg || "white"}  stroke={ring} strokeWidth={p(2.2)}/>
      <circle cx={p(32)} cy={p(32)} r={p(6)}   fill={ring}/>
      <circle cx={p(32)} cy={p(32)} r={p(2.4)} fill={bg || "white"}/>
    </svg>
  );
};

// ── SERVICES ──────────────────────────────────────────────────────────────────
// ── SERVICE ICONS (custom SVG, consistent flat style, 24x24 viewBox) ──────────
const SVC_ICONS = {
  seo: (c) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke={c} strokeWidth="1.6"/>
      <path d="M15 15l4.5 4.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7.5 10h5M10 7.5v5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 4l1 1-1.5 1.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  ),
  li: (c) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke={c} strokeWidth="1.6"/>
      <circle cx="8" cy="8.5" r="1.5" fill={c}/>
      <path d="M8 11.5v5" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 11.5v5M12 11.5c0-2 5-2 5 0v5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  sm: (c) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="5.5" cy="12" r="2.5" stroke={c} strokeWidth="1.6"/>
      <circle cx="18.5" cy="5.5" r="2.5" stroke={c} strokeWidth="1.6"/>
      <circle cx="18.5" cy="18.5" r="2.5" stroke={c} strokeWidth="1.6"/>
      <path d="M8 11l8-4.5M8 13l8 4.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <circle cx="18.5" cy="5.5" r="1" fill={c} opacity="0.4"/>
      <circle cx="18.5" cy="18.5" r="1" fill={c} opacity="0.4"/>
    </svg>
  ),
  cb: (c) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="5" width="13" height="9" rx="2.5" stroke={c} strokeWidth="1.6"/>
      <path d="M5.5 8.5h7M5.5 11h4.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
      <rect x="8.5" y="11.5" width="13" height="9" rx="2.5" stroke={c} strokeWidth="1.6"/>
      <path d="M11.5 15h7M11.5 17.5h4" stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
      <path d="M16 11.5V14" stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  vid: (c) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="5.5" width="14" height="13" rx="3" stroke={c} strokeWidth="1.6"/>
      <path d="M16.5 9.5l5-2.5v10l-5-2.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10.5l3.5 2-3.5 2v-4z" fill={c} opacity="0.7"/>
    </svg>
  ),
  wl: (c) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={c} strokeWidth="1.6"/>
      <rect x="13" y="3" width="8" height="8" rx="2" stroke={c} strokeWidth="1.6"/>
      <rect x="3" y="13" width="8" height="8" rx="2" stroke={c} strokeWidth="1.6"/>
      <rect x="13" y="13" width="8" height="8" rx="2" stroke={c} strokeWidth="1.6" opacity="0.4" strokeDasharray="2.5 2"/>
      <path d="M15.5 17h3M17 15.5v3" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
};

// Icon accent colors — one per service, consistent palette
const SVC_COLORS = ['#0ea5e9','#6366f1','#10b981','#f59e0b','#e879f9','#38bdf8'];
const SVC_BG     = [
  'linear-gradient(135deg,#e0f2fe,#bae6fd)',
  'linear-gradient(135deg,#ede9fe,#ddd6fe)',
  'linear-gradient(135deg,#dcfce7,#bbf7d0)',
  'linear-gradient(135deg,#fef3c7,#fde68a)',
  'linear-gradient(135deg,#fdf4ff,#f5d0fe)',
  'linear-gradient(135deg,#e0f2fe,#bfdbfe)',
];

const SVCS = [
  {id:"seo",  iconKey:"seo",  title:"KI-SEO & Content",          desc:"Blogartikel, Keywords & Social-Media-Content — automatisiert erstellt und veröffentlicht."},
  {id:"li",   iconKey:"li",   title:"LinkedIn Lead-Generierung",  desc:"Automatisierter Outreach mit KI-Targeting — täglich qualifizierte Anfragen."},
  {id:"sm",   iconKey:"sm",   title:"Social Media Management",    desc:"Redaktionsplan, Design und Posting — kanalübergreifend übernommen."},
  {id:"cb",   iconKey:"cb",   title:"Chatbot & Automatisierung",  desc:"Dein digitaler Mitarbeiter qualifiziert Anfragen rund um die Uhr."},
  {id:"vid",  iconKey:"vid",  title:"KI-Erklärvideos",            desc:"60-Sek. KI-Videos mit deinem Branding — skalierbar."},
  {id:"wl",   iconKey:"wl",   title:"White-Label",                desc:"Alle Services diskret unter deinem Label — für Agenturen und Freelancer."},
];

// ── SERVICE MODAL (4-Step) ────────────────────────────────────────────────────
function ServiceModal({ onClose, onFunnel }) {
  const [step, setStep]   = useState(1);
  const [d, setD]         = useState({ selected_services:[], goal:"", current_status:"", collaboration_type:"", budget:"", timeline:"", name:"", email:"", phone:"", message:"" });
  const [sent, setSent]   = useState(false);
  const set1 = (k,v) => setD(p=>({...p,[k]:v}));
  const tog  = id  => setD(p=>({...p,selected_services:p.selected_services.includes(id)?p.selected_services.filter(x=>x!==id):[...p.selected_services,id]}));
  const canNext = [d.selected_services.length>0, d.goal&&d.current_status, d.collaboration_type&&d.budget&&d.timeline, d.name.trim()&&d.email.trim()];

  const Opt = ({k,v,label,badge}) => (
    <button onClick={()=>set1(k,v)} className="choice-opt" style={{width:"100%",textAlign:"left",padding:"12px 16px",borderRadius:10,border:d[k]===v?"1.5px solid #0ea5e9":"1px solid #e2e8f0",background:d[k]===v?"rgba(14,165,233,0.06)":"#fafafa",cursor:"pointer",fontSize:14,color:"#0f172a",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,fontFamily:"'DM Sans',sans-serif"}}>
      {label}{badge&&<span style={{fontSize:10,background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",padding:"2px 8px",borderRadius:6,fontWeight:700}}>{badge}</span>}{d[k]===v&&!badge&&<span style={{color:"#0ea5e9",fontSize:13,fontWeight:700}}>✓</span>}
    </button>
  );

  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if(sending) return;
    setSending(true);
    const payload = JSON.stringify({
      name:            d.name.trim(),
      email:           d.email.trim(),
      phone:           d.phone.trim() || "–",
      leistungen:      d.selected_services.join(", "),
      ziel:            d.goal,
      aktueller_stand: d.current_status,
      zusammenarbeit:  d.collaboration_type,
      budget:          d.budget,
      zeitrahmen:      d.timeline,
      nachricht:       d.message.trim() || "–",
      quelle:          "Kontaktformular syntrixdigital.de",
      timestamp:       new Date().toISOString(),
    });
    // no-cors umgeht CORS-Blockade — Make empfängt die Daten trotzdem
    fetch("https://hook.eu1.make.com/czp5fuht1b3uwx1o3dk7bf65juot5qt2", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: payload,
    }).catch(()=>{});
    // Sofort auf Erfolg setzen — no-cors liefert keine Response
    setTimeout(()=>{ setSending(false); setSent(true); }, 800);
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(6px)"}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:20,maxWidth:560,width:"100%",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,0.18)"}} onClick={e=>e.stopPropagation()}>
        {sent ? (
          <div style={{padding:"56px 40px",textAlign:"center"}}>
            <div style={{fontSize:44,marginBottom:16}}>🎉</div>
            <h3 style={{fontFamily:"'Sora',sans-serif",fontSize:22,fontWeight:800,color:"#0f172a",marginBottom:10}}>Anfrage gesendet</h3>
            <p style={{fontSize:14,color:"#64748b",lineHeight:1.7,marginBottom:28}}>Wir melden uns innerhalb von 24 Stunden mit einem individuellen Angebot.</p>
            <button onClick={()=>{onClose();onFunnel();}} style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",border:"none",borderRadius:10,padding:"12px 26px",fontSize:14,fontWeight:700,cursor:"pointer",marginRight:10}}>Termin buchen →</button>
            <button onClick={onClose} style={{background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:10,padding:"12px 20px",fontSize:14,cursor:"pointer"}}>Schließen</button>
          </div>
        ) : (
          <div style={{padding:"32px 32px 28px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <h3 style={{fontFamily:"'Sora',sans-serif",fontSize:19,fontWeight:800,color:"#0f172a",marginBottom:4}}>Leistung anfragen</h3>
                <p style={{fontSize:13,color:"#94a3b8"}}>⏱ ca. 60–90 Sek. · 📩 Angebot in 24 h</p>
              </div>
              <button onClick={onClose} style={{background:"#f1f5f9",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:"#64748b",fontSize:15}}>✕</button>
            </div>
            <div style={{marginBottom:22}}>
              <div style={{height:3,background:"#f1f5f9",borderRadius:99}}>
                <div style={{height:"100%",width:`${step/4*100}%`,background:"linear-gradient(90deg,#0ea5e9,#6366f1)",borderRadius:99,transition:"width 0.4s"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                {["Leistungen","Ziel","Qualifizierung","Kontakt"].map((l,i)=><span key={i} style={{fontSize:10,fontWeight:600,color:i+1===step?"#0ea5e9":i+1<step?"#22c55e":"#cbd5e1"}}>{l}</span>)}
              </div>
            </div>

            {step===1 && <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
                {SVCS.map(s=>(
                  <button key={s.id} onClick={()=>tog(s.id)} className="choice-opt" style={{textAlign:"left",padding:"12px 14px",borderRadius:10,border:d.selected_services.includes(s.id)?"1.5px solid #6366f1":"1px solid #e2e8f0",background:d.selected_services.includes(s.id)?"rgba(99,102,241,0.06)":"#fafafa",cursor:"pointer"}}>
                    <div style={{fontSize:18,marginBottom:6}}>{s.icon}</div>
                    <div style={{fontSize:13,fontWeight:700,color:"#0f172a",fontFamily:"'Sora',sans-serif"}}>{s.title}</div>
                    {d.selected_services.includes(s.id)&&<div style={{fontSize:10,color:"#6366f1",marginTop:3,fontWeight:700}}>✓ Gewählt</div>}
                  </button>
                ))}
              </div>
              <button onClick={()=>d.selected_services.length>0&&setStep(2)} style={{width:"100%",background:d.selected_services.length>0?"linear-gradient(135deg,#0ea5e9,#6366f1)":"#e2e8f0",color:d.selected_services.length>0?"#fff":"#94a3b8",border:"none",borderRadius:10,padding:"13px",fontSize:14,fontWeight:700,cursor:d.selected_services.length>0?"pointer":"not-allowed"}}>Weiter →</button>
            </>}

            {step===2 && <>
              <p style={{fontSize:13,fontWeight:600,color:"#0f172a",marginBottom:10}}>Was möchtest du erreichen?</p>
              {["Mehr qualifizierte Anfragen","Vertrieb skalieren","Prozesse automatisieren","Kosten senken","Sonstiges"].map(v=><Opt key={v} k="goal" v={v} label={v}/>)}
              <p style={{fontSize:13,fontWeight:600,color:"#0f172a",margin:"18px 0 10px"}}>Wo stehst du aktuell?</p>
              {["Kein System vorhanden","Erste Maßnahmen laufen","Aktiver Funnel vorhanden","Bereits in Skalierung"].map(v=><Opt key={v} k="current_status" v={v} label={v}/>)}
              <div style={{display:"flex",gap:8,marginTop:14}}>
                <button onClick={()=>setStep(1)} style={{flex:1,background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:10,padding:"12px",fontSize:13,cursor:"pointer"}}>← Zurück</button>
                <button onClick={()=>canNext[1]&&setStep(3)} style={{flex:2,background:canNext[1]?"linear-gradient(135deg,#0ea5e9,#6366f1)":"#e2e8f0",color:canNext[1]?"#fff":"#94a3b8",border:"none",borderRadius:10,padding:"12px",fontSize:14,fontWeight:700,cursor:canNext[1]?"pointer":"not-allowed"}}>Weiter →</button>
              </div>
            </>}

            {step===3 && <>
              <p style={{fontSize:13,fontWeight:600,color:"#0f172a",marginBottom:10}}>Art der Zusammenarbeit</p>
              {[{v:"Einmalige Umsetzung",b:null},{v:"Laufende Betreuung & Optimierung",b:"Empfohlen"},{v:"Ich bin mir unsicher",b:null}].map(({v,b})=><Opt key={v} k="collaboration_type" v={v} label={v} badge={b}/>)}
              <p style={{fontSize:13,fontWeight:600,color:"#0f172a",margin:"16px 0 10px"}}>Monatliches Budget</p>
              {["unter 1.000 €","1.000–3.000 €","3.000–5.000 €","5.000 €+"].map(v=><Opt key={v} k="budget" v={v} label={v}/>)}
              <p style={{fontSize:13,fontWeight:600,color:"#0f172a",margin:"16px 0 10px"}}>Wann möchtest du starten?</p>
              {["Sofort","In 1–4 Wochen","Später"].map(v=><Opt key={v} k="timeline" v={v} label={v}/>)}
              <div style={{display:"flex",gap:8,marginTop:14}}>
                <button onClick={()=>setStep(2)} style={{flex:1,background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:10,padding:"12px",fontSize:13,cursor:"pointer"}}>← Zurück</button>
                <button onClick={()=>canNext[2]&&setStep(4)} style={{flex:2,background:canNext[2]?"linear-gradient(135deg,#0ea5e9,#6366f1)":"#e2e8f0",color:canNext[2]?"#fff":"#94a3b8",border:"none",borderRadius:10,padding:"12px",fontSize:14,fontWeight:700,cursor:canNext[2]?"pointer":"not-allowed"}}>Weiter →</button>
              </div>
            </>}

            {step===4 && <>
              {[{l:"Name *",k:"name",ph:"Max Mustermann",t:"text"},{l:"E-Mail *",k:"email",ph:"max@firma.de",t:"email"},{l:"Telefon (optional)",k:"phone",ph:"+49 123 456789",t:"tel"}].map(({l,k,ph,t})=>(
                <div key={k} style={{marginBottom:12}}>
                  <label style={{fontSize:12,color:"#94a3b8",display:"block",marginBottom:5}}>{l}</label>
                  <input value={d[k]} onChange={e=>set1(k,e.target.value)} placeholder={ph} type={t} style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid #e2e8f0",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif",color:"#0f172a"}}/>
                </div>
              ))}
              <div style={{marginBottom:14}}>
                <label style={{fontSize:12,color:"#94a3b8",display:"block",marginBottom:5}}>Weitere Informationen</label>
                <textarea value={d.message} onChange={e=>set1("message",e.target.value)} placeholder="Optional..." rows={3} style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid #e2e8f0",fontSize:14,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif",color:"#0f172a"}}/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setStep(3)} style={{flex:1,background:"#f1f5f9",color:"#64748b",border:"none",borderRadius:10,padding:"12px",fontSize:13,cursor:"pointer"}}>← Zurück</button>
                <button onClick={()=>canNext[3]&&!sending&&handleSubmit()} style={{flex:2,background:canNext[3]?"linear-gradient(135deg,#0ea5e9,#6366f1)":"#e2e8f0",color:canNext[3]?"#fff":"#94a3b8",border:"none",borderRadius:10,padding:"12px",fontSize:14,fontWeight:700,cursor:canNext[3]&&!sending?"pointer":"not-allowed",opacity:sending?0.7:1}}>{sending?"Wird gesendet…":"Anfrage senden →"}</button>
              </div>
              <p style={{fontSize:11,color:"#cbd5e1",textAlign:"center",marginTop:10}}>Wir prüfen jede Anfrage individuell und melden uns zeitnah, wenn wir echtes Potenzial sehen.</p>
            </>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── BEFORE/AFTER ──────────────────────────────────────────────────────────────
function BeforeAfter() {
  const rows=[
    {icon:"📅",p:"Kein Zeit für Marketing neben dem Tagesgeschäft",s:"Marketing läuft automatisch — auch wenn du schläfst"},
    {icon:"💸",p:"Agentur-Kosten für 5-stellige Monatshonorare",s:"Skalierbare Pakete ohne Personalbindung"},
    {icon:"🔀",p:"Kein Funnel — jede Maßnahme verpufft wirkungslos",s:"Strukturierter Funnel mit messbaren Ergebnissen"},
  ];
  return (
    <section style={{padding:"80px 5vw 0",background:"#fff"}}>
      <div style={{maxWidth:1080,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#6366f1",textTransform:"uppercase"}}>Vorher · Nachher</span>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(22px,4vw,40px)",fontWeight:800,color:"#0f172a",letterSpacing:"-0.025em",marginTop:12}}>Der Weg aus dem Marketing-Chaos</h2>
        </div>
        <div style={{borderRadius:16,overflow:"hidden",border:"1px solid #f0f0f0",boxShadow:"0 4px 20px rgba(0,0,0,0.05)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 44px 1fr"}}>
            <div style={{background:"#fef2f2",padding:"13px 20px",textAlign:"center"}}><span style={{fontSize:11,fontWeight:700,color:"#dc2626",letterSpacing:"0.08em"}}>✗ OHNE SYSTEM</span></div>
            <div style={{background:"#f8fafc"}}/>
            <div style={{background:"#f0fdf4",padding:"13px 20px",textAlign:"center"}}><span style={{fontSize:11,fontWeight:700,color:"#16a34a",letterSpacing:"0.08em"}}>✓ MIT SYNTRIX</span></div>
          </div>
          {rows.map((r,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 44px 1fr",borderTop:"1px solid #f5f5f5"}}>
              <div style={{background:i%2?"#fffbfb":"#fff9f9",padding:"18px 20px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:32,height:32,borderRadius:9,background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{r.icon}</div>
                <span style={{fontSize:13,color:"#7f1d1d",lineHeight:1.6}}>{r.p}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc",borderLeft:"1px solid #f0f0f0",borderRight:"1px solid #f0f0f0"}}>
                <span style={{fontSize:15,fontWeight:800,background:"linear-gradient(135deg,#0ea5e9,#6366f1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>→</span>
              </div>
              <div style={{background:i%2?"#f7fff9":"#f0fdf4",padding:"18px 20px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:32,height:32,borderRadius:9,background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>✓</div>
                <span style={{fontSize:13,color:"#14532d",lineHeight:1.6,fontWeight:500}}>{r.s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SYSTEM SECTION ────────────────────────────────────────────────────────────
function SystemSection({ onFunnel }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting) setVis(true);},{threshold:0.2});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);

  const glass={backdropFilter:"blur(12px)",borderRadius:20,padding:"28px 24px"};
  return (
    <section ref={ref} style={{padding:"100px 5vw",background:"linear-gradient(135deg,#0a0f1e,#0f172a,#0d1b35)"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#0ea5e9",textTransform:"uppercase"}}>Systemischer Ansatz</span>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(24px,4vw,48px)",fontWeight:800,color:"#fff",letterSpacing:"-0.025em",marginTop:12,marginBottom:10}}>Vom Chaos zum planbaren System</h2>
          <p style={{fontSize:16,color:"#475569",maxWidth:480,margin:"0 auto"}}>Kein Zufall. Ein strukturierter Weg zu messbaren Ergebnissen.</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:48,padding:"0 2%"}}>
          {["Chaos","","Kontrolle","","Wachstum"].map((l,i)=>
            i%2===0
              ? <span key={i} style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",color:["#ef4444","","#0ea5e9","","#22c55e"][i],textTransform:"uppercase"}}>{l}</span>
              : <div key={i} style={{flex:1,height:2,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",width:vis?"100%":"0%",background:`linear-gradient(90deg,${i===1?"#ef4444,#0ea5e9":"#0ea5e9,#22c55e"})`,transition:"width 1.8s ease",borderRadius:99}}/>
                </div>
          )}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 40px 1fr 40px 1fr",gap:0,alignItems:"stretch"}}>
          {/* CHAOS */}
          <div className="proc-card" style={{...glass,background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.18)",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",transition:"opacity 0.6s,transform 0.6s"}}>
            <div style={{width:48,height:48,borderRadius:14,background:"rgba(239,68,68,0.14)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>💥</div>
            <div style={{fontSize:10,fontWeight:700,color:"#ef4444",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>Phase 1</div>
            <h3 style={{fontFamily:"'Sora',sans-serif",fontSize:17,fontWeight:800,color:"#fff",marginBottom:16}}>Unstrukturierter Vertrieb</h3>
            {["Unregelmäßige Anfragen","Hohe Werbekosten ohne Ergebnis","Zeitverlust durch manuelle Prozesse"].map((b,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
                <span style={{color:"#ef4444",flexShrink:0,marginTop:2,fontSize:13}}>✗</span>
                <span style={{fontSize:13,color:"#94a3b8",lineHeight:1.6}}>{b}</span>
              </div>
            ))}
          </div>
          {/* Arrow */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:22,color:"#0ea5e9",opacity:vis?1:0,transition:"opacity 0.6s ease 0.4s"}}>→</span>
          </div>
          {/* SYSTEM */}
          <div className="proc-card" style={{...glass,background:"rgba(14,165,233,0.07)",border:"2px solid rgba(14,165,233,0.45)",boxShadow:"0 0 48px rgba(14,165,233,0.18)",position:"relative",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",transition:"opacity 0.6s ease 0.15s,transform 0.6s ease 0.15s"}}>
            <div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#0ea5e9,#6366f1)",borderRadius:100,padding:"3px 14px",fontSize:10,fontWeight:700,color:"#fff",whiteSpace:"nowrap"}}>⚡ Syntrix System</div>
            <div style={{width:48,height:48,borderRadius:14,background:"rgba(14,165,233,0.14)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16,marginTop:8}}>⚙️</div>
            <div style={{fontSize:10,fontWeight:700,color:"#0ea5e9",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>Phase 2</div>
            <h3 style={{fontFamily:"'Sora',sans-serif",fontSize:17,fontWeight:800,color:"#fff",marginBottom:16}}>Syntrix System</h3>
            {["Strukturierter Funnel","Automatisierte Leadqualifizierung","Datenbasierte Optimierung"].map((b,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
                <span style={{color:"#0ea5e9",flexShrink:0,marginTop:2,fontSize:13}}>✓</span>
                <span style={{fontSize:13,color:"#cbd5e1",lineHeight:1.6}}>{b}</span>
              </div>
            ))}
          </div>
          {/* Arrow */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:22,color:"#22c55e",opacity:vis?1:0,transition:"opacity 0.6s ease 0.6s"}}>→</span>
          </div>
          {/* ERGEBNIS */}
          <div className="proc-card" style={{...glass,background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.18)",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",transition:"opacity 0.6s ease 0.3s,transform 0.6s ease 0.3s"}}>
            <div style={{width:48,height:48,borderRadius:14,background:"rgba(34,197,94,0.14)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>🎯</div>
            <div style={{fontSize:10,fontWeight:700,color:"#22c55e",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>Phase 3</div>
            <h3 style={{fontFamily:"'Sora',sans-serif",fontSize:17,fontWeight:800,color:"#fff",marginBottom:16}}>Messbare Ergebnisse</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[
                {icon:"→", text:"Anfragen kommen planbar — nicht zufällig"},
                {icon:"→", text:"Dein Vertrieb qualifiziert sich von selbst vor"},
                {icon:"→", text:"Du weißt täglich, was dein System produziert"},
                {icon:"→", text:"Wachstum ohne mehr Arbeitszeit"},
              ].map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px",background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.12)",borderRadius:10}}>
                  <span style={{color:"#22c55e",fontSize:13,flexShrink:0,marginTop:1,fontWeight:700}}>{s.icon}</span>
                  <span style={{fontSize:13,color:"#cbd5e1",lineHeight:1.5}}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:52}}>
          <button onClick={onFunnel} className="cta-btn" style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",border:"none",borderRadius:14,padding:"16px 38px",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 24px rgba(14,165,233,0.3)"}}>Kostenlose Potenzialanalyse starten →</button>
          <p style={{fontSize:13,color:"#475569",marginTop:12}}>Finde heraus, wo dein aktuelles System Potenzial verliert.</p>
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────────────────────
function ProcessSection({ onFunnel, onModal }) {
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting) setVis(true);},{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const steps=[
    {num:"01",icon:"🔍",title:"Potenzialanalyse",sub:"kostenlos",text:"Wir analysieren deine aktuelle Situation, identifizieren Engpässe und zeigen dir konkret, wo Potenzial verloren geht.",note:"Keine Verkaufs-Show – echte Analyse mit Mehrwert",badge:"Startpunkt",c:"#0ea5e9",featured:true},
    {num:"02",icon:"🗺️",title:"Individuelle Strategie",text:"Basierend auf deinen Zielen entwickeln wir ein klares System aus Funnel, Kanälen und Automatisierungen.",c:"#a78bfa"},
    {num:"03",icon:"⚙️",title:"Umsetzung & Setup",text:"Wir bauen dein System vollständig auf – inklusive Funnel, Tracking und Automatisierungen. In 1–3 Wochen startklar.",c:"#10b981"},
    {num:"04",icon:"📊",title:"Optimierung & Skalierung",text:"Wir analysieren kontinuierlich die Daten und verbessern dein System für planbares Wachstum.",c:"#f59e0b"},
  ];
  return (
    <section ref={ref} id="prozess" style={{padding:"100px 5vw",background:"linear-gradient(170deg,#0a0f1e,#0d1225)"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{marginBottom:52}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#0ea5e9",textTransform:"uppercase"}}>Unser Prozess</span>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(24px,4vw,48px)",fontWeight:800,color:"#fff",letterSpacing:"-0.025em",marginTop:12,marginBottom:10}}>Von der Analyse zum skalierbaren System</h2>
          <p style={{fontSize:15,color:"#475569"}}>Ein klarer Prozess – von der ersten Analyse bis zu messbaren Ergebnissen</p>
        </div>
        {/* Timeline line */}
        <div style={{height:2,background:"rgba(255,255,255,0.05)",borderRadius:99,marginBottom:32,overflow:"hidden"}}>
          <div style={{height:"100%",width:vis?"100%":"0%",background:"linear-gradient(90deg,#0ea5e9,#a78bfa,#10b981,#f59e0b)",transition:"width 2s ease 0.3s",borderRadius:99}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr",gap:16}}>
          {steps.map((s,i)=>(
            <div key={i} className="proc-card" style={{background:s.featured?"rgba(14,165,233,0.07)":"rgba(255,255,255,0.025)",border:s.featured?`2px solid rgba(14,165,233,0.45)`:"1px solid rgba(255,255,255,0.07)",borderRadius:20,padding:s.featured?"28px 22px":"22px 18px",backdropFilter:"blur(10px)",position:"relative",boxShadow:s.featured?"0 0 40px rgba(14,165,233,0.15)":undefined,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",transition:`opacity 0.6s ease ${i*0.12}s,transform 0.6s ease ${i*0.12}s`}}>
              {s.badge&&<div style={{position:"absolute",top:-12,left:18,background:"linear-gradient(135deg,#0ea5e9,#6366f1)",borderRadius:100,padding:"3px 12px",fontSize:10,fontWeight:700,color:"#fff"}}>{s.badge}</div>}
              <div style={{fontSize:s.featured?28:22,marginBottom:12,marginTop:s.badge?8:0}}>{s.icon}</div>
              <div style={{fontSize:10,fontWeight:700,color:s.c,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{s.num}</div>
              <h3 style={{fontFamily:"'Sora',sans-serif",fontSize:s.featured?17:15,fontWeight:800,color:"#fff",marginBottom:s.sub?2:10}}>{s.title}</h3>
              {s.sub&&<div style={{fontSize:11,color:s.c,fontWeight:600,marginBottom:10}}>({s.sub})</div>}
              <p style={{fontSize:13,color:"#64748b",lineHeight:1.7,marginBottom:s.note?12:0}}>{s.text}</p>
              {s.note&&<div style={{padding:"8px 12px",background:"rgba(14,165,233,0.07)",borderRadius:8,border:"1px solid rgba(14,165,233,0.18)"}}><span style={{fontSize:11,color:"#7dd3fc"}}>{s.note}</span></div>}
            </div>
          ))}
        </div>
        <div style={{marginTop:48,display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <p style={{width:"100%",textAlign:"center",fontSize:13,color:"#475569",marginBottom:6}}>Wähle den Einstieg, der am besten zu deiner aktuellen Situation passt.</p>
          <button onClick={onFunnel} className="cta-btn" style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",border:"none",borderRadius:12,padding:"14px 32px",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 24px rgba(14,165,233,0.3)"}}>Kostenlose Potenzialanalyse starten</button>
          <button onClick={onModal} style={{background:"rgba(255,255,255,0.05)",color:"#fff",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,padding:"14px 26px",fontSize:15,cursor:"pointer"}}>Leistung direkt anfragen</button>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FaqSection({ onFunnel }) {
  const [open,setOpen]=useState(0);
  const faqs=[
    {q:"Welche Ergebnisse kann ich erwarten?",a:"Die Ergebnisse hängen stark von deiner Ausgangssituation ab. In der Regel sehen Kunden bereits innerhalb der ersten Wochen messbare Verbesserungen in Conversion, Leadqualität und Struktur. Je nach Projekt sind sowohl schnelle Ergebnisse möglich als auch der Aufbau eines nachhaltigen Systems für planbares Wachstum."},
    {q:"Wie schnell sehe ich erste Ergebnisse?",a:"Erste Optimierungen zeigen oft bereits nach wenigen Wochen Wirkung. Ein vollständig aufgebautes und skalierbares System entwickelt sich in der Regel innerhalb von 1–3 Monaten."},
    {q:"Was kostet die Zusammenarbeit?",a:"Die Investition hängt von Ziel, Umfang und Ausgangssituation ab. Wir erstellen für jedes Projekt ein individuelles Angebot – abgestimmt auf deine Anforderungen und Ziele."},
    {q:"Was unterscheidet euch von anderen Agenturen?",a:"Wir verbinden kreative Ansätze mit datengetriebener Arbeitsweise. Je nach Bedarf setzen wir gezielte Maßnahmen um oder entwickeln vollständige Systeme zur Kundengewinnung. Der Fokus liegt dabei immer auf messbaren Ergebnissen und nachhaltiger Optimierung."},
    {q:"Was ist der nächste Schritt?",a:"Der erste Schritt ist eine kostenlose Potenzialanalyse. Dabei analysieren wir deine aktuelle Situation und zeigen dir konkret, wo Potenzial liegt und wie ein mögliches System für dich aussehen kann."},
  ];
  return (
    <section id="faq" style={{padding:"100px 5vw",background:"linear-gradient(170deg,#070c18,#0a0f1e)"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#0ea5e9",textTransform:"uppercase"}}>FAQ</span>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(24px,4vw,44px)",fontWeight:800,color:"#fff",letterSpacing:"-0.025em",marginTop:12,marginBottom:8}}>Häufige Fragen</h2>
          <p style={{fontSize:14,color:"#475569"}}>Klare Antworten auf die wichtigsten Fragen zur Zusammenarbeit</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {faqs.map((f,i)=>(
            <div key={i} className="faq-row" onClick={()=>setOpen(open===i?-1:i)} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,overflow:"hidden",backdropFilter:"blur(8px)"}}>
              <div style={{padding:"18px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                <span style={{fontSize:15,fontWeight:600,color:"#f1f5f9",fontFamily:"'Sora',sans-serif"}}>{f.q}</span>
                <div style={{width:26,height:26,borderRadius:"50%",background:open===i?"linear-gradient(135deg,#0ea5e9,#6366f1)":"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:700,flexShrink:0,transition:"background 0.25s"}}>{open===i?"−":"+"}</div>
              </div>
              {open===i&&<div style={{padding:"0 22px 20px",fontSize:14,color:"#64748b",lineHeight:1.8}}>{f.a}</div>}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:44}}>
          <button onClick={onFunnel} className="cta-btn" style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",border:"none",borderRadius:12,padding:"15px 34px",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 24px rgba(14,165,233,0.3)"}}>Kostenlose Potenzialanalyse starten →</button>
          <p style={{fontSize:12,color:"#334155",marginTop:10}}>Finde heraus, welches Potenzial aktuell ungenutzt bleibt.</p>
        </div>
      </div>
    </section>
  );
}

// ── POTENZIAL FUNNEL ──────────────────────────────────────────────────────────
const QS=[
  {id:"q1",text:"Hast du aktuell ein System zur Kundengewinnung?",opts:["Kein System","Einzelne Maßnahmen","Struktur vorhanden","Klarer Funnel + Prozesse"],scores:[0,2,3,4]},
  {id:"q2",text:"Wie gewinnst du aktuell Kunden?",opts:["Empfehlungen","Social Media","Ads","Mischung","Unklar"],scores:[1,2,3,4,0]},
  {id:"q3",text:"Wie viele Anfragen bekommst du monatlich?",opts:["0–5","5–15","15–30","30+"],scores:[0,2,3,4]},
  {id:"q4",text:"Wie planbar sind deine Anfragen?",opts:["Gar nicht planbar","Schwankend","Teilweise stabil","Sehr stabil"],scores:[0,1,3,4]},
  {id:"q5",text:"Nutzt du aktuell bezahlte Werbung?",opts:["Nein","Ja, ohne klare Strategie","Ja, mit Struktur","Ja, profitabel"],scores:[0,1,3,4]},
  {id:"q6",text:"Hast du einen Funnel / Customer Journey?",opts:["Nein","Teilweise","Ja, nicht optimiert","Ja, funktioniert gut"],scores:[0,1,2,4]},
  {id:"q7",text:"Wie hoch ist dein durchschnittlicher Kundenwert?",opts:["unter 500 €","500–2.000 €","2.000–5.000 €","5.000 €+"],scores:[0,2,3,4]},
  {id:"q8",text:"Was ist aktuell dein größtes Problem?",opts:["Zu wenig Anfragen","Schlechte Leadqualität","Zu hohe Kosten","Kein System"],scores:[2,2,2,0]},
  {id:"q9",text:"Wie schnell möchtest du Ergebnisse sehen?",opts:["Sofort","1–3 Monate","3–6 Monate","Langfristig"],scores:[4,3,2,1]},
  {id:"q10",text:"Bist du bereit, in Wachstum zu investieren?",opts:["Nein","Vielleicht","Ja","Ja, aktiv"],scores:[0,1,3,4]},
];
function calcResult(ans){
  let sc=0;
  QS.forEach(q=>{const i=q.opts.indexOf(ans[q.id]);if(i>=0) sc+=q.scores[i];});
  const max=QS.reduce((s,q)=>s+Math.max(...q.scores),0),pct=Math.round(sc/max*100);
  const prob=ans["q8"]||"Unklares System";
  let status,statusColor,opp,next;
  if(pct<35){status="🔴 Unstrukturiert";statusColor="#ef4444";opp="Aufbau eines systematischen Funnels";next="Unverbindliches Erstgespräch buchen";}
  else if(pct<65){status="🟡 Im Aufbau";statusColor="#f59e0b";opp="Optimierung & Automatisierung bestehender Prozesse";next="Unverbindliches Erstgespräch vereinbaren";}
  else{status="🟢 Skalierbar";statusColor="#22c55e";opp="Skalierung & Effizienzsteigerung";next="Unverbindliches Erstgespräch für Skalierungsplan";}
  return{score:pct,status,statusColor,problem:prob,opportunity:opp,next};
}
function PotenzialFunnel({ onBack, onCalendly }) {
  const [step,setStep]=useState(0);
  const [ans,setAns]=useState({});
  const [lead,setLead]=useState({name:"",email:"",phone:""});
  const [result,setResult]=useState(null);
  const [vis,setVis]=useState(true);
  const [dir,setDir]=useState(1);
  const total=10,q=QS[step];

  const pick=(opt)=>{
    setAns(a=>({...a,[q.id]:opt}));
    setVis(false);
    setTimeout(()=>{
      setDir(1);
      step<total-1?setStep(s=>s+1):setStep(10);
      setVis(true);
    },320);
  };

  const goBack=()=>{
    if(step===0){onBack();return;}
    setVis(false);
    setTimeout(()=>{setDir(-1);setStep(s=>s-1);setVis(true);},220);
  };

  const submit=()=>{
    if(!lead.name.trim()||!lead.email.trim()) return;
    const r=calcResult(ans);setResult(r);setStep(11);
  };

  const goBook=()=>{
    fetch("https://hook.eu1.make.com/czp5fuht1b3uwx1o3dk7bf65juot5qt2",{
      method:"POST",mode:"no-cors",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name:lead.name,email:lead.email,phone:lead.phone||"–",
        score:result?.score+"/100",status:result?.status,
        problem:result?.problem,opportunity:result?.opportunity,
        quelle:"Potenzialanalyse syntrixdigital.de",
        timestamp:new Date().toISOString()
      })
    }).catch(()=>{});
    onCalendly({...lead,...result,params:""});
  };

  const pct = step<10 ? Math.round((step+1)/total*100) : 100;

  return (
    <div style={{minHeight:"100vh",background:"#fafafa",fontFamily:"'DM Sans',sans-serif",display:"flex",flexDirection:"column"}}>
      <link href={FONT} rel="stylesheet"/>
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:translateY(0)}}
        .qa-card{
          border:1.5px solid #e8edf2;
          border-radius:16px;
          padding:18px 20px;
          background:#fff;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:16px;
          transition:all 0.22s ease;
          text-align:left;
          width:100%;
        }
        .qa-card:hover{
          border-color:#0ea5e9;
          background:#f0f9ff;
          transform:translateX(4px);
          box-shadow:0 4px 20px rgba(14,165,233,0.1);
        }
        .qa-card.selected{
          border-color:#0ea5e9;
          background:linear-gradient(135deg,rgba(14,165,233,0.08),rgba(99,102,241,0.05));
          box-shadow:0 4px 24px rgba(14,165,233,0.15);
        }
        .qa-letter{
          width:36px;height:36px;border-radius:10px;
          background:#f1f5f9;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:700;color:#94a3b8;
          flex-shrink:0;transition:all 0.22s;
          font-family:'Sora',sans-serif;
        }
        .qa-card.selected .qa-letter{
          background:linear-gradient(135deg,#0ea5e9,#6366f1);
          color:#fff;
        }
        .qa-card:hover:not(.selected) .qa-letter{
          background:#e0f2fe;color:#0ea5e9;
        }
        .funnel-input{
          width:100%;padding:14px 16px;border-radius:12px;
          border:1.5px solid #e8edf2;background:#fff;
          font-size:15px;color:#0f172a;outline:none;
          font-family:'DM Sans',sans-serif;
          transition:border-color 0.2s,box-shadow 0.2s;
          box-sizing:border-box;
        }
        .funnel-input:focus{
          border-color:#0ea5e9;
          box-shadow:0 0 0 3px rgba(14,165,233,0.12);
        }
        .funnel-input::placeholder{color:#cbd5e1}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(250,250,250,0.97)",backdropFilter:"blur(12px)",borderBottom:"1px solid #f1f5f9",padding:"16px 24px"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <button onClick={goBack} style={{background:"none",border:"none",color:"#94a3b8",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'DM Sans',sans-serif",padding:0}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Zurück
            </button>
            <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:0}}>
              <Logo size={24} dark={false}/>
              <span style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:15,color:"#0f172a"}}>Syntrix<span style={{color:"#0ea5e9"}}>.</span><span style={{fontWeight:300,fontSize:"0.88em",color:"#94a3b8"}}>Digital</span></span>
            </button>
            <span style={{fontSize:12,color:"#94a3b8",fontWeight:600,fontFamily:"'Sora',sans-serif"}}>
              {step<10?`${step+1} / ${total}`:step===10?"Fast da":"✓"}
            </span>
          </div>
          {/* Progress Bar */}
          <div style={{position:"relative",height:4,background:"#f1f5f9",borderRadius:99,overflow:"hidden"}}>
            <div style={{
              position:"absolute",top:0,left:0,height:"100%",
              width:`${pct}%`,
              background:"linear-gradient(90deg,#0ea5e9,#6366f1)",
              borderRadius:99,
              transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)"
            }}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{fontSize:11,color:"#cbd5e1"}}>{step<10?"Kostenlose Potenzialanalyse":""}</span>
            <span style={{fontSize:11,color:"#0ea5e9",fontWeight:700}}>{pct}%</span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 20px 80px"}}>
        <div style={{
          maxWidth:560,width:"100%",
          opacity:vis?1:0,
          transform:vis?"translateY(0)":"translateY(16px)",
          transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)"
        }}>

          {/* ── FRAGEN (step 0–9) ── */}
          {step<10&&(
            <div>
              <div style={{marginBottom:40}}>
                <div style={{
                  display:"inline-flex",alignItems:"center",gap:6,
                  background:"linear-gradient(135deg,rgba(14,165,233,0.1),rgba(99,102,241,0.08))",
                  border:"1px solid rgba(14,165,233,0.2)",
                  borderRadius:100,padding:"5px 14px",marginBottom:20
                }}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#0ea5e9"}}/>
                  <span style={{fontSize:11,fontWeight:700,color:"#0ea5e9",letterSpacing:"0.08em",textTransform:"uppercase"}}>Frage {step+1} von {total}</span>
                </div>
                <h2 style={{
                  fontFamily:"'Sora',sans-serif",
                  fontSize:"clamp(20px,3.5vw,28px)",
                  fontWeight:900,
                  color:"#0f172a",
                  lineHeight:1.25,
                  letterSpacing:"-0.02em",
                  marginBottom:8
                }}>{q.text}</h2>
                <p style={{fontSize:13,color:"#94a3b8"}}>Wähle die Option die am besten passt</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {q.opts.map((opt,i)=>(
                  <button
                    key={i}
                    onClick={()=>pick(opt)}
                    className={`qa-card${ans[q.id]===opt?" selected":""}`}
                  >
                    <div className="qa-letter">
                      {ans[q.id]===opt?(
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ):["A","B","C","D","E"][i]}
                    </div>
                    <span style={{fontSize:15,fontWeight:500,color:ans[q.id]===opt?"#0f172a":"#334155",flex:1}}>{opt}</span>
                    {ans[q.id]===opt&&(
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12l4-4-4-4" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── KONTAKTDATEN (step 10) ── */}
          {step===10&&(
            <div>
              <div style={{marginBottom:36}}>
                <div style={{
                  width:56,height:56,borderRadius:16,
                  background:"linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.1))",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  marginBottom:20,fontSize:26
                }}>🎯</div>
                <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(22px,3.5vw,30px)",fontWeight:900,color:"#0f172a",letterSpacing:"-0.025em",marginBottom:10}}>Fast geschafft.</h2>
                <p style={{fontSize:15,color:"#64748b",lineHeight:1.7,maxWidth:420}}>Trag deine Kontaktdaten ein — wir senden dir deine persönliche Auswertung!</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[
                  {l:"Dein Name",k:"name",ph:"Max Mustermann",t:"text",icon:"👤"},
                  {l:"E-Mail-Adresse",k:"email",ph:"max@firma.de",t:"email",icon:"✉️"},
                  {l:"Telefon (optional)",k:"phone",ph:"+49 123 456789",t:"tel",icon:"📞"}
                ].map(({l,k,ph,t,icon})=>(
                  <div key={k}>
                    <label style={{fontSize:13,fontWeight:600,color:"#0f172a",display:"block",marginBottom:7}}>{l}</label>
                    <input
                      value={lead[k]}
                      onChange={e=>setLead(p=>({...p,[k]:e.target.value}))}
                      placeholder={ph}
                      type={t}
                      className="funnel-input"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={submit}
                disabled={!lead.name.trim()||!lead.email.trim()}
                style={{
                  width:"100%",marginTop:20,
                  background:lead.name.trim()&&lead.email.trim()
                    ?"linear-gradient(135deg,#0ea5e9,#6366f1)"
                    :"#f1f5f9",
                  color:lead.name.trim()&&lead.email.trim()?"#fff":"#cbd5e1",
                  border:"none",borderRadius:12,padding:"16px",
                  fontSize:15,fontWeight:700,
                  cursor:lead.name.trim()&&lead.email.trim()?"pointer":"not-allowed",
                  fontFamily:"'Sora',sans-serif",
                  transition:"all 0.2s",
                  boxShadow:lead.name.trim()&&lead.email.trim()?"0 4px 20px rgba(14,165,233,0.3)":"none"
                }}
              >
                Auswertung anzeigen →
              </button>
              <p style={{fontSize:12,color:"#cbd5e1",textAlign:"center",marginTop:12}}>Kein Spam · Nur echte Analyse-Ergebnisse</p>

            </div>
          )}

          {/* ── ERGEBNIS (step 11) ── */}
          {step===11&&result&&(
            <div>
              <div style={{textAlign:"center",marginBottom:32}}>
                <div style={{
                  display:"inline-block",
                  background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.25)",
                  color:"#22c55e",borderRadius:100,padding:"5px 16px",
                  fontSize:12,fontWeight:700,marginBottom:20
                }}>✓ Analyse abgeschlossen</div>
                <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(22px,4vw,32px)",fontWeight:900,color:"#0f172a",letterSpacing:"-0.025em"}}>
                  Dein Ergebnis{lead.name?`, ${lead.name.split(" ")[0]}`:""}.
                </h2>
              </div>

              {/* Score Ring */}
              <div style={{
                background:"#fff",border:"1px solid #f1f5f9",borderRadius:24,
                padding:"32px 24px",textAlign:"center",marginBottom:16,
                boxShadow:"0 4px 24px rgba(15,23,42,0.06)"
              }}>
                <div style={{position:"relative",width:130,height:130,margin:"0 auto 16px"}}>
                  <svg viewBox="0 0 130 130" style={{position:"absolute",inset:0,transform:"rotate(-90deg)"}}>
                    <circle cx="65" cy="65" r="56" fill="none" stroke="#f1f5f9" strokeWidth="10"/>
                    <circle cx="65" cy="65" r="56" fill="none" stroke="url(#sg2)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${result.score/100*352} 352`}/>
                    <defs><linearGradient id="sg2" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#0ea5e9"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs>
                  </svg>
                  <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <div style={{fontSize:36,fontWeight:900,color:"#0f172a",fontFamily:"'Sora',sans-serif",lineHeight:1}}>{result.score}</div>
                    <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>/ 100</div>
                  </div>
                </div>
                <div style={{fontSize:18,fontWeight:700,color:result.statusColor,fontFamily:"'Sora',sans-serif"}}>{result.status}</div>
              </div>

              {/* Ergebnis-Karten */}
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                {[
                  {l:"Größtes Problem",v:result.problem,c:"#ef4444",bg:"#fff5f5",border:"#fecaca"},
                  {l:"Größtes Potenzial",v:result.opportunity,c:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd"},
                  {l:"Empfohlener nächster Schritt",v:result.next,c:"#22c55e",bg:"#f0fdf4",border:"#bbf7d0"}
                ].map(({l,v,c,bg,border})=>(
                  <div key={l} style={{
                    background:bg,border:`1px solid ${border}`,
                    borderRadius:14,padding:"16px 18px"
                  }}>
                    <div style={{fontSize:10,fontWeight:700,color:c,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{l}</div>
                    <div style={{fontSize:14,color:"#0f172a",lineHeight:1.6,fontWeight:500}}>{v}</div>
                  </div>
                ))}
              </div>

              <button onClick={goBook} className="cta-btn" style={{
                width:"100%",
                background:"linear-gradient(135deg,#0ea5e9,#6366f1)",
                color:"#fff",border:"none",borderRadius:13,padding:"17px",
                fontSize:16,fontWeight:700,cursor:"pointer",
                fontFamily:"'Sora',sans-serif",
                boxShadow:"0 6px 28px rgba(14,165,233,0.35)",
                marginBottom:10
              }}>
                Jetzt unverbindliches Erstgespräch buchen →
              </button>
              <p style={{fontSize:12,color:"#94a3b8",textAlign:"center"}}>Kostenlos · 30 Minuten · Konkrete Strategie</p>
            </div>
          )}

        </div>
      </div>

      {/* ── TRUST FOOTER ── */}
      <div style={{
        borderTop:"1px solid #f1f5f9",
        padding:"16px 24px",
        background:"rgba(250,250,250,0.97)",
      }}>
        <div style={{
          maxWidth:600,margin:"0 auto",
          display:"flex",justifyContent:"center",
          gap:24,flexWrap:"wrap"
        }}>
          {[
            {icon:"🔒",text:"SSL-verschlüsselt"},
            {icon:"🇩🇪",text:"DSGVO-konform"},
            {icon:"✓",text:"Keine versteckten Kosten"},
            {icon:"✓",text:"Kein Spam"},
          ].map(({icon,text})=>(
            <div key={text} style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:13}}>{icon}</span>
              <span style={{fontSize:11,color:"#94a3b8",fontWeight:500}}>{text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── CALENDLY ──────────────────────────────────────────────────────────────────
function CalendlyPage({ leadData, onBack }) {
  useEffect(()=>{
    const s=document.createElement("script");s.src="https://assets.calendly.com/assets/external/widget.js";s.async=true;document.body.appendChild(s);
    return()=>{try{document.body.removeChild(s);}catch(e){}};
  },[]);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#070c18,#0f172a)",padding:"48px 20px",fontFamily:"'DM Sans',sans-serif"}}>
      <link href={FONT} rel="stylesheet"/>
      <div style={{maxWidth:740,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
            <button onClick={onBack} style={{background:"none",border:"none",color:"#475569",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'DM Sans',sans-serif"}}>← Zurück</button>
            <button onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0}}>
              <Logo size={32}/><span style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:20,color:"#fff"}}>Syntrix<span style={{color:"#0ea5e9"}}>.</span><span style={{fontWeight:300,fontSize:"0.88em",color:"#94a3b8"}}>Digital</span></span>
            </button>
            <div style={{width:60}}/>
          </div>
          {leadData?.score ? (
            <>
              <div style={{display:"inline-block",background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.25)",color:"#22c55e",borderRadius:100,padding:"5px 18px",fontSize:12,fontWeight:700,marginBottom:18}}>✓ Analyse abgeschlossen</div>
              <h1 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(22px,4vw,38px)",fontWeight:800,color:"#fff",marginBottom:12,letterSpacing:"-0.02em"}}>
                {leadData.name?`Fast geschafft, ${leadData.name.split(" ")[0]}!`:"Fast geschafft!"}
              </h1>
              <p style={{fontSize:16,color:"#475569",maxWidth:460,margin:"0 auto",lineHeight:1.7}}>Buche deinen <strong style={{color:"#fff"}}>kostenlosen 30-Minuten Termin</strong> — wir bringen deine Analyse-Ergebnisse direkt mit.</p>
            </>
          ) : (
            <>
              <h1 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(22px,4vw,38px)",fontWeight:800,color:"#fff",marginBottom:12,letterSpacing:"-0.02em"}}>Unverbindliches Erstgespräch buchen.</h1>
              <p style={{fontSize:16,color:"#475569",maxWidth:460,margin:"0 auto",lineHeight:1.7}}>Buche deinen <strong style={{color:"#fff"}}>kostenlosen 30-Minuten Termin</strong> — wir schauen gemeinsam wo dein Marketing Potenzial hat.</p>
            </>
          )}
        </div>
        {leadData?.score&&<div style={{background:"rgba(14,165,233,0.07)",border:"1px solid rgba(14,165,233,0.18)",borderRadius:12,padding:"12px 20px",marginBottom:24,textAlign:"center"}}><span style={{fontSize:13,color:"#7dd3fc"}}>Score: {leadData.score}/100 · {leadData.status}</span></div>}
        <div style={{display:"flex",justifyContent:"center",gap:22,marginBottom:28,flexWrap:"wrap"}}>
          {leadData?.score
            ? ["✓ Kostenlos","✓ 30 Minuten","✓ Analyse wird mitgebracht"].map(b=><span key={b} style={{fontSize:13,color:"#334155",fontWeight:600}}>{b}</span>)
            : ["✓ Kostenlos","✓ 30 Minuten","✓ Keine Verpflichtung"].map(b=><span key={b} style={{fontSize:13,color:"#334155",fontWeight:600}}>{b}</span>)
          }
        </div>
        <div style={{background:"rgba(255,255,255,0.02)",borderRadius:20,border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden",minHeight:650}}>
          <div className="calendly-inline-widget" data-url={`https://calendly.com/kontakt-syntrixdigital/30min?hide_gdpr_banner=1&primary_color=0ea5e9`} style={{minWidth:320,height:700}}/>
        </div>
        <p style={{textAlign:"center",fontSize:12,color:"#334155",marginTop:20}}>Lieber schreiben? <a href="mailto:info@syntrixdigital.de" style={{color:"#0ea5e9",textDecoration:"none"}}>info@syntrixdigital.de</a></p>
      </div>
    </div>
  );
}

// ── LEGAL ─────────────────────────────────────────────────────────────────────
function LegalPage({ type, onBack }) {
  const imp=[
    ["Angaben gemäß § 5 TMG",["Johannes Rempel","Syntrix Digital (Einzelunternehmen)","Kunibertweg 13","59494 Soest","Deutschland"]],
    ["Kontakt",["Telefon: +49 2921 370 20 21","E-Mail: johannes@syntrixdigital.de","Web: www.syntrixdigital.de"]],
    ["Steuerliche Angaben",["Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).","Steuernummer: wird nachgereicht"]],
    ["Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",["Johannes Rempel, Kunibertweg 13, 59494 Soest"]],
    ["Haftung für Inhalte",["Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich."]],
    ["Haftung für Links",["Unser Angebot enthält Links zu externen Websites. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich."]],
    ["Urheberrecht",["Die durch den Seitenbetreiber erstellten Inhalte unterliegen dem deutschen Urheberrecht. Vervielfältigung und Verbreitung bedürfen der schriftlichen Zustimmung des Autors."]],
    ["Streitschlichtung",["Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: https://ec.europa.eu/consumers/odr/","Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."]]
  ];
  const ds=[
    ["1. Verantwortlicher",["Johannes Rempel · Syntrix Digital (Einzelunternehmen)","Kunibertweg 13, 59494 Soest","E-Mail: johannes@syntrixdigital.de","Telefon: +49 2921 370 20 21"]],
    ["2. Hosting (IONOS)",["Diese Website wird gehostet bei IONOS SE, Elgendorfer Str. 57, 56410 Montabaur. Bei Aufruf der Website werden Server-Logfiles erhoben (IP-Adresse, Browsertyp, Datum/Uhrzeit). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO."]],
    ["3. SSL-/TLS-Verschlüsselung",["Diese Website nutzt SSL-/TLS-Verschlüsselung für eine sichere Datenübertragung."]],
    ["4. Kontaktformular & E-Mail",["Bei Kontaktaufnahme per E-Mail oder Formular werden Name, E-Mail, ggf. Telefonnummer und Nachricht zur Bearbeitung gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO. Keine Weitergabe an Dritte."]],
    ["5. Terminbuchung über Calendly",["Für die Terminbuchung nutzen wir Calendly LLC, 271 17th St NW, Atlanta, GA 30363, USA. Bei Buchung werden Name und E-Mail übermittelt. Mögliche Datenübermittlung in die USA. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Datenschutz: https://calendly.com/privacy"]],
    ["6. Formulardaten & Automatisierung",["Anfragen werden zur Verarbeitung an Make.com und HubSpot Inc. weitergeleitet. Dies dient ausschließlich der Anfragenbearbeitung. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO."]],
    ["7. Webanalyse (Plausible Analytics)",["Diese Website nutzt Plausible Analytics — ein datenschutzfreundliches Tool ohne Cookies und ohne Erfassung personenbezogener Daten. Keine IP-Adressen werden gespeichert. Weitere Infos: https://plausible.io/privacy"]],
    ["8. Cookies & Consent (CookieHub)",["Technisch notwendige Cookies werden ohne Einwilligung gesetzt. Für alle weiteren Cookies wird Ihre Einwilligung über CookieHub eingeholt. Rechtsgrundlage: Art. 6 Abs. 1 lit. a und f DSGVO."]],
    ["9. Ihre Rechte",["Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO).","Kontakt: johannes@syntrixdigital.de"]],
    ["10. Beschwerderecht",["Sie können sich bei der Landesbeauftragten für Datenschutz und Informationsfreiheit NRW beschweren: www.ldi.nrw.de"]],
    ["11. Aktualität",["Diese Datenschutzerklärung gilt ab April 2026 und kann bei Bedarf angepasst werden."]]
  ];
  const secs=type==="impressum"?imp:ds;
  return (
    <div style={{minHeight:"100vh",background:"#070c18",padding:"60px 20px",fontFamily:"'DM Sans',sans-serif"}}>
      <link href={FONT} rel="stylesheet"/>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"#0ea5e9",fontSize:14,cursor:"pointer",marginBottom:30,fontWeight:600}}>← Zurück</button>
        <h1 style={{fontFamily:"'Sora',sans-serif",fontSize:30,fontWeight:800,color:"#fff",marginBottom:30}}>{type==="impressum"?"Impressum":"Datenschutzerklärung"}</h1>
        {secs.map(([t,items])=>(<div key={t} style={{marginBottom:26}}><h2 style={{fontFamily:"'Sora',sans-serif",fontSize:15,fontWeight:700,color:"#fff",marginBottom:9}}>{t}</h2>{items.map((it,i)=><p key={i} style={{fontSize:13,color:"#475569",lineHeight:1.8,marginBottom:4}}>{it}</p>)}</div>))}
      </div>
    </div>
  );
}

// ── FUNNEL CANVAS ─────────────────────────────────────────────────────────────
function FunnelCanvas() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W   = canvas.width  = 460;
    const H   = canvas.height = 500;
    const cx  = 190;                   // funnel center X (left of mid to leave room right)

    const lerp = (a, b, f) => a + (b - a) * f;

    // ── Funnel geometry ──
    const TOP   = { y: 55,  hw: 125 };
    const WAIST = { y: 215, hw: 26  };
    const SPOUT = { y: 285, hw: 16  };
    const fHW   = y => {
      if (y <= WAIST.y) {
        const f = (y - TOP.y) / (WAIST.y - TOP.y);
        return lerp(TOP.hw, WAIST.hw, Math.max(0, Math.min(1, f)));
      }
      const f = (y - WAIST.y) / (SPOUT.y - WAIST.y);
      return lerp(WAIST.hw, SPOUT.hw, Math.max(0, Math.min(1, f)));
    };

    // ── CHAOS particles (messy, many, random colors - simulate "viel Arbeit") ──
    const chaosP = Array.from({ length: 70 }, () => ({
      x:    (Math.random() - 0.5) * 230,
      y:    -30 - Math.random() * 100,
      vy:   0.55 + Math.random() * 0.7,
      vx:   (Math.random() - 0.5) * 0.6,
      r:    0.9 + Math.random() * 1.8,
      col:  Math.floor(Math.random() * 4),   // 0=red/orange chaos, 1=grey, 2=blue, 3=purple
      op:   0.35 + Math.random() * 0.5,
      ph:   Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.08,
    }));

    // ── RIGHT SIDE: relief flow nodes ──
    // 3 floating cards to the right of funnel showing the "Erleichterung"
    const reliefNodes = [
      { label: 'Chaos',        sub: 'Unstrukturiert',  y: 95,  col: [239, 68, 68],    phase: 0 },
      { label: 'System',       sub: 'KI-gestützt',     y: 180, col: [14, 165, 233],   phase: 1.4 },
      { label: 'Erleichterung',sub: 'Automatisiert',   y: 262, col: [52, 211, 153],   phase: 2.8 },
    ];

    // arrow flow dots between relief nodes
    const flowDots = reliefNodes.slice(0, -1).map(() =>
      Array.from({ length: 5 }, (_, i) => ({ progress: i / 5, speed: 0.005 + Math.random() * 0.004 }))
    );

    // ── EXPLOSION particles (bottom success burst) ──
    const BOOM_COUNT = 32;
    const boomP = Array.from({ length: BOOM_COUNT }, (_, i) => {
      const angle = (i / BOOM_COUNT) * Math.PI * 2 + Math.random() * 0.3;
      return {
        angle,
        speed:   0.6 + Math.random() * 1.2,
        radius:  4 + Math.random() * 8,
        maxR:    55 + Math.random() * 40,
        r:       1 + Math.random() * 1.8,
        col:     i % 3,   // 0=gold, 1=blue, 2=green
        phase:   Math.random() * Math.PI * 2,
      };
    });
    // explosion cycle time
    let boomT = 0;

    let t = 0;

    const COLS = {
      chaos:  (a) => `rgba(239,68,68,${a})`,
      grey:   (a) => `rgba(148,163,184,${a})`,
      blue:   (a) => `rgba(56,189,248,${a})`,
      purple: (a) => `rgba(129,140,248,${a})`,
      green:  (a) => `rgba(52,211,153,${a})`,
      gold:   (a) => `rgba(251,191,36,${a})`,
      white:  (a) => `rgba(255,255,255,${a})`,
    };

    const particleColor = (p, frac) => {
      // chaos → order: red/orange at top, blue/purple mid, green at exit
      if (frac < 0.35) {
        const sub = frac / 0.35;
        return [lerp(239,56,sub), lerp(68,189,sub), lerp(68,248,sub)];
      }
      if (frac < 0.75) {
        const sub = (frac - 0.35) / 0.4;
        return [lerp(56,99,sub), lerp(189,102,sub), lerp(248,241,sub)];
      }
      const sub = (frac - 0.75) / 0.25;
      return [lerp(99,52,sub), lerp(102,211,sub), lerp(241,153,sub)];
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t    += 0.016;
      boomT = (boomT + 0.014) % (Math.PI * 2);

      // ─── A. RIGHT SIDE: Relief flow cards ─────────────────────────────
      const cardX = cx + TOP.hw + 18;
      const cardW = 118;

      reliefNodes.forEach((n, i) => {
        const glow    = 0.5 + Math.sin(t * 0.9 + n.phase) * 0.5;
        const [r,g,b] = n.col;

        // floating offset
        const floatY = n.y + Math.sin(t * 0.6 + n.phase) * 4;

        // card background
        ctx.save();
        ctx.shadowColor = `rgba(${r},${g},${b},${0.25 * glow})`;
        ctx.shadowBlur  = 18 * glow;
        const cg = ctx.createLinearGradient(cardX, floatY - 18, cardX + cardW, floatY + 18);
        cg.addColorStop(0, `rgba(${r},${g},${b},${0.08 + glow * 0.06})`);
        cg.addColorStop(1, `rgba(${r},${g},${b},${0.04})`);
        ctx.fillStyle   = cg;
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.3 + glow * 0.3})`;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.roundRect(cardX, floatY - 19, cardW, 38, 10);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // left accent line
        ctx.save();
        ctx.fillStyle   = `rgba(${r},${g},${b},${0.7 + glow * 0.3})`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
        ctx.shadowBlur  = 6;
        ctx.beginPath();
        ctx.roundRect(cardX + 1, floatY - 12, 3, 24, 2);
        ctx.fill();
        ctx.restore();

        // label
        ctx.save();
        ctx.font        = `700 10px "Sora", sans-serif`;
        ctx.fillStyle   = `rgba(${r},${g},${b},${0.85 + glow * 0.15})`;
        ctx.shadowColor = `rgba(${r},${g},${b},${0.5 * glow})`;
        ctx.shadowBlur  = 6 * glow;
        ctx.fillText(n.label, cardX + 12, floatY - 3);
        ctx.restore();

        // sub
        ctx.save();
        ctx.font      = `400 9px "DM Sans", sans-serif`;
        ctx.fillStyle = `rgba(148,163,184,0.7)`;
        ctx.fillText(n.sub, cardX + 12, floatY + 10);
        ctx.restore();

        // connector line from funnel edge to card
        const lineY = floatY;
        const lx0   = cx + fHW(n.y) + 2;
        const lx1   = cardX;
        ctx.save();
        const lg = ctx.createLinearGradient(lx0, lineY, lx1, lineY);
        lg.addColorStop(0, `rgba(${r},${g},${b},0)`);
        lg.addColorStop(1, `rgba(${r},${g},${b},${0.35 * glow})`);
        ctx.strokeStyle = lg;
        ctx.lineWidth   = 0.8;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(lx0, lineY);
        ctx.lineTo(lx1, lineY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // flow arrow dots between cards
        if (i < flowDots.length) {
          const next = reliefNodes[i + 1];
          flowDots[i].forEach(fd => {
            fd.progress += fd.speed;
            if (fd.progress > 1) fd.progress -= 1;
            const fy     = lerp(floatY + 19, next.y - 19 + Math.sin(t * 0.6 + next.phase) * 4, fd.progress);
            const fx     = cardX + cardW / 2;
            const fa     = fd.progress < 0.2 ? fd.progress / 0.2 : fd.progress > 0.8 ? (1 - fd.progress) / 0.2 : 1;
            ctx.save();
            ctx.fillStyle   = `rgba(${r},${g},${b},${fa * 0.55})`;
            ctx.shadowColor = `rgba(${r},${g},${b},0.4)`;
            ctx.shadowBlur  = 4;
            ctx.beginPath();
            ctx.arc(fx, fy, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }
      });

      // ─── B. FUNNEL BODY ────────────────────────────────────────────────
      const tilt = Math.sin(t * 0.35) * 0.12;

      // fill slices
      for (let sy = TOP.y; sy <= SPOUT.y; sy += 3) {
        const hw    = fHW(sy);
        const frac  = (sy - TOP.y) / (SPOUT.y - TOP.y);
        const alpha = 0.055 + frac * 0.04;
        const xOff  = Math.sin(tilt) * hw * 0.18;
        const sg    = ctx.createLinearGradient(cx - hw + xOff, sy, cx + hw + xOff, sy);
        sg.addColorStop(0,   `rgba(14,165,233,${alpha})`);
        sg.addColorStop(0.5, `rgba(99,102,241,${alpha * 1.7})`);
        sg.addColorStop(1,   `rgba(14,165,233,${alpha})`);
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.ellipse(cx + xOff, sy, hw, hw * 0.17, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // edges
      ctx.save();
      const eg = ctx.createLinearGradient(0, TOP.y, 0, SPOUT.y);
      eg.addColorStop(0,   'rgba(239,68,68,0.5)');
      eg.addColorStop(0.4, 'rgba(99,102,241,0.7)');
      eg.addColorStop(1,   'rgba(52,211,153,0.55)');
      ctx.strokeStyle = eg;
      ctx.lineWidth   = 1.6;
      ctx.shadowColor = 'rgba(99,102,241,0.4)';
      ctx.shadowBlur  = 8;
      const S = 60;
      ctx.beginPath();
      for (let i = 0; i <= S; i++) {
        const sy = TOP.y + (SPOUT.y - TOP.y) * (i / S);
        const xO = Math.sin(tilt) * fHW(sy) * 0.28;
        i === 0 ? ctx.moveTo(cx - fHW(sy) + xO, sy) : ctx.lineTo(cx - fHW(sy) + xO, sy);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i <= S; i++) {
        const sy = TOP.y + (SPOUT.y - TOP.y) * (i / S);
        const xO = Math.sin(tilt) * fHW(sy) * 0.28;
        i === 0 ? ctx.moveTo(cx + fHW(sy) + xO, sy) : ctx.lineTo(cx + fHW(sy) + xO, sy);
      }
      ctx.stroke();
      ctx.restore();

      // rings
      [[TOP.y, TOP.hw, 0.22, 'rgba(239,68,68,0.45)', '#ef4444', 12],
       [WAIST.y, WAIST.hw, 0.38, 'rgba(99,102,241,0.65)', '#818cf8', 10],
       [SPOUT.y, SPOUT.hw, 0.55, 'rgba(52,211,153,0.75)', '#34d399', 14],
      ].forEach(([ry, rhw, ry2, col, sc, sb]) => {
        ctx.save();
        ctx.strokeStyle = col;
        ctx.lineWidth   = 1.7;
        ctx.shadowColor = sc;
        ctx.shadowBlur  = sb;
        ctx.beginPath();
        ctx.ellipse(cx, ry, rhw, rhw * ry2, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // ─── C. CHAOS PARTICLES inside funnel ─────────────────────────────
      chaosP.forEach(p => {
        const hw   = fHW(p.y + TOP.y);
        const maxX = hw * 0.82;
        p.x  = Math.max(-maxX, Math.min(maxX, p.x + Math.sin(t + p.ph) * 0.35 + p.vx));
        p.y += p.vy;
        if (p.y > SPOUT.y - TOP.y + 28) {
          p.y  = -15 - Math.random() * 90;
          p.x  = (Math.random() - 0.5) * 230;
          p.vx = (Math.random() - 0.5) * 0.5;
        }
        const absY = p.y + TOP.y;
        const frac = Math.min(1, Math.max(0, (absY - TOP.y) / (WAIST.y - TOP.y)));
        const [r, g, b] = particleColor(p, frac);
        ctx.save();
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
        ctx.shadowBlur  = 4;
        ctx.fillStyle   = `rgba(${r},${g},${b},${p.op * (1 - frac * 0.25)})`;
        ctx.beginPath();
        ctx.arc(cx + p.x, absY, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ─── D. EXIT STREAM ────────────────────────────────────────────────
      const exitY  = SPOUT.y + 16;
      const blastY = exitY + 52;
      ctx.save();
      const sg2 = ctx.createLinearGradient(cx, SPOUT.y, cx, blastY);
      sg2.addColorStop(0, 'rgba(52,211,153,0.7)');
      sg2.addColorStop(1, 'rgba(251,191,36,0.7)');
      ctx.strokeStyle = sg2;
      ctx.lineWidth   = 1.8;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur  = 7;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, SPOUT.y + 5);
      ctx.lineTo(cx, blastY - 14);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // ─── E. SUCCESS EXPLOSION ──────────────────────────────────────────
      // cyclic: grows from 0 → full → fades, repeat
      const cycle    = (boomT / (Math.PI * 2));          // 0→1
      const growPh   = Math.sin(boomT) * 0.5 + 0.5;     // 0→1→0 smooth
      const burstScale = 0.3 + growPh * 1.0;

      // outer glow ring that breathes
      ctx.save();
      const glowR = 18 + growPh * 38;
      const glowA = 0.08 + growPh * 0.18;
      ctx.strokeStyle = `rgba(251,191,36,${glowA})`;
      ctx.lineWidth   = glowR * 0.5;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur  = 28 * growPh;
      ctx.beginPath();
      ctx.arc(cx, blastY, glowR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // explosion rays
      const numRays = 14;
      for (let ri = 0; ri < numRays; ri++) {
        const ang  = (ri / numRays) * Math.PI * 2 + t * 0.25;
        const r1   = 14 * burstScale;
        const r2   = (26 + Math.sin(t * 4 + ri) * 6) * burstScale;
        const cols = [
          [251, 191, 36],   // gold
          [56,  189, 248],  // blue
          [52,  211, 153],  // green
        ];
        const [cr, cg, cb] = cols[ri % 3];
        const rayA = (0.45 + Math.sin(t * 3 + ri * 0.7) * 0.25) * growPh;
        ctx.save();
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${rayA})`;
        ctx.lineWidth   = 1.6;
        ctx.shadowColor = `rgba(${cr},${cg},${cb},0.7)`;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * r1, blastY + Math.sin(ang) * r1 * 0.65);
        ctx.lineTo(cx + Math.cos(ang) * r2, blastY + Math.sin(ang) * r2 * 0.65);
        ctx.stroke();
        ctx.restore();
      }

      // burst dots
      boomP.forEach((bp, i) => {
        const ang = bp.angle + t * 0.18;
        const rad = bp.radius + growPh * bp.maxR;
        const bx  = cx     + Math.cos(ang) * rad;
        const by  = blastY + Math.sin(ang) * rad * 0.6;
        const da  = Math.max(0, (1 - rad / (bp.maxR + bp.radius)) * growPh * 0.9);
        const cs  = [[251,191,36],[56,189,248],[52,211,153]][bp.col];
        ctx.save();
        ctx.fillStyle   = `rgba(${cs[0]},${cs[1]},${cs[2]},${da})`;
        ctx.shadowColor = `rgba(${cs[0]},${cs[1]},${cs[2]},0.6)`;
        ctx.shadowBlur  = 5;
        ctx.beginPath();
        ctx.arc(bx, by, bp.r * burstScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // center gold core
      ctx.save();
      const coreGrad = ctx.createRadialGradient(cx, blastY, 0, cx, blastY, 11 * burstScale);
      coreGrad.addColorStop(0, `rgba(255,255,255,${0.95 * growPh})`);
      coreGrad.addColorStop(0.4, `rgba(251,191,36,${0.9 * growPh})`);
      coreGrad.addColorStop(1, `rgba(251,191,36,0)`);
      ctx.fillStyle   = coreGrad;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur  = 22 * growPh;
      ctx.beginPath();
      ctx.arc(cx, blastY, 11 * burstScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeUp 0.8s ease 0.25s both",position:"relative"}}>
      <div style={{position:"absolute",inset:-24,borderRadius:32,background:"radial-gradient(ellipse at 45% 40%,rgba(14,165,233,0.11),rgba(99,102,241,0.06) 55%,transparent 75%)",filter:"blur(18px)",pointerEvents:"none"}}/>
      <canvas ref={canvasRef} style={{display:"block",position:"relative",zIndex:1}}/>
    </div>
  );
}

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
function LandingPage({ onFunnel, onPage, onModal }) {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  const bgs=[];  // unused, kept for compatibility
  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#fafafa",overflowX:"hidden"}}>
      <style>{CSS}</style>
      <link href={FONT} rel="stylesheet"/>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(255,255,255,0.97)":"rgba(7,9,15,0.7)",backdropFilter:"blur(14px)",borderBottom:scrolled?"1px solid #ececec":"1px solid rgba(255,255,255,0.06)",transition:"all 0.35s"}}>
        <div style={{maxWidth:1140,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64,padding:"0 5vw"}}>
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0}}>
            <Logo size={28}/>
            <span style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:18,color:scrolled?"#0f172a":"#f8fafc"}}>
              Syntrix<span style={{color:scrolled?"#0ea5e9":"#38bdf8"}}>.</span><span style={{fontWeight:300,fontSize:"0.88em",color:scrolled?"#94a3b8":"rgba(148,163,184,0.7)"}}>Digital</span>
            </span>
          </button>
          <div style={{display:"flex",gap:24,alignItems:"center"}}>
            {[
              {label:"Leistungen", id:"leistungen"},
              {label:"Über uns",   id:"ueber-uns"},
              {label:"Prozess",    id:"prozess"},
              {label:"FAQ",        id:"faq"},
            ].map(({label,id})=>(
              <button key={id}
                onClick={()=>{const el=document.getElementById(id);if(el) el.scrollIntoView({behavior:"smooth",block:"start"});}}
                style={{fontSize:14,fontWeight:500,color:scrolled?"#555":"rgba(203,213,225,0.85)",background:"none",border:"none",cursor:"pointer",padding:0,transition:"color 0.2s"}}>
                {label}
              </button>
            ))}
            <button onClick={onFunnel} style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",border:"none",borderRadius:9,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(14,165,233,0.3)"}}>Analyse starten →</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── Inspired by THEFABERS structure */}
      <section style={{
        minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        padding:"120px 5vw 80px",
        background:"linear-gradient(160deg,#07090f 0%,#0d1220 55%,#111827 100%)",
        position:"relative",overflow:"hidden",
      }}>

        {/* Grid-Pattern – dezent auf dunklem BG */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8"/>
            </pattern>
            <radialGradient id="gFade" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="white" stopOpacity="1"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <mask id="gm2"><rect width="100%" height="100%" fill="url(#gFade)"/></mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gm2)"/>
        </svg>

        {/* Glow top-center – wie Fabers */}
        <div style={{position:"absolute",top:-120,left:"50%",transform:"translateX(-50%)",width:700,height:400,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(14,165,233,0.14) 0%,rgba(99,102,241,0.08) 40%,transparent 70%)",pointerEvents:"none",filter:"blur(1px)"}}/>
        <div style={{position:"absolute",bottom:-80,right:"10%",width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%)",pointerEvents:"none"}}/>

        {/* Animierte Linie */}
        <div style={{position:"absolute",top:"45%",left:0,right:0,height:1,pointerEvents:"none",overflow:"hidden"}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,transparent,rgba(14,165,233,0.12) 35%,rgba(99,102,241,0.15) 65%,transparent)",animation:"lineGrow 2s ease 0.5s both"}}/>
        </div>

        {/* ── ZWEISPALTIG: Links Text, Rechts floatendes Panel ── */}
        <div style={{maxWidth:1140,width:"100%",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 420px",gap:"60px",alignItems:"center",position:"relative",zIndex:1}}>

          {/* LEFT */}
          <div>
            {/* Approved Badge – kein "Approved" Pill */}
            <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:36,animation:"fadeIn 0.6s ease both",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.35)",borderRadius:100,padding:"7px 18px 7px 10px",backdropFilter:"blur(8px)"}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#f59e0b,#fbbf24)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 12px rgba(245,158,11,0.4)"}}>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{fontSize:13,fontWeight:700,color:"#fbbf24",letterSpacing:"0.02em"}}>KI-gestützte Agentur · Soest · DACH</span>
            </div>

            {/* Headline – groß, zentriert auf links */}
            <h1 style={{fontFamily:"'Sora',sans-serif",fontWeight:900,lineHeight:1.0,letterSpacing:"-0.04em",marginBottom:28,animation:"fadeUp 0.7s ease 0.1s both"}}>
              <span style={{display:"block",fontSize:"clamp(38px,5.5vw,76px)",color:"#f8fafc"}}>Matrix your</span>
              <span style={{
                display:"block",
                fontSize:"clamp(38px,5.5vw,76px)",
                background:"linear-gradient(135deg,#38bdf8 0%,#818cf8 50%,#34d399 100%)",
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                animation:"shimmer 7s linear infinite",
              }}>business.</span>
              <span style={{display:"block",fontSize:"clamp(20px,3vw,42px)",fontWeight:600,color:"rgba(148,163,184,0.75)",letterSpacing:"-0.02em",marginTop:6}}>Struktur, die inspiriert.</span>
            </h1>

            {/* 3 Checkpoints – exakt wie Fabers */}
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:40,animation:"fadeUp 0.7s ease 0.22s both"}}>
              {[
                "KI-Marketing & Automatisierung",
                "Datenbasierte Funnel-Systeme",
                "Messbare Ergebnisse — planbar",
              ].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:"rgba(16,185,129,0.15)",border:"1.5px solid rgba(16,185,129,0.4)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{fontSize:15,color:"#cbd5e1",fontWeight:500}}>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button – prominent, wie Fabers */}
            <div style={{marginBottom:40,animation:"fadeUp 0.7s ease 0.32s both"}}>
              <button onClick={onFunnel} className="cta-btn" style={{
                background:"linear-gradient(135deg,#0ea5e9,#6366f1)",
                color:"#fff",border:"none",borderRadius:13,
                padding:"17px 38px",fontSize:16,fontWeight:700,
                cursor:"pointer",
                boxShadow:"0 0 0 1px rgba(14,165,233,0.3),0 8px 28px rgba(14,165,233,0.3)",
                display:"inline-flex",alignItems:"center",gap:10,
              }}>
                Kostenlose Potenzialanalyse starten
                <span style={{fontSize:18,lineHeight:1}}>→</span>
              </button>
              <div style={{marginTop:12,fontSize:13,color:"#334155"}}>
                oder&nbsp;<button onClick={()=>{const el=document.getElementById("leistungen");if(el)el.scrollIntoView({behavior:"smooth",block:"start"});}} style={{color:"#64748b",textDecoration:"underline",textUnderlineOffset:3,background:"none",border:"none",cursor:"pointer",padding:0,fontSize:"inherit",fontFamily:"inherit"}}>Leistungen ansehen</button>
              </div>
            </div>

          </div>

          {/* RIGHT – 3D Rotating Funnel mit Partikel-Flow */}
          <FunnelCanvas />
        </div>

        {/* Wave unten */}
        <div style={{position:"absolute",bottom:-2,left:0,right:0}}>
          <svg viewBox="0 0 1440 70" fill="none" style={{width:"100%",display:"block"}}>
            <path d="M0 70V40C240 10 480 70 720 40C960 10 1200 60 1440 30V70H0Z" fill="#ffffff" fillOpacity="0.03"/>
            <path d="M0 70V50C360 20 720 70 1080 40L1440 15V70H0Z" fill="#fff"/>
          </svg>
        </div>
      </section>

      <BeforeAfter/>

      <SystemSection onFunnel={onFunnel}/>
      {/* ── ÜBER UNS ───────────────────────────────────────────────── */}
      <section id="ueber-uns" style={{
        padding:"120px 5vw",
        background:"#fafafa",
        borderTop:"1px solid #f1f5f9",
      }}>
        <style>{`
          .ueber-card {
            background:#fff;
            border:1px solid #e8edf2;
            border-radius:20px;
            padding:36px 32px 32px;
            transition:box-shadow 0.28s ease, transform 0.28s ease, border-color 0.28s ease;
            cursor:default;
          }
          .ueber-card:hover {
            box-shadow:0 16px 48px rgba(15,23,42,0.09);
            transform:translateY(-4px);
            border-color:#cbd5e1;
          }
          .ueber-icon-wrap {
            width:48px;height:48px;border-radius:14px;
            background:#f8fafc;
            border:1px solid #e2e8f0;
            display:flex;align-items:center;justify-content:center;
            margin-bottom:22px;
            transition:background 0.25s ease;
          }
          .ueber-card:hover .ueber-icon-wrap {
            background:#f0f9ff;
            border-color:#bae6fd;
          }
          @media(max-width:768px){
            .ueber-grid{ grid-template-columns:1fr !important; }
            .ueber-top{ grid-template-columns:1fr !important; gap:48px !important; }
          }
        `}</style>

        <div style={{maxWidth:1100,margin:"0 auto"}}>

          {/* ── TOP: Text links + Foto rechts ── */}
          <div className="ueber-top" style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"72px",
            alignItems:"center",
            marginBottom:80,
          }}>

            {/* TEXT */}
            <div>
              <span style={{
                fontSize:11,fontWeight:700,letterSpacing:"0.14em",
                color:"#0ea5e9",textTransform:"uppercase",
                display:"block",marginBottom:16,
              }}>Über uns</span>

              <h2 style={{
                fontFamily:"'Sora',sans-serif",
                fontSize:"clamp(26px,3.2vw,42px)",
                fontWeight:900,
                color:"#0f172a",
                letterSpacing:"-0.035em",
                lineHeight:1.08,
                marginBottom:28,
              }}>
                Warum dein Marketing<br/>
                dich Kunden kostet —<br/>
                <span style={{color:"#94a3b8",fontWeight:700}}>ohne dass du es merkst.</span>
              </h2>

              <div style={{
                width:36,height:2,
                background:"linear-gradient(90deg,#0ea5e9,#6366f1)",
                borderRadius:2,marginBottom:28,
              }}/>

              <p style={{
                fontSize:16,color:"#475569",lineHeight:1.85,
                fontFamily:"'DM Sans',sans-serif",
                marginBottom:16,maxWidth:460,
              }}>
                Dein gesamtes Performance-Marketing steht und fällt mit deinem System.
                Die meisten Unternehmen investieren in Ads, Content oder Tools —
                verlieren aber trotzdem potenzielle Kunden.
              </p>
              <p style={{
                fontSize:15,color:"#64748b",lineHeight:1.8,
                fontFamily:"'DM Sans',sans-serif",
                maxWidth:440,
              }}>
                Nicht weil sie zu wenig machen. Sondern weil zentrale Zusammenhänge
                fehlen: Botschaften bleiben zu allgemein, Inhalte zeigen nicht was
                zählt, und es fehlt eine klare Struktur hinter der Kundengewinnung.
              </p>
            </div>

            {/* FOTO */}
            <div style={{position:"relative"}}>
              {/* Hintergrund-Deko */}
              <div style={{
                position:"absolute",inset:-12,
                borderRadius:28,
                background:"linear-gradient(135deg,rgba(14,165,233,0.06),rgba(99,102,241,0.05))",
                filter:"blur(0px)",
              }}/>
              <div style={{
                position:"relative",
                borderRadius:20,
                overflow:"hidden",
                boxShadow:"0 24px 64px rgba(15,23,42,0.12)",
                aspectRatio:"4/5",
                background:"#0f172a",
              }}>
                <img
                  src="data:image/png;base64,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"
                  alt="Johannes Rempel — Syntrix Digital"
                  style={{
                    width:"100%",height:"100%",
                    objectFit:"cover",objectPosition:"center top",
                    display:"block",
                    filter:"saturate(0.35) brightness(0.9)",
                  }}
                />
                <div style={{
                  position:"absolute",inset:0,
                  background:"linear-gradient(180deg,rgba(15,23,42,0.05) 40%,rgba(15,23,42,0.7) 100%)",
                }}/>
              </div>

              {/* Quote-Block unter Foto */}
              <div style={{
                marginTop:16,
                padding:"20px 22px",
                background:"#0f172a",
                borderRadius:14,
                borderLeft:"3px solid #6366f1",
              }}>
                <p style={{
                  fontFamily:"Georgia,'Times New Roman',serif",
                  fontSize:"clamp(13px,1.3vw,15px)",
                  fontStyle:"italic",
                  color:"#cbd5e1",
                  lineHeight:1.65,
                  marginBottom:14,
                }}>
                  „Die meisten Unternehmen optimieren ihr Marketing.<br/>
                  Wir bauen das System dahinter."
                </p>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <Logo size={24} dark={true}/>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",fontFamily:"'Sora',sans-serif"}}>Johannes Rempel</div>
                    <div style={{fontSize:10,color:"#475569",letterSpacing:"0.02em"}}>Inhaber, Syntrix Digital</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3 KARTEN ── */}
          <div className="ueber-grid" style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:20,
          }}>

            {/* KARTE 1 — VERTRAUEN */}
            <div className="ueber-card">
              <div className="ueber-icon-wrap">
                {/* Shield-Icon */}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2.5L4 5.5v5c0 4.2 3.1 7.8 7 8.5 3.9-.7 7-4.3 7-8.5v-5L11 2.5z" stroke="#0ea5e9" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M8 11l2 2 4-4" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                fontSize:10,fontWeight:700,letterSpacing:"0.12em",
                color:"#94a3b8",textTransform:"uppercase",
                marginBottom:8,fontFamily:"'Sora',sans-serif",
              }}>Vertrauen</div>
              <h3 style={{
                fontFamily:"'Sora',sans-serif",
                fontSize:20,fontWeight:800,
                color:"#0f172a",letterSpacing:"-0.02em",
                marginBottom:12,lineHeight:1.2,
              }}>Nah dran.</h3>
              <p style={{
                fontSize:14,color:"#64748b",lineHeight:1.75,
                fontFamily:"'DM Sans',sans-serif",
              }}>
                Botschaften, die die echten Probleme deiner Zielgruppe treffen —
                präzise formuliert, statt werblich aufgeblasen.
              </p>
            </div>

            {/* KARTE 2 — AUTORITÄT */}
            <div className="ueber-card">
              <div className="ueber-icon-wrap">
                {/* Brain/Expertise-Icon */}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8.5" stroke="#6366f1" strokeWidth="1.5"/>
                  <path d="M8 11h6M11 8v6" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="11" cy="11" r="2" fill="#6366f1" opacity="0.2"/>
                </svg>
              </div>
              <div style={{
                fontSize:10,fontWeight:700,letterSpacing:"0.12em",
                color:"#94a3b8",textTransform:"uppercase",
                marginBottom:8,fontFamily:"'Sora',sans-serif",
              }}>Autorität</div>
              <h3 style={{
                fontFamily:"'Sora',sans-serif",
                fontSize:20,fontWeight:800,
                color:"#0f172a",letterSpacing:"-0.02em",
                marginBottom:12,lineHeight:1.2,
              }}>Sichtbar kompetent.</h3>
              <p style={{
                fontSize:14,color:"#64748b",lineHeight:1.75,
                fontFamily:"'DM Sans',sans-serif",
              }}>
                Inhalte, die zeigen, dass du weißt wovon du redest —
                ohne es laut aussprechen zu müssen.
              </p>
            </div>

            {/* KARTE 3 — PERSPEKTIVE */}
            <div className="ueber-card">
              <div className="ueber-icon-wrap">
                {/* Arrow/Flow-Icon */}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 16L10 10L14 14L19 7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 7h4v4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                fontSize:10,fontWeight:700,letterSpacing:"0.12em",
                color:"#94a3b8",textTransform:"uppercase",
                marginBottom:8,fontFamily:"'Sora',sans-serif",
              }}>Perspektive</div>
              <h3 style={{
                fontFamily:"'Sora',sans-serif",
                fontSize:20,fontWeight:800,
                color:"#0f172a",letterSpacing:"-0.02em",
                marginBottom:12,lineHeight:1.2,
              }}>Planbar wachsen.</h3>
              <p style={{
                fontSize:14,color:"#64748b",lineHeight:1.75,
                fontFamily:"'DM Sans',sans-serif",
              }}>
                Strukturen, die deine Kundengewinnung planbar machen —
                damit du weißt, was morgen kommt.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="leistungen" style={{padding:"100px 5vw",background:"linear-gradient(180deg,#fff,#fafafa)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16,marginBottom:48}}>
            <div>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.14em",color:"#6366f1",textTransform:"uppercase"}}>Leistungen</span>
              <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(22px,4vw,42px)",fontWeight:800,color:"#0f172a",letterSpacing:"-0.025em",maxWidth:460,marginTop:10}}>Alles was du brauchst. Nichts was du nicht brauchst.</h2>
            </div>
            <button onClick={onModal} style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",border:"none",borderRadius:11,padding:"11px 22px",fontSize:14,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Leistung anfragen →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:16}}>
            {SVCS.map((s,i)=>{
              const color = SVC_COLORS[i];
              const bg    = SVC_BG[i];
              return (
                <div key={i} className="svc-card" onClick={onModal}
                  style={{background:"#fff",border:"1px solid #eeeeee",borderRadius:18,
                    padding:0,overflow:"hidden",
                    boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
                    transition:"all 0.28s ease",
                  }}
                >
                  {/* Icon header strip */}
                  <div style={{
                    background: bg,
                    padding:"22px 22px 18px",
                    display:"flex",alignItems:"flex-start",justifyContent:"space-between",
                    borderBottom:"1px solid rgba(0,0,0,0.04)",
                  }}>
                    {/* Icon container */}
                    <div style={{
                      width:48,height:48,borderRadius:14,
                      background:"#fff",
                      boxShadow:`0 2px 10px ${color}22`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      flexShrink:0,
                    }}>
                      {SVC_ICONS[s.iconKey](color)}
                    </div>
                    {/* Anfragen arrow */}
                    <div style={{
                      width:28,height:28,borderRadius:8,
                      background:"rgba(255,255,255,0.7)",
                      border:`1px solid ${color}33`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      flexShrink:0,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  {/* Text body */}
                  <div style={{padding:"18px 22px 20px"}}>
                    <div style={{
                      fontSize:15,fontWeight:700,color:"#0f172a",
                      fontFamily:"'Sora',sans-serif",marginBottom:7,
                      letterSpacing:"-0.01em",
                    }}>{s.title}</div>
                    <div style={{fontSize:13,color:"#64748b",lineHeight:1.75,marginBottom:14}}>{s.desc}</div>
                    {/* Bottom accent line + CTA */}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{
                        height:2,flex:1,borderRadius:99,
                        background:`linear-gradient(90deg,${color}44,${color}11)`,
                        marginRight:12,
                      }}/>
                      <span style={{fontSize:12,color:color,fontWeight:600,whiteSpace:"nowrap"}}>
                        Anfragen →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <ProcessSection onFunnel={onFunnel} onModal={onModal}/>
      <FaqSection onFunnel={onFunnel}/>

      {/* FINAL CTA */}
      <section style={{padding:"100px 5vw",background:"linear-gradient(135deg,#0f172a,#1e1b4b,#0f3460)",backgroundSize:"200% 200%",animation:"gradMove 8s ease infinite",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-160,right:-160,width:560,height:560,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:640,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontSize:"clamp(26px,5vw,50px)",fontWeight:800,color:"#fff",letterSpacing:"-0.025em",marginBottom:16,lineHeight:1.15}}>Bereit für planbar mehr Kunden?</h2>
          <p style={{fontSize:16,color:"#64748b",lineHeight:1.75,marginBottom:36}}>Starte jetzt die kostenlose Erstanalyse — in 2 Minuten <strong style={{color:"#94a3b8"}}>erfährst</strong> du, wo dein größtes Potenzial liegt.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:22}}>
            <button onClick={onFunnel} className="cta-btn" style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)",color:"#fff",border:"none",borderRadius:13,padding:"16px 36px",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 28px rgba(99,102,241,0.4)"}}>Kostenlose Potenzialanalyse starten →</button>
            <button onClick={()=>onPage("calendly")} style={{background:"rgba(255,255,255,0.08)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)",borderRadius:13,padding:"16px 22px",fontSize:15,cursor:"pointer"}}>📅 Termin buchen</button>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:22,flexWrap:"wrap"}}>
            {["✓ Kein Verkaufsgespräch","✓ Sofort starten","✓ 100 % kostenlos"].map(t=><span key={t} style={{fontSize:12,color:"#334155"}}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#0a0f1e",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"44px 5vw 28px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:32,marginBottom:32}}>
            {/* Links: Logo + E-Mail */}
            <div>
              <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{display:"inline-flex",alignItems:"center",gap:9,marginBottom:14,background:"none",border:"none",cursor:"pointer",padding:0}}>
                <Logo size={26}/>
                <span style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:17,color:"#fff"}}>
                  Syntrix<span style={{color:"#0ea5e9"}}>.</span><span style={{fontWeight:300,fontSize:"0.88em",color:"#94a3b8"}}>Digital</span>
                </span>
              </button>
              <div>
                <a href="mailto:info@syntrixdigital.de" style={{display:"inline-flex",alignItems:"center",gap:8,color:"#475569",fontSize:13,textDecoration:"none"}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="2" stroke="#475569" strokeWidth="1.2"/><path d="M1 5l6 3.5L13 5" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  info@syntrixdigital.de
                </a>
              </div>
            </div>
            {/* Mitte: Anfragen */}
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:"#1e3a5f",marginBottom:13,textTransform:"uppercase"}}>Anfragen</div>
              <button onClick={()=>onPage("calendly")} style={{display:"block",background:"none",border:"none",color:"#475569",fontSize:13,cursor:"pointer",padding:0,marginBottom:9,textAlign:"left"}}>📅 Strategiegespräch</button>
              <a href="mailto:info@syntrixdigital.de" style={{display:"block",color:"#475569",fontSize:13,textDecoration:"none",marginBottom:9}}>✉ E-Mail schreiben</a>
              <button onClick={onFunnel} style={{display:"block",background:"none",border:"none",color:"#0ea5e9",fontSize:13,cursor:"pointer",padding:0,fontWeight:600,textAlign:"left"}}>⚡ Analyse starten →</button>
            </div>
            {/* Rechts: Rechtliches */}
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:"#1e3a5f",marginBottom:13,textTransform:"uppercase"}}>Rechtliches</div>
              <button onClick={()=>onPage("impressum")} style={{display:"block",background:"none",border:"none",color:"#475569",fontSize:13,cursor:"pointer",padding:0,marginBottom:9}}>Impressum</button>
              <button onClick={()=>onPage("datenschutz")} style={{display:"block",background:"none",border:"none",color:"#475569",fontSize:13,cursor:"pointer",padding:0}}>Datenschutzerklärung</button>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:20,textAlign:"center"}}>
            <span style={{fontSize:12,color:"#1e3a5f"}}>© 2026 Syntrix Digital · Soest</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

// ── OG-IMAGE (SVG als Data-URL, 1200×630) ─────────────────────────────────────
const OG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07090f"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="28" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="180" cy="315" r="220" fill="#0ea5e9" opacity="0.07" filter="url(#glow)"/>
  <circle cx="1050" cy="200" r="180" fill="#6366f1" opacity="0.06" filter="url(#glow)"/>
  <line x1="0" y1="210" x2="1200" y2="210" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="0" y1="420" x2="1200" y2="420" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="400" y1="0" x2="400" y2="630" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="800" y1="0" x2="800" y2="630" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <rect x="80" y="84" width="120" height="3" rx="2" fill="url(#acc)"/>
  <circle cx="92" cy="60" r="6" fill="#0ea5e9"/>
  <circle cx="116" cy="60" r="4" fill="#334155"/>
  <circle cx="136" cy="60" r="4" fill="#334155"/>
  <line x1="98" y1="60" x2="112" y2="60" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="120" y1="60" x2="132" y2="60" stroke="#1e293b" stroke-width="1.5"/>
  <text x="152" y="66" font-family="Sora,sans-serif" font-size="22" font-weight="800" fill="#f8fafc" letter-spacing="-0.5">Syntrix</text>
  <text x="250" y="66" font-family="Sora,sans-serif" font-size="22" font-weight="800" fill="#0ea5e9">.</text>
  <text x="258" y="66" font-family="Sora,sans-serif" font-size="22" font-weight="300" fill="#475569">Digital</text>
  <text x="80" y="300" font-family="Sora,sans-serif" font-size="68" font-weight="900" fill="#f8fafc" letter-spacing="-2">Dein Marketing-</text>
  <text x="80" y="380" font-family="Sora,sans-serif" font-size="68" font-weight="900" fill="#f8fafc" letter-spacing="-2">System.</text>
  <text x="82" y="438" font-family="DM Sans,sans-serif" font-size="24" fill="#64748b">Planbare Anfragen durch datenbasierte Strukturen.</text>
  <rect x="820" y="240" width="300" height="56" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <circle cx="850" cy="268" r="6" fill="#0ea5e9"/>
  <text x="870" y="274" font-family="DM Sans,sans-serif" font-size="18" fill="#cbd5e1">Vertrauen</text>
  <rect x="820" y="310" width="300" height="56" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <circle cx="850" cy="338" r="6" fill="#6366f1"/>
  <text x="870" y="344" font-family="DM Sans,sans-serif" font-size="18" fill="#cbd5e1">Autorität</text>
  <rect x="820" y="380" width="300" height="56" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <circle cx="850" cy="408" r="6" fill="#10b981"/>
  <text x="870" y="414" font-family="DM Sans,sans-serif" font-size="18" fill="#cbd5e1">Perspektive</text>
  <text x="80" y="575" font-family="DM Sans,sans-serif" font-size="18" fill="#334155">syntrixdigital.de</text>
</svg>`;
const OG_URL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(OG_SVG);

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#07090f"/><circle cx="10" cy="16" r="4.5" fill="none" stroke="#0ea5e9" stroke-width="1.4"/><circle cx="10" cy="16" r="1.8" fill="#0ea5e9"/><circle cx="22" cy="10" r="2.8" fill="#1e293b" stroke="#475569" stroke-width="1.2"/><circle cx="22" cy="22" r="2.8" fill="#1e293b" stroke="#475569" stroke-width="1.2"/><line x1="14.5" y1="14" x2="19.5" y2="11.5" stroke="#334155" stroke-width="1.3"/><line x1="14.5" y1="18" x2="19.5" y2="20.5" stroke="#334155" stroke-width="1.3"/></svg>`;
const FAVICON_URL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(FAVICON_SVG);

export default function App() {
  const [page,setPage]       = useState("home");
  const [showModal,setModal] = useState(false);
  const [leadData,setLead]   = useState(null);

  useEffect(()=>{
    // ── Plausible Analytics ───────────────────────────────────────────
    if(!document.querySelector('script[src*="plausible.io"]')){
      const paScript = document.createElement("script");
      paScript.src = "https://plausible.io/js/pa-xCpAtSAp8V6ZtXbx5WQEy.js";
      paScript.async = true;
      document.head.appendChild(paScript);
      // Plausible Queue
      window.plausible = window.plausible || function(){(window.plausible.q=window.plausible.q||[]).push(arguments);};
      window.plausible.init = window.plausible.init || function(i){window.plausible.o=i||{};};
      window.plausible.init();
    }
    // ── CookieHub — so früh wie möglich laden ──────────────────────────
    if(!document.querySelector('script[src*="cookiehub"]')){
      const chScript = document.createElement("script");
      chScript.src = "https://cdn.cookiehub.eu/c2/0b61e796.js";
      chScript.async = true;
      chScript.onload = () => {
        if(window.cookiehub) window.cookiehub.load({});
      };
      document.head.insertBefore(chScript, document.head.firstChild);
    }
    // ── Meta-Tags + Favicon ────────────────────────────────────────────
    document.title = "Syntrix Digital — KI-gestütztes Marketing-System für Unternehmer";
    // Favicon
    let fav = document.querySelector("link[rel~=\'icon\']");
    if(!fav){fav=document.createElement("link");fav.rel="icon";document.head.appendChild(fav);}
    fav.type="image/svg+xml"; fav.href=FAVICON_URL;
    // Meta helper
    const m=(s,v,a="content")=>{let e=document.querySelector(s);if(!e){e=document.createElement("meta");document.head.appendChild(e);}e.setAttribute(a,v);};
    const og=(p,v)=>{let e=document.querySelector("meta[property=\'"+p+"\']");if(!e){e=document.createElement("meta");e.setAttribute("property",p);document.head.appendChild(e);}e.content=v;};
    const tw=(n,v)=>{let e=document.querySelector("meta[name=\'"+n+"\']");if(!e){e=document.createElement("meta");e.setAttribute("name",n);document.head.appendChild(e);}e.content=v;};
    m("meta[name=\'description\']","Automatisierte Kundengewinnung für Unternehmen – planbare Anfragen durch datenbasierte Systeme statt Zufall.");
    m("meta[name=\'theme-color\']","#07090f");
    og("og:title","Syntrix Digital — KI-gestütztes Marketing-System für Unternehmer");
    og("og:description","Automatisierte Kundengewinnung für Unternehmen – planbare Anfragen durch datenbasierte Systeme statt Zufall.");
    og("og:image",OG_URL);
    og("og:type","website");
    og("og:url","https://syntrixdigital.de");
    og("og:site_name","Syntrix Digital");
    tw("twitter:card","summary_large_image");
    tw("twitter:title","Syntrix Digital — KI-gestütztes Marketing-System für Unternehmer");
    tw("twitter:description","Automatisierte Kundengewinnung für Unternehmen – planbare Anfragen durch datenbasierte Systeme statt Zufall.");
    tw("twitter:image",OG_URL);
  },[]);

  const goCalendly = (d) => { setLead(d); setPage("calendly"); };

  if(page==="funnel")     return <PotenzialFunnel onBack={()=>setPage("home")} onCalendly={goCalendly}/>;
  if(page==="calendly")   return <CalendlyPage leadData={leadData} onBack={()=>setPage("home")}/>;
  if(page==="impressum")  return <LegalPage type="impressum"  onBack={()=>setPage("home")}/>;
  if(page==="datenschutz")return <LegalPage type="datenschutz" onBack={()=>setPage("home")}/>;
  return (
    <>
      {showModal&&<ServiceModal onClose={()=>setModal(false)} onFunnel={()=>{setModal(false);setPage("funnel");}}/>}
      <LandingPage onFunnel={()=>setPage("funnel")} onPage={setPage} onModal={()=>setModal(true)}/>
    </>
  );
}
