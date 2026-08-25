// 考研备考与进度管理系统 (Kaoyan-Tracker) 核心应用逻辑

// 每日励志金句库
const MOTIVATION_QUOTES = [
  { text: "星光不问赶路人，时光不负有心人。", author: "考研寄语" },
  { text: "研途虽苦，但终点繁花似锦。每一分努力都在为未来铺路。", author: "研友共勉" },
  { text: "耐得住寂寞，才能守得住繁华。沉心静气，按部就班。", author: "上岸指南" },
  { text: "种一棵树最好的时间是十年前，其次是现在。坚持每一天的专注！", author: "每日能量" },
  { text: "那些看似波澜不惊的日复一日，终会在某一天看到坚持的意义。", author: "考研打卡" },
  { text: "乾坤未定，你我皆是黑马；既然选择了远方，便只顾风雨兼程。", author: "研途金句" }
];

// 默认考研初试日期（每年12月最后一个周六上午8:30，默认预设2026年考研初试）
const DEFAULT_EXAM_DATE = "2026-12-26T08:30:00";

// 数据存储键
const STORAGE_KEY = "kaoyan_tracker_data_v1";

class KaoyanApp {
  constructor() {
    this.state = this.loadState();
    this.timerInterval = null;
    this.timerSeconds = 25 * 60;
    this.timerTotal = 25 * 60;
    this.isTimerRunning = false;
    this.isBreakMode = false;
    this.activeTab = "dashboard";
    this.activeOutlineSubject = "politics";
    this.mistakeFilterSubject = "all";
    this.mistakeSearchQuery = "";

    this.initDOM();
    this.initEvents();
    this.startCountdown();
    this.render();
  }

