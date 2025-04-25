
// Types
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number; // Percentage
  timeTaken: number; // in seconds
  date: string; // ISO date string
  completed: boolean;
  answers: number[]; // Indexes of selected options
  attendanceMarked: boolean;
}

// Mock quizzes
export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Computer Networks Fundamentals',
    subject: 'Computer Networks',
    description: 'Test your knowledge of computer network fundamentals including OSI model, TCP/IP, and basic network topologies.',
    duration: 45,
    difficulty: 'easy',
    questions: [
      {
        id: '1-1',
        text: 'Which layer of the OSI model is responsible for routing and forwarding?',
        options: ['Transport Layer', 'Network Layer', 'Data Link Layer', 'Physical Layer'],
        correctAnswer: 1
      },
      {
        id: '1-2',
        text: 'What protocol is used to convert IP addresses to MAC addresses?',
        options: ['DHCP', 'DNS', 'ARP', 'HTTP'],
        correctAnswer: 2
      },
      {
        id: '1-3',
        text: 'Which network topology connects each device to a central hub?',
        options: ['Mesh', 'Star', 'Ring', 'Bus'],
        correctAnswer: 1
      },
      {
        id: '1-4',
        text: 'What is the maximum data rate of standard Ethernet?',
        options: ['10 Mbps', '100 Mbps', '1 Gbps', 'All of the above depending on the standard'],
        correctAnswer: 3
      },
      {
        id: '1-5',
        text: 'Which protocol is connection-oriented?',
        options: ['UDP', 'TCP', 'ICMP', 'IP'],
        correctAnswer: 1
      },
      {
        id: '1-6',
        text: 'Which device operates at the Data Link layer of the OSI model?',
        options: ['Router', 'Switch', 'Hub', 'Modem'],
        correctAnswer: 1
      },
      {
        id: '1-7',
        text: 'Which protocol assigns IP addresses automatically to devices?',
        options: ['DNS', 'HTTP', 'DHCP', 'FTP'],
        correctAnswer: 2
      },
      {
        id: '1-8',
        text: 'Which of these is a private IP address?',
        options: ['192.168.1.1', '8.8.8.8', '172.32.0.1', '100.100.100.100'],
        correctAnswer: 0
      },
      {
        id: '1-9',
        text: 'Which layer handles error detection and correction?',
        options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Application Layer'],
        correctAnswer: 2
      },
      {
        id: '1-10',
        text: 'What is the full form of HTTP?',
        options: ['HyperText Transfer Protocol', 'HighText Transfer Protocol', 'HyperTerminal Transfer Protocol', 'None of the above'],
        correctAnswer: 0
      },
      {
        id: '1-11',
        text: 'Which of the following uses a three-way handshake?',
        options: ['TCP', 'UDP', 'ICMP', 'IP'],
        correctAnswer: 0
      },
      {
        id: '1-12',
        text: 'What is the purpose of a subnet mask?',
        options: ['To divide the network into sub-networks', 'To hide IP addresses', 'To detect errors', 'To route packets'],
        correctAnswer: 0
      },
      {
        id: '1-13',
        text: 'Which command can be used to test network connectivity?',
        options: ['ipconfig', 'ping', 'mkdir', 'nslookup'],
        correctAnswer: 1
      },
      {
        id: '1-14',
        text: 'Which of the following is NOT a valid class of IP addresses?',
        options: ['Class A', 'Class B', 'Class D', 'Class F'],
        correctAnswer: 3
      },
      {
        id: '1-15',
        text: 'Which protocol is used for secure communication over the Internet?',
        options: ['HTTP', 'SSL', 'FTP', 'TCP'],
        correctAnswer: 1
      },
      {
        id: '1-16',
        text: 'Which port number is used by HTTP?',
        options: ['80', '443', '21', '25'],
        correctAnswer: 0
      },
      {
        id: '1-17',
        text: 'Which device is used to break up broadcast domains?',
        options: ['Router', 'Switch', 'Hub', 'Repeater'],
        correctAnswer: 0
      },
      {
        id: '1-18',
        text: 'Which layer of OSI is responsible for encryption and compression?',
        options: ['Transport', 'Session', 'Presentation', 'Application'],
        correctAnswer: 2
      },
      {
        id: '1-19',
        text: 'What is the default subnet mask for a Class C IP address?',
        options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
        correctAnswer: 2
      },
      {
        id: '1-20',
        text: 'What is the purpose of DNS?',
        options: ['Assign IP addresses', 'Resolve domain names to IP addresses', 'Secure connections', 'Control packet routing'],
        correctAnswer: 1
      },
      {
        id: '1-21',
        text: 'Which layer ensures reliable data transfer?',
        options: ['Network', 'Transport', 'Session', 'Presentation'],
        correctAnswer: 1
      },
      {
        id: '1-22',
        text: 'Which protocol does ping use?',
        options: ['TCP', 'UDP', 'ICMP', 'HTTP'],
        correctAnswer: 2
      },
      {
        id: '1-23',
        text: 'Which topology has a single point of failure?',
        options: ['Star', 'Ring', 'Mesh', 'Tree'],
        correctAnswer: 0
      },
      {
        id: '1-24',
        text: 'What is the size of an IPv4 address?',
        options: ['32 bits', '64 bits', '128 bits', '16 bits'],
        correctAnswer: 0
      },
      {
        id: '1-25',
        text: 'Which device operates at both Layer 2 and Layer 3 of the OSI model?',
        options: ['Hub', 'Router', 'Switch', 'Layer 3 Switch'],
        correctAnswer: 3
      },
      {
        id: '1-26',
        text: 'What is a MAC address?',
        options: ['An IP address', 'A physical hardware address', 'A DNS name', 'A subnet mask'],
        correctAnswer: 1
      },
      {
        id: '1-27',
        text: 'Which OSI layer provides the interface to the user?',
        options: ['Session', 'Presentation', 'Application', 'Transport'],
        correctAnswer: 2
      },
      {
        id: '1-28',
        text: 'Which of the following is a connectionless protocol?',
        options: ['TCP', 'UDP', 'FTP', 'Telnet'],
        correctAnswer: 1
      },
      {
        id: '1-29',
        text: 'Which device regenerates signals in a network?',
        options: ['Router', 'Switch', 'Repeater', 'Bridge'],
        correctAnswer: 2
      },
      {
        id: '1-30',
        text: 'Which network device works only in the physical layer?',
        options: ['Router', 'Switch', 'Hub', 'Bridge'],
        correctAnswer: 2
      }
    ]
  }
  
  ,
  // {
  //   id: '2',
  //   title: 'Data Structures: Arrays & Linked Lists',
  //   subject: 'Data Structures',
  //   description: 'Test your understanding of basic data structures including arrays, linked lists, and their operations.',
  //   duration: 20,
  //   difficulty: 'medium',
  //   questions: [
  //     {
  //       id: '2-1',
  //       text: 'What is the time complexity of accessing an element in an array by index?',
  //       options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
  //       correctAnswer: 0
  //     },
  //     {
  //       id: '2-2',
  //       text: 'In a singly linked list, what operation has O(n) time complexity?',
  //       options: ['Insertion at beginning', 'Deletion at beginning', 'Accessing the last element', 'All of the above'],
  //       correctAnswer: 2
  //     },
  //     {
  //       id: '2-3',
  //       text: 'Which data structure is more memory efficient?',
  //       options: ['Array', 'Linked List', 'Both use the same amount', 'Depends on implementation'],
  //       correctAnswer: 3
  //     },
  //     {
  //       id: '2-4',
  //       text: 'What is the main advantage of a doubly linked list over a singly linked list?',
  //       options: [
  //         'Faster insertion at the beginning', 
  //         'Bidirectional traversal', 
  //         'Less memory usage', 
  //         'Better for random access'
  //       ],
  //       correctAnswer: 1
  //     },
  //     {
  //       id: '2-5',
  //       text: 'What problem might arise when using arrays with dynamic sizing?',
  //       options: [
  //         'Memory fragmentation', 
  //         'Stack overflow', 
  //         'High cost of resizing operations', 
  //         'All of the above'
  //       ],
  //       correctAnswer: 2
  //     }
  //   ]
  // }
  // 
  // 
  {
    id: '2',
    title: 'Data Structures: Arrays & Linked Lists',
    subject: 'Data Structures',
    description: 'Test your understanding of basic data structures including arrays, linked lists, and their operations.',
    duration: 45,
    difficulty: 'medium',
    questions: [
      {
        id: '2-1',
        text: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0
      },
      {
        id: '2-2',
        text: 'In a singly linked list, what operation has O(n) time complexity?',
        options: ['Insertion at beginning', 'Deletion at beginning', 'Accessing the last element', 'All of the above'],
        correctAnswer: 2
      },
      {
        id: '2-3',
        text: 'Which data structure is more memory efficient?',
        options: ['Array', 'Linked List', 'Both use the same amount', 'Depends on implementation'],
        correctAnswer: 3
      },
      {
        id: '2-4',
        text: 'What is the main advantage of a doubly linked list over a singly linked list?',
        options: ['Faster insertion at the beginning', 'Bidirectional traversal', 'Less memory usage', 'Better for random access'],
        correctAnswer: 1
      },
      {
        id: '2-5',
        text: 'What problem might arise when using arrays with dynamic sizing?',
        options: ['Memory fragmentation', 'Stack overflow', 'High cost of resizing operations', 'All of the above'],
        correctAnswer: 2
      },
      {
        id: '2-6',
        text: 'Which of the following supports random access?',
        options: ['Singly Linked List', 'Doubly Linked List', 'Array', 'Circular Linked List'],
        correctAnswer: 2
      },
      {
        id: '2-7',
        text: 'What is the space complexity of a singly linked list with n nodes?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2
      },
      {
        id: '2-8',
        text: 'What is required to delete a node from a singly linked list?',
        options: ['Pointer to the previous node', 'Pointer to the next node', 'Pointer to the head', 'None of the above'],
        correctAnswer: 0
      },
      {
        id: '2-9',
        text: 'Which operation is least efficient in arrays?',
        options: ['Access by index', 'Insertion at beginning', 'Insertion at end', 'Traversal'],
        correctAnswer: 1
      },
      {
        id: '2-10',
        text: 'How do you check if a linked list has a cycle?',
        options: ['DFS', 'Floyd’s Cycle Detection', 'Binary Search', 'Quick Sort'],
        correctAnswer: 1
      },
      {
        id: '2-11',
        text: 'In a circular linked list, the last node points to?',
        options: ['Null', 'Head', 'Tail', 'Middle'],
        correctAnswer: 1
      },
      {
        id: '2-12',
        text: 'What is the time complexity of inserting a node at the end of a singly linked list (without tail pointer)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 1
      },
      {
        id: '2-13',
        text: 'Which data structure is best for implementing undo functionality?',
        options: ['Stack', 'Array', 'Queue', 'Linked List'],
        correctAnswer: 0
      },
      {
        id: '2-14',
        text: 'Which of the following is true about arrays?',
        options: ['Fixed size', 'Dynamic size', 'Efficient insertions', 'Low memory locality'],
        correctAnswer: 0
      },
      {
        id: '2-15',
        text: 'Which of these operations is not efficient in a linked list?',
        options: ['Insertion at head', 'Traversal', 'Deletion at head', 'Binary Search'],
        correctAnswer: 3
      },
      {
        id: '2-16',
        text: 'How many pointers are there in a doubly linked list node?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 2
      },
      {
        id: '2-17',
        text: 'What is the main disadvantage of linked lists over arrays?',
        options: ['Slower access', 'High memory usage', 'Complicated code', 'All of the above'],
        correctAnswer: 3
      },
      {
        id: '2-18',
        text: 'Which is better for implementing stacks and queues?',
        options: ['Array', 'Linked List', 'Depends on use-case', 'Binary Tree'],
        correctAnswer: 2
      },
      {
        id: '2-19',
        text: 'What happens if you try to access an invalid index in an array?',
        options: ['Segmentation fault', 'Null value', 'Infinity', '0'],
        correctAnswer: 0
      },
      {
        id: '2-20',
        text: 'Which of the following traversal methods is used in arrays?',
        options: ['Inorder', 'Postorder', 'Linear', 'Preorder'],
        correctAnswer: 2
      },
      {
        id: '2-21',
        text: 'What is the time complexity of searching for an element in an unsorted array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2
      },
      {
        id: '2-22',
        text: 'What is a sentinel node in linked lists?',
        options: ['Node with special value', 'Dummy node used to simplify operations', 'Tail node', 'Middle node'],
        correctAnswer: 1
      },
      {
        id: '2-23',
        text: 'Which of the following is true for dynamic arrays?',
        options: ['Fixed capacity', 'Can grow/shrink in size', 'Stores nodes', 'Slower access time than linked list'],
        correctAnswer: 1
      },
      {
        id: '2-24',
        text: 'Which data structure is better for inserting at arbitrary positions frequently?',
        options: ['Array', 'Doubly Linked List', 'Singly Linked List', 'Stack'],
        correctAnswer: 1
      },
      {
        id: '2-25',
        text: 'What is the purpose of the tail pointer in linked lists?',
        options: ['Traversal', 'Quick access to last node', 'To reverse list', 'To check for cycles'],
        correctAnswer: 1
      },
      {
        id: '2-26',
        text: 'How can you reverse a singly linked list?',
        options: ['Using recursion', 'Using iteration', 'Both A and B', 'Not possible'],
        correctAnswer: 2
      },
      {
        id: '2-27',
        text: 'What is the drawback of arrays in terms of insertion?',
        options: ['Insertion is always O(1)', 'Insertion at end is slow', 'Insertion at beginning requires shifting', 'None of these'],
        correctAnswer: 2
      },
      {
        id: '2-28',
        text: 'Which linked list allows insertion from both ends?',
        options: ['Singly Linked List', 'Circular Linked List', 'Doubly Linked List', 'Deque'],
        correctAnswer: 3
      },
      {
        id: '2-29',
        text: 'Which is the most space-efficient linked list?',
        options: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'None'],
        correctAnswer: 0
      },
      {
        id: '2-30',
        text: 'In which situation is an array a better choice than a linked list?',
        options: ['Dynamic size needed', 'Constant-time access by index needed', 'Frequent insertions', 'Frequent deletions'],
        correctAnswer: 1
      }
    ]
  },
  
  // {
  //   id: '3',
  //   title: 'Operating Systems: Processes & Threads',
  //   subject: 'Operating Systems',
  //   description: 'Test your knowledge of operating system concepts including processes, threads, scheduling, and memory management.',
  //   duration: 25,
  //   difficulty: 'hard',
  //   questions: [
  //     {
  //       id: '3-1',
  //       text: 'What resource is typically shared between threads of the same process?',
  //       options: ['Register values', 'Stack', 'Heap memory', 'Process ID'],
  //       correctAnswer: 2
  //     },
  //     {
  //       id: '3-2',
  //       text: 'Which scheduling algorithm might lead to starvation?',
  //       options: ['Round Robin', 'First Come First Served', 'Priority Scheduling', 'Shortest Job First'],
  //       correctAnswer: 2
  //     },
  //     {
  //       id: '3-3',
  //       text: 'In virtual memory management, what is a page fault?',
  //       options: [
  //         'A corrupted page table', 
  //         'Accessing a page not currently in physical memory', 
  //         'A page with access permission violation', 
  //         'A full page table'
  //       ],
  //       correctAnswer: 1
  //     },
  //     {
  //       id: '3-4',
  //       text: 'What is the purpose of a mutex in multithreaded programming?',
  //       options: [
  //         'To prevent race conditions', 
  //         'To optimize thread scheduling', 
  //         'To allocate memory for threads', 
  //         'To terminate unused threads'
  //       ],
  //       correctAnswer: 0
  //     },
  //     {
  //       id: '3-5',
  //       text: 'Which of these is not a state in the typical process state diagram?',
  //       options: ['Ready', 'Running', 'Waiting', 'Compiling'],
  //       correctAnswer: 3
  //     }
  //   ]
  // },
  {
    id: '3',
    title: 'Operating Systems: Processes & Threads',
    subject: 'Operating Systems',
    description: 'Test your knowledge of operating system concepts including processes, threads, scheduling, and memory management.',
    duration: 45,
    difficulty: 'hard',
    questions: [
      {
        id: '3-1',
        text: 'What resource is typically shared between threads of the same process?',
        options: ['Register values', 'Stack', 'Heap memory', 'Process ID'],
        correctAnswer: 2
      },
      {
        id: '3-2',
        text: 'Which scheduling algorithm might lead to starvation?',
        options: ['Round Robin', 'First Come First Served', 'Priority Scheduling', 'Shortest Job First'],
        correctAnswer: 2
      },
      {
        id: '3-3',
        text: 'In virtual memory management, what is a page fault?',
        options: ['A corrupted page table', 'Accessing a page not currently in physical memory', 'A page with access permission violation', 'A full page table'],
        correctAnswer: 1
      },
      {
        id: '3-4',
        text: 'What is the purpose of a mutex in multithreaded programming?',
        options: ['To prevent race conditions', 'To optimize thread scheduling', 'To allocate memory for threads', 'To terminate unused threads'],
        correctAnswer: 0
      },
      {
        id: '3-5',
        text: 'Which of these is not a state in the typical process state diagram?',
        options: ['Ready', 'Running', 'Waiting', 'Compiling'],
        correctAnswer: 3
      },
      {
        id: '3-6',
        text: 'What is the main difference between a thread and a process?',
        options: ['Threads are heavier than processes', 'Threads do not share memory', 'Processes have separate memory space', 'Threads can’t run concurrently'],
        correctAnswer: 2
      },
      {
        id: '3-7',
        text: 'Which component handles context switching?',
        options: ['Compiler', 'CPU Scheduler', 'Page Table', 'Linker'],
        correctAnswer: 1
      },
      {
        id: '3-8',
        text: 'What causes thrashing in an operating system?',
        options: ['Excessive context switching', 'Too many I/O operations', 'High paging activity with low CPU usage', 'Deadlock among processes'],
        correctAnswer: 2
      },
      {
        id: '3-9',
        text: 'Which is NOT a CPU scheduling criterion?',
        options: ['Throughput', 'Turnaround Time', 'Waiting Time', 'Cache Hit Ratio'],
        correctAnswer: 3
      },
      {
        id: '3-10',
        text: 'Which of the following helps avoid deadlock?',
        options: ['Circular wait', 'Hold and wait', 'Resource preemption', 'Mutual exclusion'],
        correctAnswer: 2
      },
      {
        id: '3-11',
        text: 'Which technique is used to handle deadlocks?',
        options: ['Paging', 'Banker’s Algorithm', 'Round Robin Scheduling', 'Multilevel Feedback Queue'],
        correctAnswer: 1
      },
      {
        id: '3-12',
        text: 'What is the key advantage of multithreading?',
        options: ['Multiple cores', 'Higher memory', 'Improved responsiveness and parallelism', 'More cache'],
        correctAnswer: 2
      },
      {
        id: '3-13',
        text: 'Which part of memory does a process stack grow into?',
        options: ['Code segment', 'Heap', 'Data segment', 'None'],
        correctAnswer: 1
      },
      {
        id: '3-14',
        text: 'What is a zombie process?',
        options: ['Running process without code', 'Terminated process with parent waiting to read status', 'Kernel-level thread', 'Suspended system call'],
        correctAnswer: 1
      },
      {
        id: '3-15',
        text: 'What is the main role of the dispatcher?',
        options: ['Decides which process to kill', 'Switches context between processes', 'Allocates memory', 'Tracks files'],
        correctAnswer: 1
      },
      {
        id: '3-16',
        text: 'Which process scheduling algorithm uses a time quantum?',
        options: ['Priority Scheduling', 'Round Robin', 'Shortest Job First', 'First Come First Serve'],
        correctAnswer: 1
      },
      {
        id: '3-17',
        text: 'Which of the following is not involved in thread synchronization?',
        options: ['Semaphore', 'Mutex', 'Condition Variable', 'Compiler'],
        correctAnswer: 3
      },
      {
        id: '3-18',
        text: 'What does the fork() system call do?',
        options: ['Terminates a process', 'Creates a new thread', 'Creates a new process', 'Switches context'],
        correctAnswer: 2
      },
      {
        id: '3-19',
        text: 'Which of the following is not a thread library?',
        options: ['POSIX Threads', 'Windows Threads', 'OpenMP', 'Zlib'],
        correctAnswer: 3
      },
      {
        id: '3-20',
        text: 'What is the result of excessive context switching?',
        options: ['High CPU utilization', 'Faster processes', 'Reduced throughput', 'More RAM'],
        correctAnswer: 2
      },
      {
        id: '3-21',
        text: 'Which of the following occurs during a context switch?',
        options: ['Cache flush', 'Registers save/restore', 'Interrupt disable', 'Memory compaction'],
        correctAnswer: 1
      },
      {
        id: '3-22',
        text: 'Which part of the OS is responsible for creating threads?',
        options: ['Memory Manager', 'CPU Scheduler', 'Thread Library', 'Loader'],
        correctAnswer: 2
      },
      {
        id: '3-23',
        text: 'Which of the following can result from poor synchronization?',
        options: ['Deadlock', 'Starvation', 'Race Condition', 'All of the above'],
        correctAnswer: 3
      },
      {
        id: '3-24',
        text: 'Which is NOT a type of thread?',
        options: ['User-level thread', 'Kernel-level thread', 'Hybrid thread', 'Admin thread'],
        correctAnswer: 3
      },
      {
        id: '3-25',
        text: 'In multithreaded processes, which component is unique to each thread?',
        options: ['Heap', 'Global variables', 'Program Counter', 'Code section'],
        correctAnswer: 2
      },
      {
        id: '3-26',
        text: 'What is the minimum number of processes required for deadlock?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1
      },
      {
        id: '3-27',
        text: 'Which algorithm uses preemptive scheduling?',
        options: ['FCFS', 'SJF', 'Round Robin', 'Non-preemptive Priority'],
        correctAnswer: 2
      },
      {
        id: '3-28',
        text: 'What is shared among processes in a multi-processing environment?',
        options: ['Code', 'Heap', 'Stack', 'Program Counter'],
        correctAnswer: 0
      },
      {
        id: '3-29',
        text: 'How does the operating system track process information?',
        options: ['File Descriptor', 'Process Table', 'Semaphore Queue', 'Ready Queue'],
        correctAnswer: 1
      },
      {
        id: '3-30',
        text: 'Which of the following is used for inter-process communication (IPC)?',
        options: ['Shared memory', 'Message passing', 'Pipes', 'All of the above'],
        correctAnswer: 3
      }
    ]
  },
  
  {
    id: '4',
    title: 'Software Engineering Principles',
    subject: 'Software Engineering',
    description: 'Test your understanding of software engineering concepts including development methodologies, design patterns, and best practices.',
    duration: 45,
    difficulty: 'medium',
    questions: [
      {
        id: '4-1',
        text: 'Which of these is not an Agile methodology?',
        options: ['Scrum', 'Kanban', 'Waterfall', 'Extreme Programming'],
        correctAnswer: 2
      },
      {
        id: '4-2',
        text: 'What design pattern provides a simplified interface to a complex subsystem?',
        options: ['Adapter', 'Facade', 'Decorator', 'Proxy'],
        correctAnswer: 1
      },
      {
        id: '4-3',
        text: 'Which principle states that "software entities should be open for extension, but closed for modification"?',
        options: ['Single Responsibility Principle', 'Open/Closed Principle', 'Liskov Substitution Principle', 'Interface Segregation Principle'],
        correctAnswer: 1
      },
      {
        id: '4-4',
        text: 'What is the primary purpose of version control systems?',
        options: ['To manage project dependencies', 'To track and manage changes to code over time', 'To automate testing procedures', 'To document APIs'],
        correctAnswer: 1
      },
      {
        id: '4-5',
        text: 'Which of these is not typically part of Continuous Integration?',
        options: ['Automated building', 'Automated testing', 'Manual code reviews', 'Reporting build results'],
        correctAnswer: 2
      },
      {
        id: '4-6',
        text: 'Which phase of SDLC involves writing actual program code?',
        options: ['Design', 'Implementation', 'Testing', 'Deployment'],
        correctAnswer: 1
      },
      {
        id: '4-7',
        text: 'What is the main goal of Test-Driven Development (TDD)?',
        options: ['Writing code faster', 'Writing bug-free code', 'Writing tests before writing code', 'Reducing system requirements'],
        correctAnswer: 2
      },
      {
        id: '4-8',
        text: 'What is the purpose of the Singleton design pattern?',
        options: ['Create multiple objects', 'Hide complexity', 'Ensure a class has only one instance', 'Add responsibilities to objects'],
        correctAnswer: 2
      },
      {
        id: '4-9',
        text: 'Which Agile ceremony is typically held daily to share progress?',
        options: ['Sprint Review', 'Backlog Grooming', 'Daily Stand-up', 'Retrospective'],
        correctAnswer: 2
      },
      {
        id: '4-10',
        text: 'Which of the following is a non-functional requirement?',
        options: ['User registration', 'System performance', 'Email notifications', 'Login authentication'],
        correctAnswer: 1
      },
      {
        id: '4-11',
        text: 'What principle promotes keeping functions small and focused?',
        options: ['YAGNI', 'KISS', 'DRY', 'Single Responsibility Principle'],
        correctAnswer: 3
      },
      {
        id: '4-12',
        text: 'Which type of testing ensures new code does not break existing functionality?',
        options: ['Unit Testing', 'Regression Testing', 'Smoke Testing', 'Integration Testing'],
        correctAnswer: 1
      },
      {
        id: '4-13',
        text: 'Which model uses iterations to deliver incremental releases?',
        options: ['Waterfall', 'V-Model', 'Iterative Model', 'Big Bang Model'],
        correctAnswer: 2
      },
      {
        id: '4-14',
        text: 'In DevOps, which tool is commonly used for automation of builds?',
        options: ['Jira', 'Jenkins', 'Figma', 'Postman'],
        correctAnswer: 1
      },
      {
        id: '4-15',
        text: 'Which artifact in Scrum represents the team’s to-do list for a sprint?',
        options: ['Product Backlog', 'Sprint Goal', 'Sprint Backlog', 'Definition of Done'],
        correctAnswer: 2
      },
      {
        id: '4-16',
        text: 'What is "technical debt"?',
        options: ['Outdated APIs', 'Bugs in the system', 'The cost of rework from quick or poor coding practices', 'Slow servers'],
        correctAnswer: 2
      },
      {
        id: '4-17',
        text: 'What is the benefit of using design patterns?',
        options: ['Makes code slower', 'Increases memory usage', 'Improves reusability and maintainability', 'Prevents deployment'],
        correctAnswer: 2
      },
      {
        id: '4-18',
        text: 'Which of the following is a behavioral design pattern?',
        options: ['Singleton', 'Observer', 'Factory', 'Builder'],
        correctAnswer: 1
      },
      {
        id: '4-19',
        text: 'Which tool helps manage agile tasks and boards?',
        options: ['Docker', 'Jenkins', 'Jira', 'Git'],
        correctAnswer: 2
      },
      {
        id: '4-20',
        text: 'What is the key advantage of using microservices architecture?',
        options: ['Low scalability', 'Tightly coupled modules', 'Independent deployment', 'Single point of failure'],
        correctAnswer: 2
      },
      {
        id: '4-21',
        text: 'Which software metric measures how many classes use a given class?',
        options: ['Coupling', 'Cohesion', 'Cyclomatic Complexity', 'Code Coverage'],
        correctAnswer: 0
      },
      {
        id: '4-22',
        text: 'What does CI/CD stand for?',
        options: ['Continuous Integration / Continuous Delivery', 'Code Interface / Code Debugging', 'Continuous Interaction / Continuous Design', 'Code Injection / Code Deployment'],
        correctAnswer: 0
      },
      {
        id: '4-23',
        text: 'Which one is NOT a benefit of unit testing?',
        options: ['Catch bugs early', 'Speed up development', 'Ensure performance benchmarks', 'Verify small code parts'],
        correctAnswer: 2
      },
      {
        id: '4-24',
        text: 'Which design principle says "Don’t repeat yourself"?',
        options: ['YAGNI', 'KISS', 'SOLID', 'DRY'],
        correctAnswer: 3
      },
      {
        id: '4-25',
        text: 'Which of the following is a drawback of the Waterfall model?',
        options: ['Too flexible', 'Early testing', 'Hard to adapt to change', 'No documentation'],
        correctAnswer: 2
      },
      {
        id: '4-26',
        text: 'What is the purpose of the Factory design pattern?',
        options: ['To cache data', 'To provide a way to create objects without specifying the exact class', 'To track object usage', 'To wrap another object'],
        correctAnswer: 1
      },
      {
        id: '4-27',
        text: 'Which one is an example of a high-level requirement document?',
        options: ['Test Case Document', 'Source Code', 'SRS (Software Requirement Specification)', 'System Log File'],
        correctAnswer: 2
      },
      {
        id: '4-28',
        text: 'What is meant by refactoring?',
        options: ['Adding features', 'Fixing bugs', 'Changing code structure without changing its behavior', 'Optimizing servers'],
        correctAnswer: 2
      },
      {
        id: '4-29',
        text: 'Which of the following is not a valid Git command?',
        options: ['git commit', 'git push', 'git save', 'git clone'],
        correctAnswer: 2
      },
      {
        id: '4-30',
        text: 'What is the "definition of done" in Scrum?',
        options: ['Tasks assigned to a developer', 'Sprint backlog items', 'A shared understanding of when work is complete', 'Checklist for writing code'],
        correctAnswer: 2
      }
    ]
  },

  {
    id: '5',
    title: 'SQL: Queries, Joins, and Constraints',
    subject: 'SQL',
    description: 'Evaluate your SQL skills across queries, joins, constraints, indexing, and optimization with this medium-level quiz.',
    duration: 45,
    difficulty: 'medium',
    questions: [
      {
        id: '5-1',
        text: 'Which SQL statement is used to extract data from a database?',
        options: ['GET', 'EXTRACT', 'SELECT', 'OPEN'],
        correctAnswer: 2
      },
      {
        id: '5-2',
        text: 'Which clause is used to filter the result set based on a condition?',
        options: ['ORDER BY', 'HAVING', 'GROUP BY', 'WHERE'],
        correctAnswer: 3
      },
      {
        id: '5-3',
        text: 'Which type of JOIN returns all records when there is a match in either left or right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
        correctAnswer: 3
      },
      {
        id: '5-4',
        text: 'What does the COUNT(*) function do in SQL?',
        options: ['Counts only numeric values', 'Counts only NULL values', 'Counts all rows', 'Counts only unique rows'],
        correctAnswer: 2
      },
      {
        id: '5-5',
        text: 'Which constraint ensures that a column cannot have NULL values?',
        options: ['UNIQUE', 'CHECK', 'NOT NULL', 'DEFAULT'],
        correctAnswer: 2
      },
      {
        id: '5-6',
        text: 'Which SQL keyword is used to prevent duplicate values in a query result?',
        options: ['DISTINCT', 'UNIQUE', 'NO DUPLICATE', 'FILTER'],
        correctAnswer: 0
      },
      {
        id: '5-7',
        text: 'Which of the following is a valid SQL aggregate function?',
        options: ['MERGE()', 'COMBINE()', 'COUNT()', 'TRANSFORM()'],
        correctAnswer: 2
      },
      {
        id: '5-8',
        text: 'Which clause groups rows that have the same values into summary rows?',
        options: ['GROUP BY', 'ORDER BY', 'HAVING', 'UNION'],
        correctAnswer: 0
      },
      {
        id: '5-9',
        text: 'Which SQL command is used to remove rows from a table?',
        options: ['REMOVE', 'DROP', 'DELETE', 'ERASE'],
        correctAnswer: 2
      },
      {
        id: '5-10',
        text: 'Which SQL statement is used to update data in a table?',
        options: ['MODIFY', 'CHANGE', 'UPDATE', 'REPLACE'],
        correctAnswer: 2
      },
      {
        id: '5-11',
        text: 'What does a PRIMARY KEY constraint do?',
        options: ['Allows NULLs', 'Allows duplicate values', 'Uniquely identifies each row', 'Allows multiple rows with the same value'],
        correctAnswer: 2
      },
      {
        id: '5-12',
        text: 'Which function is used to get the current date in SQL?',
        options: ['GETDATE()', 'CURRDATE()', 'NOW()', 'TODAY()'],
        correctAnswer: 0
      },
      {
        id: '5-13',
        text: 'Which operator is used to search for a pattern in SQL?',
        options: ['=', 'LIKE', 'MATCH', 'SEARCH'],
        correctAnswer: 1
      },
      {
        id: '5-14',
        text: 'What will the following query return: SELECT COUNT(DISTINCT department) FROM employees?',
        options: ['Number of employees', 'Number of departments', 'All department names', 'Average department size'],
        correctAnswer: 1
      },
      {
        id: '5-15',
        text: 'What is the result of an INNER JOIN if there is no match?',
        options: ['NULL rows', 'All rows from both tables', 'No rows returned', 'Only unmatched rows'],
        correctAnswer: 2
      },
      {
        id: '5-16',
        text: 'Which keyword is used to sort results in SQL?',
        options: ['SORT BY', 'GROUP BY', 'ORDER BY', 'ARRANGE BY'],
        correctAnswer: 2
      },
      {
        id: '5-17',
        text: 'Which statement is used to create a new table?',
        options: ['MAKE TABLE', 'CREATE TABLE', 'ADD TABLE', 'NEW TABLE'],
        correctAnswer: 1
      },
      {
        id: '5-18',
        text: 'Which keyword is used with the UPDATE statement to specify the row to update?',
        options: ['WHERE', 'HAVING', 'LIMIT', 'SET'],
        correctAnswer: 0
      },
      {
        id: '5-19',
        text: 'Which keyword combines the result of two queries and removes duplicates?',
        options: ['COMBINE', 'JOIN', 'UNION', 'MERGE'],
        correctAnswer: 2
      },
      {
        id: '5-20',
        text: 'Which SQL command removes a table from a database?',
        options: ['REMOVE TABLE', 'DELETE TABLE', 'DROP TABLE', 'TRUNCATE TABLE'],
        correctAnswer: 2
      },
      {
        id: '5-21',
        text: 'Which command is used to remove all rows from a table but keep the structure?',
        options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'],
        correctAnswer: 1
      },
      {
        id: '5-22',
        text: 'What will this query return? SELECT AVG(salary) FROM employees;',
        options: ['Total salary', 'Minimum salary', 'Maximum salary', 'Average salary'],
        correctAnswer: 3
      },
      {
        id: '5-23',
        text: 'Which command is used to add a new column to an existing table?',
        options: ['MODIFY TABLE', 'ALTER TABLE ADD', 'CHANGE TABLE', 'APPEND COLUMN'],
        correctAnswer: 1
      },
      {
        id: '5-24',
        text: 'Which clause is used with GROUP BY to filter aggregate results?',
        options: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'],
        correctAnswer: 0
      },
      {
        id: '5-25',
        text: 'Which JOIN returns only the rows from the left table that have matching rows in the right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
        correctAnswer: 1
      },
      {
        id: '5-26',
        text: 'What is a FOREIGN KEY used for?',
        options: ['To make a column unique', 'To reference a column in another table', 'To delete rows', 'To join multiple tables'],
        correctAnswer: 1
      },
      {
        id: '5-27',
        text: 'Which function returns the number of characters in a string?',
        options: ['COUNT()', 'LENGTH()', 'LEN()', 'STRLEN()'],
        correctAnswer: 1
      },
      {
        id: '5-28',
        text: 'Which clause limits the number of rows returned in a query?',
        options: ['LIMIT', 'TOP', 'ROWNUM', 'All of the above depending on DBMS'],
        correctAnswer: 3
      },
      {
        id: '5-29',
        text: 'Which of the following is not a valid SQL data type?',
        options: ['VARCHAR', 'INTEGER', 'FLOAT', 'WORD'],
        correctAnswer: 3
      },
      {
        id: '5-30',
        text: 'What does the BETWEEN operator do?',
        options: ['Filters rows with NULL values', 'Matches exact strings', 'Checks if a value is within a range', 'Limits the number of columns returned'],
        correctAnswer: 2
      }
    ]
  },
  
  
  
];

