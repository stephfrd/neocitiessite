
const petals = ['🌸','🌷','✿','❀'];

function spawnPetals() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = petals[Math.floor(Math.random() * petals.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = (Math.random() * 12 + 9) + 's';
      p.style.animationDelay = (Math.random() * 4) + 's';
      p.style.fontSize = (Math.random() * 7 + 10) + 'px';
      document.getElementById('desktop').appendChild(p);
      setTimeout(() => p.remove(), 22000);
    }, i * 300);
  }
}
setInterval(spawnPetals, 6000);
spawnPetals();
function tick() {
  const n = new Date();
  document.getElementById('tbar-clk').textContent =
    n.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(tick, 1000);
tick();

let zTop = 200;
const winPrev = {};
const WIN_IDS = ['wt','we','wg','wc','wnp','wbook'];

function positionRzh(id) {
  const w   = document.getElementById(id);
  const rzh = document.getElementById('rzh-' + id);
  if (!rzh || !w.classList.contains('shown') || w.classList.contains('minimized')) {
    if (rzh) rzh.style.display = 'none';
    return;
  }
  const r = w.getBoundingClientRect();
  rzh.style.display = 'block';
  rzh.style.left    = (r.right  - 18) + 'px';
  rzh.style.top     = (r.bottom - 18) + 'px';
  rzh.style.zIndex  = String(parseInt(w.style.zIndex || zTop) + 1);
}

function positionAllRzh() {
  WIN_IDS.forEach(positionRzh);
}

function bF(id) {
  document.getElementById(id).style.zIndex = ++zTop;
  positionRzh(id);
}

function openW(id) {
  const w = document.getElementById(id);
  w.classList.add('shown');
  w.classList.remove('minimized');
  bF(id);
  if (id === 'wt') setTimeout(() => document.getElementById('tinp').focus(), 50);
  positionRzh(id);
}

function closeW(id) {
  document.getElementById(id).classList.remove('shown', 'minimized', 'maximized');
  positionRzh(id);
}

function toggleW(id) {
  const w = document.getElementById(id);
  if (w.classList.contains('minimized')) {
    w.classList.remove('minimized');
    bF(id);
  } else if (w.classList.contains('shown')) {
    w.classList.add('minimized');
    positionRzh(id);
  } else {
    openW(id);
  }
}

function maxW(id) {
  const w = document.getElementById(id);
  if (w.classList.contains('maximized')) {
    const p = winPrev[id];
    if (p) {
      w.style.left   = p.left;
      w.style.top    = p.top;
      w.style.width  = p.width;
      w.style.height = p.height;
    }
    w.classList.remove('maximized');
  } else {
    const r = w.getBoundingClientRect();
    winPrev[id] = { left: r.left+'px', top: r.top+'px', width: r.width+'px', height: r.height+'px' };
    w.style.left   = '0px';
    w.style.top    = '0px';
    w.style.width  = '100vw';
    w.style.height = 'calc(100vh - 40px)';
    w.classList.add('maximized');
    bF(id);
  }
  positionRzh(id);
}

function minW(id) {
  document.getElementById(id).classList.add('minimized');
  positionRzh(id);
}

let dg = null;

function dragS(e, id) {
  if (e.target.classList.contains('wb')) return;
  bF(id);
  const r = document.getElementById(id).getBoundingClientRect();
  dg = { id, ox: e.clientX - r.left, oy: e.clientY - r.top };
}

document.addEventListener('mousemove', e => {
  if (dg) {
    const w = document.getElementById(dg.id);
    w.style.left = (e.clientX - dg.ox) + 'px';
    w.style.top  = Math.max(0, e.clientY - dg.oy) + 'px';
    positionRzh(dg.id);
  }
  if (rz) {
    const w = document.getElementById(rz.id);
    w.style.width  = Math.max(320, rz.sw + e.clientX - rz.sx) + 'px';
    w.style.height = Math.max(200, rz.sh + e.clientY - rz.sy) + 'px';
    positionRzh(rz.id);
  }
});

document.addEventListener('mouseup', () => { dg = null; rz = null; });

let rz = null;

function rzS(e, id) {
  e.stopPropagation();
  e.preventDefault();
  const w = document.getElementById(id);
  rz = { id, sx: e.clientX, sy: e.clientY, sw: w.offsetWidth, sh: w.offsetHeight };
  bF(id);
}
window.addEventListener('resize', positionAllRzh);

const vfs = {
  '~': {
    t: 'd',
    ch: {
      'projects': {
        t: 'd',
        ch: {
          'hello.cpp': {
            t: 'f',
            c: '#include <iostream>\nusing namespace std;\n\nint main(){\n    cout << "Hello!" << endl;\n    return 0;\n}'
          },
          'hello.js': {
            t: 'f',
            c: 'console.log("Hello, pink world! 🌸");'
          },
          'hello.py': {
            t: 'f',
            c: 'print("Hello, pink world! 🌸")'
          },
        }
      },
      'notes.txt': {
        t: 'f',
        c: 'stay hydrated 💧\nwrite pretty code 🌸\narch btw~'
      },
      'readme.md': {
        t: 'f',
        c: '# pinkTerm\nType help for commands.'
      },
    }
  }
};

let cwd  = '~';
let hist = [];
let hIdx = -1;

function gn(p) {
  const pts = p.replace(/^~\/?/, '').split('/').filter(Boolean);
  let n = vfs['~'];
  for (const s of pts) {
    if (!n.ch || !n.ch[s]) return null;
    n = n.ch[s];
  }
  return n;
}

function gnc(nm) {
  const n = gn(cwd);
  return n && n.ch ? n.ch[nm] : null;
}
function tp(h) {
  const b = document.getElementById('tb');
  const d = document.createElement('div');
  d.className = 'tl';
  d.innerHTML = h;
  b.appendChild(d);
  b.scrollTop = b.scrollHeight;
}

function initTerm() {
  tp(`<span class="tp">        .
       / \\
      /   \\
     / ^ ^ \\
    /  | |  \\
   /   | |   \\
  /    | |    \\
 /_____|_|_____\\</span>`);
  tp(`<span class="tp"> </span>`);
  tp(`<span class="tp"> ░██╗    ░██╗███████╗██╗      ██████╗ ██████╗ ███╗░░░███╗███████╗</span>`);
  tp(`<span class="tp"> ░██║    ░██║██╔════╝██║     ██╔════╝██╔═══██╗████╗░████║██╔════╝</span>`);
  tp(`<span class="tp"> ░██║ █╗ ░██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  </span>`);
  tp(`<span class="tp"> ░██║███╗░██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  </span>`);
  tp(`<span class="tp"> ░╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗</span>`);
  tp(`<span class="tp">  ░╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝</span>`);
  tp(`<span class="tp"> </span>`);
  tp(`<span class="tp"> ████████╗ ██████╗     ██████╗ ██╗███╗░░██╗██╗  ██╗░█████╗░██████╗  ██████╗██╗  ██╗</span>`);
  tp(`<span class="tp"> ╚══██╔══╝██╔═══██╗    ██╔══██╗██║████╗░██║██║ ██╔╝██╔══██╗██╔══██╗██╔════╝██║  ██║</span>`);
  tp(`<span class="tp">    ██║   ██║   ██║    ██████╔╝██║██╔██╗██║█████╔╝ ███████║██████╔╝██║     ███████║</span>`);
  tp(`<span class="tp">    ██║   ██║   ██║    ██╔═══╝ ██║██║╚████║██╔═██╗ ██╔══██║██╔══██╗██║     ██╔══██║</span>`);
  tp(`<span class="tp">    ██║   ╚██████╔╝    ██║     ██║██║ ╚███║██║  ██╗██║  ██║██║  ██║╚██████╗██║  ██║</span>`);
  tp(`<span class="tp">    ╚═╝    ╚═════╝     ╚═╝     ╚═╝╚═╝  ╚══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝</span>`);
  tp(`<span class="tp"> </span>`);
  tp(`<span class="tp">  ~ pastel arch edition ~   🌸</span>`);
  tp(`<span style="color:var(--dim)">  type <span class="ty">help</span> for available commands</span>`);
  tp('');
}

const cmds = {

  help: () => {
    tp(`<span class="ty">─── commands ───────────────────────────</span>`);
    [
      ['ls',         'list files'],
      ['cd [dir]',   'change directory'],
      ['cat [file]', 'view file contents'],
      ['mkdir [n]',  'create directory'],
      ['touch [n]',  'create file'],
      ['pwd',        'print working directory'],
      ['echo [t]',   'print text'],
      ['clear',      'clear screen'],
      ['whoami',     'current user'],
      ['date',       'current date and time'],
      ['neofetch',   'system info'],
      ['fortune',    'programmer wisdom'],
      ['cowsay [t]', 'philosophical cow'],
      ['matrix',     'go deeper'],
      ['games',      'open games window'],
      ['editor',     'open code editor'],
      ['camera',     'open camera app'],
    ].forEach(([c, d]) =>
      tp(`  <span class="tp">${c.padEnd(14)}</span><span style="color:var(--dim)">${d}</span>`)
    );
    tp(`<span class="ty">───────────────────────────────────────</span>`);
  },

  ls: () => {
    const n = gn(cwd);
    if (!n || n.t !== 'd') return tp(`<span class="te">not a directory</span>`);
    const e = Object.entries(n.ch || {});
    if (!e.length) return tp(`<span style="color:var(--dim)">(empty)</span>`);
    tp(e.map(([nm, nd]) =>
      nd.t === 'd'
        ? `<span class="ti">${nm}/</span>`
        : `<span class="to">${nm}</span>`
    ).join('  '));
  },

  pwd: () => tp(`<span class="to">/home/guest/${cwd}</span>`),

  cd: (a) => {
    const t = a[0] || '~';
    if (t === '..') {
      if (cwd !== '~') {
        const p = cwd.split('/');
        p.pop();
        cwd = p.join('/') || '~';
      }
      return;
    }
    if (t === '~') { cwd = '~'; return; }
    const nd = gnc(t);
    if (!nd || nd.t !== 'd') return tp(`<span class="te">cd: ${t}: no such directory</span>`);
    cwd = (cwd === '~' ? '~/' : cwd + '/') + t;
  },

  cat: (a) => {
    if (!a[0]) return tp(`<span class="te">usage: cat [file]</span>`);
    const n = gnc(a[0]);
    if (!n) return tp(`<span class="te">cat: ${a[0]}: no such file</span>`);
    if (n.t === 'd') return tp(`<span class="te">cat: ${a[0]}: is a directory</span>`);
    tp(`<span class="to">${(n.c || '').replace(/</g, '&lt;').replace(/\n/g, '<br>')}</span>`);
  },

  mkdir: (a) => {
    if (!a[0]) return tp(`<span class="te">usage: mkdir [name]</span>`);
    const n = gn(cwd);
    if (n.ch[a[0]]) return tp(`<span class="te">already exists</span>`);
    n.ch[a[0]] = { t: 'd', ch: {} };
    tp(`<span class="ts">created ${a[0]}/</span>`);
  },

  touch: (a) => {
    if (!a[0]) return tp(`<span class="te">usage: touch [name]</span>`);
    gn(cwd).ch[a[0]] = { t: 'f', c: '' };
    tp(`<span class="ts">created ${a[0]}</span>`);
  },

  echo: (a) => tp(`<span class="to">${a.join(' ')}</span>`),

  whoami: () => tp(`<span class="tp">guest</span> <span style="color:var(--dim)">// welcome, programmer 🌸</span>`),

  date: () => tp(`<span class="to">${new Date()}</span>`),

  clear: () => { document.getElementById('tb').innerHTML = ''; },

  neofetch: () => {
    tp(`<span class="tp">        /\\          </span><span class="ty">guest</span><span style="color:var(--dim)">@</span><span class="tp">pinkterm</span>`);
    tp(`<span class="tp">       /  \\         </span><span style="color:var(--dim)">──────────────────</span>`);
    tp(`<span class="tp">      / /\\ \\        </span><span class="ty">OS:</span><span class="to"> pinkArch 3.0 🌸</span>`);
    tp(`<span class="tp">     / /  \\ \\       </span><span class="ty">WM:</span><span class="to"> pinkWM (pastel)</span>`);
    tp(`<span class="tp">    / /    \\ \\      </span><span class="ty">Shell:</span><span class="to"> pinkbash</span>`);
    tp(`<span class="tp">   / / _____\\ \\     </span><span class="ty">Theme:</span><span class="to"> pastel-dark</span>`);
    tp(`<span class="tp">  /_/ /______\\ \\    </span><span class="ty">Font:</span><span class="to"> JetBrains Mono</span>`);
    tp(`<span class="tp"> /___/        \\___\\  </span><span class="ty">Colors:</span> <span style="color:#f7c5dd">██</span><span style="color:#e87fad">██</span><span style="color:#a8e8d8">██</span><span style="color:#f5e0a0">██</span>`);
  },

  fortune: () => {
    const f = [
      '"First, solve the problem. Then, write the code."',
      '"Debugging is twice as hard as writing the code."',
      '"It works on my machine ✓" — every dev ever',
      '"// TODO: fix later" — it never gets fixed',
      '"Premature optimisation is the root of all evil." — Knuth',
      '"The best error message is the one that never shows up."',
      '"Any fool can write code a computer can understand."',
    ];
    tp(`<span class="ty">${f[Math.floor(Math.random() * f.length)]}</span>`);
  },

  cowsay: (a) => {
    const t = a.join(' ') || 'moo ~';
    const b = '-'.repeat(t.length + 2);
    tp(`<span class="to"> ${b}\n&lt; ${t} &gt;\n ${b}\n     \\  ^__^\n      \\ (oo)\\______\n         (__)\\      )\\/\\\n             ||----w|\n             ||     ||</span>`);
  },

  matrix: () => {
    tp(`<span class="ti">entering the matrix…</span>`);
    let c = 0;
    const ch = 'ｦｧｨｩｪ0123456789アイウエオカキ';
    const iv = setInterval(() => {
      let l = '';
      for (let i = 0; i < 55; i++) l += ch[Math.floor(Math.random() * ch.length)];
      tp(`<span style="color:hsl(${Math.random()*40+300},55%,${Math.random()*20+55}%)">${l}</span>`);
      if (++c > 22) {
        clearInterval(iv);
        tp(`<span class="tp">wake up, guest… 🌸</span>`);
      }
    }, 75);
  },

  games:  () => { openW('wg'); tp(`<span class="ts">opening games 🎮</span>`); },
  editor: () => { openW('we'); tp(`<span class="ts">opening editor 💻</span>`); },
  camera: () => { openW('wc'); tp(`<span class="ts">opening camera 📷</span>`); },

};
const ti = document.getElementById('tinp');

ti.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const r = ti.value.trim();
    if (!r) return;
    hist.unshift(r);
    hIdx = -1;
    tp(`<span class="tp">${document.getElementById('tpl').textContent.replace(/</g, '&lt;')}</span><span class="tc"> ${r.replace(/</g, '&lt;')}</span>`);
    const [cmd, ...args] = r.split(' ');
    cmds[cmd] ? cmds[cmd](args) : tp(`<span class="te">pinkbash: command not found: ${cmd} — try <span class="ty">help</span></span>`);
    ti.value = '';
  }
  else if (e.key === 'ArrowUp') {
    hIdx = Math.min(hIdx + 1, hist.length - 1);
    ti.value = hist[hIdx] || '';
    e.preventDefault();
  }
  else if (e.key === 'ArrowDown') {
    hIdx = Math.max(hIdx - 1, -1);
    ti.value = hIdx < 0 ? '' : hist[hIdx];
    e.preventDefault();
  }
});

