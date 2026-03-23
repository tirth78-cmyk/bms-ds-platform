import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area, ScatterChart, Scatter, ZAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart } from "recharts";
import { Brain, Database, TrendingUp, Layers, Users, Zap, Target, Activity, GitBranch, Shield, BarChart3, ArrowUpRight, ArrowDownRight, ChevronRight, CheckCircle2, AlertTriangle, Cpu, Globe, Search, Sparkles, FlaskConical, LineChart as LCIcon } from "lucide-react";

const N="#0E2841",D="#0A5182",C="#0F9ED5",S="#115585",A="#E8792F",G="#27AE60",R="#E74C3C",P="#8E44AD",M="#B0BEC5";
const CL=[C,A,G,P,D,R,"#F39C12","#1ABC9C",S,"#E91E63"];

// ── ML Model Performance Data ──
const modelPerf = [
  {model:"NBA Propensity",type:"XGBoost",auc:0.89,precision:0.84,recall:0.81,f1:0.82,lift3:3.2,status:"Production",latency:"<50ms",features:142,trainDate:"Mar 2026"},
  {model:"Prescriber Conversion",type:"Neural Net",auc:0.86,precision:0.79,recall:0.83,f1:0.81,lift3:2.9,status:"Production",latency:"<100ms",features:98,trainDate:"Feb 2026"},
  {model:"Content Effectiveness",type:"Gradient Boost",auc:0.84,precision:0.82,recall:0.76,f1:0.79,lift3:2.7,status:"Production",latency:"<30ms",features:67,trainDate:"Mar 2026"},
  {model:"HCP Churn Risk",type:"Random Forest",auc:0.82,precision:0.78,recall:0.74,f1:0.76,lift3:2.5,status:"Production",latency:"<40ms",features:83,trainDate:"Jan 2026"},
  {model:"Channel Response",type:"Bayesian MMM",auc:0.81,precision:0.77,recall:0.72,f1:0.74,lift3:2.4,status:"Production",latency:"<200ms",features:56,trainDate:"Feb 2026"},
  {model:"Patient Journey",type:"LSTM Seq",auc:0.83,precision:0.76,recall:0.79,f1:0.77,lift3:2.6,status:"Staging",latency:"<150ms",features:124,trainDate:"Mar 2026"},
  {model:"Competitive Threat",type:"Transformer",auc:0.79,precision:0.73,recall:0.71,f1:0.72,lift3:2.2,status:"Staging",latency:"<300ms",features:89,trainDate:"Mar 2026"},
  {model:"Sentiment (BERT)",type:"Fine-tuned LLM",auc:0.91,precision:0.87,recall:0.85,f1:0.86,lift3:3.5,status:"Production",latency:"<80ms",features:768,trainDate:"Feb 2026"},
];

const modelTrend = [
  {month:"Oct 25",NBA:0.82,Prescriber:0.78,Content:0.79,Sentiment:0.85},
  {month:"Nov 25",NBA:0.84,Prescriber:0.80,Content:0.80,Sentiment:0.87},
  {month:"Dec 25",NBA:0.85,Prescriber:0.82,Content:0.81,Sentiment:0.88},
  {month:"Jan 26",NBA:0.87,Prescriber:0.84,Content:0.82,Sentiment:0.89},
  {month:"Feb 26",NBA:0.88,Prescriber:0.85,Content:0.83,Sentiment:0.90},
  {month:"Mar 26",NBA:0.89,Prescriber:0.86,Content:0.84,Sentiment:0.91},
];

// ── Feature Importance (NBA Model) ──
const featureImp = [
  {feature:"Rx History (12mo)",importance:0.18},{feature:"Engagement Recency",importance:0.14},{feature:"Content Interaction Depth",importance:0.12},
  {feature:"Channel Preference Score",importance:0.10},{feature:"Specialty Match",importance:0.09},{feature:"Territory Activity Level",importance:0.08},
  {feature:"Competitive Prescribing",importance:0.07},{feature:"Congress Attendance",importance:0.06},{feature:"Digital Affinity Score",importance:0.05},
  {feature:"Time Since Last Rep Visit",importance:0.04},{feature:"Formulary Status",importance:0.04},{feature:"Patient Volume",importance:0.03},
].map(d=>({...d,importance:+(d.importance*100).toFixed(1)}));

