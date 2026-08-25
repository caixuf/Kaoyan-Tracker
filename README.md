# 🎓 Kaoyan Tracker (考研备考与全科进度管理系统)

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-emerald.svg)
![Build](https://img.shields.io/badge/GitHub%20Pages-Automated%20Deploy-indigo.svg)
![Target](https://img.shields.io/badge/Exam-Postgraduate%20Entrance%20Exam-rose.svg)

**专为考研学子打造的现代化全科备考管理与复习提效系统**  
初试精准倒计时 ｜ 政治/英语/数学/408考点大纲追踪 ｜ 智能错题集 ｜ 番茄钟专注打卡 ｜ 艾宾浩斯复习热力图

</div>

---

## ✨ 核心功能亮点

1. ⏳ **考研初试精准倒计时看板**
   - 实时计算天/时/分/秒，配备每日励志金句与目标院校自定义设定。
   - 首页全景展示今日专注时长、掌握考点总数与各科复习进度环。

2. 📚 **四科全景考点大纲与多轮复习追踪**
   - **思想政治理论**：马原、毛中特、新时代思想、史纲、思修法治及当代政经。
   - **考研英语 (一/二)**：核心高频5500词、长难句拆解、历年真题精读、新题型、翻译、大小作文模板。
   - **考研数学 (一/二/三)**：高数、线代、概率论与数理统计完整章节考点。
   - **计算机408专业课**：数据结构、计算机组成原理、操作系统、计算机网络。
   - 支持考点勾选、增加复习轮次（+1轮）、关键词极速检索。

3. 📝 **错题本与高频踩坑集 (Mistake Notebook)**
   - 题干简述、错因剖析、正确思路模板、标签归类与 1~5 星掌握度星级评定。
   - 支持按学科筛选、搜索与增删改查。

4. ⏱️ **番茄钟专注学习与声音提醒**
   - 25分钟专注 + 5分钟休息循环，支持关联复习科目与具体任务备注。
   - 基于 Web Audio API 的结束提示音与打卡历史记录。

5. 📊 **打卡热力图与复习日报导出**
   - 过去 42 天学习打卡贡献热力图（GitHub 风格）。
   - 各科累计学习时长百分比分布。
   - **一键生成 Markdown 格式《今日复习日报》**，方便分享到打卡群或知识库。
   - **数据安全与持久化**：浏览器 LocalStorage 自动保存，支持一键 JSON 备份与还原。

---

## 🚀 快速开始与本地运行

### 方式 1：直接浏览器打开
无需安装任何复杂依赖，直接双击打开 `index.html` 即可使用全部功能！

### 方式 2：使用 Node.js 本地预览
```bash
# 启动本地服务
npx serve .
```

---

## 🌐 GitHub Pages 自动部署

本项目已配置 GitHub Actions 自动化工作流（`.github/workflows/deploy.yml`），每次代码推送到 `main` 分支时将自动构建并发布到 GitHub Pages 静态站点。

---

## 📄 开源许可证

本项目采用 [MIT License](LICENSE) 开源。祝所有考研学子一战成硕，金榜题名！🎉
