// 考研四大科目大纲全景知识点 (自包含纯净版)

const DEFAULT_OUTLINE = {
  politics: {
    id: "politics",
    name: "思想政治理论",
    icon: "landmark",
    chapters: [
      {
        title: "马克思主义基本原理 (马原)",
        points: [
          { title: "物质与意识的辩证关系及唯物论原理", done: false, round: 1 },
          { title: "唯物辩证法三大规律：对立统一、质量互变、否定之否定", done: false, round: 1 },
          { title: "认识的本质及其发展规律与实践标准", done: false, round: 1 },
          { title: "唯物史观：社会存在与社会意识、生产力与生产关系", done: false, round: 1 },
          { title: "劳动价值论：商品二因素与劳动二重性", done: false, round: 1 },
          { title: "剩余价值论：资本积累、相对剩余价值与绝对剩余价值", done: false, round: 1 }
        ]
      },
      {
        title: "毛泽东思想和中国特色社会主义理论体系",
        points: [
          { title: "新民主主义革命的总路线与基本纲领", done: false, round: 1 },
          { title: "社会主义改造理论与三大改造完成", done: false, round: 1 },
          { title: "邓小平理论、“三个代表”重要思想与科学发展观", done: false, round: 1 }
        ]
      },
      {
        title: "习近平新时代中国特色社会主义思想",
        points: [
          { title: "新时代主要矛盾与“十个明确”、“十四个坚持”", done: false, round: 1 },
          { title: "新发展理念与构建新发展格局（高质量发展）", done: false, round: 1 },
          { title: "全过程人民民主与全面依法治国", done: false, round: 1 },
          { title: "人类命运共同体与中国特色大国外交", done: false, round: 1 }
        ]
      },
      {
        title: "中国近现代史纲要 (史纲)",
        points: [
          { title: "鸦片战争与半殖民地半封建社会性质", done: false, round: 1 },
          { title: "太平天国、洋务运动与戊戌维新的探索与失败", done: false, round: 1 },
          { title: "辛亥革命的历史意义与局限性", done: false, round: 1 },
          { title: "中国共产党成立、大革命与土地革命时期", done: false, round: 1 },
          { title: "遵义会议、长征与抗日战争全景", done: false, round: 1 },
          { title: "解放战争、新中国成立与社会主义建设道路的探索", done: false, round: 1 }
        ]
      },
      {
        title: "思想道德与法治 (思修)",
        points: [
          { title: "人生观、价值观与理想信念的树立", done: false, round: 1 },
          { title: "中国精神：以爱国主义为核心的民族精神与时代精神", done: false, round: 1 },
          { title: "社会主义核心价值观的科学内涵", done: false, round: 1 },
          { title: "我国宪法的基本原则与法治思维培养", done: false, round: 1 }
        ]
      }
    ]
  },
  english: {
    id: "english",
    name: "考研英语 (一 / 二)",
    icon: "book-open",
    chapters: [
      {
        title: "词汇与词根词缀 (Vocabulary)",
        points: [
          { title: "大纲核心高频 1500 词深度精记", done: false, round: 1 },
          { title: "前缀/后缀与核心词根派生记忆网络", done: false, round: 1 },
          { title: "常考一词多义与熟词僻义归纳", done: false, round: 1 }
        ]
      },
      {
        title: "长难句与语法解构 (Grammar)",
        points: [
          { title: "定语从句（限制性与非限制性）精准拆分", done: false, round: 1 },
          { title: "状语从句与条件/让步/让步虚拟语气", done: false, round: 1 },
          { title: "名词性从句（主宾表同位语）抓取核心主干", done: false, round: 1 },
          { title: "非谓语动词短语与独立主格结构", done: false, round: 1 },
          { title: "倒装句、强调句与分割结构的识别与还原", done: false, round: 1 }
        ]
      },
      {
        title: "阅读理解 A 节 (Reading Comprehension)",
        points: [
          { title: "主旨大意题与作者态度题定位解法", done: false, round: 1 },
          { title: "事实细节题与因果推断题定位精读", done: false, round: 1 },
          { title: "词义句意猜测题上下文语境推导", done: false, round: 1 },
          { title: "近15年真题精读精析与命题干扰项特征归纳", done: false, round: 1 }
        ]
      },
      {
        title: "应用文与图表/图画写作 (Writing)",
        points: [
          { title: "小作文（书信/告示/纪要）万能格式与核心句式", done: false, round: 1 },
          { title: "大作文三段式经典论述框架（现象描述+深度分析+解决倡议）", done: false, round: 1 },
          { title: "高级加分词汇与多样化句式替换训练", done: false, round: 1 }
        ]
      }
    ]
  },
  math: {
    id: "math",
    name: "考研数学 (一 / 二 / 三)",
    icon: "sigma",
    chapters: [
      {
        title: "高等数学 · 极限、连续与求导",
        points: [
          { title: "数列与函数极限求解：等价无穷小、泰勒公式、洛必达法则", done: false, round: 1 },
          { title: "无穷小比阶、连续性判别与间断点分类", done: false, round: 1 },
          { title: "导数定义、高阶导数计算与隐函数/参数方程求导", done: false, round: 1 }
        ]
      },
      {
        title: "高等数学 · 中值定理与积分学",
        points: [
          { title: "微分中值定理（罗尔/拉格朗日/柯西）辅助函数构造法", done: false, round: 1 },
          { title: "不定积分三大积分法（换元法、分部积分法、有理函数积分）", done: false, round: 1 },
          { title: "定积分概念、性质与变上限积分函数求导", done: false, round: 1 },
          { title: "反常积分敛散性判别与定积分几何应用（面积、体积、弧长）", done: false, round: 1 }
        ]
      },
      {
        title: "高等数学 · 多元函数微分与重积分",
        points: [
          { title: "多元函数极限、偏导数存在与可微性判定", done: false, round: 1 },
          { title: "多元复合函数求导与极值/条件极值（拉格朗日乘数法）", done: false, round: 1 },
          { title: "二重积分直角坐标与极坐标计算及对称性化简", done: false, round: 1 }
        ]
      },
      {
        title: "高等数学 · 微分方程与级数",
        points: [
          { title: "一阶可分离变量/齐次/线性微分方程求解", done: false, round: 1 },
          { title: "二阶常系数齐次与非齐次线性微分方程特解求解", done: false, round: 1 },
          { title: "常数项级数审敛法与幂级数收敛域/求和函数（数一数三）", done: false, round: 1 }
        ]
      },
      {
        title: "线性代数 (Linear Algebra)",
        points: [
          { title: "行列式性质与按行/列展开计算技巧", done: false, round: 1 },
          { title: "矩阵初等变换、逆矩阵与伴随矩阵公式", done: false, round: 1 },
          { title: "向量组线性相关/无关与矩阵的秩核心定理", done: false, round: 1 },
          { title: "线性方程组基础解系与通解结构定理", done: false, round: 1 },
          { title: "矩阵特征值、特征向量与相似对角化判定", done: false, round: 1 },
          { title: "二次型标准形转化与正定性充要条件", done: false, round: 1 }
        ]
      },
      {
        title: "概率论与数理统计 (数一 / 数三)",
        points: [
          { title: "古典概型、几何概型与全概率公式/贝叶斯公式", done: false, round: 1 },
          { title: "一维常见随机变量分布律/密度函数与分布函数", done: false, round: 1 },
          { title: "二维随机变量联合分布、边缘分布与独立性", done: false, round: 1 },
          { title: "数字特征：期望、方差、协方差与相关系数", done: false, round: 1 },
          { title: "大数定律、中心极限定理与参数点估计（矩估计与极大似然）", done: false, round: 1 }
        ]
      }
    ]
  },
  cs408: {
    id: "cs408",
    name: "计算机 408 / 专业课",
    icon: "cpu",
    chapters: [
      {
        title: "数据结构 (Data Structures)",
        points: [
          { title: "线性表：顺序表与链表（双链表、循环链表）操作算法", done: false, round: 1 },
          { title: "栈和队列：循环队列、表达式求值与括号匹配", done: false, round: 1 },
          { title: "二叉树性质、非递归遍历、线索二叉树与哈夫曼树", done: false, round: 1 },
          { title: "二叉排序树(BST)、平衡二叉树(AVL)与红黑树原理", done: false, round: 1 },
          { title: "图的存储（邻接矩阵/邻接表）与遍历（BFS/DFS）", done: false, round: 1 },
          { title: "图的应用：最小生成树(Prim/Kruskal)、最短路径(Dijkstra/Floyd)、拓扑排序", done: false, round: 1 },
          { title: "查找：二分查找、B/B+树与散列表冲突解决", done: false, round: 1 },
          { title: "内部排序算法时空复杂度与稳定性全面对比", done: false, round: 1 }
        ]
      },
      {
        title: "计算机组成原理 (Computer Architecture)",
        points: [
          { title: "数据的表示与运算：补码、IEEE 754 浮点数格式", done: false, round: 1 },
          { title: "主存储器与 CPU 连线、多模块交叉存储器", done: false, round: 1 },
          { title: "Cache 工作原理：直接映射/组相联映射与命中率计算", done: false, round: 1 },
          { title: "指令系统：寻址方式与 CISC/RISC 架构对比", done: false, round: 1 },
          { title: "CPU 控制器结构、指令流水线冒险与吞吐率计算", done: false, round: 1 },
          { title: "总线仲裁、I/O 中断处理流程与 DMA 方式", done: false, round: 1 }
        ]
      },
      {
        title: "操作系统 (Operating Systems)",
        points: [
          { title: "进程与线程状态转换与上下文切换", done: false, round: 1 },
          { title: "经典同步互斥 PV 操作题型模板与死锁预防/避免(银行家算法)", done: false, round: 1 },
          { title: "处理器调度算法：FCFS、SJF、优先级与时间片轮转", done: false, round: 1 },
          { title: "分页与分段存储管理、虚拟内存请求分页页面置换算法(LRU/FIFO/CLOCK)", done: false, round: 1 },
          { title: "文件逻辑/物理结构、目录结构与空闲块管理", done: false, round: 1 },
          { title: "磁盘调度算法(SSTF/SCAN/CSCAN)与 RAID 技术", done: false, round: 1 }
        ]
      },
      {
        title: "计算机网络 (Computer Networks)",
        points: [
          { title: "OSI 七层模型与 TCP/IP 体系结构对照", done: false, round: 1 },
          { title: "物理层通信基础、奈氏准则与香农公式计算", done: false, round: 1 },
          { title: "数据链路层滑动窗口协议、CSMA/CD、以太网帧与交换机原理", done: false, round: 1 },
          { title: "网络层 IPv4 编址、CIDR子网划分、ARP/ICMP 协议与路由算法(RIP/OSPF/BGP)", done: false, round: 1 },
          { title: "传输层 UDP 与 TCP 可靠传输、三次握手/四次挥手、拥塞控制算法", done: false, round: 1 },
          { title: "应用层 DNS 解析流程、HTTP 报文结构与长连接/状态码", done: false, round: 1 }
        ]
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_OUTLINE };
}
