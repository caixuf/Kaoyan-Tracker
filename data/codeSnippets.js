// 计算机 408 核心经典算法与系统源码库 (自包含无需外链)

const CS408_CODE_SNIPPETS = [
  {
    id: "algo_linked_list_reverse",
    category: "数据结构 · 线性表",
    title: "单链表就地逆置 (C/C++ 经典实现)",
    desc: "408 数据结构高频大题基础，采用头插法或三指针迭代法实现 O(n) 时间与 O(1) 空间就地逆置。",
    language: "cpp",
    code: `// 单链表节点定义
typedef struct LNode {
    int data;
    struct LNode *next;
} LNode, *LinkList;

// 方法一：三指针双向迭代推进法
LinkList ReverseList(LinkList head) {
    if (head == NULL || head->next == NULL) return head;
    LNode *prev = NULL;
    LNode *curr = head->next; // 假设带头结点
    LNode *next = NULL;
    
    while (curr != NULL) {
        next = curr->next; // 暂存后继节点
        curr->next = prev; // 改变指向
        prev = curr;       // prev 前移
        curr = next;       // curr 前移
    }
    head->next = prev;     // 头结点指向新的首元节点
    return head;
}`
  },
  {
    id: "algo_quick_sort",
    category: "数据结构 · 排序",
    title: "快速排序与三数取中优化 (C/C++)",
    desc: "408 必考排序算法，平均时间复杂度 O(n log n)，最坏情况优化措施。",
    language: "cpp",
    code: `// 划分操作 (Partition)
int Partition(int arr[], int low, int high) {
    int pivot = arr[low]; // 选取基准
    while (low < high) {
        while (low < high && arr[high] >= pivot) --high;
        arr[low] = arr[high]; // 比基准小的移到低端
        while (low < high && arr[low] <= pivot) ++low;
        arr[high] = arr[low]; // 比基准大的移到高端
    }
    arr[low] = pivot; // 基准存放到最终位置
    return low;
}

// 快速排序递归主函数
void QuickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivotpos = Partition(arr, low, high);
        QuickSort(arr, low, pivotpos - 1);  // 递归左半区间
        QuickSort(arr, pivotpos + 1, high); // 递归右半区间
    }
}`
  },
  {
    id: "algo_binary_tree_traversal",
    category: "数据结构 · 树与二叉树",
    title: "二叉树非递归中序遍历 (显式栈实现)",
    desc: "408 核心常考算法，利用辅助栈模拟系统调用栈，彻底消除递归调用。",
    language: "cpp",
    code: `typedef struct BiTNode {
    int data;
    struct BiTNode *lchild, *rchild;
} BiTNode, *BiTree;

void InOrderNonRecursive(BiTree root) {
    BiTNode *stack[100];
    int top = -1;
    BiTNode *p = root;

    while (p != NULL || top != -1) {
        if (p != NULL) {
            stack[++top] = p; // 一路向左入栈
            p = p->lchild;
        } else {
            p = stack[top--]; // 出栈访问根节点
            printf("%d ", p->data);
            p = p->rchild;    // 转向右子树
        }
    }
}`
  },
  {
    id: "os_pv_producer_consumer",
    category: "操作系统 · 进程同步",
    title: "多生产者-多消费者 PV 经典模型",
    desc: "408 操作系统大题最核心模板，信号量与互斥量的精准配对。",
    language: "c",
    code: `semaphore mutex = 1; // 缓冲区互斥访问
semaphore empty = N; // 缓冲区空闲槽位数 (初始为N)
semaphore full = 0;  // 缓冲区已有产品数 (初始为0)

void producer() {
    while(1) {
        produce_item();
        P(empty);   // 1. 先申请空闲缓冲区 (不可与互斥颠倒!)
        P(mutex);   // 2. 申请互斥锁
        add_to_buffer();
        V(mutex);   // 3. 释放互斥锁
        V(full);    // 4. 释放满缓冲区信号
    }
}

void consumer() {
    while(1) {
        P(full);    // 1. 先检查是否有产品
        P(mutex);   // 2. 申请互斥锁
        remove_from_buffer();
        V(mutex);   // 3. 释放互斥锁
        V(empty);   // 4. 释放空闲槽位
        consume_item();
    }
}`
  },
  {
    id: "os_pv_readers_writers",
    category: "操作系统 · 进程同步",
    title: "读者-写者问题 (读优先与写优先)",
    desc: "解决多个进程共享数据读写冲突的经典 PV 题型。",
    language: "c",
    code: `int count = 0;       // 记录当前活跃的读者数量
semaphore mutex = 1; // 保护 count 变量的互斥修改
semaphore rw = 1;    // 保证读者写者互斥访问文件

void writer() {
    while(1) {
        P(rw);       // 互斥访问共享文件
        write_data();
        V(rw);       // 释放文件锁
    }
}

void reader() {
    while(1) {
        P(mutex);    // 保护 count 操作
        if (count == 0) P(rw); // 第一个读者负责加锁
        count++;
        V(mutex);

        read_data(); // 读取数据

        P(mutex);
        count--;
        if (count == 0) V(rw); // 最后一个读者负责解锁
        V(mutex);
    }
}`
  },
  {
    id: "net_tcp_state_machine",
    category: "计算机网络 · 传输层",
    title: "TCP 连接建立 (三次握手) 与 释放 (四次挥手) 状态转换",
    desc: "408 网络最核心必考考点，状态机迁移及序列号/确认号计算。",
    language: "text",
    code: `【TCP 三次握手 (Connection Establishment)】
Client: CLOSED -> SYN_SENT -> (接收 SYN+ACK, 发送 ACK) -> ESTABLISHED
Server: LISTEN -> (接收 SYN, 发送 SYN+ACK) -> SYN_RCVD -> (接收 ACK) -> ESTABLISHED

1. 第一次握手: Client 发送 SYN=1, seq=x
2. 第二次握手: Server 发送 SYN=1, ACK=1, seq=y, ack=x+1
3. 第三次握手: Client 发送 ACK=1, seq=x+1, ack=y+1

【TCP 四次挥手 (Connection Teardown)】
1. 第一次挥手: Client 发送 FIN=1, seq=u (进入 FIN_WAIT_1)
2. 第二次挥手: Server 发送 ACK=1, seq=v, ack=u+1 (进入 CLOSE_WAIT，Client 进入 FIN_WAIT_2)
3. 第三次挥手: Server 发送 FIN=1, ACK=1, seq=w, ack=u+1 (进入 LAST_ACK)
4. 第四次挥手: Client 发送 ACK=1, seq=u+1, ack=w+1 (进入 TIME_WAIT，等待 2MSL 后 CLOSED)`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CS408_CODE_SNIPPETS };
}