(function updP() {
  document.getElementById('tpl').textContent = `guest@pinkterm:${cwd}$ `;
  requestAnimationFrame(updP);
})();

document.getElementById('wt').addEventListener('click', (e) => {
  if (e.target.classList.contains('wb')) return;
  if (e.target.closest('.tbar')) return;
  const inp = document.getElementById('tinp');
  inp.focus();
  const len = inp.value.length;
  inp.setSelectionRange(len, len);
});
document.getElementById('tb').style.cursor = 'text';

const ctxMenu = document.getElementById('ctxmenu');
let ctxPos = { x: 0, y: 0 };
let folderCount = 0;
document.getElementById('desktop').addEventListener('contextmenu', e => {
  if (e.target.closest('.win')) return;
  e.preventDefault();
  ctxPos = { x: e.clientX, y: e.clientY };
  ctxMenu.style.left = e.clientX + 'px';
  ctxMenu.style.top  = e.clientY + 'px';
  ctxMenu.style.display = 'block';
});
document.addEventListener('click', () => hideCtx());

function hideCtx() {
  ctxMenu.style.display = 'none';
}

function ctxNewFolder() {
  hideCtx();
  const dlg = document.getElementById('folderdlg');
  const inp = document.getElementById('folderdlg-inp');
  dlg.classList.add('shown');
  inp.value = '';
  inp.focus();
  /* pressing Enter confirms */
  inp.onkeydown = e => { if (e.key === 'Enter') confirmFolder(); };
}