// ── BI Maturity Roadmap ──
const biMaturity = [
  {phase:"Current State",quarter:"Q1 2026",score:2.4,items:["Fragmented dashboards (15+ tools)","Manual Excel reporting","Siloed data marts","Ad-hoc analysis requests","30-day insight latency"]},
  {phase:"Foundation",quarter:"Q2-Q3 2026",score:3.2,items:["Unified semantic layer","Self-service BI (Power BI)","Automated data pipelines","Enterprise data catalog","7-day insight latency"]},
  {phase:"Advanced",quarter:"Q4 2026-Q1 2027",score:4.0,items:["Embedded ML predictions","Real-time dashboards","Natural language queries","Automated anomaly detection","Same-day insights"]},
  {phase:"AI-Native",quarter:"Q2-Q4 2027",score:4.8,items:["Agentic BI (auto-generated insights)","Prescriptive recommendations","Conversational analytics","Self-optimizing KPIs","Real-time decisioning"]},
];

// ── Data Science CoE Capacity ──
const coeCapacity = [
  {capability:"Predictive Analytics",current:3,target:8,gap:5},
  {capability:"NLP / LLM",current:2,target:6,gap:4},
  {capability:"MLOps / Deployment",current:1,target:5,gap:4},
  {capability:"Experimentation (A/B)",current:2,target:5,gap:3},
  {capability:"Computer Vision",current:0,target:3,gap:3},
  {capability:"Data Engineering",current:4,target:10,gap:6},
  {capability:"BI / Visualization",current:5,target:8,gap:3},
  {capability:"Statistical Modeling",current:3,target:6,gap:3},
];

// ── Prescriber Segmentation Scatter ──
const segScatter = Array.from({length:80},(_,i)=>({
  rxVolume:Math.round(Math.random()*200+10),
  engagement:Math.round(Math.random()*90+10),
  value:Math.round(Math.random()*500+50),
  segment:["High Value","Growth","Maintain","At Risk"][Math.floor(Math.random()*4)],
}));
const segColors={"High Value":G,"Growth":C,"Maintain":A,"At Risk":R};

// ── ROI Attribution by Model ──
const roiAttribution = [
  {model:"NBA Propensity",rxLift:"+18.5%",revenueImpact:"$42M",costSaved:"$3.2M"},
  {model:"Content Effectiveness",rxLift:"+12.3%",revenueImpact:"$28M",costSaved:"$5.1M"},
  {model:"Channel Response (MMM)",rxLift:"+8.7%",revenueImpact:"$19M",costSaved:"$8.4M"},
  {model:"Prescriber Conversion",rxLift:"+15.1%",revenueImpact:"$35M",costSaved:"$2.8M"},
  {model:"HCP Churn Risk",rxLift:"+6.2%",revenueImpact:"$14M",costSaved:"$1.9M"},
  {model:"Sentiment (BERT)",rxLift:"+4.8%",revenueImpact:"$11M",costSaved:"$0.7M"},
];

// ── Radar for DS Maturity ──
const dsRadar = [
  {subject:"Data Quality",A:85,B:95},{subject:"ML Maturity",A:45,B:88},
  {subject:"MLOps",A:30,B:82},{subject:"BI Self-Service",A:55,B:90},
  {subject:"Real-time Analytics",A:25,B:78},{subject:"NLP/GenAI",A:20,B:85},
  {subject:"Experimentation",A:40,B:75},{subject:"Data Governance",A:65,B:92},
];

const tabs=[
  {id:"models",label:"ML Models",icon:Brain},
  {id:"bi",label:"BI Roadmap",icon:BarChart3},
  {id:"coe",label:"DS CoE",icon:Users},
  {id:"segmentation",label:"HCP Segmentation",icon:Target},
  {id:"roi",label:"Model ROI",icon:TrendingUp},
  {id:"platform",label:"Platform",icon:Layers},
];