// Mock quiz attempts for the student user
export const quizAttempts: QuizAttempt[] = [
  {
    id: '1a',
    quizId: '1',
    userId: '1', // student
    score: 80,
    timeTaken: 720, // 12 minutes
    date: '2023-10-15T14:30:00Z',
    completed: true,
    answers: [1, 2, 1, 3, 0],
    attendanceMarked: true
  },
  {
    id: '2a',
    quizId: '2',
    userId: '1', // student
    score: 60,
    timeTaken: 1080, // 18 minutes
    date: '2023-10-17T10:15:00Z',
    completed: true,
    answers: [0, 3, 1, 1, 2],
    attendanceMarked: true
  },
  {
    id: '3a',
    quizId: '3',
    userId: '1', // student
    score: 40,
    timeTaken: 1320, // 22 minutes
    date: '2023-10-20T16:45:00Z',
    completed: true,
    answers: [1, 2, 1, 3, 2],
    attendanceMarked: false
  }
];

// Get quizzes for a user
export const getUserQuizzes = (userId: string) => {
  // In a real app, this would filter based on enrolled courses, etc.
  // For demo, return all quizzes
  return quizzes;
};

// Get quiz attempts for a user
export const getUserQuizAttempts = (userId: string) => {
  return quizAttempts.filter(attempt => attempt.userId === userId);
};

// Get a specific quiz by ID
export const getQuizById = (quizId: string) => {
  return quizzes.find(quiz => quiz.id === quizId);
};

// Get quiz attempt by ID
export const getQuizAttemptById = (attemptId: string) => {
  return quizAttempts.find(attempt => attempt.id === attemptId);
};

// Add a new quiz attempt
export const addQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'attendanceMarked'>) => {
  const newAttempt: QuizAttempt = {
    ...attempt,
    id: `${quizAttempts.length + 1}a`,
    attendanceMarked: attempt.score >= 60 // Mark attendance if score is 60% or above
  };
  
  quizAttempts.push(newAttempt);
  return newAttempt;
};