function confirmFolder() {
  const inp  = document.getElementById('folderdlg-inp');
  const name = inp.value.trim() || `folder_${++folderCount}`;
  cancelFolder();
  spawnFolderIcon(name, ctxPos.x, ctxPos.y);
}

function cancelFolder() {
  document.getElementById('folderdlg').classList.remove('shown');
}
function spawnFolderIcon(name, x, y) {
  const d = document.createElement('div');
  d.className = 'desk-folder';
  d.style.left = Math.min(x, window.innerWidth  - 80) + 'px';
  d.style.top  = Math.min(y, window.innerHeight - 80) + 'px';
  d.innerHTML  = `<div class="ico">📁</div><div class="lbl">${name}</div>`;

  d.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    const r  = d.getBoundingClientRect();
    const ox = e.clientX - r.left;
    const oy = e.clientY - r.top;
    const mv = ev => {
      d.style.left = (ev.clientX - ox) + 'px';
      d.style.top  = (ev.clientY - oy) + 'px';
    };
    const up = () => {
      document.removeEventListener('mousemove', mv);
      document.removeEventListener('mouseup',   up);
    };
    document.addEventListener('mousemove', mv);
    document.addEventListener('mouseup',   up);
    e.stopPropagation();
  });

  /* right-click a folder to delete it */
  d.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Delete folder "${name}"?`)) d.remove();
  });

  document.getElementById('desk-folders').appendChild(d);
}
const jsD = `// welcome to pinkCode 🌸
// JavaScript mode — click ▶ Run

function greet(name) {
  return \`Hello, \${name}! 🌸\`;
}
console.log(greet("coder"));

const nums = [1, 2, 3, 4, 5];
const sq = nums.map(x => x * x);
console.log("squares:", sq);
`;

const cppD = `// C++ mode (simulated)
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++! 🌸" << endl;

    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    cout << "Sum 1-10 = " << sum << endl;

    return 0;
}
`;

const pyD = `# Python mode (simulated)

def greet(name):
    return f"Hello, {name}! 🌸"

print(greet("coder"))

nums = [1, 2, 3, 4, 5]
squares = [x**2 for x in nums]
print("squares:", squares)

for i in range(1, 6):
    print(f"  {i} x {i} = {i*i}")
`;

let curLang = 'js';

const ec = document.getElementById('ecode');
const el = document.getElementById('elnum');

ec.value = jsD;

function updLn() {
  const n = ec.value.split('\n').length;
  el.innerHTML = Array.from({ length: n }, (_, i) => i + 1).join('<br>');
}

ec.addEventListener('input', updLn);

ec.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = ec.selectionStart;
    ec.value = ec.value.slice(0, s) + '  ' + ec.value.slice(ec.selectionEnd);
    ec.selectionStart = ec.selectionEnd = s + 2;
    updLn();
  }
  setTimeout(() => {
    const p = ec.value.substr(0, ec.selectionStart).split('\n');
    document.getElementById('ecur').textContent =
      `Ln ${p.length}, Col ${p[p.length - 1].length + 1}`;
  }, 0);
});

updLn();