const KPI=({value,label,icon:I,color=C,sub})=>(
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:color+"18"}}><I size={16} color={color}/></div><span className="text-xs text-gray-400">{label}</span></div>
    <div className="text-2xl font-bold" style={{color:N}}>{value}</div>
    {sub && <div className="text-xs mt-1" style={{color:sub.startsWith("+")?G:sub.startsWith("-")?R:"#999"}}>{sub}</div>}
  </div>
);

const Ins=({title,text,type="insight"})=>(
  <div className={`rounded-xl p-4 border-l-4 ${type==="insight"?"bg-amber-50 border-amber-400":"bg-emerald-50 border-emerald-500"}`}>
    <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${type==="insight"?"text-amber-700":"text-emerald-700"}`}>{title}</div>
    <div className="text-sm text-gray-700 leading-relaxed">{text}</div>
  </div>
);

const Sec=({icon:I,title,sub})=>(
  <div className="mb-6 flex items-center gap-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:N}}><I size={20} color="#fff"/></div><div><h2 className="text-xl font-bold" style={{color:N}}>{title}</h2>{sub&&<p className="text-sm text-gray-500">{sub}</p>}</div></div>
);

const StatusBadge=({status})=>{
  const c=status==="Production"?G:status==="Staging"?A:M;
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{background:c+"20",color:c}}>{status}</span>;
};

export default function App(){
  const [tab,setTab]=useState("models");
  return(
    <div className="min-h-screen" style={{background:"#F4F6F9",fontFamily:"'DM Sans',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background:N}}><Brain size={18} color="#fff"/></div>
            <div><div className="text-sm font-bold" style={{color:N}}>BMS Data Science & BI Platform</div><div className="text-xs text-gray-400">Enterprise Analytics Blueprint — Improzo for Madhu Krishnan</div></div>
          </div>
          <div className="flex items-center gap-2"><Sparkles size={14} color={A}/><span className="text-xs text-gray-400">8 ML Models · 768 Features · 6 Production Systems</span></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${tab===t.id?"text-white shadow-md":"text-gray-500 hover:bg-gray-100"}`} style={tab===t.id?{background:N}:{}}>
              <t.icon size={14}/>{t.label}
            </button>
          ))}
        </div>
      </header>
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        {tab==="models"&&<ModelsView/>}
        {tab==="bi"&&<BIRoadmap/>}
        {tab==="coe"&&<CoEView/>}
        {tab==="segmentation"&&<SegView/>}
        {tab==="roi"&&<ROIView/>}
        {tab==="platform"&&<PlatformView/>}
      </main>
    </div>
  );
}

