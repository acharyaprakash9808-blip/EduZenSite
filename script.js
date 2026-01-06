let timerInterval = null;
let totalSeconds = 0;
let musicPlaying = false;

// Dynamic data structure: expandable for all grades
const data = {
  physics: {
    "Motion": {
      formulas: [
        "v = u + at","s = ut + ½ at²","v² = u² + 2as",
        "Average speed = total distance / total time","a = Δv/Δt",
        "s = ∫v dt","v = ds/dt","Free fall: s = ½ gt²","v = gt","Displacement s = vt"
      ],
      defs: [
        "Motion: change in position","Velocity: speed with direction","Acceleration: rate of change of velocity",
        "Displacement: distance with direction","Uniform motion: constant speed","Instantaneous velocity",
        "Average velocity = displacement/time","Free fall under gravity","Distance = speed × time","Equations of motion link s,u,v,a,t"
      ]
    },
    "Force": {
      formulas: [
        "F = ma","Momentum = mv","Impulse = FΔt","Weight = mg","Friction = μN",
        "Tension T = mg","Centripetal Fc = mv²/r","Pressure P = F/A","Work W = Fd","Power P = W/t"
      ],
      defs: [
        "Force causes acceleration","Newton's 1st law: inertia","Newton's 2nd law: F=ma",
        "Newton's 3rd law: action=reaction","Weight = gravity","Friction opposes motion",
        "Momentum = mass × velocity","Impulse = change in momentum","Centripetal force: toward center","Pressure = force/area"
      ]
    }
  },
  chemistry: {
    "Atomic Structure": {
      formulas: [
        "Mass number = p + n","Atomic number = p","Electrons = p","Isotopes: same Z, diff A","Mole = 6.022e23 particles",
        "Concentration C = n/V","pH = -log[H⁺]","Density = mass/volume","PV=nRT","Empirical formula calculation"
      ],
      defs: [
        "Atom = smallest unit","Proton positive","Electron negative","Neutron neutral","Isotopes: same element diff mass",
        "Mole = amount of substance","pH measures acidity","Gas laws relate P,V,T","Density = mass/volume","Empirical formula simplest ratio"
      ]
    }
  },
  biology: {
    "Cell Structure": {
      formulas: ["Cell → basic unit","Mitosis formula","Osmosis rate formula","Diffusion equation","Respiration ATP equation","Photosynthesis equation","DNA replication formula","Protein synthesis equation","Enzyme activity formula","Population growth rate"],
      defs: ["Cell theory","Prokaryotes vs Eukaryotes","Mitochondria function","Nucleus structure","Membrane function","Photosynthesis overview","Respiration facts","DNA facts","RNA facts","Protein synthesis"]
    }
  },
  math: {
    "Algebra": {
      formulas: ["(a+b)² = a²+2ab+b²","a²-b²=(a-b)(a+b)","(x+y)³=x³+y³+3xy(x+y)","Quadratic formula x=[-b±√(b²-4ac)]/2a","Sum n terms arithmetic n/2(2a+(n-1)d)","a^m × a^n = a^(m+n)","a^m / a^n = a^(m-n)","(x+y+z)²=x²+y²+z²+2(xy+yz+zx)","Factorization ax²+bx+c","Distance √((x₂-x₁)² + (y₂-y₁)²)"],
      defs: ["Algebra symbols","Polynomial sum","Factorization","Quadratic eq","Arithmetic sequence","Exponent rules","Binomial expansion","Sum/product of roots","Linear equation","Distance formula"]
    }
  },
  computer: {
    "Basics": {
      formulas: ["Input → Process → Output","Binary addition","Binary subtraction","Logic gates formula","Boolean algebra","ASCII code formula","IP addressing formula","Subnet mask calculation","Memory units conversion","CPU cycles formula"],
      defs: ["Computer definition","CPU is brain","Memory types","Input devices","Output devices","Software vs Hardware","OS functions","Networking basics","Binary system","Logic gates"]
    }
  }
};

// Random memory tips
const memoryTips = [
  "Study 25 minutes, break 5 minutes","Write formulas by hand","Revise before sleeping","Teach someone else","Stay hydrated"
];

// DOM references
const username = document.getElementById("username");
const email = document.getElementById("email");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const chapter = document.getElementById("chapter");
const formulaBox = document.getElementById("formulaBox");
const definitionBox = document.getElementById("definitionBox");
const userDisplay = document.getElementById("userDisplay");
const studyInfo = document.getElementById("studyInfo");
const memoryTip = document.getElementById("memoryTip");
const timer = document.getElementById("timer");
const intro = document.getElementById("intro");
const app = document.getElementById("app");
const loginBox = document.getElementById("loginBox");
const dashboard = document.getElementById("dashboard");

// App functions
function enterApp(){ intro.classList.add("hidden"); app.classList.remove("hidden"); }

function loadChapters(){
  chapter.innerHTML="<option value=''>Select Chapter</option>";
  if(data[subject.value]){
    Object.keys(data[subject.value]).forEach(ch=>{
      const opt=document.createElement("option"); opt.textContent=ch; chapter.appendChild(opt);
    });
  }
  formulaBox.innerHTML=""; definitionBox.innerHTML="";
}

function loadContent(){
  formulaBox.innerHTML=""; definitionBox.innerHTML="";
  const content = data[subject.value][chapter.value];
  content.formulas.forEach(f=>{ const li=document.createElement("li"); li.textContent=f; formulaBox.appendChild(li); });
  content.defs.forEach(d=>{ const li=document.createElement("li"); li.textContent=d; definitionBox.appendChild(li); });
}

function login(){
  if(!username.value||!email.value||!grade.value||!subject.value||!chapter.value) return alert("Fill all fields");
  userDisplay.textContent=username.value;
  studyInfo.textContent=`${grade.value} • ${subject.value.toUpperCase()} • ${chapter.value}`;
  memoryTip.textContent=memoryTips[Math.floor(Math.random()*memoryTips.length)];
  loginBox.classList.add("hidden"); dashboard.classList.remove("hidden");
}

function startTimer(){
  if(timerInterval) return;
  timerInterval=setInterval(()=>{
    totalSeconds++;
    const min=String(Math.floor(totalSeconds/60)).padStart(2,'0');
    const sec=String(totalSeconds%60).padStart(2,'0');
    timer.textContent=`${min}:${sec}`;
  },1000);
}

function stopTimer(){ clearInterval(timerInterval); timerInterval=null; }
function resetTimer(){ stopTimer(); totalSeconds=0; timer.textContent="00:00"; }
function toggleMusic(){ const music=document.getElementById("focusMusic"); musicPlaying?music.pause():music.play(); musicPlaying=!musicPlaying; }
function logout(){ stopTimer(); totalSeconds=0; timer.textContent="00:00"; dashboard.classList.add("hidden"); loginBox.classList.remove("hidden"); }