function switchLang(l) {
  curLang = l;
  document.querySelectorAll('.etab').forEach((t, i) =>
    t.classList.toggle('active',
      (l === 'js'  && i === 0) ||
      (l === 'cpp' && i === 1) ||
      (l === 'py'  && i === 2)
    )
  );
  if (l === 'js')  ec.value = jsD;
  if (l === 'cpp') ec.value = cppD;
  if (l === 'py')  ec.value = pyD;
  document.getElementById('elangbadge').textContent =
    l === 'js'  ? 'JavaScript' :
    l === 'cpp' ? 'C++ (sim)'  :
                  'Python (sim)';
  document.getElementById('eout').style.display = 'none';
  updLn();
}
function runCpp(code) {
  const out  = [];
  const vars = {};

  const vr = /(?:int|float|double|auto)\s+(\w+)\s*=\s*([^;]+);/g;
  let vm;
  while ((vm = vr.exec(code)) !== null) {
    try { vars[vm[1]] = eval(vm[2]); } catch(e) {}
  }

  const lr = /for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<=\s*(\d+)\s*;\s*\w+\+\+\s*\)\s*\{\s*(\w+)\s*\+=\s*\w+\s*;/g;
  let lm;
  while ((lm = lr.exec(code)) !== null) {
    let s = 0;
    for (let i = parseInt(lm[2]); i <= parseInt(lm[3]); i++) s += i;
    vars[lm[4]] = s;
  }

  const sr = /string\s+(\w+)\s*=\s*"([^"]*)"/g;
  let sm;
  while ((sm = sr.exec(code)) !== null) { vars[sm[1]] = sm[2]; }

  const cr = /cout\s*<<\s*((?:"[^"]*"|endl|[^;]+?)(?:\s*<<\s*(?:"[^"]*"|endl|[^;]+?))*)\s*;/g;
  let cm;
  while ((cm = cr.exec(code)) !== null) {
    const parts = cm[1].split('<<').map(p => p.trim());
    let line = '';
    for (const p of parts) {
      if (p === 'endl' || p === '"\\n"') { out.push(line); line = ''; }
      else if (p.startsWith('"') && p.endsWith('"')) { line += p.slice(1, -1); }
      else if (vars[p] !== undefined) { line += vars[p]; }
      else { try { line += eval(p); } catch(e) { line += p; } }
    }
    if (line) out.push(line);
  }

  return out.length ? out.join('\n') : '(no cout output found)';
}
function runPy(code) {
  const out  = [];
  const vars = {};

  const vr = /^(\w+)\s*=\s*(.+)$/gm;
  let vm;
  while ((vm = vr.exec(code)) !== null) {
    const name = vm[1];
    const val  = vm[2].trim();
    if (['def','if','for','while','return','import'].includes(name)) continue;
    try {
      const jsVal = val
        .replace(/True/g,  'true')
        .replace(/False/g, 'false')
        .replace(/None/g,  'null');
      vars[name] = eval(jsVal);
    } catch(e) {
      vars[name] = val.replace(/^["']|["']$/g, '');
    }
  }

  const lines = code.split('\n');
  let inLoop = false;
  let inFunc = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('for ') || trimmed.startsWith('while ')) { inLoop = true; continue; }
    if (trimmed.startsWith('def '))  { inFunc = true; continue; }
    if (trimmed === '' && (inLoop || inFunc)) { inLoop = false; inFunc = false; continue; }
    if (inLoop || inFunc) continue;
    const plain = trimmed.match(/^print\("([^"]*)"\)$/);
    if (plain) { out.push(plain[1]); continue; }
    const plainS = trimmed.match(/^print\('([^']*)'\)$/);
    if (plainS) { out.push(plainS[1]); continue; }

    const printVar = trimmed.match(/^print\((\w+)\)$/);
    if (printVar && vars[printVar[1]] !== undefined) {
      out.push(String(vars[printVar[1]]));
      continue;
    }
    const fstr = trimmed.match(/^print\(f["'](.+)["']\)$/);
    if (fstr) {
      let msg = fstr[1];
      msg = msg.replace(/\{(\w+)\}/g, (_, v) => vars[v] !== undefined ? vars[v] : v);
      msg = msg.replace(/\{([^}]+)\}/g, (_, expr) => {
        try { return eval(expr.replace(/\*\*/g, '**')); } catch(e) { return expr; }
      });
      out.push(msg);
      continue;
    }

    // print("label", variable)
    const labelVar = trimmed.match(/^print\("([^"]*)",\s*(\w+)\)$/);
    if (labelVar && vars[labelVar[2]] !== undefined) {
      out.push(`${labelVar[1]} ${vars[labelVar[2]]}`);
      continue;
    }
  }

  return out.length ? out.join('\n') : '(no print output found)';
}

function runCode() {
  const code = ec.value;
  const eo   = document.getElementById('eout');
  eo.style.display = 'block';

  if (curLang === 'cpp') {
    try {
      eo.style.color = 'var(--green)';
      eo.textContent = '[C++ sim]\n' + runCpp(code);
    } catch(e) {
      eo.style.color = 'var(--red)';
      eo.textContent = 'Error: ' + e.message;
    }
    return;
  }

  if (curLang === 'py') {
    try {
      eo.style.color = 'var(--green)';
      eo.textContent = '[Python sim]\n' + runPy(code);
    } catch(e) {
      eo.style.color = 'var(--red)';
      eo.textContent = 'Error: ' + e.message;
    }
    return;
  }
  const logs = [];
  const orig = console.log;
  console.log = (...a) => logs.push(
    a.map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' ')
  );
  try {
    eval(code);
    console.log = orig;
    eo.style.color = 'var(--green)';
    eo.textContent = logs.length ? logs.join('\n') : '(no output)';
  } catch(e) {
    console.log = orig;
    eo.style.color = 'var(--red)';
    eo.textContent = 'Error: ' + e.message;
  }
}

function clearCode() {
  ec.value = '';
  document.getElementById('eout').style.display = 'none';
  updLn();
}

function showGame(g) {
  document.getElementById('ghome').style.display = 'none';
  if (g === 'snake') { document.getElementById('snkwrap').style.display = 'flex'; initSnake(); }
  if (g === 'typ')   { document.getElementById('typwrap').style.display = 'flex'; initTyp(); }
  if (g === 'mem')   { document.getElementById('memwrap').style.display = 'flex'; initMem(); }
}

function backGames() {
  document.getElementById('snkwrap').style.display = 'none';
  document.getElementById('typwrap').style.display = 'none';
  document.getElementById('memwrap').style.display = 'none';
  document.getElementById('ghome').style.display = 'block';
  snkOn = false;
  clearInterval(snkIv);
}

let snkOn     = false;
let snkPaused = false;
let snkDir, snkBody, snkFood, snkScore;
let snkBest   = 0;
let snkIv;

const SG = 15;
const SC = 20;

function initSnake() {
  snkBody   = [{x:7,y:7}, {x:6,y:7}, {x:5,y:7}];
  snkDir    = {x:1, y:0};
  snkScore  = 0;
  snkOn     = true;
  snkPaused = false;
  snkFood   = rndF();
  clearInterval(snkIv);
  snkIv = setInterval(stepSnk, 155);
  updSnkSc();
}

function rndF() {
  let f;
  do {
    f = {
      x: Math.floor(Math.random() * SG),
      y: Math.floor(Math.random() * SG)
    };
  } while (snkBody.some(s => s.x === f.x && s.y === f.y));
  return f;
}

function stepSnk() {
  if (!snkOn || snkPaused) return;

  const h = { x: snkBody[0].x + snkDir.x, y: snkBody[0].y + snkDir.y };

  if (
    h.x < 0 || h.x >= SG ||
    h.y < 0 || h.y >= SG ||
    snkBody.some(s => s.x === h.x && s.y === h.y)
  ) {
    clearInterval(snkIv);
    snkOn = false;
    drawSnk();
    const cv  = document.getElementById('snkcv');
    const ctx = cv.getContext('2d');
    ctx.fillStyle = 'rgba(247,197,221,0.9)';
    ctx.fillRect(35, 115, 230, 58);
    ctx.fillStyle = '#2a1527';
    ctx.font = 'bold 16px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('game over 🌸', 150, 140);
    ctx.font = '10.5px JetBrains Mono';
    ctx.fillText('press arrow key to restart', 150, 163);
    return;
  }

  snkBody.unshift(h);

  if (h.x === snkFood.x && h.y === snkFood.y) {
    snkScore++;
    snkBest = Math.max(snkBest, snkScore);
    snkFood = rndF();
  } else {
    snkBody.pop();
  }

  drawSnk();
  updSnkSc();
}

function drawSnk() {
  const cv  = document.getElementById('snkcv');
  const ctx = cv.getContext('2d');

  ctx.fillStyle = '#1e0f1c';
  ctx.fillRect(0, 0, 300, 300);

  ctx.strokeStyle = 'rgba(154,96,126,0.13)';
  for (let i = 0; i <= SG; i++) {
    ctx.beginPath(); ctx.moveTo(i*SC, 0);   ctx.lineTo(i*SC, 300); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,   i*SC); ctx.lineTo(300, i*SC); ctx.stroke();
  }

  ctx.fillStyle  = '#e87fad';
  ctx.shadowColor = '#e87fad';
  ctx.shadowBlur  = 12;
  ctx.beginPath();
  ctx.arc(snkFood.x*SC+10, snkFood.y*SC+10, 6, 0, Math.PI*2);
  ctx.fill();
  ctx.shadowBlur = 0;

  snkBody.forEach((s, i) => {
    const t = 1 - i / snkBody.length;
    ctx.fillStyle  = `hsl(${330 - i*2}, ${50 + t*25}%, ${52 + t*14}%)`;
    ctx.shadowColor = i === 0 ? '#f7c5dd' : 'transparent';
    ctx.shadowBlur  = i === 0 ? 7 : 0;
    ctx.beginPath();
    ctx.roundRect(s.x*SC+1, s.y*SC+1, SC-2, SC-2, 3);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function updSnkSc() {
  document.getElementById('snksc').textContent =
    `score: ${snkScore} | best: ${snkBest}`;
}

document.addEventListener('keydown', e => {
  if (
    ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key) &&
    document.getElementById('snkwrap').style.display === 'flex'
  ) {
    if (!snkOn) { initSnake(); return; }
    const m = {
      ArrowLeft:  {x:-1, y: 0},
      ArrowRight: {x: 1, y: 0},
      ArrowUp:    {x: 0, y:-1},
      ArrowDown:  {x: 0, y: 1},
    };
    if (m[e.key] && !(m[e.key].x === -snkDir.x && m[e.key].y === -snkDir.y)) {
      snkDir = m[e.key];
    }
    e.preventDefault();
  }
  if (e.key === ' ' && document.getElementById('snkwrap').style.display === 'flex') {
    snkPaused = !snkPaused;
    e.preventDefault();
  }
});

const tPrompts = [
  'const greet = (name) => `Hello, ${name}!`;',
  'function fib(n){ return n<=1?n:fib(n-1)+fib(n-2); }',
  'const evens = [1,2,3,4,5].filter(n => n%2===0);',
  'class Stack { constructor(){ this.data=[]; } }',
  'cout << "Hello, pink world!" << endl;',
  '#include <iostream> // C++ header',
  'print(f"Hello, {name}!")',
];

let typStart, typTimer, typPrompt = '', typActive = false;

function initTyp() {
  typPrompt = tPrompts[Math.floor(Math.random() * tPrompts.length)];
  document.getElementById('typprompt').textContent = typPrompt;
  const i = document.getElementById('typinp');
  i.value = '';
  i.focus();
  typActive = false;
  document.getElementById('typstats').textContent =
    'wpm: 0 | accuracy: 100% | time: 0s';
  i.oninput = handleTyp;
}

function handleTyp(e) {
  const typed = e.target.value;

  if (!typActive && typed.length === 1) {
    typActive = true;
    typStart  = Date.now();
    clearInterval(typTimer);
    typTimer  = setInterval(updTyp, 400);
  }

  let h = '';
  for (let i = 0; i < typPrompt.length; i++) {
    const ch = typPrompt[i] === '<' ? '&lt;' : typPrompt[i];
    if (i < typed.length) {
      h += typed[i] === typPrompt[i]
        ? `<span class="tcok">${ch}</span>`
        : `<span class="tcbad">${ch}</span>`;
    } else {
      h += `<span>${ch}</span>`;
    }
  }
  document.getElementById('typprompt').innerHTML = h;

  if (typed === typPrompt) {
    clearInterval(typTimer);
    updTyp(true);
  }
}

function updTyp(done = false) {
  const typed = document.getElementById('typinp').value;
  const el    = (Date.now() - typStart) / 60000;
  const wpm   = el > 0 ? Math.round((typed.length / 5) / el) : 0;
  let ok = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === typPrompt[i]) ok++;
  }
  const acc  = typed.length ? Math.round(ok / typed.length * 100) : 100;
  const secs = Math.round((Date.now() - typStart) / 1000);
  document.getElementById('typstats').textContent =
    `wpm: ${wpm} | accuracy: ${acc}% | time: ${secs}s${done ? ' ✓ 🌸' : ''}`;
  if (done) setTimeout(initTyp, 2000);
}