function ModelsView(){
  return(<div className="space-y-6">
    <Sec icon={Brain} title="ML Model Registry & Performance" sub="8 production/staging models powering BMS commercial decisions"/>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KPI value="8" label="Active Models" icon={Brain} color={C} sub="+3 this quarter"/>
      <KPI value="0.89" label="Best AUC (NBA)" icon={Target} color={G} sub="+0.07 vs baseline"/>
      <KPI value="3.5x" label="Best Lift@3" icon={TrendingUp} color={A} sub="Sentiment model"/>
      <KPI value="<80ms" label="Avg Latency (P95)" icon={Zap} color={D}/>
    </div>
    {/* Model Table */}
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 overflow-x-auto">
      <h3 className="text-sm font-bold mb-4" style={{color:N}}>Model Performance Registry</h3>
      <table className="w-full text-xs">
        <thead><tr style={{background:N}}>{["Model","Type","AUC","Precision","Recall","F1","Lift@3","Latency","Features","Status","Last Train"].map(h=><th key={h} className="px-3 py-2.5 text-white font-semibold text-left">{h}</th>)}</tr></thead>
        <tbody>{modelPerf.map((m,i)=>(
          <tr key={m.model} className={i%2===0?"bg-white":"bg-gray-50"}>
            <td className="px-3 py-2.5 font-semibold" style={{color:N}}>{m.model}</td>
            <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs">{m.type}</span></td>
            <td className="px-3 py-2.5 font-mono font-bold" style={{color:m.auc>=0.85?G:m.auc>=0.80?A:R}}>{m.auc}</td>
            <td className="px-3 py-2.5 font-mono">{m.precision}</td>
            <td className="px-3 py-2.5 font-mono">{m.recall}</td>
            <td className="px-3 py-2.5 font-mono">{m.f1}</td>
            <td className="px-3 py-2.5 font-bold" style={{color:D}}>{m.lift3}x</td>
            <td className="px-3 py-2.5 font-mono text-gray-500">{m.latency}</td>
            <td className="px-3 py-2.5 text-gray-500">{m.features}</td>
            <td className="px-3 py-2.5"><StatusBadge status={m.status}/></td>
            <td className="px-3 py-2.5 text-gray-400">{m.trainDate}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
    {/* AUC Trend */}
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>Model AUC Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={280}><LineChart data={modelTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}} domain={[0.75,0.95]}/>
          <Tooltip/><Legend wrapperStyle={{fontSize:11}}/>
          <Line type="monotone" dataKey="NBA" stroke={C} strokeWidth={2.5} dot={{r:4}} name="NBA Propensity"/>
          <Line type="monotone" dataKey="Prescriber" stroke={A} strokeWidth={2} dot={{r:3}} name="Prescriber Conv"/>
          <Line type="monotone" dataKey="Content" stroke={G} strokeWidth={2} dot={{r:3}} name="Content Eff"/>
          <Line type="monotone" dataKey="Sentiment" stroke={P} strokeWidth={2.5} dot={{r:4}} name="Sentiment"/>
        </LineChart></ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>NBA Model — Feature Importance (Top 12)</h3>
        <ResponsiveContainer width="100%" height={280}><BarChart data={featureImp} layout="vertical" margin={{left:120}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis type="number" tick={{fontSize:10}}/><YAxis dataKey="feature" type="category" tick={{fontSize:9}} width={118}/>
          <Tooltip formatter={v=>`${v}%`}/><Bar dataKey="importance" fill={C} radius={[0,4,4,0]} name="Importance %"/>
        </BarChart></ResponsiveContainer>
      </div>
    </div>
    <Ins title="Key Insight" text="NBA Propensity model (AUC 0.89) has improved +8.5% over 6 months through continuous retraining. Rx History and Engagement Recency drive 32% of prediction power combined. Sentiment BERT model achieves highest lift (3.5x) — NLP is the highest-ROI ML investment. All production models meet <100ms P95 latency SLA."/>
    <Ins type="rec" title="Recommendation for Madhu" text="1) Invest in MLOps automation — model retraining currently manual, should be weekly auto-retrain via MLflow. 2) Deploy Patient Journey LSTM to production — it's ready at AUC 0.83. 3) Build a model marketplace for brand teams to self-serve predictions. 4) Improzo can provide dedicated ML engineers with pharma domain expertise to accelerate your model factory."/>
  </div>);
}

function BIRoadmap(){
  return(<div className="space-y-6">
    <Sec icon={BarChart3} title="BI Modernization Roadmap" sub="From fragmented dashboards to AI-native analytics in 4 phases"/>
    {/* Radar: Current vs Target */}
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>Data Science Maturity: Current vs Target</h3>
        <ResponsiveContainer width="100%" height={320}><RadarChart data={dsRadar}>
          <PolarGrid stroke="#e5e7eb"/><PolarAngleAxis dataKey="subject" tick={{fontSize:10}}/>
          <PolarRadiusAxis angle={30} domain={[0,100]} tick={{fontSize:9}}/>
          <Radar name="Current State" dataKey="A" stroke={R} fill={R} fillOpacity={0.2} strokeWidth={2}/>
          <Radar name="Target (18 months)" dataKey="B" stroke={G} fill={G} fillOpacity={0.15} strokeWidth={2}/>
          <Legend wrapperStyle={{fontSize:11}}/>
          <Tooltip/>
        </RadarChart></ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>Maturity Score Progression</h3>
        <ResponsiveContainer width="100%" height={320}><AreaChart data={biMaturity.map(b=>({phase:b.phase,score:b.score}))}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="phase" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}} domain={[0,5]}/>
          <Tooltip/><Area type="monotone" dataKey="score" stroke={C} fill={C} fillOpacity={0.2} strokeWidth={2.5} name="Maturity Score (0-5)"/>
        </AreaChart></ResponsiveContainer>
      </div>
    </div>
    {/* Roadmap Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {biMaturity.map((p,i)=>(
        <div key={p.phase} className="bg-white rounded-xl p-5 shadow-sm border-t-4 hover:shadow-md transition-all" style={{borderTopColor:[M,C,A,G][i]}}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:[M,C,A,G][i]+"20",color:[M,C,A,G][i]}}>Phase {i+1}</span>
            <span className="text-xs text-gray-400">{p.quarter}</span>
          </div>
          <h4 className="text-sm font-bold mb-2" style={{color:N}}>{p.phase}</h4>
          <div className="text-lg font-bold mb-3" style={{color:[M,C,A,G][i]}}>{p.score}/5.0</div>
          <ul className="space-y-1.5">{p.items.map(item=><li key={item} className="text-xs text-gray-600 flex items-start gap-1.5"><ChevronRight size={11} className="mt-0.5 flex-shrink-0" style={{color:[M,C,A,G][i]}}/>{item}</li>)}</ul>
        </div>
      ))}
    </div>
    <Ins title="Key Insight" text="Current BI maturity is 2.4/5.0 — fragmented across 15+ tools with 30-day insight latency. The biggest gap is in MLOps (30→82 target) and Real-time Analytics (25→78). NLP/GenAI capability barely exists (20/100) but has highest potential impact. Self-service BI adoption is at 55% — significant room to grow."/>
    <Ins type="rec" title="Recommendation for Madhu" text="1) Phase 1 (Quick Win): Consolidate top 5 dashboards into unified Power BI semantic layer — 60-day delivery. 2) Phase 2: Deploy automated data pipelines replacing manual Excel processes — est. 40% analyst time savings. 3) Phase 3: Embed ML predictions directly into BI dashboards. 4) Improzo can fast-track this roadmap by 6 months with dedicated BI architects + data engineers."/>
  </div>);
}

function CoEView(){
  return(<div className="space-y-6">
    <Sec icon={Users} title="Data Science Center of Excellence" sub="Current capacity, talent gaps, and build plan"/>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KPI value="20" label="Current Team Size" icon={Users} color={C}/><KPI value="51" label="Target Team Size" icon={Target} color={G} sub="+31 headcount needed"/>
      <KPI value="61%" label="Gap Coverage" icon={AlertTriangle} color={R}/><KPI value="$3.2M" label="Est. Annual Investment" icon={TrendingUp} color={A}/>
    </div>
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>Capability Gap Analysis: Current vs Target (Headcount)</h3>
        <ResponsiveContainer width="100%" height={320}><BarChart data={coeCapacity} margin={{left:10}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="capability" tick={{fontSize:9}} angle={-15} textAnchor="end" height={55}/><YAxis tick={{fontSize:10}}/>
          <Tooltip/><Legend wrapperStyle={{fontSize:11}}/>
          <Bar dataKey="current" fill={M} name="Current" radius={[4,4,0,0]}/><Bar dataKey="target" fill={C} name="Target" radius={[4,4,0,0]}/>
        </BarChart></ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>Gap by Capability (Headcount Needed)</h3>
        <ResponsiveContainer width="100%" height={320}><BarChart data={coeCapacity.sort((a,b)=>b.gap-a.gap)} layout="vertical" margin={{left:100}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis type="number" tick={{fontSize:10}}/><YAxis dataKey="capability" type="category" tick={{fontSize:10}} width={98}/>
          <Tooltip/><Bar dataKey="gap" fill={R} radius={[0,4,4,0]} name="Gap"/>
        </BarChart></ResponsiveContainer>
      </div>
    </div>
    {/* Hiring Plan */}
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold mb-4" style={{color:N}}>Improzo Managed Analytics Team — Proposed Build Plan</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {phase:"Wave 1 (Q2 2026)",roles:["4× Data Engineers (Databricks/Spark)","2× BI Developers (Power BI)","2× ML Engineers (MLOps)","1× NLP Specialist"],cost:"$85K/mo",color:C},
          {phase:"Wave 2 (Q3 2026)",roles:["3× Data Scientists (Predictive)","2× Analytics Engineers (dbt)","1× Experimentation Lead","1× Data Governance Analyst"],cost:"$65K/mo",color:A},
          {phase:"Wave 3 (Q4 2026)",roles:["2× GenAI/LLM Engineers","1× Computer Vision Specialist","2× Advanced Analytics (Bayesian)","1× Platform Architect"],cost:"$70K/mo",color:G},
        ].map(w=>(
          <div key={w.phase} className="rounded-xl p-4 border-2" style={{borderColor:w.color,background:w.color+"08"}}>
            <div className="text-xs font-bold mb-2" style={{color:w.color}}>{w.phase}</div>
            <ul className="space-y-1.5 mb-3">{w.roles.map(r=><li key={r} className="text-xs text-gray-700 flex items-start gap-1.5"><CheckCircle2 size={11} className="mt-0.5 flex-shrink-0" color={w.color}/>{r}</li>)}</ul>
            <div className="text-sm font-bold" style={{color:N}}>Est. {w.cost}</div>
          </div>
        ))}
      </div>
    </div>
    <Ins title="Key Insight" text="Data Engineering has the largest absolute gap (6 headcount). NLP/LLM and MLOps are the fastest-growing demand areas but hardest to hire. Current team is overweight on BI (5 of 20) and light on ML engineering (1 of 20). Pharma-domain data scientists command 30-40% premium over generic hires."/>
    <Ins type="rec" title="Recommendation for Madhu" text="1) Use Improzo's managed team model to close the 31-person gap in 3 waves — avoid 6-month hiring cycles. 2) Start with Data Engineering + MLOps (Wave 1) — these are prerequisite for everything else. 3) Retain NLP specialist in Wave 1 to accelerate Sentiment model deployment. 4) Total managed team cost: ~$220K/mo vs $450K+ if hired directly in Hyderabad. 60% cost advantage."/>
  </div>);
}

