// 考研能力技能树定义 (纯净无 Emoji 版)

const SKILLS_DATA = {
  math: {
    id: "math",
    name: "考研数学核心能力",
    badge: "数学逻辑",
    icon: "sigma",
    skills: [
      {
        id: "math_limit",
        name: "极限与无穷小极速化简",
        category: "高等数学",
        icon: "zap",
        desc: "精通泰勒展开 8 大基本公式、八大等价无穷小代换与洛必达法则的综合计算。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁复杂极限秒杀技巧", "计算失误率降低 50%"]
      },
      {
        id: "math_integral",
        name: "一元与多元积分综合运算",
        category: "高等数学",
        icon: "layers",
        desc: "熟练掌握不定积分分部积分、定积分奇偶性化简、二重积分极坐标转换与对称性应用。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["熟练处理变上限积分导数", "二重积分计算速度翻倍"]
      },
      {
        id: "math_diff_prove",
        name: "中值定理与不等式证明",
        category: "高等数学",
        icon: "shield",
        desc: "精通罗尔、拉格朗日、柯西中值定理辅助函数构造，熟练应用单调性与凸凹性证明不等式。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["中值定理大题拿满分", "辅助函数构造秒反应"]
      },
      {
        id: "math_matrix",
        name: "线性方程组与矩阵特征分析",
        category: "线性代数",
        icon: "grid",
        desc: "掌握矩阵初等行变换、向量组线性相关/无关判据、方程组通解结构与相似对角化判定。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["线代计算零失误", "二次型规范化速解"]
      },
      {
        id: "math_prob",
        name: "随机变量分布与参数估计",
        category: "概率论",
        icon: "percent",
        desc: "熟记八大常见分布性质、二维联合概率密度积分求边缘与极大似然估计方程求解。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["极大似然估计全拿满分", "二维分布转换熟练掌握"]
      }
    ]
  },
  cs408: {
    id: "cs408",
    name: "计算机 408 核心架构能力",
    badge: "计算机专业课",
    icon: "cpu",
    skills: [
      {
        id: "cs_ds_algo",
        name: "算法设计与复杂度分析",
        category: "数据结构",
        icon: "code",
        desc: "精通链表、二叉树、图算法(Dijkstra/Floyd)以及内部排序算法的时空复杂度手推与 C 语言编写。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["408 算法大题满分代码", "递归时间复杂度精准推导"]
      },
      {
        id: "cs_arch_pipeline",
        name: "CPU 指令流水线与存储层次结构",
        category: "计算机组成原理",
        icon: "server",
        desc: "掌握 IEEE 754 浮点数运算、Cache 直接/组相联映射地址划分与流水线冲突停顿计算。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["Cache 命中率极速计算", "流水线 CPI 评估零失误"]
      },
      {
        id: "cs_os_pv",
        name: "操作系统进程同步与 PV 原语设计",
        category: "操作系统",
        icon: "sliders",
        desc: "熟练书写生产者消费者、读者写者、理发师与哲学家就餐等高难度 PV 同步模型标准代码。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["PV 大题无死锁设计", "虚拟内存页面置换熟练分析"]
      },
      {
        id: "cs_net_tcp",
        name: "网络协议状态机与拥塞控制",
        category: "计算机网络",
        icon: "wifi",
        desc: "深刻掌握 TCP 三次握手/四次挥手全状态迁移、序号确认号计算与慢开始/拥塞避免窗口推导。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["CIDR 子网秒级划分", "TCP 状态报文精准抓取"]
      }
    ]
  },
  english: {
    id: "english",
    name: "考研英语语料与逻辑解构",
    badge: "英语读写",
    icon: "book-open",
    skills: [
      {
        id: "eng_roots",
        name: "5500 核心词根词缀网络",
        category: "英语词汇",
        icon: "bookmark",
        desc: "通过前缀与词根系统掌握大纲高频派生词，彻底攻克熟词僻义与语境干扰项。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["词汇认知量突破 5500", "生词推导正确率 90%"]
      },
      {
        id: "eng_grammar",
        name: "复杂长难句语法主干速解",
        category: "语法结构",
        icon: "edit-3",
        desc: "精准定位同位语从句、分割结构、倒装句与非谓语动词短语，实现长难句秒读。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["阅读长难句零阅读障碍", "英译汉翻译通顺达意"]
      },
      {
        id: "eng_reading",
        name: "真题阅读精准定位与逻辑反套路",
        category: "阅读理解",
        icon: "eye",
        desc: "识别事实细节题、态度题、因果推断题的命题套路与偷换概念/无中生有等干扰项陷阱。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["阅读单篇错误控制在 1 题以内", "定位精度极大提升"]
      },
      {
        id: "eng_writing",
        name: "高分论说文语料库与行文框架",
        category: "英语写作",
        icon: "feather",
        desc: "熟练应用现象描述、多维度因果分析、反面论证与未来倡议等万能论证结构。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["大作文书写流利一气呵成", "高级语法句型自然运用"]
      }
    ]
  },
  politics: {
    id: "politics",
    name: "思想政治框架与论述体系",
    badge: "政治大招",
    icon: "landmark",
    skills: [
      {
        id: "pol_marx",
        name: "马原唯物辩证与政经分析框架",
        category: "马克思主义原理",
        icon: "compass",
        desc: "建立辩证法三大规律、实践与认识论、商品二因素与剩余价值论的严密逻辑框架。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["马原主观大题原理精准锁定", "多选题干扰项秒排除"]
      },
      {
        id: "pol_history",
        name: "近现代史纲要全景历史脉络",
        category: "近代史纲要",
        icon: "clock",
        desc: "牢记党史各次重大会议、统一战线演进、抗日战争与社会主义现代化建设时间线。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["史纲重要会议全盘熟记", "历史背景考点零混淆"]
      },
      {
        id: "pol_xi",
        name: "新时代中国特色社会主义理论体系",
        category: "毛中特与习思想",
        icon: "award",
        desc: "熟记新发展理念、高质量发展、全面依法治国与中国式现代化的核心表述与金句。",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["时政结合点准确切入", "分析题答案规范得分率高"]
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SKILLS_DATA };
}
