// 考研全科技能树系统 (Kaoyan Skill Tree Data)
const SKILLS_DATA = {
  math: {
    id: "math",
    name: "考研数学技能树",
    icon: "📐",
    badge: "数学",
    desc: "攻克微积分、线性代数与概率论，筑牢考研理科基石",
    skills: [
      {
        id: "math_limit",
        name: "极限猎手 (Limit Hunter)",
        category: "高等数学",
        icon: "🎯",
        desc: "精通八大等价无穷小、泰勒展开式与洛必达法则，秒杀各类不定式极限",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《泰勒公式极速展开秘籍》", "获得【极限大师】徽章"]
      },
      {
        id: "math_integral",
        name: "积分大师 (Integral Master)",
        category: "高等数学",
        icon: "🌊",
        desc: "熟练掌握第一类/第二类换元法、分部积分法与有理函数积分技巧",
        maxLevel: 5,
        expPerLevel: 120,
        rewards: ["解锁《常见不定积分速查表》", "获得【积分达人】徽章"]
      },
      {
        id: "math_diff_prove",
        name: "中值定理证明家 (Proof Artisan)",
        category: "高等数学",
        icon: "⚖️",
        desc: "精通罗尔、拉格朗日、柯西与泰勒中值定理的辅助函数构造",
        maxLevel: 5,
        expPerLevel: 150,
        rewards: ["解锁《中值定理构造辅助函数八大套路》", "获得【逻辑严密】徽章"]
      },
      {
        id: "math_matrix",
        name: "矩阵征服者 (Matrix Conqueror)",
        category: "线性代数",
        icon: "🔢",
        desc: "精通初等行变换、矩阵的秩、特征值与特征向量、实对称矩阵正交对角化",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《线代八大定理思维导图》", "获得【矩阵主宰】徽章"]
      },
      {
        id: "math_prob",
        name: "概率先知 (Probability Prophet)",
        category: "概率统计",
        icon: "🎲",
        desc: "洞悉全概率与贝叶斯公式、二维连续型随机变量联合分布与最大似然估计",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《常见概率分布数字特征表》", "获得【概率先知】徽章"]
      }
    ]
  },
  cs408: {
    id: "cs408",
    name: "计算机408技能树",
    icon: "💻",
    badge: "408",
    desc: "数据结构、组成原理、操作系统与网络，全方位点亮计算机底层硬核能力",
    skills: [
      {
        id: "cs_ds_algo",
        name: "算法与指针行者 (Algorithm & DS)",
        category: "数据结构",
        icon: "🌲",
        desc: "精通链表、二叉树遍历、并查集、Dijkstra最短路径与八大排序算法时空复杂度",
        maxLevel: 5,
        expPerLevel: 120,
        rewards: ["解锁《八大经典排序时空复杂度与稳定性速查表》", "获得【算法极客】徽章"]
      },
      {
        id: "cs_arch_pipeline",
        name: "指令流水线工程师 (Pipeline Architect)",
        category: "组成原理",
        icon: "⚙️",
        desc: "吃透定点浮点运算 (IEEE 754)、Cache组相联映射与CPU五段指令流水线冲突",
        maxLevel: 5,
        expPerLevel: 120,
        rewards: ["解锁《IEEE 754与Cache命中率速算法》", "获得【硬件极客】徽章"]
      },
      {
        id: "cs_os_pv",
        name: "并发与PV调度师 (Concurrent Master)",
        category: "操作系统",
        icon: "🚦",
        desc: "熟练手写生产者消费者、读者写者、哲学家就餐等信号量PV同步互斥模型",
        maxLevel: 5,
        expPerLevel: 150,
        rewards: ["解锁《操作系统经典PV模型手写模板》", "获得【并发调度大师】徽章"]
      },
      {
        id: "cs_net_tcp",
        name: "网络协议全栈通 (Protocol Stack Pro)",
        category: "计算机网络",
        icon: "🌐",
        desc: "精通IP子网划分CIDR、TCP三次握手四次挥手、滑动窗口流量控制与拥塞控制",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《TCP状态机与报文格式图解》", "获得【网络架构师】徽章"]
      }
    ]
  },
  english: {
    id: "english",
    name: "考研英语技能树",
    icon: "🇬🇧",
    badge: "英语",
    desc: "词汇突破、长难句拆解、真题逻辑破解与高分写作模板",
    skills: [
      {
        id: "eng_roots",
        name: "词根词缀解码者 (Lexicon Decoder)",
        category: "词汇突破",
        icon: "📖",
        desc: "掌握核心100大词根词缀，实现5500考研高频词汇与熟词僻义极速串联",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《考研英语核心词根词缀100条》", "获得【词汇大亨】徽章"]
      },
      {
        id: "eng_grammar",
        name: "长难句解构师 (Sentence Architect)",
        category: "语法突破",
        icon: "🔍",
        desc: "精准定位句子主干，快速理清定语从句、非谓语、倒装与插入语逻辑",
        maxLevel: 5,
        expPerLevel: 120,
        rewards: ["解锁《长难句三步拆解法则》", "获得【长难句克星】徽章"]
      },
      {
        id: "eng_reading",
        name: "真题逻辑破壁人 (Reading Crusher)",
        category: "真题阅读",
        icon: "💡",
        desc: "洞悉事实细节、主旨大意、推理判断与态度题的干扰项设置规律与同义替换",
        maxLevel: 5,
        expPerLevel: 150,
        rewards: ["解锁《阅读真题命题人逻辑复盘手册》", "获得【阅读满分王】徽章"]
      },
      {
        id: "eng_writing",
        name: "高分写作操盘手 (Writing Maestro)",
        category: "作文高分",
        icon: "✍️",
        desc: "熟练运用三段式黄金论证框架、高级连接词与个性化图画/图表大作文模板",
        maxLevel: 5,
        expPerLevel: 120,
        rewards: ["解锁《考研大小作文万能高分功能句库》", "获得【妙笔生花】徽章"]
      }
    ]
  },
  politics: {
    id: "politics",
    name: "思想政治技能树",
    icon: "🇨🇳",
    badge: "政治",
    desc: "马原辩证法、史纲时间线、毛中特与新时代思想全盘掌握",
    skills: [
      {
        id: "pol_marx",
        name: "唯物辩证通 (Dialectical Thinker)",
        category: "马原",
        icon: "🧠",
        desc: "透彻理解对立统一规律、实践与认识辩证关系以及剩余价值生产过程",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《马原核心哲学原理与答题套路》", "获得【辩证先锋】徽章"]
      },
      {
        id: "pol_history",
        name: "史纲脉络穿透者 (Chronology Master)",
        category: "史纲",
        icon: "📜",
        desc: "烂熟近代中国救亡图存路线图、党的一大至二十大关键历史会议与里程碑",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《中国近现代史重大事件与会议全览表》", "获得【历史百科】徽章"]
      },
      {
        id: "pol_xi",
        name: "新时代思想学者 (New Era Scholar)",
        category: "毛中特与新思想",
        icon: "🇨🇳",
        desc: "系统掌握高质量发展、新质生产力、中国式现代化与十个明确十四个坚持",
        maxLevel: 5,
        expPerLevel: 100,
        rewards: ["解锁《新质生产力与中国式现代化核心答题句》", "获得【领航者】徽章"]
      }
    ]
  }
};