function SegView(){
  return(<div className="space-y-6">
    <Sec icon={Target} title="HCP Segmentation & Prescriber Analytics" sub="ML-driven micro-segmentation powering personalized engagement"/>
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>HCP Prescriber Segments (Rx Volume vs Engagement)</h3>
        <ResponsiveContainer width="100%" height={340}>
          <ScatterChart margin={{bottom:20}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis type="number" dataKey="rxVolume" name="Rx Volume (12mo)" tick={{fontSize:10}}/><YAxis type="number" dataKey="engagement" name="Engagement Score" tick={{fontSize:10}}/>
            <ZAxis type="number" dataKey="value" range={[40,400]} name="LTV"/>
            <Tooltip cursor={{strokeDasharray:"3 3"}}/>
            <Legend wrapperStyle={{fontSize:11}}/>
            {["High Value","Growth","Maintain","At Risk"].map(seg=>
              <Scatter key={seg} name={seg} data={segScatter.filter(d=>d.segment===seg)} fill={segColors[seg]}/>
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold mb-3" style={{color:N}}>Segment Distribution & Strategy</h3>
        <div className="space-y-4 mt-2">
          {[
            {seg:"High Value",count:"12,400 HCPs",pct:"8%",action:"Retain & grow — dedicated rep + digital concierge",color:G,rx:"65% of total Rx"},
            {seg:"Growth",count:"28,600 HCPs",pct:"18%",action:"Accelerate — AI-optimized NBA + peer influence programs",color:C,rx:"22% of total Rx"},
            {seg:"Maintain",count:"67,000 HCPs",pct:"43%",action:"Efficient reach — digital-first, low-cost touchpoints",color:A,rx:"10% of total Rx"},
            {seg:"At Risk",count:"47,000 HCPs",pct:"31%",action:"Win-back — competitive defense content + rep re-engagement",color:R,rx:"3% of total Rx"},
          ].map(s=>(
            <div key={s.seg} className="rounded-lg p-3 border-l-4 bg-gray-50" style={{borderLeftColor:s.color}}>
              <div className="flex items-center justify-between"><span className="text-sm font-bold" style={{color:N}}>{s.seg}</span><span className="text-xs text-gray-400">{s.count} ({s.pct})</span></div>
              <div className="text-xs text-gray-500 mt-1">{s.rx}</div>
              <div className="text-xs mt-1" style={{color:s.color}}>{s.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Ins title="Key Insight" text="8% of HCPs (High Value) drive 65% of Rx volume — classic Pareto. Growth segment (18%) has highest ROI potential: AI-optimized NBA can shift 15-20% of them to High Value within 12 months. At Risk segment (31%) is growing — competitive threats from Keytruda/Skyrizi are pulling prescribers away."/>
    <Ins type="rec" title="Recommendation for Madhu" text="1) Deploy real-time segmentation model in Madhu's BI platform — update segments weekly not quarterly. 2) Connect segmentation to NBA engine for action-specific engagement per segment. 3) Build 'Growth → High Value' conversion tracking as a key BI metric. 4) Improzo can build the segmentation pipeline end-to-end on Databricks in 6 weeks."/>
  </div>);
}

function ROIView(){
  return(<div className="space-y-6">
    <Sec icon={TrendingUp} title="Model Business Impact & ROI Attribution" sub="Quantified value of each ML model in the portfolio"/>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KPI value="$149M" label="Total Revenue Impact" icon={TrendingUp} color={G} sub="+34% YoY"/><KPI value="$22.1M" label="Cost Savings" icon={Target} color={C} sub="Efficiency gains"/>
      <KPI value="18.5%" label="Best Rx Lift (NBA)" icon={ArrowUpRight} color={A}/><KPI value="4.7x" label="Model Portfolio ROI" icon={Zap} color={D}/>
    </div>
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 overflow-x-auto">
      <h3 className="text-sm font-bold mb-4" style={{color:N}}>Model-Level Business Impact Attribution</h3>
      <table className="w-full text-xs">
        <thead><tr style={{background:N}}>{["Model","Rx Volume Lift","Revenue Impact","Cost Saved","Combined Value","ROI Status"].map(h=><th key={h} className="px-4 py-2.5 text-white font-semibold text-left">{h}</th>)}</tr></thead>
        <tbody>{roiAttribution.map((m,i)=>(
          <tr key={m.model} className={i%2===0?"bg-white":"bg-gray-50"}>
            <td className="px-4 py-3 font-semibold" style={{color:N}}>{m.model}</td>
            <td className="px-4 py-3 font-bold" style={{color:G}}>{m.rxLift}</td>
            <td className="px-4 py-3 font-bold" style={{color:D}}>{m.revenueImpact}</td>
            <td className="px-4 py-3 text-gray-600">{m.costSaved}</td>
            <td className="px-4 py-3 font-bold" style={{color:A}}>{m.revenueImpact}</td>
            <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700 font-medium">ROI Positive</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold mb-3" style={{color:N}}>Revenue Impact by Model</h3>
      <ResponsiveContainer width="100%" height={260}><BarChart data={roiAttribution.map(m=>({model:m.model.split(" ").slice(0,2).join(" "),impact:parseInt(m.revenueImpact.replace(/\$|M/g,""))}))}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="model" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/>
        <Tooltip formatter={v=>`$${v}M`}/><Bar dataKey="impact" fill={G} radius={[4,4,0,0]} name="Revenue Impact ($M)"/>
      </BarChart></ResponsiveContainer>
    </div>
    <Ins title="Key Insight" text="NBA Propensity model alone drives $42M revenue impact (18.5% Rx lift). Channel Response MMM saves the most costs ($8.4M) through budget optimization. Combined model portfolio delivers 4.7x ROI on data science investment. Every model in portfolio is ROI-positive — validates continued investment."/>
    <Ins type="rec" title="Recommendation for Madhu" text="1) Present this ROI framework to BMS leadership as justification for 2x data science investment. 2) Prioritize NBA + Content Effectiveness models for next retraining cycle — highest marginal gains. 3) Build an automated model ROI tracker in the BI platform. 4) Improzo can help build this end-to-end measurement system in 4 weeks."/>
  </div>);
}

function PlatformView(){
  return(<div className="space-y-6">
    <Sec icon={Layers} title="Enterprise Data & AI Platform Architecture" sub="Modern Lakehouse architecture purpose-built for pharma commercial analytics"/>
    {/* Platform Architecture as HTML cards */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold mb-5" style={{color:N}}>Platform Stack — Recommended Architecture</h3>
      <div className="space-y-4">
        {[
          {layer:"Compute & ML",color:P,bg:"#F3E8FD",tools:[{name:"Databricks",desc:"Unified Analytics + Delta Lake"},{name:"MLflow",desc:"Model Registry + Experiment Tracking"},{name:"Feature Store",desc:"Real-time Feature Serving"},{name:"Ray/Spark",desc:"Distributed Training"}]},
          {layer:"Storage & Data",color:C,bg:"#E0F2FE",tools:[{name:"Snowflake",desc:"Enterprise Data Warehouse"},{name:"Delta Lake",desc:"ACID Lakehouse (S3)"},{name:"Unity Catalog",desc:"Governance + Lineage"},{name:"Redis/Kafka",desc:"Real-time Streaming Cache"}]},
          {layer:"Orchestration",color:A,bg:"#FFF7ED",tools:[{name:"Airflow/Dagster",desc:"Pipeline Orchestration"},{name:"dbt",desc:"Analytics Engineering"},{name:"Great Expectations",desc:"Data Quality"},{name:"Terraform",desc:"Infrastructure as Code"}]},
          {layer:"Consumption",color:G,bg:"#F0FDF4",tools:[{name:"Power BI",desc:"Self-service BI"},{name:"Streamlit",desc:"ML App Prototyping"},{name:"Veeva CRM API",desc:"NBA Push to Field"},{name:"REST APIs",desc:"Programmatic Access"}]},
          {layer:"Governance",color:S,bg:"#F1F5F9",tools:[{name:"HIPAA Framework",desc:"PHI Protection"},{name:"GDPR Pipeline",desc:"Consent + Erasure"},{name:"PagerDuty",desc:"SLA Monitoring"},{name:"OpenLineage",desc:"Cross-platform Lineage"}]},
        ].map(l=>(
          <div key={l.layer} className="rounded-xl p-4 border" style={{background:l.bg,borderColor:l.color+"40"}}>
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{color:l.color}}>{l.layer}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{l.tools.map(t=>(
              <div key={t.name} className="bg-white rounded-lg p-3 border border-gray-100">
                <div className="text-sm font-bold" style={{color:N}}>{t.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
              </div>
            ))}</div>
          </div>
        ))}
      </div>
    </div>
    {/* Platform KPIs */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        {title:"Data Freshness",value:"<6 hrs",desc:"End-to-end pipeline latency (batch)",icon:Zap,color:C},
        {title:"Query Performance",value:"<3 sec",desc:"P95 dashboard query time",icon:Activity,color:G},
        {title:"Platform Uptime",value:"99.95%",desc:"12-month rolling availability",icon:Shield,color:D},
        {title:"Cost Efficiency",value:"$0.12/query",desc:"Avg compute cost per BI query",icon:TrendingUp,color:A},
      ].map(k=>(
        <div key={k.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2"><k.icon size={16} color={k.color}/><span className="text-xs font-bold" style={{color:k.color}}>{k.title}</span></div>
          <div className="text-2xl font-bold" style={{color:N}}>{k.value}</div>
          <div className="text-xs text-gray-400 mt-1">{k.desc}</div>
        </div>
      ))}
    </div>
    <Ins title="Architecture Insight" text="This Lakehouse architecture eliminates the traditional DW/Data Lake split. Databricks Delta Lake provides ACID transactions on S3 while Snowflake serves as the governed enterprise layer. MLflow + Feature Store enables production ML without custom infrastructure. Unity Catalog provides single-pane governance across all data assets."/>
    <Ins type="rec" title="Recommendation for Madhu" text="1) Adopt this architecture in phases — start with Snowflake semantic layer + Power BI (8-week delivery). 2) Add Databricks ML layer in Phase 2 for model training and Feature Store. 3) Implement dbt for analytics engineering — replaces manual SQL and enables version control. 4) Improzo has delivered this exact stack for 3 pharma GCCs. We can fast-track Madhu's platform build with pre-built pharma accelerators."/>
  </div>);
}
