// 考研备考、技能树与多用户 GitHub 仓库云存储系统 (Kaoyan-Tracker 3.5) 核心逻辑

const MOTIVATION_QUOTES = [
  { text: "星光不问赶路人，时光不负有心人。", author: "考研寄语" },
  { text: "研途虽苦，但终点繁花似锦。每一分努力都在为未来铺路。", author: "研友共勉" },
  { text: "耐得住寂寞，才能守得住繁华。沉心静气，按部就班。", author: "上岸指南" },
  { text: "种一棵树最好的时间是十年前，其次是现在。坚持每一天的专注！", author: "每日能量" },
  { text: "那些看似波澜不惊的日复一日，终会在某一天看到坚持的意义。", author: "考研打卡" },
  { text: "乾坤未定，你我皆是黑马；既然选择了远方，便只顾风雨兼程。", author: "研途金句" }
];

const DEFAULT_EXAM_DATE = "2026-12-26T08:30:00";
const USERS_LIST_KEY = "kaoyan_users_registry_v3";
const ACTIVE_USER_KEY = "kaoyan_active_user_v3";

class KaoyanApp {
  constructor() {
    this.currentUser = localStorage.getItem(ACTIVE_USER_KEY) || "caixuf";
    this.usersList = this.loadUsersList();
    this.state = this.loadState();
    
    this.timerInterval = null;
    this.timerSeconds = 25 * 60;
    this.timerTotal = 25 * 60;
    this.isTimerRunning = false;
    this.isBreakMode = false;
    this.activeTab = "dashboard";
    this.activeSkillSubject = "math";
    this.activeOutlineSubject = "politics";
    this.activeMaterialSubject = "math";
    this.mistakeFilterSubject = "all";
    this.mistakeSearchQuery = "";
    this.currentStudyingPoint = null;

    this.initDOM();
    this.initEvents();
    this.initUserMenu();
    this.startCountdown();
    this.initGitHubSync();
    this.render();
  }