const mEm = ['🌸','💻','🎮','📷','⭐','🦋','🍀','🌙'];
let mFlipped = [], mMatched = 0, mLock = false;

function initMem() {
  mMatched = 0;
  mFlipped = [];
  mLock    = false;
  const sh = [...mEm, ...mEm].sort(() => Math.random() - 0.5);
  const g  = document.getElementById('memgrid');
  g.innerHTML = '';
  sh.forEach(em => {
    const c = document.createElement('div');
    c.className    = 'mc';
    c.dataset.em   = em;
    c.textContent  = '🌸';
    c.onclick      = () => flipM(c);
    g.appendChild(c);
  });
  document.getElementById('memsc').textContent = 'pairs: 0 / 8';
}

function flipM(card) {
  if (mLock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.textContent = card.dataset.em;
  card.classList.add('flipped');
  mFlipped.push(card);

  if (mFlipped.length === 2) {
    mLock = true;
    if (mFlipped[0].dataset.em === mFlipped[1].dataset.em) {
      mFlipped.forEach(c => c.classList.replace('flipped', 'matched'));
      mMatched++;
      document.getElementById('memsc').textContent = `pairs: ${mMatched} / 8`;
      mFlipped = [];
      mLock    = false;
      if (mMatched === 8) setTimeout(() => alert('🌸 All pairs found! You won!'), 200);
    } else {
      setTimeout(() => {
        mFlipped.forEach(c => { c.classList.remove('flipped'); c.textContent = '🌸'; });
        mFlipped = [];
        mLock    = false;
      }, 800);
    }
  }
}

let camStream = null;

async function startCam() {
  try {
    camStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    });

    const v = document.getElementById('camvid');
    v.srcObject    = camStream;
    v.style.display = 'block';

    document.getElementById('camno').style.display       = 'none';
    document.getElementById('camstartbtn').style.display = 'none';
    document.getElementById('camshoot').style.display    = 'flex';
    document.getElementById('camfiltlbl').style.display  = 'inline';
    document.getElementById('camfilt').style.display     = 'inline';

  } catch(err) {
    document.getElementById('camno').innerHTML =
      `<span style="color:var(--red)">📷 Camera denied.<br><small>${err.message}</small></span>`;
  }
}

function stopCam() {
  if (camStream) {
    camStream.getTracks().forEach(t => t.stop());
    camStream = null;
  }
  const v = document.getElementById('camvid');
  v.srcObject     = null;
  v.style.display = 'none';

  document.getElementById('camno').style.display       = 'block';
  document.getElementById('camstartbtn').style.display = 'inline';
  document.getElementById('camshoot').style.display    = 'none';
  document.getElementById('camfiltlbl').style.display  = 'none';
  document.getElementById('camfilt').style.display     = 'none';
}

function applyFilter() {
  document.getElementById('camvid').style.filter =
    document.getElementById('camfilt').value;
}

function takePhoto() {
  const v = document.getElementById('camvid');
  if (!v.srcObject) return;

  const cv  = document.getElementById('camcv');
  cv.width  = v.videoWidth  || 640;
  cv.height = v.videoHeight || 480;

  const ctx = cv.getContext('2d');
  const f   = document.getElementById('camfilt').value;
  ctx.filter = f === 'none' ? 'none' : f;
  ctx.drawImage(v, 0, 0);

  const ov = document.getElementById('camoverlay');
  ov.style.background = 'rgba(247,197,221,0.55)';
  setTimeout(() => ov.style.background = '', 130);

  const img     = document.createElement('img');
  img.className = 'cthumb';
  img.src       = cv.toDataURL('image/jpeg', 0.88);
  img.title     = 'Click to download';
  img.onclick   = () => {
    const a    = document.createElement('a');
    a.href     = img.src;
    a.download = `pinkterm-${Date.now()}.jpg`;
    a.click();
  };

  document.getElementById('camshots').prepend(img);
}

