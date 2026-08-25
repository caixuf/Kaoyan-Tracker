// 考研全科考点预设大纲数据
const DEFAULT_OUTLINE = {
  politics: {
    id: "politics",
    name: "思想政治理论",
    icon: "🇨🇳",
    badge: "政治",
    chapters: [
      {
        id: "pol-1",
        title: "马克思主义基本原理 (马原)",
        points: [
          { id: "pol-1-1", title: "唯物论：物质与意识的辩证关系、意识的主观能动性", done: false, round: 1 },
          { id: "pol-1-2", title: "辩证法：两大特征（联系与发展）、三大规律、五对范畴", done: false, round: 1 },
          { id: "pol-1-3", title: "认识论：实践与认识的辩证关系、真理与价值、认识过程的两次飞跃", done: false, round: 1 },
          { id: "pol-1-4", title: "唯物史观：社会存在与社会意识、生产力与生产关系、经济基础与上层建筑", done: false, round: 1 },
          { id: "pol-1-5", title: "政经：商品二因素与劳动二重性、剩余价值理论、资本积累与再生产", done: false, round: 1 },
          { id: "pol-1-6", title: "科学社会主义：社会主义发展历程与共产主义崇高理想", done: false, round: 1 }
        ]
      },
      {
        id: "pol-2",
        title: "毛泽东思想和中国特色社会主义理论体系概论",
        points: [
          { id: "pol-2-1", title: "新民主主义革命理论（总路线、基本纲领、三大法宝）", done: false, round: 1 },
          { id: "pol-2-2", title: "社会主义改造理论（过渡时期总路线、社会主义制度确立）", done: false, round: 1 },
          { id: "pol-2-3", title: "社会主义建设道路初步探索的理论成果", done: false, round: 1 },
          { id: "pol-2-4", title: "邓小平理论、“三个代表”重要思想、科学发展观", done: false, round: 1 }
        ]
      },
      {
        id: "pol-3",
        title: "习近平新时代中国特色社会主义思想",
        points: [
          { id: "pol-3-1", title: "新时代主要矛盾与历史方位、“十个明确”与“十四个坚持”", done: false, round: 1 },
          { id: "pol-3-2", title: "高质量发展与新质生产力、新发展格局构建", done: false, round: 1 },
          { id: "pol-3-3", title: "中国式现代化的本质特征与重大原则", done: false, round: 1 },
          { id: "pol-3-4", title: "全面深化改革开放、全过程人民民主与全面依法治国", done: false, round: 1 },
          { id: "pol-3-5", title: "中国特色大国外交与人类命运共同体", done: false, round: 1 }
        ]
      },
      {
        id: "pol-4",
        title: "中国近现代史纲要 (史纲)",
        points: [
          { id: "pol-4-1", title: "近代中国的社会性质、主要矛盾与两大历史任务", done: false, round: 1 },
          { id: "pol-4-2", title: "辛亥革命与封建帝制的终结、资产阶级建国方案的破产", done: false, round: 1 },
          { id: "pol-4-3", title: "五四运动与中国共产党的诞生及其伟大历史意义", done: false, round: 1 },
          { id: "pol-4-4", title: "土地革命战争与农村包围城市道路的开辟", done: false, round: 1 },
          { id: "pol-4-5", title: "抗日战争与全民族抗战的中流砥柱作用", done: false, round: 1 },
          { id: "pol-4-6", title: "解放战争与中华人民共和国的创建", done: false, round: 1 },
          { id: "pol-4-7", title: "改革开放与社会主义现代化建设新时期", done: false, round: 1 }
        ]
      },
      {
        id: "pol-5",
        title: "思想道德与法治 & 当代世界经济与形势",
        points: [
          { id: "pol-5-1", title: "人生的青春之问：人生观、价值观与人生价值的实现", done: false, round: 1 },
          { id: "pol-5-2", title: "坚定理想信念与弘扬中国精神（以爱国主义为核心）", done: false, round: 1 },
          { id: "pol-5-3", title: "践行社会主义核心价值观与遵守社会公德、职业道德", done: false, round: 1 },
          { id: "pol-5-4", title: "尊法学法守法用法：宪法权威与社会主义法律体系", done: false, round: 1 },
          { id: "pol-5-5", title: "当代国际形势、大国关系与全球治理体系变革", done: false, round: 1 }
        ]
      }
    ]
  },
  english: {
    id: "english",
    name: "考研英语 (一/二)",
    icon: "🇬🇧",
    badge: "英语",
    chapters: [
      {
        id: "eng-1",
        title: "核心词汇与词根词缀 (5500词)",
        points: [
          { id: "eng-1-1", title: "高频核心词汇第一轮地毯式背诵（按词根词缀分类）", done: false, round: 1 },
          { id: "eng-1-2", title: "熟词僻义与近义词辨析深度过关", done: false, round: 1 },
          { id: "eng-1-3", title: "真题核心超纲词与高频短语搭配整理", done: false, round: 1 }
        ]
      },
      {
        id: "eng-2",
        title: "长难句语法剖析与结构拆解",
        points: [
          { id: "eng-2-1", title: "三大从句系统（名词性从句、定语从句、状语从句）快速识别", done: false, round: 1 },
          { id: "eng-2-2", title: "特殊结构攻克（非谓语动词、倒装句、强调句、虚拟语气、插入语）", done: false, round: 1 },
          { id: "eng-2-3", title: "真题长难句每日一句精析与手译练习", done: false, round: 1 }
        ]
      },
      {
        id: "eng-3",
        title: "历年真题阅读精读与题型突破 (Reading)",
        points: [
          { id: "eng-3-1", title: "主旨大意题解题技巧与干扰项特征", done: false, round: 1 },
          { id: "eng-3-2", title: "事实细节题精准定位与同义替换识别", done: false, round: 1 },
          { id: "eng-3-3", title: "词汇指代题与句子理解题解题法", done: false, round: 1 },
          { id: "eng-3-4", title: "推理判断题与作者态度题情感倾向分析", done: false, round: 1 },
          { id: "eng-3-5", title: "近10年真题阅读第一遍精读剖析与全文翻译", done: false, round: 1 },
          { id: "eng-3-6", title: "真题二刷：错因统计与命题人逻辑复盘", done: false, round: 1 }
        ]
      },
      {
        id: "eng-4",
        title: "新题型、完形填空与英译汉 (Translation)",
        points: [
          { id: "eng-4-1", title: "新题型（七选五/排序题/小标题匹配）逻辑衔接线索", done: false, round: 1 },
          { id: "eng-4-2", title: "英译汉句子切分、语序调整与润色表达", done: false, round: 1 },
          { id: "eng-4-3", title: "完形填空高频逻辑连词与上下文对应", done: false, round: 1 }
        ]
      },
      {
        id: "eng-5",
        title: "应用文小作文 & 图画/图表大作文 (Writing)",
        points: [
          { id: "eng-5-1", title: "应用文（书信、通知、告示）格式与经典语料储备", done: false, round: 1 },
          { id: "eng-5-2", title: "图画/图表大作文三段式经典论证框架搭建", done: false, round: 1 },
          { id: "eng-5-3", title: "个性化专属写作模板提炼与真题实战演练", done: false, round: 1 }
        ]
      }
    ]
  },
  math: {
    id: "math",
    name: "考研数学 (一/二/三)",
    icon: "📐",
    badge: "数学",
    chapters: [
      {
        id: "math-1",
        title: "高等数学：函数、极限与连续",
        points: [
          { id: "math-1-1", title: "极限的定义、性质与计算（等价无穷小、洛必达、泰勒公式）", done: false, round: 1 },
          { id: "math-1-2", title: "数列极限的求法（夹逼准则、单调有界准则、定积分定义）", done: false, round: 1 },
          { id: "math-1-3", title: "连续性、间断点分类与闭区间连续函数的性质", done: false, round: 1 }
        ]
      },
      {
        id: "math-2",
        title: "高等数学：一元函数微分学",
        points: [
          { id: "math-2-1", title: "导数与微分定义、可导与连续可微的关系", done: false, round: 1 },
          { id: "math-2-2", title: "复合函数、隐函数、参数方程求导法及高阶导数", done: false, round: 1 },
          { id: "math-2-3", title: "中值定理综合证明（罗尔、拉格朗日、柯西、泰勒定理）", done: false, round: 1 },
          { id: "math-2-4", title: "导数应用（极值与最值、单调性、凹凸性与拐点、渐近线）", done: false, round: 1 }
        ]
      },
      {
        id: "math-3",
        title: "高等数学：一元函数积分学",
        points: [
          { id: "math-3-1", title: "不定积分计算（换元法、分部积分法、有理函数积分）", done: false, round: 1 },
          { id: "math-3-2", title: "定积分性质与变上限积分函数求导与极限", done: false, round: 1 },
          { id: "math-3-3", title: "反常积分敛散性判别与计算", done: false, round: 1 },
          { id: "math-3-4", title: "定积分几何与物理应用（面积、体积、弧长、功与质心）", done: false, round: 1 }
        ]
      },
      {
        id: "math-4",
        title: "高等数学：多元微分与多重积分/微分方程/级数",
        points: [
          { id: "math-4-1", title: "多元函数偏导数、全微分及极值（条件极值拉格朗日乘数法）", done: false, round: 1 },
          { id: "math-4-2", title: "二重积分计算（直角坐标、极坐标、对称性与交换积分次序）", done: false, round: 1 },
          { id: "math-4-3", title: "常微分方程（一阶可分离/齐次/一阶线性、二阶常系数齐次与非齐次）", done: false, round: 1 },
          { id: "math-4-4", title: "无穷级数（数项级数敛散性判别、幂级数收敛域与和函数求法）", done: false, round: 1 }
        ]
      },
      {
        id: "math-5",
        title: "线性代数",
        points: [
          { id: "math-5-1", title: "行列式的计算与性质、代数余子式求和", done: false, round: 1 },
          { id: "math-5-2", title: "矩阵的运算、逆矩阵、伴随矩阵、初等变换与矩阵的秩", done: false, round: 1 },
          { id: "math-5-3", title: "向量组的线性相关性、极大线性无关组与向量空间", done: false, round: 1 },
          { id: "math-5-4", title: "线性方程组解的结构与判定（齐次与非齐次通解）", done: false, round: 1 },
          { id: "math-5-5", title: "特征值与特征向量、相似对角化与实对称矩阵正交相似对角化", done: false, round: 1 },
          { id: "math-5-6", title: "二次型及其标准形、正定二次型与正定矩阵判定", done: false, round: 1 }
        ]
      },
      {
        id: "math-6",
        title: "概率论与数理统计",
        points: [
          { id: "math-6-1", title: "随机事件与概率、条件概率、全概率公式与贝叶斯公式", done: false, round: 1 },
          { id: "math-6-2", title: "一维随机变量及其概率分布（离散型、连续型及常见分布）", done: false, round: 1 },
          { id: "math-6-3", title: "二维随机变量联合分布、边缘分布与条件分布、独立性", done: false, round: 1 },
          { id: "math-6-4", title: "随机变量的数字特征（期望、方差、协方差、相关系数）", done: false, round: 1 },
          { id: "math-6-5", title: "大数定律与中心极限定理", done: false, round: 1 },
          { id: "math-6-6", title: "数理统计基础与参数估计（矩估计法与最大似然估计法）", done: false, round: 1 }
        ]
      }
    ]
  },
  cs408: {
    id: "cs408",
    name: "计算机专业课 (408)",
    icon: "💻",
    badge: "408",
    chapters: [
      {
        id: "cs-1",
        title: "数据结构 (Data Structures)",
        points: [
          { id: "cs-1-1", title: "线性表：顺序表与链表操作、双向循环链表、双指针技巧", done: false, round: 1 },
          { id: "cs-1-2", title: "栈、队列与数组：括号匹配、表达式求值、循环队列", done: false, round: 1 },
          { id: "cs-1-3", title: "树与二叉树：二叉树遍历、线索二叉树、哈夫曼树、并查集", done: false, round: 1 },
          { id: "cs-1-4", title: "二叉排序树、平衡二叉树 (AVL)、红黑树核心思想", done: false, round: 1 },
          { id: "cs-1-5", title: "图：邻接矩阵/邻接表、BFS/DFS、最小生成树 (Prim/Kruskal)、最短路径 (Dijkstra/Floyd)、拓扑排序与关键路径", done: false, round: 1 },
          { id: "cs-1-6", title: "查找：顺序/二分/分块查找、B树与B+树、散列表与冲突处理", done: false, round: 1 },
          { id: "cs-1-7", title: "排序：插入/冒泡/选择/快排/堆排/归并/基数排序复杂度与稳定性分析", done: false, round: 1 }
        ]
      },
      {
        id: "cs-2",
        title: "计算机组成原理 (Computer Architecture)",
        points: [
          { id: "cs-2-1", title: "数据的表示与运算：原码/补码/移码、定点与浮点数 (IEEE 754)、溢出判断", done: false, round: 1 },
          { id: "cs-2-2", title: "存储系统：SRAM/DRAM、主存与CPU连接、Cache映射方式与替换算法", done: false, round: 1 },
          { id: "cs-2-3", title: "虚拟存储器：段式/页式/段页式与TLB快表协同工作流程", done: false, round: 1 },
          { id: "cs-2-4", title: "指令系统：寻址方式、CISC与RISC、指令格式设计", done: false, round: 1 },
          { id: "cs-2-5", title: "中央处理器：CPU数据通路、硬布线与微程序控制器、指令流水线与冲突", done: false, round: 1 },
          { id: "cs-2-6", title: "总线与I/O系统：中断处理过程、DMA方式与中断方式对比", done: false, round: 1 }
        ]
      },
      {
        id: "cs-3",
        title: "操作系统 (Operating Systems)",
        points: [
          { id: "cs-3-1", title: "进程管理：进程状态转换、PCB、线程概念与用户级/内核级线程", done: false, round: 1 },
          { id: "cs-3-2", title: "CPU调度算法（FCFS/SJF/RR/优先级/多级反馈队列）", done: false, round: 1 },
          { id: "cs-3-3", title: "进程同步与互斥：信号量机制 (PV操作) 解决经典同步问题", done: false, round: 1 },
          { id: "cs-3-4", title: "死锁：死锁预防、避免（银行家算法）、检测与解除", done: false, round: 1 },
          { id: "cs-3-5", title: "内存管理：连续分配、基本分页与分段、请求分页虚存置换算法 (FIFO/LRU/CLOCK)", done: false, round: 1 },
          { id: "cs-3-6", title: "文件管理：文件逻辑/物理结构、目录结构、空闲空间管理与文件共享", done: false, round: 1 },
          { id: "cs-3-7", title: "I/O设备管理：I/O软件层次、SPOOLing技术、磁盘调度算法 (SSTF/SCAN/CSCAN)", done: false, round: 1 }
        ]
      },
      {
        id: "cs-4",
        title: "计算机网络 (Computer Networks)",
        points: [
          { id: "cs-4-1", title: "网络体系结构：OSI七层与TCP/IP四层模型、时延与带宽计算", done: false, round: 1 },
          { id: "cs-4-2", title: "物理层：奈奎斯特定理与香农公式、编码与调制、电路/报文/分组交换", done: false, round: 1 },
          { id: "cs-4-3", title: "数据链路层：差错控制 (CRC)、滑动窗口、CSMA/CD、以太网与交换机", done: false, round: 1 },
          { id: "cs-4-4", title: "网络层：IPv4/IPv6、子网划分与CIDR、NAT、ARP、ICMP、路由协议 (RIP/OSPF/BGP)", done: false, round: 1 },
          { id: "cs-4-5", title: "传输层：UDP与TCP协议、TCP三次握手与四次挥手、可靠传输、流量控制与拥塞控制", done: false, round: 1 },
          { id: "cs-4-6", title: "应用层：DNS域名解析、FTP、电子邮件 (SMTP/POP3)、HTTP/HTTPS 协议与工作流程", done: false, round: 1 }
        ]
      }
    ]
  }
};
