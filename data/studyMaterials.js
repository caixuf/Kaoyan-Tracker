// 考研全科内置精选复习知识库与速查手册 (Study Materials Library)
const STUDY_MATERIALS = {
  math: [
    {
      id: "mat_taylor",
      title: "📐 常用麦克劳林/泰勒展开式速查 (高数必备)",
      category: "高等数学",
      tags: ["高数核心", "极限计算", "必背公式"],
      content: `### 8个常用函数的麦克劳林展开式 (x -> 0)

1. **e^x** = 1 + x + x²/2! + x³/3! + ... + xⁿ/n! + o(xⁿ)
2. **sin x** = x - x³/3! + x⁵/5! - ... + (-1)ⁿ⁻¹ x²ⁿ⁻¹/(2n-1)! + o(x²ⁿ⁻¹)
3. **cos x** = 1 - x²/2! + x⁴/4! - ... + (-1)ⁿ x²ⁿ/(2n)! + o(x²ⁿ)
4. **ln(1+x)** = x - x²/2 + x³/3 - x⁴/4 + ... + (-1)ⁿ⁻¹ xⁿ/n + o(xⁿ)
5. **(1+x)^α** = 1 + αx + α(α-1)/2! x² + ... + o(x²)
6. **tan x** = x + x³/3 + 2x⁵/15 + o(x⁵)
7. **arcsin x** = x + x³/6 + 3x⁵/40 + o(x⁵)
8. **arctan x** = x - x³/3 + x⁵/5 + o(x⁵)

> **💡 秒杀技巧**：求 `limit (x->0) [f(x) - g(x)] / xⁿ` 时，上下展开必须展开到分子出现首个非零系数的同次幂项为止！`
    },
    {
      id: "mat_infinitesimal",
      title: "📐 八大常用等价无穷小代换 (x -> 0)",
      category: "高等数学",
      tags: ["等价无穷小", "求极限", "基础工具"],
      content: `### 常见等价无穷小关系 (当 x -> 0 时)：

- `sin x ~ x`
- `tan x ~ x`
- `arcsin x ~ x`
- `arctan x ~ x`
- `ln(1+x) ~ x`
- `e^x - 1 ~ x`
- `1 - cos x ~ 1/2 x²`
- `tan x - sin x ~ 1/2 x³`
- `x - sin x ~ 1/6 x³`
- `tan x - x ~ 1/3 x³`
- `arcsin x - x ~ 1/6 x³`
- `x - arctan x ~ 1/3 x³`
- `(1+x)^α - 1 ~ αx`
- `a^x - 1 ~ x ln a`

> **⚠️ 易错提醒**：等价无穷小代换原则上**只能在乘除项中整体替换**！若在加减项中替换，必须满足两者相减后的首项不相互抵消，否则必须使用**泰勒展开式**！`
    },
    {
      id: "mat_linear_algebra",
      title: "🔢 线性代数：矩阵的秩与方程组解的结构定理",
      category: "线性代数",
      tags: ["线代定理", "线性方程组", "秩的性质"],
      content: `### 一、矩阵的秩核心不等式
1. `0 <= R(A) <= min(m, n)` (对于 m × n 矩阵 A)
2. `R(A + B) <= R(A) + R(B)`
3. `R(AB) <= min(R(A), R(B))`
4. **Sylvester 不等式**：若 A 为 m×n，B 为 n×s，则 `R(AB) >= R(A) + R(B) - n`
5. 若 `AB = 0`，则 `R(A) + R(B) <= n` (n为A的列数/B的行数)

### 二、线性方程组 Ax = b 解的判定定理
- **无解**：`R(A) < R(A|b)`
- **唯一解**：`R(A) = R(A|b) = n` (n 为未知数个数)
- **无穷多解**：`R(A) = R(A|b) = r < n`，基础解系包含 `n - r` 个线性无关的解向量。`
    },
    {
      id: "mat_prob_dist",
      title: "🎲 概率论与数理统计：六大常见分布特征速查",
      category: "概率统计",
      tags: ["概率分布", "期望方差", "公式速查"],
      content: `### 常见随机变量分布期望与方差对照表

| 分布类型 | 记号 | 期望 E(X) | 方差 D(X) |
| :--- | :--- | :--- | :--- |
| **0-1 分布** | B(1, p) | `p` | `p(1-p)` |
| **二项分布** | B(n, p) | `np` | `np(1-p)` |
| **泊松分布** | P(λ) | `λ` | `λ` |
| **均匀分布** | U(a, b) | `(a+b)/2` | `(b-a)²/12` |
| **指数分布** | E(λ) | `1/λ` | `1/λ²` |
| **正态分布** | N(μ, σ²) | `μ` | `σ²` |

> **🌟 协方差与独立性关键**：
> - 若 X, Y 相互独立，则 `Cov(X, Y) = 0`，`D(X ± Y) = D(X) + D(Y)`。
> - `Cov(X, Y) = E(XY) - E(X)E(Y)`
> - 相关系数 `ρ_XY = Cov(X, Y) / (√D(X) · √D(Y))`，若 `|ρ| = 1` 表示 X 与 Y 存在严格线性关系。`
    }
  ],
  cs408: [
    {
      id: "cs_sort_summary",
      title: "💻 数据结构：八大经典排序算法时空复杂度与稳定性全景表",
      category: "数据结构",
      tags: ["排序算法", "时间复杂度", "408必考"],
      content: `### 排序算法综合性能对比表

| 排序方法 | 平均时间复杂度 | 最好情况 | 最坏情况 | 空间复杂度 | 稳定性 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **直接插入排序** | O(n²) | O(n) | O(n²) | O(1) | **稳定** |
| **冒泡排序** | O(n²) | O(n) | O(n²) | O(1) | **稳定** |
| **简单选择排序** | O(n²) | O(n²) | O(n²) | O(1) | 不稳定 |
| **希尔排序** | O(n^1.3) | O(n) | O(n²) | O(1) | 不稳定 |
| **快速排序** | **O(n log n)** | O(n log n) | O(n²) | **O(log n)** | 不稳定 |
| **堆排序** | **O(n log n)** | O(n log n) | O(n log n) | **O(1)** | 不稳定 |
| **二路归并排序** | **O(n log n)** | O(n log n) | O(n log n) | **O(n)** | **稳定** |
| **基数排序** | O(d(n+r)) | O(d(n+r)) | O(d(n+r)) | O(r) | **稳定** |

> **🔥 408 核心记忆技巧**：
> - **稳定的排序**：“考研**插**（直接插入）**帽**（冒泡）**龟**（归并）**急**（基数）”
> - **不受初始状态影响的算法**：简单选择排序、堆排序、归并排序（时间复杂度始终是 O(n log n) 或 O(n²)）。`
    },
    {
      id: "cs_os_pv_models",
      title: "🚦 操作系统：经典PV同步互斥模型标准模板",
      category: "操作系统",
      tags: ["PV操作", "进程同步", "经典大题"],
      content: `### 1. 生产者-消费者问题标准解法

```c
semaphore mutex = 1;      // 互斥信号量，控制对缓冲区的互斥访问
semaphore empty = N;      // 资源信号量，表示空闲缓冲区的数量
semaphore full = 0;       // 资源信号量，表示已填充产品的缓冲区数量

void producer() {
    while(1) {
        produce_an_item();
        P(empty);         // 先申请空缓冲区
        P(mutex);         // 再加锁（注意顺序不能反！）
        put_item_to_buffer();
        V(mutex);         // 释放锁
        V(full);          // 释放满缓冲区信号
    }
}

void consumer() {
    while(1) {
        P(full);          // 先申请产品
        P(mutex);         // 再加锁
        take_item_from_buffer();
        V(mutex);         // 释放锁
        V(empty);         // 释放空缓冲区信号
        consume_the_item();
    }
}
```

> **⚠️ 黄金避坑法则**：多个 P 操作连续出现时，**必须先申请资源信号量，再申请互斥信号量**，否则极易发生**死锁**！而 V 操作的顺序通常可以互换。`
    },
    {
      id: "cs_tcp_handshake",
      title: "🌐 计算机网络：TCP 三次握手与四次挥手状态机图解",
      category: "计算机网络",
      tags: ["TCP", "三次握手", "四次挥手", "网络核心"],
      content: `### 一、TCP 三次握手过程 (建立连接)
1. **客户端 -> 服务端**：发送 `SYN=1, seq=x`，客户端进入 **SYN_SENT** 状态。
2. **服务端 -> 客户端**：发送 `SYN=1, ACK=1, seq=y, ack=x+1`，服务端进入 **SYN_RCVD** 状态。
3. **客户端 -> 服务端**：发送 `ACK=1, seq=x+1, ack=y+1`，双方进入 **ESTABLISHED** 状态。

### 二、TCP 四次挥手过程 (释放连接)
1. **客户端 -> 服务端**：发送 `FIN=1, seq=u`，客户端进入 **FIN_WAIT_1** 状态。
2. **服务端 -> 客户端**：发送 `ACK=1, seq=v, ack=u+1`，服务端进入 **CLOSE_WAIT** 状态，客户端收到后进入 **FIN_WAIT_2**。
3. **服务端 -> 客户端**：数据传输完毕，发送 `FIN=1, ACK=1, seq=w, ack=u+1`，服务端进入 **LAST_ACK**。
4. **客户端 -> 服务端**：发送 `ACK=1, seq=u+1, ack=w+1`，客户端进入 **TIME_WAIT** 状态，等待 **2MSL** 后彻底关闭。

> **❓ 为什么客户端要等待 2MSL 时间？**
> 1. 保证客户端发送的最后一个 ACK 报文能够到达服务端（防止服务端未收到重发 FIN）。
> 2. 防止已失效的连接请求报文段出现在本连接中（让旧报文在网络中自然消失）。`
    }
  ],
  english: [
    {
      id: "eng_roots_100",
      title: "🇬🇧 考研英语：高频前缀与词根速记宝典",
      category: "词汇突破",
      tags: ["高频词根", "前缀后缀", "词汇速记"],
      content: `### 常见核心前缀速查
- **ab- / abs-** : 离去，相反 (e.g., abnormal 反常的, abstract 抽象的)
- **ad- / ac- / ag-** : 朝向，加强 (e.g., accelerate 加速, adapt 适应)
- **ante- / pre-** : 在前，先前 (e.g., anticipate 预期, preliminary 初步的)
- **contra- / counter-** : 反对，相反 (e.g., contradict 矛盾, counterpart 对应物)
- **de-** : 向下，减少，否定 (e.g., decline 下降, deprive 剥夺)
- **dis- / dif-** : 分离，否定 (e.g., discriminate 歧视, differ 相异)
- **ex- / e-** : 向外，出 (e.g., exploit 开采/利用, exhale 呼气)
- **inter-** : 在...之间 (e.g., intervene 干预, interpret 解释/口译)
- **per-** : 贯穿，完全 (e.g., perspective 视角, permanent 永久的)
- **trans-** : 跨越，转移 (e.g., transmit 传输, transform 转变)

### 常见核心词根速查
- **spect / spic** = 看 (inspect 检查, conspicuous 显眼的)
- **tract** = 拉，引 (distract 分散注意力, attract 吸引)
- **dict / dic** = 说 (predict 预测, verdict 裁决)
- **ced / ceed / cess** = 行走，退让 (precede 先于, access 通道)
- **fer** = 带来，产生 (confer 协商/授予, infer 推断)`
    },
    {
      id: "eng_writing_templates",
      title: "✍️ 考研英语：大/小作文万能高分功能句库",
      category: "高分写作",
      tags: ["写作模板", "大作文", "高级句式"],
      content: `### 一、图画/图表大作文通用首段（描述图画/趋势）
1. **图画描摹**：`As is vividly portrayed in the cartoon, [描述主体] is doing [动作], while [对照主体] is [动作]. Simple as the drawing is, its profound meaning has sparked extensive discussions.`
2. **图表数据上升/下降**：`According to the data given in the chart, the proportion of [A] has witnessed a dramatic surge from [X%] in [年份] to [Y%] in [年份], whereas [B] shows a steady downward trend.`

### 二、第二段深层原因/意义阐释万能句
1. **原因引出**：`A host of driving forces contribute to this phenomenon, and the following few are worth particular contemplation.`
2. **第一点论证**：`To begin with, with the accelerated pace of social development, [主语] plays an indispensable role in shaping our daily lives.`
3. **第二点论证**：`Furthermore, it is universally acknowledged that [理论/事实], which inevitably leads to [结果].`

### 三、尾段建议与展望万能句
1. **呼吁措施**：`To foster a sound environment, it is of paramount significance for both the government and individuals to join hands and take constructive actions.`
2. **未来展望**：`Only by striking a delicate balance between [A] and [B] can we embrace a more promising and sustainable future.``
    }
  ],
  politics: [
    {
      id: "pol_marx_principles",
      title: "🇨🇳 马克思主义基本原理 (马原) 答题黄金大招",
      category: "思想政治",
      tags: ["马原大题", "唯物辩证法", "认识论模板"],
      content: `### 一、辩证法分析题万能原理组合
1. **矛盾的普遍性与特殊性辩证关系原理**：
   - 矛盾普遍性即共性，矛盾特殊性即个性。共性寓于个性之中，个性包含共性。
   - **方法论**：要求我们坚持具体问题具体分析，把马克思主义普遍原理同中国具体实际相结合。
2. **事物的普遍联系与发展规律**：
   - 联系具有客观性、普遍性与多样性。发展是前进上升的运动，实质是新事物的产生和旧事物的灭亡。
   - **方法论**：用普遍联系和全面的观点看问题，勇于创新，促进新事物成长。
3. **对立统一规律 (矛盾的同一性与斗争性)**：
   - 同一性是相对的，斗争性是绝对的。同一性以斗争性为前提，斗争性寓于同一性之中。
   - **方法论**：在对立中把握同一，在同一中把握对立，促进矛盾双方向有利于事物发展的方向转化。

### 二、认识论大题核心考点
- **实践是认识的基础**：实践是认识的来源、发展的动力、检验真理的唯一标准和认识的目的。
- **认识的两次飞跃**：从感性认识到理性认识（第一次飞跃），从理性认识到实践（更重要的一次飞跃）。`
    },
    {
      id: "pol_history_timeline",
      title: "📜 中国近现代史纲要：核心会议与历史转折全景表",
      category: "中国近现代史",
      tags: ["史纲时间线", "重要会议", "历史转折"],
      content: `### 考研必背核心党史会议与历史转折

| 会议 / 事件 | 时间 | 核心成果与历史地位 |
| :--- | :--- | :--- |
| **中共一大** | 1921年 | 中国共产党正式成立，中国革命的面貌焕然一新。 |
| **中共二大** | 1922年 | **首次提出反帝反封建的民主革命纲领**（最高纲领与最低纲领）。 |
| **中共三大** | 1923年 | 确立国共合作方针（党内合作），建立革命统一战线。 |
| **八七会议** | 1927年 | 清算右倾机会主义，确定土地革命和武装反抗国民党反动统治的总方针，毛泽东提出“**枪杆子里出政权**”。 |
| **遵义会议** | 1935年 | 纠正“左”倾军事和组织错误，事实上确立了毛泽东在党中央和红军的领导地位，**生死攸关的转折点**。 |
| **瓦窑堡会议** | 1935年 | 确立建立**抗日民族统一战线**的新策略。 |
| **中共七大** | 1945年 | **正式将毛泽东思想确立为全党的指导思想**并写入党章。 |
| **中共七届二中全会** | 1949年 | 工作重心由乡村转移到城市；提出“两个务必”（务必保持谦虚谨慎，务必保持艰苦奋斗）。 |
| **十一届三中全会** | 1978年 | 否定“以阶级斗争为纲”，把党和国家工作重心转移到**经济建设**上来，实行**改革开放**的历史性决策。 |`
    }
  ]
};