  // 加载本地状态
  loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.outline) parsed.outline = JSON.parse(JSON.stringify(DEFAULT_OUTLINE));
        if (!parsed.mistakes) parsed.mistakes = [];
        if (!parsed.logs) parsed.logs = [];
        if (!parsed.examDate) parsed.examDate = DEFAULT_EXAM_DATE;
        if (!parsed.targetSchool) parsed.targetSchool = "目标院校 & 专业";
        return parsed;
      } catch (e) {
        console.error("加载数据失败，使用初始数据", e);
      }
    }
    return {
      examDate: DEFAULT_EXAM_DATE,
      targetSchool: "清华/北大/浙大 计算机系 (点击可修改)",
      outline: JSON.parse(JSON.stringify(DEFAULT_OUTLINE)),
      mistakes: [
        {
          id: "m-1",
          subject: "math",
          title: "洛必达法则与等价无穷小代换的误用",
          question: "求 limit (x->0) (x - sin x) / (x * (1 - cos x))",
          wrongReason: "分子直接对单项代换造成精度丢失，导致求得结果为0。",
          solution: "分母先等价无穷小代换 x * (1/2 * x^2) = 1/2 * x^3；分子使用泰勒展开：x - (x - x^3/6 + o(x^3)) = x^3/6。答案为 (1/6) / (1/2) = 1/3。",
          tags: ["泰勒展开", "极限计算", "高数重点"],
          mastery: 2,
          date: new Date().toISOString().split("T")[0]
        },
        {
          id: "m-2",
          subject: "cs408",
          title: "快速排序最坏时间复杂度与递归深度",
          question: "什么情况下快速排序退化为 O(n^2)？如何优化？",
          wrongReason: "混淆了最好情况与最坏情况的基准选择。",
          solution: "当待排序序列已经基本有序或完全逆序时，每次选取的基准只能划分出长度为 0 和 n-1 的子表，递归树高度变为 n，时间复杂度退化为 O(n^2)。优化方法：三数取中法、随机选取基准法、结合插入排序。",
          tags: ["数据结构", "排序算法", "复杂度分析"],
          mastery: 3,
          date: new Date().toISOString().split("T")[0]
        }
      ],
      logs: [
        { date: new Date().toISOString().split("T")[0], minutes: 120, subject: "math", note: "完成高数第一章极限题型训练" },
        { date: new Date().toISOString().split("T")[0], minutes: 45, subject: "english", note: "背诵高频词汇与长难句拆解" }
      ]
    };
  }

  // 保存状态到 LocalStorage
  saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.renderHeaderStats();
  }

  initDOM() {
    this.elements = {
      // 导航
      tabs: document.querySelectorAll(".tab-btn"),
      tabContents: document.querySelectorAll(".tab-content"),
      
      // 倒计时
      cdDays: document.getElementById("cd-days"),
      cdHours: document.getElementById("cd-hours"),
      cdMinutes: document.getElementById("cd-minutes"),
      cdSeconds: document.getElementById("cd-seconds"),
      targetSchoolText: document.getElementById("target-school-display"),
      quoteText: document.getElementById("quote-text"),
      quoteAuthor: document.getElementById("quote-author"),
      
      // 顶部统计
      statTodayMinutes: document.getElementById("stat-today-minutes"),
      statTotalDonePoints: document.getElementById("stat-total-points"),
      statTotalMistakes: document.getElementById("stat-total-mistakes"),
      
      // 大纲视图
      outlineSubjectTabs: document.getElementById("outline-subject-tabs"),
      outlineChaptersContainer: document.getElementById("outline-chapters-container"),
      outlineSearchInput: document.getElementById("outline-search-input"),
      outlineProgressBar: document.getElementById("outline-progress-bar"),
      outlineProgressPercent: document.getElementById("outline-progress-percent"),
      
      // 错题本
      mistakesContainer: document.getElementById("mistakes-list"),
      mistakeSearchInput: document.getElementById("mistake-search-input"),
      mistakeSubjectFilter: document.getElementById("mistake-subject-filter"),
      btnNewMistake: document.getElementById("btn-new-mistake"),
      modalMistake: document.getElementById("modal-mistake"),
      formMistake: document.getElementById("form-mistake"),
      btnCancelMistake: document.getElementById("btn-cancel-mistake"),
      
      // 番茄钟
      pomoDisplay: document.getElementById("pomo-display"),
      pomoSubjectSelect: document.getElementById("pomo-subject-select"),
      pomoTaskInput: document.getElementById("pomo-task-input"),
      pomoBtnStart: document.getElementById("pomo-btn-start"),
      pomoBtnPause: document.getElementById("pomo-btn-pause"),
      pomoBtnReset: document.getElementById("pomo-btn-reset"),
      pomoModeTitle: document.getElementById("pomo-mode-title"),
      pomoRingCircle: document.getElementById("pomo-ring-circle"),
      pomoLogsList: document.getElementById("pomo-logs-list"),
      
      // 统计与导出
      heatmapContainer: document.getElementById("heatmap-grid"),
      btnExportReport: document.getElementById("btn-export-report"),
      btnExportBackup: document.getElementById("btn-export-backup"),
      btnImportBackup: document.getElementById("btn-import-backup"),
      fileImportInput: document.getElementById("file-import-input"),
      modalReport: document.getElementById("modal-report"),
      reportContent: document.getElementById("report-content"),
      btnCloseReport: document.getElementById("btn-close-report"),
      btnCopyReport: document.getElementById("btn-copy-report")
    };
  }

  initEvents() {
    // 标签页切换
    this.elements.tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // 目标学校点击编辑
    this.elements.targetSchoolText.addEventListener("click", () => {
      const current = this.state.targetSchool;
      const school = prompt("请输入您的考研目标院校与专业：", current);
      if (school && school.trim()) {
        this.state.targetSchool = school.trim();
        this.saveState();
        this.elements.targetSchoolText.innerText = this.state.targetSchool;
      }
    });

    // 大纲科目切换
    this.elements.outlineSubjectTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-subject]");
      if (btn) {
        this.activeOutlineSubject = btn.dataset.subject;
        this.renderOutline();
      }
    });

    // 大纲考点搜索
    this.elements.outlineSearchInput.addEventListener("input", (e) => {
      this.renderOutline(e.target.value.trim().toLowerCase());
    });

    // 错题筛选
    this.elements.mistakeSubjectFilter.addEventListener("change", (e) => {
      this.mistakeFilterSubject = e.target.value;
      this.renderMistakes();
    });

    this.elements.mistakeSearchInput.addEventListener("input", (e) => {
      this.mistakeSearchQuery = e.target.value.trim().toLowerCase();
      this.renderMistakes();
    });

    // 错题模态框
    this.elements.btnNewMistake.addEventListener("click", () => {
      this.elements.formMistake.reset();
      document.getElementById("mistake-id-input").value = "";
      this.elements.modalMistake.classList.remove("hidden");
      this.elements.modalMistake.classList.add("flex");
    });

    this.elements.btnCancelMistake.addEventListener("click", () => {
      this.elements.modalMistake.classList.add("hidden");
      this.elements.modalMistake.classList.remove("flex");
    });

    // 错题表单提交
    this.elements.formMistake.addEventListener("submit", (e) => {
      e.preventDefault();
      const idInput = document.getElementById("mistake-id-input").value;
      const subject = document.getElementById("mistake-subject-input").value;
      const title = document.getElementById("mistake-title-input").value.trim();
      const question = document.getElementById("mistake-question-input").value.trim();
      const wrongReason = document.getElementById("mistake-wrong-input").value.trim();
      const solution = document.getElementById("mistake-solution-input").value.trim();
      const tags = document.getElementById("mistake-tags-input").value.split(/[,，\s]+/).filter(t => t);
      const mastery = parseInt(document.getElementById("mistake-mastery-input").value, 10) || 1;

      if (idInput) {
        const item = this.state.mistakes.find(m => m.id === idInput);
        if (item) {
          item.subject = subject;
          item.title = title;
          item.question = question;
          item.wrongReason = wrongReason;
          item.solution = solution;
          item.tags = tags;
          item.mastery = mastery;
        }
      } else {
        const newMistake = {
          id: "m-" + Date.now(),
          subject,
          title,
          question,
          wrongReason,
          solution,
          tags,
          mastery,
          date: new Date().toISOString().split("T")[0]
        };
        this.state.mistakes.unshift(newMistake);
      }

      this.saveState();
      this.renderMistakes();
      this.elements.modalMistake.classList.add("hidden");
      this.elements.modalMistake.classList.remove("flex");
    });

    // 番茄钟控制
    this.elements.pomoBtnStart.addEventListener("click", () => this.startPomodoro());
    this.elements.pomoBtnPause.addEventListener("click", () => this.pausePomodoro());
    this.elements.pomoBtnReset.addEventListener("click", () => this.resetPomodoro());

    // 导出/导入
    this.elements.btnExportBackup.addEventListener("click", () => this.exportJSONBackup());
    this.elements.btnImportBackup.addEventListener("click", () => this.elements.fileImportInput.click());
    this.elements.fileImportInput.addEventListener("change", (e) => this.importJSONBackup(e));
    this.elements.btnExportReport.addEventListener("click", () => this.openReportModal());
    this.elements.btnCloseReport.addEventListener("click", () => {
      this.elements.modalReport.classList.add("hidden");
      this.elements.modalReport.classList.remove("flex");
    });
    this.elements.btnCopyReport.addEventListener("click", () => {
      navigator.clipboard.writeText(this.elements.reportContent.value).then(() => {
        alert("复习日报 Markdown 已成功复制到剪贴板！");
      });
    });
  }

  // 切换选项卡
  switchTab(tabId) {
    this.activeTab = tabId;
    this.elements.tabs.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.elements.tabContents.forEach(section => {
      if (section.id === `tab-${tabId}`) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });

    if (tabId === "outline") this.renderOutline();
    if (tabId === "mistakes") this.renderMistakes();
    if (tabId === "pomodoro") this.renderPomodoroLogs();
    if (tabId === "analytics") this.renderAnalytics();
  }

  // 倒计时刷新
  startCountdown() {
    const update = () => {
      const now = new Date().getTime();
      const target = new Date(this.state.examDate).getTime();
      const distance = target - now;

      if (distance < 0) {
        this.elements.cdDays.innerText = "00";
        this.elements.cdHours.innerText = "00";
        this.elements.cdMinutes.innerText = "00";
        this.elements.cdSeconds.innerText = "00";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.elements.cdDays.innerText = String(days).padStart(2, "0");
      this.elements.cdHours.innerText = String(hours).padStart(2, "0");
      this.elements.cdMinutes.innerText = String(minutes).padStart(2, "0");
      this.elements.cdSeconds.innerText = String(seconds).padStart(2, "0");
    };

    update();
    setInterval(update, 1000);

    const quote = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
    this.elements.quoteText.innerText = `“${quote.text}”`;
    this.elements.quoteAuthor.innerText = `—— ${quote.author}`;
    this.elements.targetSchoolText.innerText = this.state.targetSchool;
  }

  // 渲染顶部数据概览
  renderHeaderStats() {
    const today = new Date().toISOString().split("T")[0];
    const todayLogs = this.state.logs.filter(l => l.date === today);
    const todayMinutes = todayLogs.reduce((acc, cur) => acc + cur.minutes, 0);
    this.elements.statTodayMinutes.innerText = todayMinutes;

    let totalPoints = 0;
    let donePoints = 0;
    Object.values(this.state.outline).forEach(sub => {
      sub.chapters.forEach(ch => {
        ch.points.forEach(p => {
          totalPoints++;
          if (p.done) donePoints++;
        });
      });
    });
    this.elements.statTotalDonePoints.innerText = `${donePoints}/${totalPoints}`;
    this.elements.statTotalMistakes.innerText = this.state.mistakes.length;

    this.renderDashboardProgress();
  }

  renderDashboardProgress() {
    const container = document.getElementById("dashboard-subjects-overview");
    if (!container) return;

    let html = "";
    Object.values(this.state.outline).forEach(sub => {
      let subTotal = 0;
      let subDone = 0;
      sub.chapters.forEach(c => {
        c.points.forEach(p => {
          subTotal++;
          if (p.done) subDone++;
        });
      });
      const percent = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;
      
      html += `
        <div class="glass-card p-5 cursor-pointer hover:border-indigo-500/50" onclick="app.jumpToOutline('${sub.id}')">
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">${sub.icon}</span>
            <span class="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 font-mono">${percent}%</span>
          </div>
          <h4 class="font-bold text-gray-100 text-sm mb-1">${sub.name}</h4>
          <p class="text-xs text-gray-400 mb-3">已掌握 ${subDone} / 共 ${subTotal} 个考点</p>
          <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  jumpToOutline(subjectId) {
    this.activeOutlineSubject = subjectId;
    this.switchTab("outline");
  }

  // 渲染考点大纲
  renderOutline(searchKeyword = "") {
    let tabHtml = "";
    Object.values(this.state.outline).forEach(sub => {
      const active = sub.id === this.activeOutlineSubject ? "bg-indigo-600/30 border-indigo-500 text-white" : "bg-gray-800/40 border-gray-700 text-gray-400";
      tabHtml += `
        <button data-subject="${sub.id}" class="px-4 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${active}">
          <span>${sub.icon}</span>
          <span>${sub.name}</span>
        </button>
      `;
    });
    this.elements.outlineSubjectTabs.innerHTML = tabHtml;

    const subject = this.state.outline[this.activeOutlineSubject];
    if (!subject) return;

    let subTotal = 0;
    let subDone = 0;

    let chaptersHtml = "";
    subject.chapters.forEach((chapter, chIdx) => {
      let pointsHtml = "";
      chapter.points.forEach((pt, ptIdx) => {
        subTotal++;
        if (pt.done) subDone++;

        if (searchKeyword && !pt.title.toLowerCase().includes(searchKeyword)) {
          return;
        }

        pointsHtml += `
          <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 border border-white/5 transition-all">
            <input type="checkbox" ${pt.done ? "checked" : ""} 
              onchange="app.togglePoint('${subject.id}', ${chIdx}, ${ptIdx})"
              class="mt-1 w-4 h-4 rounded text-indigo-600 bg-gray-900 border-gray-600 focus:ring-indigo-500 cursor-pointer">
            <div class="flex-1 text-sm ${pt.done ? "line-through text-gray-500" : "text-gray-200"}">
              ${pt.title}
            </div>
            <div class="flex items-center gap-1">
              <span class="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">第${pt.round || 1}轮</span>
              <button onclick="app.advanceRound('${subject.id}', ${chIdx}, ${ptIdx})" class="text-xs text-gray-400 hover:text-indigo-400 p-1" title="增加复习轮次">+1轮</button>
            </div>
          </div>
        `;
      });

      chaptersHtml += `
        <div class="glass-panel p-5 mb-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-bold text-gray-100 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
              ${chapter.title}
            </h4>
            <span class="text-xs text-gray-400 font-mono">${chapter.points.filter(p => p.done).length}/${chapter.points.length} 完成</span>
          </div>
          <div class="space-y-2">
            ${pointsHtml || '<p class="text-xs text-gray-500 py-2">未搜索到匹配考点</p>'}
          </div>
        </div>
      `;
    });

    this.elements.outlineChaptersContainer.innerHTML = chaptersHtml;

    const percent = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;
    this.elements.outlineProgressBar.style.width = `${percent}%`;
    this.elements.outlineProgressPercent.innerText = `${percent}% (${subDone}/${subTotal})`;
  }

  togglePoint(subjectId, chIdx, ptIdx) {
    const pt = this.state.outline[subjectId].chapters[chIdx].points[ptIdx];
    pt.done = !pt.done;
    this.saveState();
    this.renderOutline(this.elements.outlineSearchInput.value.trim().toLowerCase());
  }

  advanceRound(subjectId, chIdx, ptIdx) {
    const pt = this.state.outline[subjectId].chapters[chIdx].points[ptIdx];
    pt.round = (pt.round || 1) + 1;
    this.saveState();
    this.renderOutline(this.elements.outlineSearchInput.value.trim().toLowerCase());
  }

  // 渲染错题本
  renderMistakes() {
    let filtered = this.state.mistakes;

    if (this.mistakeFilterSubject !== "all") {
      filtered = filtered.filter(m => m.subject === this.mistakeFilterSubject);
    }

    if (this.mistakeSearchQuery) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(this.mistakeSearchQuery) ||
        m.question.toLowerCase().includes(this.mistakeSearchQuery) ||
        m.wrongReason.toLowerCase().includes(this.mistakeSearchQuery) ||
        (m.tags && m.tags.some(t => t.toLowerCase().includes(this.mistakeSearchQuery)))
      );
    }

    if (filtered.length === 0) {
      this.elements.mistakesContainer.innerHTML = `
        <div class="glass-panel p-12 text-center text-gray-500 col-span-full">
          <p class="text-4xl mb-3">📝</p>
          <p class="text-sm">暂无错题记录，点击右上角「记录新错题」开始积累吧！</p>
        </div>
      `;
      return;
    }

    const subjectMap = {
      politics: { name: "政治", color: "rose" },
      english: { name: "英语", color: "blue" },
      math: { name: "数学", color: "emerald" },
      cs408: { name: "408/专业课", color: "indigo" }
    };

    let html = "";
    filtered.forEach(item => {
      const subInfo = subjectMap[item.subject] || { name: item.subject, color: "gray" };
      const stars = "★".repeat(item.mastery) + "☆".repeat(5 - item.mastery);

      html += `
        <div class="glass-card p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-${subInfo.color}-500/10 text-${subInfo.color}-400 font-semibold border border-${subInfo.color}-500/20">
                ${subInfo.name}
              </span>
              <span class="text-amber-400 font-mono text-xs" title="掌握熟练度: ${item.mastery}/5 星">${stars}</span>
            </div>
            <h4 class="font-bold text-gray-100 text-base mb-2">${item.title}</h4>
            
            <div class="mb-3 p-3 rounded-lg bg-gray-900/60 border border-white/5 text-xs text-gray-300">
              <p class="font-semibold text-indigo-300 mb-1">【原题描述】</p>
              <p class="whitespace-pre-wrap">${item.question || "无"}</p>
            </div>

            <div class="mb-3 p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-rose-300">
              <p class="font-semibold text-rose-400 mb-1">【错因剖析】</p>
              <p class="whitespace-pre-wrap">${item.wrongReason}</p>
            </div>

            <div class="mb-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300">
              <p class="font-semibold text-emerald-400 mb-1">【正确思路 / 解析】</p>
              <p class="whitespace-pre-wrap">${item.solution}</p>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-4">
              ${(item.tags || []).map(t => `<span class="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400">#${t}</span>`).join("")}
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-gray-500">
            <span>记录于 ${item.date}</span>
            <div class="flex gap-3">
              <button onclick="app.editMistake('${item.id}')" class="text-indigo-400 hover:text-indigo-300 font-medium">编辑</button>
              <button onclick="app.deleteMistake('${item.id}')" class="text-rose-400 hover:text-rose-300 font-medium">删除</button>
            </div>
          </div>
        </div>
      `;
    });

    this.elements.mistakesContainer.innerHTML = html;
  }

  editMistake(id) {
    const item = this.state.mistakes.find(m => m.id === id);
    if (!item) return;

    document.getElementById("mistake-id-input").value = item.id;
    document.getElementById("mistake-subject-input").value = item.subject;
    document.getElementById("mistake-title-input").value = item.title;
    document.getElementById("mistake-question-input").value = item.question || "";
    document.getElementById("mistake-wrong-input").value = item.wrongReason || "";
    document.getElementById("mistake-solution-input").value = item.solution || "";
    document.getElementById("mistake-tags-input").value = (item.tags || []).join(", ");
    document.getElementById("mistake-mastery-input").value = item.mastery || 1;

    this.elements.modalMistake.classList.remove("hidden");
    this.elements.modalMistake.classList.add("flex");
  }

  deleteMistake(id) {
    if (confirm("确定要删除这道错题记录吗？")) {
      this.state.mistakes = this.state.mistakes.filter(m => m.id !== id);
      this.saveState();
      this.renderMistakes();
    }
  }

  // 番茄钟逻辑
  startPomodoro() {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    this.elements.pomoBtnStart.classList.add("hidden");
    this.elements.pomoBtnPause.classList.remove("hidden");

    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.isTimerRunning = false;
        this.playNotificationSound();

        if (!this.isBreakMode) {
          const minutes = Math.round(this.timerTotal / 60);
          const subject = this.elements.pomoSubjectSelect.value;
          const note = this.elements.pomoTaskInput.value.trim() || "常规专注学习";
          const today = new Date().toISOString().split("T")[0];

          this.state.logs.unshift({ date: today, minutes, subject, note });
          this.saveState();
          this.renderPomodoroLogs();

          alert(`🎉 恭喜完成一个番茄钟（${minutes}分钟）！休息5分钟吧~`);
          this.isBreakMode = true;
          this.timerTotal = 5 * 60;
          this.timerSeconds = 5 * 60;
          this.elements.pomoModeTitle.innerText = "☕ 休息时间 (5分钟)";
        } else {
          alert("☕ 休息结束，准备好开启下一轮专注了吗？");
          this.isBreakMode = false;
          this.timerTotal = 25 * 60;
          this.timerSeconds = 25 * 60;
          this.elements.pomoModeTitle.innerText = "🎯 专注模式 (25分钟)";
        }

        this.elements.pomoBtnStart.classList.remove("hidden");
        this.elements.pomoBtnPause.classList.add("hidden");
        this.updateTimerDisplay();
      }
    }, 1000);
  }

  pausePomodoro() {
    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    this.elements.pomoBtnStart.classList.remove("hidden");
    this.elements.pomoBtnPause.classList.add("hidden");
  }

  resetPomodoro() {
    this.pausePomodoro();
    this.isBreakMode = false;
    this.timerTotal = 25 * 60;
    this.timerSeconds = 25 * 60;
    this.elements.pomoModeTitle.innerText = "🎯 专注模式 (25分钟)";
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    const str = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    this.elements.pomoDisplay.innerText = str;

    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (this.timerSeconds / this.timerTotal) * circumference;
    this.elements.pomoRingCircle.style.strokeDashoffset = offset;
  }

  playNotificationSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log("Audio not allowed", e);
    }
  }

  renderPomodoroLogs() {
    if (!this.elements.pomoLogsList) return;
    const logs = this.state.logs.slice(0, 8);
    if (logs.length === 0) {
      this.elements.pomoLogsList.innerHTML = `<p class="text-xs text-gray-500 text-center py-4">暂无专注记录，点击开始按钮启动番茄钟！</p>`;
      return;
    }

    const subNameMap = { politics: "政治", english: "英语", math: "数学", cs408: "408/专业课" };

    let html = "";
    logs.forEach(l => {
      html += `
        <div class="flex items-center justify-between p-3 rounded-lg bg-gray-800/40 border border-white/5 text-xs">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-medium">${subNameMap[l.subject] || l.subject}</span>
            <span class="text-gray-200">${l.note}</span>
          </div>
          <div class="flex items-center gap-3 text-gray-400 font-mono">
            <span>+${l.minutes} min</span>
            <span class="text-gray-500">${l.date}</span>
          </div>
        </div>
      `;
    });
    this.elements.pomoLogsList.innerHTML = html;
  }

  // 渲染统计数据与打卡热力图
  renderAnalytics() {
    this.renderHeatmap();
    this.renderSubjectDistribution();
  }

  renderHeatmap() {
    const container = this.elements.heatmapContainer;
    if (!container) return;

    const days = [];
    const today = new Date();
    for (let i = 41; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const logs = this.state.logs.filter(l => l.date === dateStr);
      const minutes = logs.reduce((sum, item) => sum + item.minutes, 0);
      days.push({ date: dateStr, minutes });
    }

    let html = "";
    days.forEach(d => {
      let bg = "bg-gray-800/60";
      if (d.minutes > 0 && d.minutes < 60) bg = "bg-indigo-900/60 border border-indigo-700/50";
      else if (d.minutes >= 60 && d.minutes < 180) bg = "bg-indigo-600";
      else if (d.minutes >= 180 && d.minutes < 300) bg = "bg-indigo-500";
      else if (d.minutes >= 300) bg = "bg-indigo-400 shadow-sm shadow-indigo-400/50";

      html += `<div class="heatmap-cell ${bg} cursor-pointer" title="${d.date}: 专注 ${d.minutes} 分钟"></div>`;
    });
    container.innerHTML = html;
  }

  renderSubjectDistribution() {
    const container = document.getElementById("analytics-subject-bars");
    if (!container) return;

    const totals = { politics: 0, english: 0, math: 0, cs408: 0 };
    this.state.logs.forEach(l => {
      if (totals[l.subject] !== undefined) totals[l.subject] += l.minutes;
    });

    const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    const names = { politics: "思想政治", english: "考研英语", math: "考研数学", cs408: "计算机408" };
    const colors = { politics: "from-rose-500 to-red-600", english: "from-blue-500 to-cyan-600", math: "from-emerald-500 to-teal-600", cs408: "from-indigo-500 to-purple-600" };

    let html = "";
    Object.keys(totals).forEach(k => {
      const pct = Math.round((totals[k] / grandTotal) * 100);
      const hours = (totals[k] / 60).toFixed(1);
      html += `
        <div class="mb-4">
          <div class="flex justify-between text-xs text-gray-300 mb-1">
            <span>${names[k]}</span>
            <span class="font-mono text-gray-400">${hours} 小时 (${pct}%)</span>
          </div>
          <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r ${colors[k]} h-2 rounded-full" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // 生成并打开复习日报模态框
  openReportModal() {
    const today = new Date().toISOString().split("T")[0];
    const todayLogs = this.state.logs.filter(l => l.date === today);
    const todayMinutes = todayLogs.reduce((sum, item) => sum + item.minutes, 0);

    let md = `# 🎯 考研复习日报 (${today})

`;
    md += `> 目标院校：${this.state.targetSchool}
`;
    md += `> 今日专注总时长：**${todayMinutes}** 分钟 (${(todayMinutes / 60).toFixed(1)} 小时)

`;

    md += `## ⏱️ 今日专注记录
`;
    if (todayLogs.length === 0) {
      md += `- 今日暂无打卡记录
`;
    } else {
      todayLogs.forEach(l => {
        md += `- [${l.subject}] **${l.minutes}分钟**：${l.note}
`;
      });
    }

    md += `
## 📝 错题积累统计
`;
    md += `- 当前错题本累计记录：**${this.state.mistakes.length}** 道重点难点题目

`;

    md += `## 🌟 今日复习心得与明日规划
`;
    md += `- 今日收获：
- 明日重点任务：
`;

    this.elements.reportContent.value = md;
    this.elements.modalReport.classList.remove("hidden");
    this.elements.modalReport.classList.add("flex");
  }

  // 备份与还原 JSON
  exportJSONBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kaoyan_tracker_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  importJSONBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.outline && parsed.mistakes) {
          this.state = parsed;
          this.saveState();
          this.render();
          alert("🎉 数据还原成功！");
        } else {
          alert("文件格式不正确，缺少核心字段！");
        }
      } catch (err) {
        alert("解析 JSON 文件失败：" + err.message);
      }
    };
    reader.readAsText(file);
  }

  render() {
    this.renderHeaderStats();
    this.renderOutline();
    this.renderMistakes();
    this.renderPomodoroLogs();
    this.renderAnalytics();
  }
}

// 全局应用实例
let app;
window.addEventListener("DOMContentLoaded", () => {
  app = new KaoyanApp();
});