const npBody = document.getElementById('np-body');

// word count update
npBody.addEventListener('input', () => {
  const text  = npBody.innerText.trim();
  const words = text ? text.split(/\s+/).length : 0;
  document.getElementById('np-wordcount').textContent =
    `${words} word${words !== 1 ? 's' : ''}`;
});

function npFormat(cmd) {
  document.execCommand(cmd, false, null);
  npBody.focus();
}

function npSave() {
  const text = npBody.innerText;
  if (!text.trim()) return;
  const a      = document.createElement('a');
  a.href       = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  a.download   = `note-${Date.now()}.txt`;
  a.click();
}

function npLoad() {
  const inp    = document.createElement('input');
  inp.type     = 'file';
  inp.accept   = '.txt,.md';
  inp.onchange = e => {
    const file   = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      npBody.innerText = ev.target.result;
      npBody.dispatchEvent(new Event('input'));
    };
    reader.readAsText(file);
  };
  inp.click();
}

function npClear() {
  if (npBody.innerText.trim() && !confirm('Clear all text?')) return;
  npBody.innerHTML = '';
  npBody.dispatchEvent(new Event('input'));
}

const guideData = {
  linux: {
    title: 'Linux Guide', icon: '🐧',
    chapters: [
      { title: 'What is Linux?', content: 'Linux is a free, open-source operating system kernel created by Linus Torvalds in 1991. Unlike Windows or macOS, Linux is built on the philosophy that software should be free and modifiable by anyone.\n\nToday Linux powers everything from Android phones to supercomputers, web servers, and yes — Arch Linux desktops like this one 🌸' },
      { title: 'The Filesystem', content: 'Linux uses a single-root filesystem tree starting at /\n\n/          root of everything\n/home      your personal files (~)\n/etc       system config files\n/bin       essential programs\n/usr       user programs\n/var       logs, databases\n/tmp       temporary files\n/dev       hardware devices\n/proc      running processes\n/mnt       mounted drives\n\nEverything in Linux is a file — even hardware devices.' },
      { title: 'Essential Commands', content: 'Navigation:\n  pwd          print current directory\n  ls           list files\n  ls -la       list with hidden files + details\n  cd folder    enter a directory\n  cd ..        go up one level\n  cd ~         go home\n\nFiles:\n  touch file   create empty file\n  mkdir dir    create directory\n  cp a b       copy a to b\n  mv a b       move or rename\n  rm file      delete file\n  rm -rf dir   delete directory (careful!)\n  cat file     print file contents\n  less file    scroll through file\n\nSearch:\n  grep \'text\' file   find text in file\n  find . -name \'*.txt\'   find files\n  which program      find where a program is' },
      { title: 'Permissions', content: 'Every file has permissions for: owner, group, others\n\nExample:  -rwxr-xr--\n  - = file (d = directory)\n  rwx = owner can read, write, execute\n  r-x = group can read, execute\n  r-- = others can only read\n\nChanging permissions:\n  chmod 755 file     rwxr-xr-x\n  chmod 644 file     rw-r--r--\n  chmod +x file      add execute\n  chown user file    change owner\n\nNumbers:  7=rwx  6=rw-  5=r-x  4=r--' },
      { title: 'Package Management', content: 'Arch Linux (pacman):\n  sudo pacman -S package      install\n  sudo pacman -R package      remove\n  sudo pacman -Syu            update all\n  pacman -Ss keyword          search\n\nUbuntu/Debian (apt):\n  sudo apt install package\n  sudo apt remove package\n  sudo apt update && sudo apt upgrade\n\nFedora (dnf):\n  sudo dnf install package\n  sudo dnf upgrade\n\nAUR helper (yay):\n  yay -S package' },
      { title: 'Processes & System', content: 'Viewing processes:\n  top          live process monitor\n  htop         nicer version of top\n  ps aux       list all processes\n\nControlling:\n  kill PID         send kill signal\n  kill -9 PID      force kill\n  pkill name       kill by name\n  Ctrl+C           interrupt program\n  Ctrl+Z           pause program\n  command &        run in background\n\nSystem info:\n  uname -a         kernel version\n  df -h            disk usage\n  free -h          memory usage\n  uptime           how long running' },
      { title: 'Shell Scripting', content: '#!/bin/bash\necho "Hello, world!"\n\nMake executable:\n  chmod +x script.sh\n  ./script.sh\n\nVariables:\n  name="Alice"\n  echo "Hello $name"\n\nIf statement:\n  if [ $x -gt 5 ]; then\n    echo "big"\n  else\n    echo "small"\n  fi\n\nFor loop:\n  for i in 1 2 3; do\n    echo $i\n  done' },
      { title: 'Arch Linux Specifics', content: 'Arch is a rolling-release distro — continuous updates instead of version upgrades.\n\nArch philosophy:\n  • Simplicity — no bloat\n  • Minimalism — only what you need\n  • User-centrism — you are in control\n\nKey commands:\n  systemctl start svc      start a service\n  systemctl enable svc     start on boot\n  systemctl status svc     check status\n  journalctl -xe           system logs\n  lsblk                    list drives\n  ip addr                  network info\n\nThe Arch Wiki is the best Linux documentation on the internet.' },
    ]
  },
  java: {
    title: 'Java Guide', icon: '☕',
    chapters: [
      { title: 'What is Java?', content: 'Java is a high-level, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995.\n\nJava\'s motto: Write Once, Run Anywhere (WORA). Code compiles to bytecode which runs on the JVM on any platform.\n\nJava is used for:\n  • Android app development\n  • Enterprise backend systems\n  • Web servers and APIs\n  • Desktop applications\n  • Big data tools (Hadoop, Spark)' },
      { title: 'Hello World', content: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, world! 🌸");\n    }\n}\n\nCompile and run:\n  javac HelloWorld.java\n  java HelloWorld\n\nKey rules:\n  • Class name MUST match filename\n  • main() is always the entry point\n  • Statements end with semicolons\n  • Curly braces define blocks' },
      { title: 'Data Types', content: 'Primitives (lowercase):\n  int      integer        int x = 42;\n  long     big integer    long n = 123L;\n  double   decimal        double pi = 3.14;\n  boolean  true/false     boolean ok = true;\n  char     single char    char c = \'A\';\n\nObject types:\n  String   text           String s = "hello";\n  Integer  int wrapper\n  Double   double wrapper\n\nArrays:\n  int[] nums = {1, 2, 3};\n  String[] names = new String[10];\n  nums[0]   // first element' },
      { title: 'Classes & Objects', content: 'public class Dog {\n    String name;\n    int age;\n\n    public Dog(String name, int age) {\n        this.name = name;\n        this.age  = age;\n    }\n\n    public void bark() {\n        System.out.println(name + " says: Woof!");\n    }\n}\n\nUsing it:\n  Dog myDog = new Dog("Luna", 3);\n  myDog.bark();\n  System.out.println(myDog.name);' },
      { title: 'Inheritance & Interfaces', content: 'Inheritance:\n  public class Cat extends Animal {\n      @Override\n      public void speak() {\n          System.out.println("Meow!");\n      }\n  }\n\nInterface:\n  public interface Drawable {\n      void draw();\n  }\n\n  public class Circle implements Drawable {\n      public void draw() {\n          System.out.println("Drawing circle");\n      }\n  }\n\nOOP concepts:\n  Encapsulation  private + getters/setters\n  Inheritance    extends\n  Polymorphism   same method, different behaviour\n  Abstraction    abstract classes / interfaces' },
      { title: 'Collections', content: 'ArrayList — dynamic array:\n  ArrayList<String> list = new ArrayList<>();\n  list.add("apple");\n  list.get(0);     // apple\n  list.size();     // 1\n\nHashMap — key-value:\n  HashMap<String, Integer> map = new HashMap<>();\n  map.put("alice", 90);\n  map.get("alice");   // 90\n\nHashSet — unique values:\n  HashSet<String> set = new HashSet<>();\n  set.add("a"); set.add("a");\n  set.size();   // 1\n\nFor-each:\n  for (String item : list) {\n      System.out.println(item);\n  }' },
      { title: 'Exception Handling', content: 'try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("Cannot divide by zero");\n} finally {\n    System.out.println("Always runs");\n}\n\nCommon exceptions:\n  NullPointerException\n  ArrayIndexOutOfBoundsException\n  NumberFormatException\n  IOException\n\nThrowing your own:\n  if (age < 0)\n      throw new IllegalArgumentException("Bad age");' },
      { title: 'Useful Tips', content: 'String methods:\n  s.length()         s.toUpperCase()\n  s.trim()           s.contains("x")\n  s.replace("a","b") s.split(",")\n\nMath:\n  Math.max(a,b)  Math.min(a,b)\n  Math.abs(x)    Math.sqrt(x)\n  Math.pow(x,y)  Math.random()\n\nCasting:\n  int x = (int) 3.99;       // x = 3\n  String s = String.valueOf(42);\n  int n = Integer.parseInt("42");\n\nPrint:\n  System.out.println(x);    // newline\n  System.out.printf("Hi %s, age %d", name, age);' },
    ]
  },
  cpp: {
    title: 'C++ Guide', icon: '⚙️',
    chapters: [
      { title: 'What is C++?', content: 'C++ is a powerful, high-performance language created by Bjarne Stroustrup in 1979 as an extension of C.\n\nC++ compiles directly to machine code — no VM needed. Used for:\n  • Game engines (Unreal Engine)\n  • Operating systems and drivers\n  • Compilers and interpreters\n  • Embedded systems\n  • High-frequency trading\n  • Graphics engines\n\nWith great power comes great responsibility: you manage your own memory.' },
      { title: 'Hello World', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, world! 🌸" << endl;\n    return 0;\n}\n\nCompile and run:\n  g++ hello.cpp -o hello\n  ./hello\n\nModern C++:\n  g++ hello.cpp -o hello -std=c++17\n\nBreaking it down:\n  #include    bring in a library\n  main()      entry point\n  cout <<     print to console\n  endl        newline + flush\n  return 0    success code' },
      { title: 'Variables & Types', content: 'int       integer        int x = 42;\nlong      big integer    long n = 1000000L;\nfloat     decimal        float f = 3.14f;\ndouble    precise        double pi = 3.14159;\nbool      true/false     bool ok = true;\nchar      character      char c = \'A\';\nstring    text (STL)     string s = "hello";\n\nauto — compiler deduces type:\n  auto x = 42;      // int\n  auto y = 3.14;    // double\n\nConst:\n  const int MAX = 100;\n\nCasting:\n  int x = static_cast<int>(3.9);  // x = 3' },
      { title: 'Pointers & References', content: 'Pointers — store memory addresses:\n  int x = 42;\n  int* ptr = &x;   // address of x\n  cout << *ptr;    // 42 (dereference)\n  *ptr = 99;       // changes x!\n\nReferences — alias for a variable:\n  int x = 42;\n  int& ref = x;    // ref IS x\n  ref = 99;        // x is now 99\n\nPass by pointer:\n  void addOne(int* n) { (*n)++; }\n  addOne(&x);\n\nNullptr:\n  int* ptr = nullptr;\n\nHeap allocation:\n  int* p = new int(42);\n  delete p;   // MUST free!' },
      { title: 'Classes & OOP', content: 'class Dog {\nprivate:\n    string name;\n    int age;\npublic:\n    Dog(string n, int a) : name(n), age(a) {}\n    ~Dog() { cout << "bye " << name; }\n    void bark() {\n        cout << name << ": Woof!" << endl;\n    }\n    string getName() { return name; }\n};\n\nStack (auto-deleted):\n  Dog d("Luna", 3);\n  d.bark();\n\nHeap (manual delete):\n  Dog* dp = new Dog("Mochi", 2);\n  dp->bark();\n  delete dp;\n\nInheritance:\n  class Puppy : public Dog { ... };' },
      { title: 'STL Standard Library', content: 'vector — dynamic array:\n  #include <vector>\n  vector<int> v = {1,2,3};\n  v.push_back(4);\n  v[0];       // 1\n  v.size();   // 4\n\nmap — key-value (sorted):\n  #include <map>\n  map<string,int> scores;\n  scores["alice"] = 90;\n\nset — unique sorted values:\n  #include <set>\n  set<int> s = {3,1,2,1};  // {1,2,3}\n\nalgorithms:\n  #include <algorithm>\n  sort(v.begin(), v.end());\n  reverse(v.begin(), v.end());\n\nRange for:\n  for (auto& item : v) { cout << item; }' },
      { title: 'Memory Management', content: 'Stack (automatic):\n  int x = 42;   // freed when scope ends\n\nHeap (manual):\n  int* p = new int(42);\n  delete p;              // REQUIRED\n  int* arr = new int[10];\n  delete[] arr;          // note []\n\nSmart pointers (modern — prefer these):\n  #include <memory>\n\n  unique_ptr<int> p = make_unique<int>(42);\n  // auto-deleted when p goes out of scope\n\n  shared_ptr<Dog> d = make_shared<Dog>("Luna",3);\n  // deleted when last shared_ptr gone\n\nRules:\n  every new  →  delete\n  every new[]  →  delete[]\n  never delete the same pointer twice' },
      { title: 'Modern C++ Tips', content: 'auto type deduction:\n  auto x = 42;\n  auto it = v.begin();\n\nRange for:\n  for (const auto& s : strings) { ... }\n\nLambdas:\n  auto add = [](int a, int b) { return a+b; };\n  sort(v.begin(), v.end(), [](int a, int b) {\n      return a > b;   // descending\n  });\n\nStructured bindings (C++17):\n  auto [key, val] = *map.begin();\n\nNullptr:\n  int* p = nullptr;   // not NULL\n\nCompile:\n  g++ file.cpp -o out -std=c++17 -Wall -O2' },
    ]
  },
  python: {
    title: 'Python Guide', icon: '🐍',
    chapters: [
      { title: 'What is Python?', content: 'Python is a high-level, interpreted language created by Guido van Rossum in 1991. Famous for its clean, readable syntax.\n\nUsed for:\n  • Data science & ML (NumPy, Pandas, PyTorch)\n  • Web development (Django, Flask, FastAPI)\n  • Automation and scripting\n  • AI and NLP\n  • Game development (Pygame)\n\nNo compilation step — just run:\n  python3 hello.py\n\nPython enforces indentation — blocks are defined by spaces, not curly braces.' },
      { title: 'Hello World & Basics', content: 'print("Hello, world! 🌸")\n\nThat\'s it. No class, no main, no semicolons.\n\nVariables — no type declaration:\n  name = "Alice"\n  age  = 21\n  pi   = 3.14159\n  cool = True\n\nComments:\n  # single line\n  """ multi-line """\n\nF-strings (best way to format):\n  print(f"Hello {name}, you are {age}!")\n\nInput:\n  name = input("Your name? ")\n  print(f"Hello {name}!")' },
      { title: 'Data Types', content: 'Numbers:\n  x = 42          # int\n  y = 3.14        # float\n  big = 10**100   # no size limit!\n\nStrings:\n  s = "hello"\n  len(s)          # 5\n  s.upper()       # HELLO\n  s[0]            # h\n  s[-1]           # o (last)\n  s[1:3]          # el (slice)\n  s * 3           # hellohellohello\n\nBooleans:\n  True  False   (capital!)\n  not True == False\n\nNone:\n  x = None    # like null' },
      { title: 'Lists, Dicts, Sets', content: 'List — ordered, mutable:\n  nums = [1, 2, 3, 4, 5]\n  nums.append(6)\n  nums.pop()       # remove last\n  nums[0]          # 1\n  nums[-1]         # last\n  nums[1:3]        # [2, 3]\n\nTuple — immutable:\n  point = (10, 20)\n  x, y = point    # unpacking\n\nDictionary — key-value:\n  p = {"name": "Alice", "age": 21}\n  p["name"]        # Alice\n  p["city"] = "Tokyo"\n  "name" in p      # True\n\nSet — unique:\n  s = {1,2,3,2,1}  # {1,2,3}\n\nList comprehension:\n  squares = [x**2 for x in range(10)]\n  evens   = [x for x in nums if x%2==0]' },
      { title: 'Control Flow', content: 'If / elif / else:\n  if age >= 18:\n      print("adult")\n  elif age >= 13:\n      print("teen")\n  else:\n      print("child")\n\nFor loop:\n  for i in range(5):      # 0 1 2 3 4\n      print(i)\n\n  for i, item in enumerate(lst):\n      print(i, item)\n\n  for k, v in dict.items():\n      print(k, v)\n\nWhile:\n  while n < 10:\n      n += 1\n\nBreak / continue:\n  if i == 5: break\n  if i % 2: continue\n\nTernary:\n  label = "yes" if x > 0 else "no"' },
      { title: 'Functions', content: 'def greet(name):\n    return f"Hello, {name}! 🌸"\n\nprint(greet("Alice"))\n\nDefault arguments:\n  def power(base, exp=2):\n      return base ** exp\n  power(3)      # 9\n  power(3, 3)   # 27\n\n*args and **kwargs:\n  def add(*args):\n      return sum(args)\n  add(1, 2, 3, 4)   # 10\n\n  def show(**kwargs):\n      for k, v in kwargs.items():\n          print(k, v)\n\nLambda:\n  square = lambda x: x**2\n  sorted(names, key=lambda s: s.lower())' },
      { title: 'Classes & OOP', content: 'class Dog:\n    species = "Canis familiaris"\n\n    def __init__(self, name, age):\n        self.name = name\n        self.age  = age\n\n    def __str__(self):\n        return f"Dog({self.name}, {self.age})"\n\n    def bark(self):\n        print(f"{self.name}: Woof!")\n\nd = Dog("Luna", 3)\nd.bark()\n\nInheritance:\n  class Puppy(Dog):\n      def __init__(self, name):\n          super().__init__(name, 0)\n\nDunder methods:\n  __init__  __str__  __len__  __eq__  __add__' },
      { title: 'Useful Libraries', content: 'os — filesystem:\n  import os\n  os.getcwd()        # current dir\n  os.listdir(".")    # list files\n  os.makedirs("dir") # create dir\n\njson:\n  import json\n  data = json.loads(\'{"x":1}\')\n  json.dumps({"x": 1})\n  json.load(open("file.json"))\n\ndatetime:\n  from datetime import datetime\n  now = datetime.now()\n  now.strftime("%Y-%m-%d %H:%M")\n\nrandom:\n  import random\n  random.randint(1, 10)\n  random.choice([1,2,3])\n  random.shuffle(lst)\n\nInstall packages:\n  pip install requests numpy pandas' },
    ]
  }
};

let bookChapter = 0;

function openBook(key) {
  openW('wbook');
  const data = guideData[key];
  if (!data) return;
  renderBook(data);
}

function renderBook(data) {
  document.getElementById('book-title').textContent = `${data.icon} ${data.title}`;

  // build sidebar jump links
  const sidebar = document.getElementById('book-chapters');
  sidebar.innerHTML = '';
  data.chapters.forEach((ch, i) => {
    const d       = document.createElement('div');
    d.className   = 'book-ch-item';
    d.textContent = `${i + 1}. ${ch.title}`;
    d.onclick     = () => {
      // scroll to that section in the content area
      const section = document.getElementById(`book-sec-${i}`);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // highlight active
      document.querySelectorAll('.book-ch-item').forEach((el, idx) =>
        el.classList.toggle('active', idx === i)
      );
    };
    sidebar.appendChild(d);
  });

  const container = document.getElementById('book-all-chapters');
  container.innerHTML = '';
  data.chapters.forEach((ch, i) => {
    const section = document.createElement('div');
    section.className = 'book-section';
    section.id        = `book-sec-${i}`;

    const titleEl      = document.createElement('div');
    titleEl.className  = 'book-section-title';
    titleEl.innerHTML  =
      `<span class="book-section-num">${i + 1}</span>${ch.title}`;

    const bodyEl       = document.createElement('div');
    bodyEl.className   = 'book-section-body';
    bodyEl.textContent = ch.content;

    section.appendChild(titleEl);
    section.appendChild(bodyEl);
    container.appendChild(section);
  });

  document.getElementById('book-content').scrollTop = 0;

  const first = sidebar.querySelector('.book-ch-item');
  if (first) first.classList.add('active');

  const contentEl = document.getElementById('book-content');
  contentEl.onscroll = () => {
    const sections = container.querySelectorAll('.book-section');
    let current = 0;
    sections.forEach((s, i) => {
      if (s.getBoundingClientRect().top <= contentEl.getBoundingClientRect().top + 60) {
        current = i;
      }
    });
    document.querySelectorAll('.book-ch-item').forEach((el, idx) =>
      el.classList.toggle('active', idx === current)
    );
  };
}

const bms = [
  '[  0.001] Loading pinkTerm kernel…',
  '[  0.018] Mounting /proc/aesthetic… ✓',
  '[  0.042] Starting pastel compositor… ✓',
  '[  0.091] Initialising Arch wallpaper… ✓',
  '[  0.155] Loading JetBrains Mono… ✓',
  '[  0.220] Spawning petal daemon… ✓',
  '[  0.310] Starting C++ runtime (clang-pink)… ✓',
  '[  0.400] Camera module ready… ✓',
  '[  0.470] All systems nominal 🌸',
];

const bl = document.getElementById('blog');

bms.forEach((m, i) => {
  setTimeout(() => {
    const d      = document.createElement('div');
    d.className  = 'bl';
    d.style.color = i === bms.length - 1 ? 'var(--accent)' : 'var(--text3)';
    d.textContent = m;
    bl.appendChild(d);

    if (i === bms.length - 1) {
      setTimeout(() => {
        const sp = document.getElementById('splash');
        sp.style.opacity = '0';
        setTimeout(() => {
          sp.remove();
          initTerm();
          openW('wt');
          openW('we');
          setTimeout(() => {
            document.getElementById('tinp').focus();
            positionAllRzh();
          }, 100);
        }, 800);
      }, 500);
    }
  }, i * 190);
});