  loadUsersList() {
    const list = localStorage.getItem(USERS_LIST_KEY);
    if (list) {
      try {
        const parsed = JSON.parse(list);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    const defaultList = ["caixuf", "default"];
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(defaultList));
    return defaultList;
  }

  getStorageKey(username = this.currentUser) {
    return "kaoyan_tracker_data_user_" + username;
  }

  loadState(username = this.currentUser) {
    const saved = localStorage.getItem(this.getStorageKey(username));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.outline) parsed.outline = JSON.parse(JSON.stringify(DEFAULT_OUTLINE));
        if (!parsed.skills) parsed.skills = this.initDefaultSkills();
        if (!parsed.mistakes) parsed.mistakes = [];
        if (!parsed.logs) parsed.logs = [];
        if (!parsed.examDate) parsed.examDate = DEFAULT_EXAM_DATE;
        if (!parsed.targetSchool) parsed.targetSchool = "目标院校 & 专业";
        parsed.username = username;
        return parsed;
      } catch (e) {
        console.error("加载用户数据失败", e);
      }
    }
    return {
      username: username,
      examDate: DEFAULT_EXAM_DATE,
      targetSchool: username === "caixuf" ? "清华/北大/浙大 计算机系 (点击修改)" : "目标院校与专业 (点击修改)",
      outline: JSON.parse(JSON.stringify(DEFAULT_OUTLINE)),
      skills: this.initDefaultSkills(),
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
          date: "2026-08-25"
        }
      ],
      logs: [
        { date: "2026-08-25", minutes: 120, subject: "math", note: "完成高数第一章极限题型训练" }
      ]
    };
  }

  initDefaultSkills() {
    const skillsMap = {};
    Object.values(SKILLS_DATA).forEach(subj => {
      subj.skills.forEach(sk => {
        skillsMap[sk.id] = { level: 1, exp: 30 };
      });
    });
    return skillsMap;
  }

  saveState() {
    this.state.username = this.currentUser;
    localStorage.setItem(this.getStorageKey(), JSON.stringify(this.state));
    this.renderHeaderStats();
    this.triggerAutoSync();
  }

  // =================== 多用户管理逻辑 ===================

  initUserMenu() {
    this.renderUserDropdown();

    this.elements.btnUserMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      this.elements.userDropdownMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      this.elements.userDropdownMenu.classList.add("hidden");
    });

    this.elements.btnCreateUserModal.addEventListener("click", () => {
      this.elements.userDropdownMenu.classList.add("hidden");
      this.elements.modalCreateUser.classList.remove("hidden");
      this.elements.modalCreateUser.classList.add("flex");
    });

    this.elements.btnCancelCreateUser.addEventListener("click", () => {
      this.elements.modalCreateUser.classList.add("hidden");
      this.elements.modalCreateUser.classList.remove("flex");
    });

    this.elements.btnConfirmCreateUser.addEventListener("click", () => {
      const uname = this.elements.newUsernameInput.value.trim().replace(/[^a-zA-Z0-9_-]/g, '');
      const school = this.elements.newUserSchoolInput.value.trim();

      if (!uname) {
        alert("请输入有效的用户名称 (仅支持英文、数字与下划线)！");
        return;
      }

      if (!this.usersList.includes(uname)) {
        this.usersList.push(uname);
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.usersList));
      }

      const newState = this.loadState(uname);
      if (school) newState.targetSchool = school;
      localStorage.setItem(this.getStorageKey(uname), JSON.stringify(newState));

      this.elements.modalCreateUser.classList.add("hidden");
      this.elements.modalCreateUser.classList.remove("flex");
      this.elements.newUsernameInput.value = "";
      this.elements.newUserSchoolInput.value = "";

      this.switchUser(uname);
    });
  }

  renderUserDropdown() {
    this.elements.currentUserName.innerText = this.currentUser;
    if (this.elements.ghSyncUserBadge) this.elements.ghSyncUserBadge.innerText = this.currentUser;
    if (this.elements.ghSyncFilePath) this.elements.ghSyncFilePath.innerText = `data/users/${this.currentUser}.json`;

    let html = "";
    this.usersList.forEach(uname => {
      const isCur = uname === this.currentUser;
      html += `
        <div class="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs ${isCur ? 'bg-indigo-600/30 text-white font-bold' : 'text-gray-300 hover:bg-gray-800'} cursor-pointer group">
          <span onclick="app.switchUser('${uname}')" class="flex-1 truncate">👤 ${uname}</span>
          ${this.usersList.length > 1 && !isCur ? `<span onclick="app.deleteUser('${uname}')" class="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-300 px-1 text-[11px]" title="删除该用户">✕</span>` : ''}
        </div>
      `;
    });
    this.elements.userListItems.innerHTML = html;
  }

  switchUser(newUsername) {
    if (!this.usersList.includes(newUsername)) {
      this.usersList.push(newUsername);
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.usersList));
    }

    this.currentUser = newUsername;
    localStorage.setItem(ACTIVE_USER_KEY, newUsername);
    this.state = this.loadState(newUsername);
    
    this.renderUserDropdown();
    this.render();

    // 重新连接 GitHub 同步该用户的数据文件
    if (this.ghConfig && this.ghConfig.token) {
      this.pullFromGitHub(false);
    } else {
      this.fetchPublicRepoData();
    }
  }

  deleteUser(uname) {
    if (confirm(`确定要删除用户【${uname}】的本地档案吗？`)) {
      this.usersList = this.usersList.filter(u => u !== uname);
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.usersList));
      localStorage.removeItem(this.getStorageKey(uname));
      if (this.currentUser === uname) {
        this.switchUser(this.usersList[0] || "caixuf");
      } else {
        this.renderUserDropdown();
      }
    }
  }

  initDOM() {
    this.elements = {
      tabs: document.querySelectorAll(".tab-btn"),
      tabContents: document.querySelectorAll(".tab-content"),
      
      btnUserMenu: document.getElementById("btn-user-menu"),
      currentUserName: document.getElementById("current-user-name"),
      userDropdownMenu: document.getElementById("user-dropdown-menu"),
      userListItems: document.getElementById("user-list-items"),
      btnCreateUserModal: document.getElementById("btn-create-user-modal"),
      modalCreateUser: document.getElementById("modal-create-user"),
      newUsernameInput: document.getElementById("new-username-input"),
      newUserSchoolInput: document.getElementById("new-user-school-input"),
      btnCancelCreateUser: document.getElementById("btn-cancel-create-user"),
      btnConfirmCreateUser: document.getElementById("btn-confirm-create-user"),

      cdDays: document.getElementById("cd-days"),
      cdHours: document.getElementById("cd-hours"),
      cdMinutes: document.getElementById("cd-minutes"),
      cdSeconds: document.getElementById("cd-seconds"),
      targetSchoolText: document.getElementById("target-school-display"),
      quoteText: document.getElementById("quote-text"),
      quoteAuthor: document.getElementById("quote-author"),
      
      statTodayMinutes: document.getElementById("stat-today-minutes"),
      statTotalSkillLevel: document.getElementById("stat-total-skill-level"),
      statTotalDonePoints: document.getElementById("stat-total-points"),
      statTotalMistakes: document.getElementById("stat-total-mistakes"),
      
      skillSubjectTabs: document.getElementById("skill-subject-tabs"),
      skillsNodesContainer: document.getElementById("skills-nodes-container"),

      materialSubjectSelect: document.getElementById("material-subject-select"),
      materialsContainer: document.getElementById("materials-container"),
      
      awesomeContainer: document.getElementById("awesome-resources-container"),

      outlineSubjectTabs: document.getElementById("outline-subject-tabs"),
      outlineChaptersContainer: document.getElementById("outline-chapters-container"),
      outlineSearchInput: document.getElementById("outline-search-input"),
      outlineProgressBar: document.getElementById("outline-progress-bar"),
      outlineProgressPercent: document.getElementById("outline-progress-percent"),
      
      mistakesContainer: document.getElementById("mistakes-list"),
      mistakeSearchInput: document.getElementById("mistake-search-input"),
      mistakeSubjectFilter: document.getElementById("mistake-subject-filter"),
      btnNewMistake: document.getElementById("btn-new-mistake"),
      modalMistake: document.getElementById("modal-mistake"),
      formMistake: document.getElementById("form-mistake"),
      btnCancelMistake: document.getElementById("btn-cancel-mistake"),
      
      pomoDisplay: document.getElementById("pomo-display"),
      pomoSubjectSelect: document.getElementById("pomo-subject-select"),
      pomoTaskInput: document.getElementById("pomo-task-input"),
      pomoBtnStart: document.getElementById("pomo-btn-start"),
      pomoBtnPause: document.getElementById("pomo-btn-pause"),
      pomoBtnReset: document.getElementById("pomo-btn-reset"),
      pomoModeTitle: document.getElementById("pomo-mode-title"),
      pomoRingCircle: document.getElementById("pomo-ring-circle"),
      pomoLogsList: document.getElementById("pomo-logs-list"),
      
      heatmapContainer: document.getElementById("heatmap-grid"),
      btnExportReport: document.getElementById("btn-export-report"),
      btnExportBackup: document.getElementById("btn-export-backup"),
      btnImportBackup: document.getElementById("btn-import-backup"),
      fileImportInput: document.getElementById("file-import-input"),
      modalReport: document.getElementById("modal-report"),
      reportContent: document.getElementById("report-content"),
      btnCloseReport: document.getElementById("btn-close-report"),
      btnCopyReport: document.getElementById("btn-copy-report"),

      modalPointStudy: document.getElementById("modal-point-study"),
      studyPointTitle: document.getElementById("study-point-title"),
      studyPointBody: document.getElementById("study-point-body"),
      btnClosePointStudy: document.getElementById("btn-close-point-study"),
      btnCompletePointStudy: document.getElementById("btn-complete-point-study"),

      btnOpenGithubSync: document.getElementById("btn-open-github-sync"),
      modalGithubSync: document.getElementById("modal-github-sync"),
      btnCloseGithubSync: document.getElementById("btn-close-github-sync"),
      ghRepoInput: document.getElementById("gh-repo-input"),
      ghTokenInput: document.getElementById("gh-token-input"),
      ghAutoSyncInput: document.getElementById("gh-autosync-input"),
      btnPushToGithub: document.getElementById("btn-push-to-github"),
      btnPullFromGithub: document.getElementById("btn-pull-from-github"),
      ghSyncStatusText: document.getElementById("gh-sync-status-text"),
      ghLastSyncTime: document.getElementById("gh-last-sync-time"),
      syncIndicatorDot: document.getElementById("sync-indicator-dot"),
      ghSyncUserBadge: document.getElementById("gh-sync-user-badge"),
      ghSyncFilePath: document.getElementById("gh-sync-file-path")
    };
  }

  initEvents() {
    this.elements.tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    this.elements.targetSchoolText.addEventListener("click", () => {
      const school = prompt("请输入您的考研目标院校与专业：", this.state.targetSchool);
      if (school && school.trim()) {
        this.state.targetSchool = school.trim();
        this.saveState();
        this.elements.targetSchoolText.innerText = this.state.targetSchool;
      }
    });

    this.elements.skillSubjectTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-skill-subj]");
      if (btn) {
        this.activeSkillSubject = btn.dataset.skillSubj;
        this.renderSkillTree();
      }
    });

    this.elements.materialSubjectSelect.addEventListener("change", (e) => {
      this.activeMaterialSubject = e.target.value;
      this.renderMaterials();
    });

    this.elements.outlineSubjectTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-subject]");
      if (btn) {
        this.activeOutlineSubject = btn.dataset.subject;
        this.renderOutline();
      }
    });

    this.elements.outlineSearchInput.addEventListener("input", (e) => {
      this.renderOutline(e.target.value.trim().toLowerCase());
    });

    this.elements.mistakeSubjectFilter.addEventListener("change", (e) => {
      this.mistakeFilterSubject = e.target.value;
      this.renderMistakes();
    });

    this.elements.mistakeSearchInput.addEventListener("input", (e) => {
      this.mistakeSearchQuery = e.target.value.trim().toLowerCase();
      this.renderMistakes();
    });

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
        this.addSkillExp(subject, 40);
      }

      this.saveState();
      this.renderMistakes();
      this.elements.modalMistake.classList.add("hidden");
      this.elements.modalMistake.classList.remove("flex");
    });

    this.elements.pomoBtnStart.addEventListener("click", () => this.startPomodoro());
    this.elements.pomoBtnPause.addEventListener("click", () => this.pausePomodoro());
    this.elements.pomoBtnReset.addEventListener("click", () => this.resetPomodoro());

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

    this.elements.btnClosePointStudy.addEventListener("click", () => {
      this.elements.modalPointStudy.classList.add("hidden");
      this.elements.modalPointStudy.classList.remove("flex");
    });

    this.elements.btnCompletePointStudy.addEventListener("click", () => {
      if (this.currentStudyingPoint) {
        this.addSkillExp(this.currentStudyingPoint.subjectId, 50);
        this.elements.modalPointStudy.classList.add("hidden");
        this.elements.modalPointStudy.classList.remove("flex");
        alert("🎉 考点研读完成！已为对应技能增加 +50 EXP 经验值！");
      }
    });
  }

  // =================== 多用户 GitHub 仓库云存储同步核心 (Git-as-Database) ===================

  getUserFilePath() {
    return `data/users/${this.currentUser}.json`;
  }

  initGitHubSync() {
    this.ghConfig = {
      repo: localStorage.getItem("kaoyan_gh_repo") || "caixuf/Kaoyan-Tracker",
      token: localStorage.getItem("kaoyan_gh_token") || "",
      autoSync: localStorage.getItem("kaoyan_gh_autosync") === "true",
      fileSha: null
    };

    this.elements.ghRepoInput.value = this.ghConfig.repo;
    this.elements.ghTokenInput.value = this.ghConfig.token;
    this.elements.ghAutoSyncInput.checked = this.ghConfig.autoSync;
    this.updateSyncIndicator();

    this.elements.btnOpenGithubSync.addEventListener("click", () => {
      this.renderUserDropdown();
      this.elements.modalGithubSync.classList.remove("hidden");
      this.elements.modalGithubSync.classList.add("flex");
    });

    this.elements.btnCloseGithubSync.addEventListener("click", () => {
      this.saveGitHubConfig();
      this.elements.modalGithubSync.classList.add("hidden");
      this.elements.modalGithubSync.classList.remove("flex");
    });

    this.elements.btnPushToGithub.addEventListener("click", () => this.pushToGitHub(true));
    this.elements.btnPullFromGithub.addEventListener("click", () => this.pullFromGitHub(true));

    if (this.ghConfig.token) {
      this.pullFromGitHub(false);
    } else {
      this.fetchPublicRepoData();
    }
  }

  saveGitHubConfig() {
    this.ghConfig.repo = this.elements.ghRepoInput.value.trim() || "caixuf/Kaoyan-Tracker";
    this.ghConfig.token = this.elements.ghTokenInput.value.trim();
    this.ghConfig.autoSync = this.elements.ghAutoSyncInput.checked;

    localStorage.setItem("kaoyan_gh_repo", this.ghConfig.repo);
    localStorage.setItem("kaoyan_gh_token", this.ghConfig.token);
    localStorage.setItem("kaoyan_gh_autosync", this.ghConfig.autoSync ? "true" : "false");
    this.updateSyncIndicator();
  }

  updateSyncIndicator() {
    if (!this.elements.syncIndicatorDot) return;
    if (this.ghConfig.token) {
      this.elements.syncIndicatorDot.className = "w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50";
      this.elements.syncIndicatorDot.title = "已连接 GitHub 仓库云存储";
    } else {
      this.elements.syncIndicatorDot.className = "w-2 h-2 rounded-full bg-amber-400";
      this.elements.syncIndicatorDot.title = "未配置 GitHub Token (本地模式)";
    }
  }

  async fetchPublicRepoData() {
    const userPath = this.getUserFilePath();
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${this.ghConfig.repo}/main/${userPath}?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.mistakes && data.skills) {
          this.state.targetSchool = data.targetSchool || this.state.targetSchool;
          this.state.skills = data.skills || this.state.skills;
          this.state.mistakes = data.mistakes || this.state.mistakes;
          this.state.logs = data.logs || this.state.logs;
          this.render();
          console.log(`从 GitHub 加载用户 [${this.currentUser}] 数据成功`);
        }
      }
    } catch (e) {
      console.log("免认证拉取数据跳过", e);
    }
  }

  async pullFromGitHub(showToast = true) {
    this.saveGitHubConfig();
    if (!this.ghConfig.token) {
      if (showToast) alert("请先填写 GitHub Personal Access Token！");
      return;
    }

    const userPath = this.getUserFilePath();
    try {
      this.elements.ghSyncStatusText.innerText = `正在拉取 ${this.currentUser}...`;
      const res = await fetch(`https://api.github.com/repos/${this.ghConfig.repo}/contents/${userPath}`, {
        headers: {
          "Authorization": `Bearer ${this.ghConfig.token}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });

      if (!res.ok) {
        if (res.status === 404) {
          // 该新用户在远程尚无文件，提示推送到远程
          this.elements.ghSyncStatusText.innerText = `远程尚无此用户文件，请点击提交`;
          if (showToast) alert(`用户【${this.currentUser}】在仓库中尚无文件，点击「立即提交到仓库」即可自动创建！`);
          return;
        }
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const fileData = await res.json();
      this.ghConfig.fileSha = fileData.sha;
      const contentStr = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ''))));
      const parsed = JSON.parse(contentStr);

      if (parsed.mistakes || parsed.skills) {
        this.state.targetSchool = parsed.targetSchool || this.state.targetSchool;
        this.state.skills = parsed.skills || this.state.skills;
        this.state.mistakes = parsed.mistakes || this.state.mistakes;
        this.state.logs = parsed.logs || this.state.logs;
        this.saveState();
        this.render();

        const timeStr = new Date().toLocaleTimeString();
        this.elements.ghSyncStatusText.innerText = `[${this.currentUser}] 同步成功！`;
        this.elements.ghLastSyncTime.innerText = timeStr;
        if (showToast) alert(`🎉 成功从 GitHub 仓库同步用户【${this.currentUser}】的最新考研数据！`);
      }
    } catch (err) {
      this.elements.ghSyncStatusText.innerText = "拉取失败：" + err.message;
      if (showToast) alert("从 GitHub 拉取失败：" + err.message);
    }
  }

  async pushToGitHub(showToast = true) {
    this.saveGitHubConfig();
    if (!this.ghConfig.token) {
      if (showToast) alert("请先填写 GitHub Personal Access Token！");
      return;
    }

    const userPath = this.getUserFilePath();
    try {
      this.elements.ghSyncStatusText.innerText = `正在提交 [${this.currentUser}] 到仓库...`;

      // 获取当前用户文件的 SHA
      let currentSha = this.ghConfig.fileSha;
      const getRes = await fetch(`https://api.github.com/repos/${this.ghConfig.repo}/contents/${userPath}`, {
        headers: {
          "Authorization": `Bearer ${this.ghConfig.token}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        currentSha = fileData.sha;
        this.ghConfig.fileSha = currentSha;
      }

      const payloadData = {
        username: this.currentUser,
        examDate: this.state.examDate,
        targetSchool: this.state.targetSchool,
        lastSyncTime: new Date().toISOString(),
        skills: this.state.skills,
        mistakes: this.state.mistakes,
        logs: this.state.logs
      };

      const jsonString = JSON.stringify(payloadData, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

      const body = {
        message: `data(sync): update kaoyan progress for user [${this.currentUser}]`,
        content: base64Content,
        sha: currentSha || undefined
      };

      const putRes = await fetch(`https://api.github.com/repos/${this.ghConfig.repo}/contents/${userPath}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${this.ghConfig.token}`,
          "Content-Type": "application/json",
          "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify(body)
      });

      if (!putRes.ok) {
        const errJson = await putRes.json().catch(() => ({}));
        throw new Error(errJson.message || `HTTP ${putRes.status}`);
      }

      const resData = await putRes.json();
      this.ghConfig.fileSha = resData.content.sha;
      const timeStr = new Date().toLocaleTimeString();
      this.elements.ghSyncStatusText.innerText = `[${this.currentUser}] 提交成功 (已持久化)`;
      this.elements.ghLastSyncTime.innerText = timeStr;
      if (showToast) alert(`🎉 用户【${this.currentUser}】的考研数据已成功保存到仓库 ${userPath}！`);
    } catch (err) {
      this.elements.ghSyncStatusText.innerText = "提交失败：" + err.message;
      if (showToast) alert("提交到 GitHub 仓库失败：" + err.message);
    }
  }

  triggerAutoSync() {
    if (this.ghConfig && this.ghConfig.autoSync && this.ghConfig.token) {
      this.pushToGitHub(false);
    }
  }

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
      if (section.id === "tab-" + tabId) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });

    if (tabId === "skills") this.renderSkillTree();
    if (tabId === "materials") this.renderMaterials();
    if (tabId === "awesome") this.renderAwesomeResources();
    if (tabId === "outline") this.renderOutline();
    if (tabId === "mistakes") this.renderMistakes();
    if (tabId === "pomodoro") this.renderPomodoroLogs();
    if (tabId === "analytics") this.renderAnalytics();
  }

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
    this.elements.quoteText.innerText = "“" + quote.text + "”";
    this.elements.quoteAuthor.innerText = "—— " + quote.author;
    this.elements.targetSchoolText.innerText = this.state.targetSchool;
  }

  addSkillExp(subjectId, expAmount) {
    const tree = SKILLS_DATA[subjectId];
    if (!tree) return;
    
    const skill = tree.skills[0];
    if (!this.state.skills[skill.id]) {
      this.state.skills[skill.id] = { level: 1, exp: 0 };
    }
    
    const cur = this.state.skills[skill.id];
    cur.exp += expAmount;
    const required = skill.expPerLevel * cur.level;
    if (cur.exp >= required && cur.level < skill.maxLevel) {
      cur.level++;
      cur.exp -= required;
      alert("🌟 恭喜！技能【" + skill.name + "】成功晋升至 Lv." + cur.level + "！");
    }
    this.saveState();
  }

  renderHeaderStats() {
    const today = new Date().toISOString().split("T")[0];
    const todayLogs = this.state.logs.filter(l => l.date === today);
    const todayMinutes = todayLogs.reduce((acc, cur) => acc + cur.minutes, 0);
    this.elements.statTodayMinutes.innerText = todayMinutes;

    let totalLevel = 0;
    Object.values(this.state.skills).forEach(s => {
      totalLevel += s.level;
    });
    this.elements.statTotalSkillLevel.innerText = "Lv. " + totalLevel;

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
    this.elements.statTotalDonePoints.innerText = donePoints + "/" + totalPoints;
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

  renderSkillTree() {
    let tabsHtml = "";
    Object.values(SKILLS_DATA).forEach(tree => {
      const active = tree.id === this.activeSkillSubject ? "bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-gray-800/40 border-gray-700 text-gray-400";
      tabsHtml += `
        <button data-skill-subj="${tree.id}" class="px-4 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${active}">
          <span>${tree.icon}</span>
          <span>${tree.badge}</span>
        </button>
      `;
    });
    this.elements.skillSubjectTabs.innerHTML = tabsHtml;

    const currentTree = SKILLS_DATA[this.activeSkillSubject];
    if (!currentTree) return;

    let nodesHtml = "";
    currentTree.skills.forEach(sk => {
      const userSkill = this.state.skills[sk.id] || { level: 1, exp: 0 };
      const expNeeded = sk.expPerLevel * userSkill.level;
      const progressPercent = Math.min(100, Math.round((userSkill.exp / expNeeded) * 100));

      nodesHtml += `
        <div class="skill-node p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                ${sk.icon}
              </div>
              <span class="skill-level-badge text-black font-extrabold text-xs px-2.5 py-0.5 rounded-full font-mono">
                Lv.${userSkill.level} / 5
              </span>
            </div>
            
            <h4 class="font-bold text-white text-base mb-1">${sk.name}</h4>
            <span class="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 font-mono mb-2 inline-block">${sk.category}</span>
            <p class="text-xs text-gray-300 leading-relaxed mb-4">${sk.desc}</p>
          </div>

          <div>
            <div class="flex justify-between text-[11px] text-gray-400 mb-1 font-mono">
              <span>EXP: ${userSkill.exp} / ${expNeeded}</span>
              <span class="text-indigo-400 font-bold">${progressPercent}%</span>
            </div>
            <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden mb-4">
              <div class="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all duration-500" style="width: ${progressPercent}%"></div>
            </div>

            <div class="pt-3 border-t border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-emerald-400">🎁 ${sk.rewards[0] || '解锁高阶技能'}</span>
              <button onclick="app.trainSkill('${currentTree.id}', '${sk.id}')" class="px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-xs text-indigo-200 hover:text-white border border-indigo-500/40 transition-all font-semibold">
                +30 EXP 淬炼
              </button>
            </div>
          </div>
        </div>
      `;
    });

    this.elements.skillsNodesContainer.innerHTML = nodesHtml;
  }

  trainSkill(subjectId, skillId) {
    this.addSkillExp(subjectId, 30);
    this.renderSkillTree();
  }

  renderMaterials() {
    const list = STUDY_MATERIALS[this.activeMaterialSubject] || [];
    let html = "";
    list.forEach(item => {
      const renderedMd = marked.parse(item.content);
      html += `
        <div class="glass-panel p-6">
          <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h4 class="font-bold text-white text-base">${item.title}</h4>
            <div class="flex gap-2">
              ${(item.tags || []).map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/20">#${t}</span>`).join("")}
            </div>
          </div>
          <div class="markdown-body text-xs text-gray-300 leading-relaxed">
            ${renderedMd}
          </div>
        </div>
      `;
    });
    this.elements.materialsContainer.innerHTML = html;
  }

  renderAwesomeResources() {
    const container = this.elements.awesomeContainer;
    if (!container) return;

    let html = "";
    AWESOME_RESOURCES.forEach(cat => {
      let cardsHtml = "";
      cat.items.forEach(item => {
        cardsHtml += `
          <div class="glass-card p-5 flex flex-col justify-between hover:border-indigo-500/50">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-${cat.color}-500/10 text-${cat.color}-400 font-mono border border-${cat.color}-500/20 font-bold">
                  ${item.stars}
                </span>
                <span class="text-[11px] text-gray-500 font-mono">by @${item.author}</span>
              </div>
              <h4 class="font-bold text-white text-sm mb-1">${item.name}</h4>
              <p class="text-xs text-gray-300 leading-relaxed mb-3">${item.desc}</p>
              
              <div class="flex flex-wrap gap-1.5 mb-4">
                ${item.tags.map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400">#${t}</span>`).join("")}
              </div>
            </div>

            <div class="pt-3 border-t border-white/5 flex items-center justify-between">
              <span class="text-[11px] text-gray-500 font-mono">${item.repo}</span>
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" 
                class="px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-xs font-semibold text-indigo-300 hover:text-white border border-indigo-500/40 transition-all flex items-center gap-1">
                <span>直达 GitHub</span> ↗
              </a>
            </div>
          </div>
        `;
      });

      html += `
        <div>
          <h4 class="text-base font-bold text-gray-100 flex items-center gap-2 mb-3">
            <span>${cat.categoryName}</span>
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${cardsHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

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
            <div class="flex items-center gap-2">
              <button onclick="app.openPointStudy('${subject.id}', '${pt.title}')" class="text-xs text-indigo-400 hover:text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20" title="打开沉浸式考点深度研读">📖 精讲</button>
              <span class="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 font-mono">第${pt.round || 1}轮</span>
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

  openPointStudy(subjectId, pointTitle) {
    this.currentStudyingPoint = { subjectId, pointTitle };
    this.elements.studyPointTitle.innerText = pointTitle;
    
    let content = `### 🎯 核心概念与考研命题规律\n该考点属于 **${subjectId}** 的核心高频考察范畴，在历年真题中常以客观选择题与综合解答大题的形式出现。\n\n### 💡 解题技巧与避坑指南\n1. **审清题意**：明确题目所给的边界条件与约束，防止漏掉临界状态。\n2. **套路应用**：熟记本考点的标准推导公式与答题模板步骤。\n3. **多维复盘**：结合历年真题与错题本反思易错混淆点。\n\n### 🌟 考研学长学姐备考寄语\n“把每一次的弄懂当做上岸的台阶，稳扎稳打，一战成硕！”`;
    
    this.elements.studyPointBody.innerHTML = marked.parse(content);
    this.elements.modalPointStudy.classList.remove("hidden");
    this.elements.modalPointStudy.classList.add("flex");
  }

  togglePoint(subjectId, chIdx, ptIdx) {
    const pt = this.state.outline[subjectId].chapters[chIdx].points[ptIdx];
    pt.done = !pt.done;
    if (pt.done) {
      this.addSkillExp(subjectId, 20);
    }
    this.saveState();
    this.renderOutline(this.elements.outlineSearchInput.value.trim().toLowerCase());
  }

  advanceRound(subjectId, chIdx, ptIdx) {
    const pt = this.state.outline[subjectId].chapters[chIdx].points[ptIdx];
    pt.round = (pt.round || 1) + 1;
    this.saveState();
    this.renderOutline(this.elements.outlineSearchInput.value.trim().toLowerCase());
  }

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
          this.addSkillExp(subject, 50);

          this.saveState();
          this.renderPomodoroLogs();

          alert("🎉 恭喜完成一个番茄钟（" + minutes + "分钟）！已获得 +50 技能 EXP！休息5分钟吧~");
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
    const str = String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
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

  openReportModal() {
    const today = new Date().toISOString().split("T")[0];
    const todayLogs = this.state.logs.filter(l => l.date === today);
    const todayMinutes = todayLogs.reduce((sum, item) => sum + item.minutes, 0);

    let totalSkillLvl = 0;
    Object.values(this.state.skills).forEach(s => totalSkillLvl += s.level);

    let md = `# 🎯 考研复习日报 (${today})\n\n`;
    md += `> 用户身份：**${this.currentUser}**\n`;
    md += `> 目标院校：${this.state.targetSchool}\n`;
    md += `> 今日专注总时长：**${todayMinutes}** 分钟 (${(todayMinutes / 60).toFixed(1)} 小时)\n`;
    md += `> 考研技能树总等级：**Lv.${totalSkillLvl}**\n\n`;

    md += `## ⏱️ 今日专注记录\n`;
    if (todayLogs.length === 0) {
      md += `- 今日暂无打卡记录\n`;
    } else {
      todayLogs.forEach(l => {
        md += `- [${l.subject}] **${l.minutes}分钟**：${l.note}\n`;
      });
    }

    md += `\n## 📝 错题积累统计\n`;
    md += `- 当前错题本累计记录：**${this.state.mistakes.length}** 道重点难点题目\n\n`;

    md += `## 🌟 今日复习心得与明日规划\n`;
    md += `- 今日收获：\n- 明日重点任务：\n`;

    this.elements.reportContent.value = md;
    this.elements.modalReport.classList.remove("hidden");
    this.elements.modalReport.classList.add("flex");
  }

  exportJSONBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kaoyan_tracker_backup_${this.currentUser}_${new Date().toISOString().split("T")[0]}.json`);
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
          if (parsed.username) {
            this.currentUser = parsed.username;
            if (!this.usersList.includes(this.currentUser)) {
              this.usersList.push(this.currentUser);
              localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.usersList));
            }
          }
          this.saveState();
          this.renderUserDropdown();
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
    this.renderSkillTree();
    this.renderMaterials();
    this.renderAwesomeResources();
    this.renderOutline();
    this.renderMistakes();
    this.renderPomodoroLogs();
    this.renderAnalytics();
  }
}

let app;
window.addEventListener("DOMContentLoaded", () => {
  app = new KaoyanApp();
});
