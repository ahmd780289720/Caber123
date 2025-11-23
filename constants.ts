
import { Level, QuestionType } from './types';

export const INITIAL_USER_STATE = {
  xp: 1250,
  streak: 5,
  level: 1,
  hearts: 5,
  completedLessons: [],
  completedCourses: [],
  unlockedLevels: [1]
};

export const LEVELS_DATA: Level[] = [
  {
    id: 1,
    title: "المستوى الأول: التأسيس (Freshman)",
    description: "بناء العقلية الأمنية، فهم الشبكات، البرمجة، وأنظمة التشغيل.",
    isLocked: false,
    courses: [
      {
        id: "c1-intro-cyber",
        title: "CS101: مبادئ الأمن السيبراني",
        description: "المقرر التأسيسي لفهم مفاهيم الحماية، الهجوم، والدفاع.",
        isLocked: false,
        modules: [
          {
            id: "m1-core-concepts",
            title: "الوحدة 1: المفاهيم الجوهرية (Core Concepts)",
            description: "اللبنات الأساسية لأي نظام أمني.",
            lessons: [
              {
                id: "l1-cia-triad",
                title: "1.1 مثلث الحماية (CIA Triad)",
                xpReward: 50,
                bookReference: "CompTIA Security+ Guide to Network Security Fundamentals - Mark Ciampa",
                content: `
# مثلث الحماية (CIA Triad)

يعتبر **مثلث CIA** النموذج الأساسي لأمن المعلومات. وهو يرمز إلى:

1. **السرية (Confidentiality):** التأكد من أن المعلومات الحساسة لا يصل إليها إلا الأشخاص المصرح لهم. (مثال: تشفير البيانات، كلمات المرور).
2. **النزاهة (Integrity):** الحفاظ على دقة المعلومات وحمايتها من التعديل غير المصرح به. (مثال: استخدام Hashing للتأكد من عدم تغيير الملف).
3. **التوافر (Availability):** ضمان وصول المعلومات والخدمات لمن يحتاجها وقت حاجته إليها. (مثال: الحماية من هجمات حجب الخدمة DDoS).

تخيل الأمر مثل **خزنة البنك**:
* فقط أنت تملك المفتاح (**سرية**).
* المال في الداخل لا يفسد أو يتغير عدده (**نزاهة**).
* يمكنك الذهاب وسحب المال أثناء أوقات العمل (**توافر**).
                `,
                summary: "السرية، النزاهة، والتوافر هي الأعمدة الثلاثة الرئيسية لأي نظام أمني.",
                questions: [
                  {
                    id: "q1",
                    type: QuestionType.MCQ,
                    text: "أي عنصر من عناصر مثلث CIA يضمن عدم تعديل البيانات من قبل أشخاص غير مصرح لهم؟",
                    options: ["السرية (Confidentiality)", "النزاهة (Integrity)", "التوافر (Availability)", "المصادقة (Authentication)"],
                    correctAnswerIndex: 1,
                    explanation: "النزاهة تتعلق بالحفاظ على دقة وصحة البيانات ومنع التلاعب بها."
                  },
                  {
                    id: "q2",
                    type: QuestionType.MCQ,
                    text: "هجوم حجب الخدمة (DDoS) يستهدف أي ركن بشكل أساسي؟",
                    options: ["السرية", "النزاهة", "التوافر", "التفويض"],
                    correctAnswerIndex: 2,
                    explanation: "هجمات حجب الخدمة تهدف إلى تعطيل النظام وجعله غير متاح للمستخدمين."
                  }
                ]
              },
              {
                id: "l1-aaa",
                title: "1.2 نموذج AAA (المصادقة، التفويض، المحاسبة)",
                xpReward: 60,
                bookReference: "CISSP All-in-One Exam Guide - Shon Harris",
                content: `
# نموذج AAA: مفتاح الدخول للنظم

في عالم الأمن، لا يكفي أن نقول "أنا فلان". يجب أن نتبع بروتوكول **AAA**:

1. **المصادقة (Authentication):**
   * السؤال: "من أنت؟"
   * الطريقة: التحقق من الهوية عبر (شيء تعرفه: كلمة مرور)، (شيء تملكه: بطاقة ذكية)، أو (شيء فيك: بصمة).

2. **التفويض (Authorization):**
   * السؤال: "ماذا يُسمح لك بفعله؟"
   * الطريقة: بعد دخولك، هل يحق لك قراءة الملفات فقط؟ أم التعديل عليها؟ أم حذفها؟

3. **المحاسبة (Accounting):**
   * السؤال: "ماذا فعلت؟"
   * الطريقة: تسجيل كل حركة (Logs). متى دخلت؟ ماذا عدلت؟ متى خرجت؟

## مثال واقعي: استخدام بطاقة الصراف
1. تدخل البطاقة وتكتب الرقم السري (**Authentication**).
2. البنك يتحقق من رصيدك ويسمح لك بسحب مبلغ معين (**Authorization**).
3. البنك يسجل العملية في كشف حسابك (**Accounting**).
                `,
                summary: "AAA هو الإطار الذي يضبط وصول المستخدمين وصلاحياتهم ومراقبة نشاطهم.",
                questions: [
                  {
                    id: "q1-aaa",
                    type: QuestionType.MCQ,
                    text: "عندما يقوم النظام بتسجيل وقت دخول المستخدم في ملف الـ Logs، أي جزء من AAA هذا؟",
                    options: ["Authentication", "Authorization", "Accounting", "Availability"],
                    correctAnswerIndex: 2,
                    explanation: "المحاسبة (Accounting) تعنى بتتبع وتسجيل نشاطات المستخدم."
                  }
                ]
              },
              {
                id: "l1-non-repudiation",
                title: "1.3 عدم الإنكار (Non-Repudiation)",
                xpReward: 55,
                bookReference: "Cryptography and Network Security - William Stallings",
                content: `
# عدم الإنكار (Non-Repudiation)

هو ضمان أن الشخص الذي قام بإجراء معين (مثل إرسال بريد إلكتروني أو توقيع عقد) **لا يمكنه إنكار** قيامه بهذا الفعل لاحقاً.

## كيف يتحقق تقنياً؟
يتحقق بشكل أساسي عبر **التوقيع الرقمي (Digital Signatures)** وشهادات التشفير.

* **مثال:** إذا اشتريت منزلاً ووقعت العقد إلكترونياً باستخدام مفتاحك الخاص، لا يمكنك لاحقاً الذهاب للمحكمة والقول "لم أكن أنا من وقع"، لأن التوقيع مرتبط بهويتك الرقمية بشكل فريد لا يقبل الدحض.
                `,
                summary: "عدم الإنكار يمنع المرسل من نفي إرساله للرسالة، وهو ركن أساسي في الثقة الرقمية.",
                questions: [
                  {
                    id: "q1-nr",
                    type: QuestionType.MCQ,
                    text: "ما هي التقنية الأساسية المستخدمة لتحقيق عدم الإنكار؟",
                    options: ["Jumbo Frames", "Digital Signatures", "Firewalls", "VPN"],
                    correctAnswerIndex: 1,
                    explanation: "التوقيع الرقمي يربط البيانات بهوية المرسل بشكل مشفر يمنع الإنكار."
                  }
                ]
              },
              {
                id: "l1-least-privilege",
                title: "1.4 مبدأ الامتياز الأقل (Least Privilege)",
                xpReward: 60,
                bookReference: "Zero Trust Networks - Evan Gilman",
                content: `
# مبدأ الامتياز الأقل (PoLP)

هو حجر الزاوية في الأمن السيبراني الحديث. ينص على أنه يجب منح المستخدم أو البرنامج **فقط الصلاحيات الضرورية جداً** لإنجاز مهمته، ولا شيء أكثر.

## لماذا؟
إذا تم اختراق حساب مستخدم يملك صلاحيات "مدير" (Admin)، فإن المخترق يسيطر على كامل النظام. أما إذا كانت صلاحياته محدودة، فإن الضرر يكون محصوراً.
                `,
                summary: "أعط المستخدمين الحد الأدنى من الصلاحيات اللازمة لعملهم لتقليل المخاطر عند الاختراق.",
                questions: [
                  {
                    id: "q-lp",
                    type: QuestionType.MCQ,
                    text: "لماذا ننصح الموظفين بعدم استخدام حسابات بصلاحيات Admin للأعمال اليومية؟",
                    options: ["لتوفير مساحة القرص", "لتطبيق مبدأ الامتياز الأقل وتقليل الضرر عند الاختراق", "لأن النظام يصبح أسرع", "لتوفير الكهرباء"],
                    correctAnswerIndex: 1,
                    explanation: "استخدام حسابات محدودة الصلاحية يمنع البرمجيات الخبيثة من السيطرة على كامل الجهاز عند الإصابة."
                  }
                ]
              }
            ]
          },
          {
            id: "m2-threat-landscape",
            title: "الوحدة 2: مشهد التهديدات (Threat Landscape)",
            description: "اعرف عدوك: المخترقون، البرمجيات الخبيثة، والهندسة الاجتماعية.",
            lessons: [
              {
                id: "l1-hackers-types",
                title: "2.1 تصنيف المهاجمين (Hacker Classes)",
                xpReward: 50,
                bookReference: "The Art of Deception - Kevin Mitnick",
                content: `
# أنواع المخترقين (Hackers)

1. **القبعة البيضاء (White Hat):** الهاكر الأخلاقي. يخترق بإذن ليعثر على الثغرات ويصلحها.
2. **القبعة السوداء (Black Hat):** المجرم الإلكتروني. يخترق للسرقة أو التخريب.
3. **القبعة الرمادية (Grey Hat):** يعمل في المنطقة الرمادية. قد يكتشف ثغرة بدون إذن ثم يبلغ الشركة عنها.
4. **نشطاء الإنترنت (Hacktivists):** يخترقون لأهداف سياسية (مثل Anonymous).
5. **التهديدات المتقدمة المستمرة (APT):** مجموعات مدعومة من دول، تتميز بموارد ضخمة وصبر طويل.
                `,
                summary: "تصنيف المهاجمين يساعدنا في فهم دوافعهم وطرق دفاعنا ضدهم.",
                questions: [
                    {
                    id: "q3",
                    type: QuestionType.MCQ,
                    text: "مجموعة تخترق شبكة حكومية لسرقة أسرار عسكرية وتظل مختبئة لمدة عام. ماذا نسمي هذا النوع؟",
                    options: ["Script Kiddie", "APT (Advanced Persistent Threat)", "Grey Hat", "Insider Threat"],
                    correctAnswerIndex: 1,
                    explanation: "الـ APT تتميز بالدعم الكبير والقدرة على التخفي لفترات طويلة."
                  }
                ]
              },
              {
                id: "l2-malware-types",
                title: "2.2 أنواع البرمجيات الخبيثة (Malware)",
                xpReward: 70,
                bookReference: "Practical Malware Analysis - Michael Sikorski",
                content: `
# عائلة البرمجيات الخبيثة (Malware)

1. **الفيروس (Virus):** يحتاج إلى "مضيف" (ملف) ليعمل وينتقل.
2. **الدودة (Worm):** أخطر من الفيروس؛ **لا تحتاج لمضيف**. تنتشر عبر الشبكة ذاتياً.
3. **حصان طروادة (Trojan):** يبدو كبرنامج مفيد، لكنه يخفي بداخله كود خبيث.
4. **برمجيات الفدية (Ransomware):** تشفر الملفات وتطلب فدية.
                `,
                summary: "تتنوع البرمجيات الخبيثة بين الفيروسات، الديدان، وأحصنة طروادة، وكل منها له طريقة انتشار مختلفة.",
                questions: [
                  {
                    id: "q-worm",
                    type: QuestionType.MCQ,
                    text: "ما الفرق الرئيسي بين الدودة (Worm) والفيروس؟",
                    options: ["الدودة تحتاج لملف مضيف", "الفيروس لا يحتاج لتدخل بشري", "الدودة تنتشر ذاتياً عبر الشبكة دون ملف مضيف", "لا يوجد فرق"],
                    correctAnswerIndex: 2,
                    explanation: "الديدان الإلكترونية مستقلة وتنتشر عبر ثغرات الشبكة."
                  }
                ]
              },
              {
                id: "l3-social-engineering",
                title: "2.3 الهندسة الاجتماعية",
                xpReward: 65,
                bookReference: "Social Engineering: The Science of Human Hacking",
                content: `
# الهندسة الاجتماعية

استغلال البشر بدلاً من الأنظمة.

## أساليب شائعة:
1. **التصيد (Phishing):** رسائل مزيفة.
2. **التصيد الصوتي (Vishing):** الاتصال هاتفياً وانتحال صفة.
3. **الذيل (Tailgating):** الدخول لمبنى خلف موظف مصرح له.
                `,
                summary: "الهندسة الاجتماعية تستغل نقاط الضعف البشرية مثل الثقة والخوف.",
                questions: [
                  {
                    id: "q-se",
                    type: QuestionType.MCQ,
                    text: "اتصال هاتفي يطلب كلمة المرور يعتبر مثالاً على؟",
                    options: ["Phishing", "Vishing", "DDoS", "SQL Injection"],
                    correctAnswerIndex: 1,
                    explanation: "الـ Vishing هو Phishing ولكن عبر الصوت (Voice)."
                  }
                ]
              },
               {
                id: "l2-zero-day",
                title: "2.4 هجمات اليوم صفر (Zero-Day Exploits)",
                xpReward: 80,
                bookReference: "Countdown to Zero Day - Kim Zetter",
                content: `
# هجمات اليوم صفر (Zero-Day)

هي ثغرة برمجية **لا يعرفها المطور (Vendor)** ولكن اكتشفها المخترق.
سميت بـ "Zero-Day" لأن المطور لديه **صفر أيام** لإصلاحها.

## خطورتها
لا توجد بصمة للفيروس في برامج الحماية، ولا يوجد تحديث أمني لإغلاق الثغرة.
                `,
                summary: "ثغرات اليوم صفر خطيرة جداً لعدم وجود إصلاح أمني لها لحظة الهجوم.",
                questions: [
                  {
                    id: "q-0day",
                    type: QuestionType.MCQ,
                    text: "لماذا تعتبر هجمات Zero-Day خطيرة جداً؟",
                    options: ["تستهدف البنوك فقط", "لا يوجد لها تحديث أمني (Patch) متاح لحظة الهجوم", "تعمل في الليل فقط", "تتطلب أجهزة قوية"],
                    correctAnswerIndex: 1,
                    explanation: "المطور لا يعلم بوجود الثغرة أصلاً."
                  }
                ]
              }
            ]
          },
          {
            id: "m3-defense-basics",
            title: "الوحدة 3: استراتيجيات الدفاع",
            description: "الدفاع في العمق والتشفير.",
            lessons: [
               {
                id: "l1-defense-in-depth",
                title: "3.1 الدفاع في العمق (Defense in Depth)",
                xpReward: 80,
                bookReference: "Security Engineering - Ross Anderson",
                content: `
# الدفاع في العمق

لا نعتمد على جدار واحد فقط، بل عدة طبقات:
1. **الأمن المادي**
2. **أمن الشبكة**
3. **أمن المضيف (Host)**
4. **أمن التطبيقات**
5. **أمن البيانات**
                `,
                summary: "تعدد طبقات الحماية يصعب المهمة على المهاجم.",
                questions: [
                    {
                        id: "q-did",
                        type: QuestionType.MCQ,
                        text: "المبدأ الذي يعتمد على طبقات حماية متعددة يسمى؟",
                        options: ["Defense in Depth", "Single Point of Failure", "Keep It Simple", "Obscurity"],
                        correctAnswerIndex: 0,
                        explanation: "الدفاع في العمق هو استخدام طبقات متعددة للحماية."
                    }
                ]
              },
              {
                id: "l3-mfa",
                title: "3.2 المصادقة متعددة العوامل (MFA)",
                xpReward: 65,
                bookReference: "Identity Management: A Primer",
                content: `
# المصادقة متعددة العوامل (MFA)

يجب تقديم شيئين مختلفين من:
1. **شيء تعرفه:** كلمة مرور.
2. **شيء تملكه:** هاتف.
3. **شيء تكونه:** بصمة.
                `,
                summary: "MFA تضيف طبقة حماية حيوية للحسابات.",
                questions: []
              },
              {
                id: "l3-encryption-basics",
                title: "3.3 أساسيات التشفير",
                xpReward: 75,
                bookReference: "The Code Book - Simon Singh",
                content: `
# التشفير (Encryption)

1. **المتماثل (Symmetric):** مفتاح واحد للتشفير والفك (سريع).
2. **اللامتماثل (Asymmetric):** مفتاح عام ومفتاح خاص (أكثر أماناً للنقل).
                `,
                summary: "التشفير يحول البيانات لنص غير مفهوم لحمايتها من التجسس.",
                questions: []
              }
            ]
          }
        ]
      },
      {
        id: "c2-python",
        title: "CS102: البرمجة للأمن السيبراني (Python)",
        description: "تعلم لغة بايثون من الصفر لبناء أدوات الاختراق والدفاع.",
        isLocked: false,
        modules: [
            {
                id: "m1-py-basics",
                title: "الوحدة 1: أساسيات اللغة (Python Basics)",
                description: "المتغيرات، الحلقات، والشروط.",
                lessons: [
                   {
                    id: "l1-py-intro",
                    title: "1.1 لماذا بايثون؟ وإعداد البيئة",
                    xpReward: 30,
                    bookReference: "Automate the Boring Stuff with Python - Al Sweigart",
                    content: `
# لماذا بايثون للهاكرز؟
لأنها لغة "صمغية" (Glue Language) تربط الأدوات ببعضها، ولديها مكتبات قوية جداً للشبكات (Socket, Scapy) والتشفير.

## كودك الأول
\`\`\`python
print("Hello, Hacker!")
ip_address = "192.168.1.1"
port = 80
print(f"Target: {ip_address}:{port}")
\`\`\`
`,
                    summary: "بايثون سهلة القراءة وقوية جداً في مجال الأمن السيبراني.",
                    questions: [
                        {
                            id: "q-py-1",
                            type: QuestionType.MCQ,
                            text: "أي دالة تستخدم لطباعة نص على الشاشة في بايثون؟",
                            options: ["echo()", "printf()", "print()", "log()"],
                            correctAnswerIndex: 2,
                            explanation: "الدالة print() هي الدالة الأساسية للإخراج في بايثون."
                        }
                    ]
                   },
                   {
                       id: "l2-py-loops",
                       title: "1.2 التحكم في التدفق (Loops & Conditions)",
                       xpReward: 40,
                       bookReference: "Python Crash Course - Eric Matthes",
                       content: `
# اتخاذ القرار (If Statements)
نحتاج للتحقق من الشروط، مثلاً: هل البورت مفتوح؟

\`\`\`python
port_status = "open"
if port_status == "open":
    print("Attack!")
else:
    print("Scan next port...")
\`\`\`

# التكرار (Loops)
فحص 1000 بورت يدوياً مستحيل. نستخدم Loops:

\`\`\`python
for port in range(1, 1025):
    print(f"Scanning port {port}...")
\`\`\`
                       `,
                       summary: "الجمل الشرطية والحلقات هي أساس أي سكربت يقوم بمهام متكررة مثل الفحص.",
                       questions: []
                   }
                ]
            },
            {
                id: "m2-py-networking",
                title: "الوحدة 2: برمجة الشبكات (Socket Programming)",
                description: "كيف تتحدث مع السيرفرات برمجياً.",
                lessons: [
                    {
                        id: "l1-py-socket",
                        title: "2.1 مكتبة Socket الأساسية",
                        xpReward: 100,
                        bookReference: "Black Hat Python - Justin Seitz",
                        content: `
# الشبكات باستخدام Python

مكتبة \`socket\` هي بوابتك للتعامل مع الشبكة.

## إنشاء عميل TCP (TCP Client)
هذا الكود يتصل بسيرفر (مثل Google) ويرسل له طلباً:

\`\`\`python
import socket

target_host = "www.google.com"
target_port = 80

# 1. إنشاء كائن السوكيت
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 2. الاتصال بالسيرفر
client.connect((target_host, target_port))

# 3. إرسال البيانات
client.send(b"GET / HTTP/1.1\\r\\nHost: google.com\\r\\n\\r\\n")

# 4. استقبال الرد
response = client.recv(4096)
print(response.decode())
\`\`\`
                        `,
                        summary: "مكتبة Socket تمكنك من بناء أدوات اتصال خاصة بك، مثل ماسح البورتات أو عميل دردشة.",
                        questions: [
                            {
                                id: "q-sock-1",
                                type: QuestionType.MCQ,
                                text: "ما هي المكتبة الأساسية في بايثون للتعامل مع اتصالات الشبكة؟",
                                options: ["network", "socket", "http", "wifi"],
                                correctAnswerIndex: 1,
                                explanation: "مكتبة socket هي الواجهة القياسية لبرمجة الشبكات."
                            }
                        ]
                    },
                    {
                        id: "l2-py-portscanner",
                        title: "2.2 بناء ماسح بورتات (Port Scanner)",
                        xpReward: 120,
                        bookReference: "Violent Python - TJ O'Connor",
                        content: `
# مشروع: Port Scanner بسيط

سنقوم بكتابة أداة تفحص البورتات المفتوحة في سيرفر معين.

\`\`\`python
import socket

target = "192.168.1.5"

def port_scan(port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5) # لا تنتظر طويلاً
        # الدالة connect_ex ترجع 0 لو نجح الاتصال
        result = s.connect_ex((target, port))
        if result == 0:
            print(f"Port {port} is OPEN")
        s.close()
    except:
        pass

# فحص أول 100 بورت
for x in range(1, 100):
    port_scan(x)
\`\`\`
                        `,
                        summary: "تعلمنا كيف نستخدم الحلقات مع السوكيت لبناء أداة أمنية حقيقية.",
                        questions: []
                    }
                ]
            }
        ]
      },
      {
        id: "c3-networks",
        title: "CS103: شبكات الحاسب (Networking)",
        description: "كيف تعمل الإنترنت؟ OSI Model, TCP/IP, IP Addressing.",
        isLocked: false,
        modules: [
           {
                id: "m1-osi",
                title: "الوحدة 1: نماذج الشبكات (OSI & TCP/IP)",
                description: "لغة التفاهم بين الأجهزة.",
                lessons: [
                    {
                        id: "l1-osi-layers",
                        title: "1.1 نموذج OSI (الطبقات السبعة)",
                        xpReward: 50,
                        bookReference: "Computer Networking: A Top-Down Approach - Kurose & Ross",
                        content: `
# نموذج OSI: خريطة الشبكة

لفهم الشبكات، قسمها العلماء لـ 7 طبقات:

1. **Physical:** الكابلات، الإشارات الكهربائية، الـ Bits.
2. **Data Link:** الـ MAC Address، السويتشات. (وحدة البيانات: Frame).
3. **Network:** الـ IP Address، الرواتر. (وحدة البيانات: Packet).
4. **Transport:** نقل البيانات (TCP/UDP)، البورتات. (وحدة البيانات: Segment).
5. **Session:** فتح وإغلاق الجلسات.
6. **Presentation:** التشفير وضغط الملفات (JPG, SSL).
7. **Application:** التطبيقات التي يراها المستخدم (HTTP, DNS).

عبارة للحفظ: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.
                        `,
                        summary: "نموذج OSI هو المعيار النظري لفهم كيفية انتقال البيانات من السلك إلى الشاشة.",
                        questions: [
                            {
                                id: "q-osi-1",
                                type: QuestionType.MCQ,
                                text: "في أي طبقة من طبقات OSI يعمل الـ Router؟",
                                options: ["Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 1 (Physical)"],
                                correctAnswerIndex: 1,
                                explanation: "الراوتر يتعامل مع عناوين IP لتوجيه الحزم، وهذا يحدث في الطبقة الثالثة (Network)."
                            }
                        ]
                    },
                    {
                        id: "l2-tcp-handshake",
                        title: "1.2 المصافحة الثلاثية (Three-Way Handshake)",
                        xpReward: 60,
                        bookReference: "TCP/IP Illustrated - W. Richard Stevens",
                        content: `
# كيف يبدأ الاتصال؟ (TCP Handshake)

قبل إرسال أي بيانات عبر TCP، يجب أن يتفق الجهازان.
تخيل مكالمة هاتفية:

1. **SYN:** (ألو؟ هل تسمعني؟) - العميل يرسل طلب اتصال.
2. **SYN-ACK:** (نعم أسمعك، هل تسمعني أنت؟) - السيرفر يوافق ويرد بطلب تأكيد.
3. **ACK:** (نعم أسمعك، لنبدأ الحديث) - العميل يؤكد الاتصال.

الآن القناة مفتوحة (Established) ويمكن نقل البيانات.
                        `,
                        summary: "المصافحة الثلاثية تضمن موثوقية الاتصال قبل بدء نقل البيانات.",
                        questions: [
                            {
                                id: "q-tcp-1",
                                type: QuestionType.MCQ,
                                text: "ما هو العلم (Flag) الأول الذي يرسله العميل لبدء اتصال TCP؟",
                                options: ["ACK", "FIN", "SYN", "RST"],
                                correctAnswerIndex: 2,
                                explanation: "SYN (Synchronize) هو أول خطوة في المصافحة."
                            }
                        ]
                    }
                ]
            },
            {
                id: "m2-ip-subnetting",
                title: "الوحدة 2: العناوين والتقسيم (Addressing & Subnetting)",
                description: "IP v4, CIDR, والتعامل مع الشبكات الفرعية.",
                lessons: [
                    {
                        id: "l1-ipv4",
                        title: "2.1 بنية عنوان IP",
                        xpReward: 50,
                        bookReference: "Cisco CCNA Certification Guide",
                        content: `
# عنوان IPv4

يتكون من 32-بت، مقسمة لـ 4 خانات (Octets).
مثال: \`192.168.1.1\`

## أنواع العناوين:
* **Public IP:** عنوان عام يمكن الوصول إليه عبر الإنترنت (عنوان موقع Google).
* **Private IP:** عنوان خاص داخل منزلك أو شركتك (لا يظهر في الإنترنت).
  * الفئات الخاصة:
    * 192.168.x.x (منازل)
    * 10.x.x.x (شركات كبيرة)
    * 172.16.x.x - 172.31.x.x
                        `,
                        summary: "عناوين IP هي الهويات الرقمية للأجهزة، وتوجد منها نسخ عامة للإنترنت ونسخ خاصة للشبكات المحلية.",
                        questions: []
                    }
                ]
            }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "المستوى الثاني: البنية التقنية (Sophomore)",
    description: "التعمق في كيفية حماية الأنظمة والشبكات والتشفير.",
    isLocked: false,
    courses: [
        { 
            id: "c2-netsec", 
            title: "CS201: أمن الشبكات المتقدم", 
            description: "Firewalls, VPN, IDS/IPS architecture.", 
            isLocked: false, 
            modules: [
                {
                    id: "m1-firewalls",
                    title: "الوحدة 1: الجدران النارية (Firewalls)",
                    description: "أنواع الجدران النارية وكيفية عملها.",
                    lessons: [
                        {
                            id: "l1-firewall-types",
                            title: "1.1 أنواع الجدران النارية",
                            xpReward: 70,
                            bookReference: "Network Security Essentials - William Stallings",
                            content: `
# الجدار الناري (Firewall)

هو جهاز أو برنامج يتحكم في حركة المرور (Traffic) بناءً على قواعد أمنية.

## الأنواع الرئيسية:
1. **Packet Filtering:** الجيل القديم. ينظر فقط للرأس (Header): (من أين؟ إلى أين؟ رقم البورت؟). لا يفهم محتوى البيانات.
2. **Stateful Inspection:** ذكي. يتذكر حالة الاتصال. إذا طلبت أنت صفحة ويب، سيسمح للرد بالدخول لأنه يعرف أنك من طلبته.
3. **Next-Generation (NGFW):** يفهم التطبيقات (Layer 7). يستطيع التمييز بين تصفح Facebook وبين لعبة Farmville داخل Facebook.
                            `,
                            summary: "تطورت الجدران النارية من مجرد فلاتر للحزم إلى أنظمة ذكية تفهم سياق التطبيقات.",
                            questions: []
                        },
                        {
                            id: "l2-dmz",
                            title: "1.2 المنطقة منزوعة السلاح (DMZ)",
                            xpReward: 80,
                            bookReference: "Designing Network Security - Merike Kaeo",
                            content: `
# ما هي الـ DMZ؟

هي شبكة فرعية تقع بين "الإنترنت الخطر" وبين "الشبكة الداخلية الآمنة".

## ماذا نضع فيها؟
نضع فيها السيرفرات التي يجب أن يصل إليها الجمهور (Web Server, Email Server).

## الفكرة:
إذا تم اختراق سيرفر الويب في الـ DMZ، المخترق لا يزال محبوساً هناك ولا يستطيع الوصول لقاعدة بيانات الموظفين في الشبكة الداخلية (Internal Network).
                            `,
                            summary: "الـ DMZ تعمل كمنطقة عازلة لحماية الشبكة الداخلية في حال اختراق السيرفرات العامة.",
                            questions: []
                        }
                    ]
                },
                {
                    id: "m2-ids-ips",
                    title: "الوحدة 2: كشف ومنع التسلل (IDS/IPS)",
                    description: "كاميرات المراقبة والحراس الرقميين.",
                    lessons: [
                        {
                            id: "l1-ids-vs-ips",
                            title: "2.1 الفرق بين IDS و IPS",
                            xpReward: 75,
                            bookReference: "Snort For Dummies",
                            content: `
# المراقبة والمنع

1. **IDS (Intrusion Detection System):** نظام كشف. مثل جهاز الإنذار. يراقب الشبكة، وإذا رأى هجوماً يرسل تنبيهاً للمسؤول. **لا يوقف الهجوم**.
2. **IPS (Intrusion Prevention System):** نظام منع. مثل الحارس المسلح. يراقب الشبكة، وإذا رأى هجوماً **يقوم بقطع الاتصال فوراً** (Block).

## طرق الكشف:
* **Signature-based:** يبحث عن بصمة معروفة لهجوم (مثل مضاد الفيروسات). سريع لكن لا يكتشف Zero-Day.
* **Anomaly-based:** يتعلم السلوك الطبيعي للشبكة. إذا زادت الحركة فجأة في الليل، يعتبرها هجوماً. يكتشف هجمات جديدة لكن يعطي إنذارات كاذبة كثيرة.
                            `,
                            summary: "الـ IDS يراقب وينبه، بينما الـ IPS يراقب ويشتبك لمنع الهجوم.",
                            questions: []
                        }
                    ]
                }
            ] 
        },
        { id: "c2-os", title: "CS202: أمن أنظمة التشغيل (Linux/Windows)", description: "Hardening, Permissions, Active Directory.", isLocked: true, modules: [] },
        { id: "c2-crypto", title: "CS203: علم التشفير (Cryptography)", description: "PKI, SSL/TLS, Symmetric vs Asymmetric.", isLocked: true, modules: [] },
    ]
  },
  {
    id: 3,
    title: "المستوى الثالث: التخصص التقني (Junior)",
    description: "مرحلة الهجوم الأخلاقي والتحقيق الجنائي.",
    isLocked: false,
    courses: [
        { 
            id: "c3-pentest", 
            title: "CS301: اختبار الاختراق (Ethical Hacking)", 
            description: "Reconnaissance, Scanning, Exploitation.", 
            isLocked: false, 
            modules: [
                {
                    id: "m1-recon",
                    title: "الوحدة 1: جمع المعلومات (Reconnaissance)",
                    description: "جمع البيانات قبل الهجوم (OSINT).",
                    lessons: [
                        {
                            id: "l1-passive-recon",
                            title: "1.1 الاستطلاع السلبي (Passive Recon)",
                            xpReward: 60,
                            bookReference: "Open Source Intelligence Techniques - Michael Bazzell",
                            content: `
# الاستطلاع السلبي

هو جمع المعلومات عن الهدف **دون لمس خوادمه** (حتى لا يتم كشفك).

## أدوات ومصادر:
1. **Google Dorking:** استخدام محرك بحث جوجل لكشف ملفات حساسة.
   * \`site:target.com filetype:pdf "confidential"\`
2. **Whois:** لمعرفة مالك النطاق وتاريخ انتهاءه.
3. **Shodan:** محرك بحث للأجهزة المتصلة بالإنترنت (كاميرات، سيرفرات صناعية).
4. **TheHarvester:** لجمع الإيميلات والنطاقات الفرعية من LinkedIn و Bing.
                            `,
                            summary: "الاستطلاع السلبي هو فن جمع المعلومات من المصادر المفتوحة دون تنبيه الضحية.",
                            questions: []
                        }
                    ]
                },
                {
                    id: "m2-scanning",
                    title: "الوحدة 2: الفحص (Scanning)",
                    description: "استخدام Nmap واكتشاف الثغرات.",
                    lessons: [
                        {
                            id: "l1-nmap-basics",
                            title: "2.1 أساسيات Nmap",
                            xpReward: 90,
                            bookReference: "Nmap Network Scanning - Gordon Lyon",
                            content: `
# Nmap: ملكة أدوات الشبكات

أداة لفحص الشبكة ومعرفة الأجهزة المتصلة والخدمات التي تعمل عليها.

## أوامر مهمة:
* \`nmap 192.168.1.5\` : فحص بسيط لأهم 1000 بورت.
* \`nmap -sV 192.168.1.5\` : محاولة معرفة إصدار البرامج (Version Detection). مفيد جداً لمعرفة إذا كان الإصدار قديماً ومصاباً بثغرة.
* \`nmap -O 192.168.1.5\` : تخمين نظام التشغيل (Windows/Linux).
* \`nmap -A 192.168.1.5\` : فحص شامل (OS + Version + Scripts). **مزعج جداً ويكشف مكانك**.
                            `,
                            summary: "Nmap هي الأداة رقم 1 لأي مختبر اختراق لرسم خريطة الشبكة وفهم الهدف.",
                            questions: []
                        }
                    ]
                }
            ]
        },
        { id: "c3-websec", title: "CS302: أمن تطبيقات الويب", description: "OWASP Top 10 Deep Dive.", isLocked: true, modules: [] },
        { id: "c3-forensics", title: "CS303: التحقيقات الجنائية الرقمية", description: "Disk Imaging, Memory Analysis.", isLocked: true, modules: [] },
    ]
  },
  {
    id: 4,
    title: "المستوى الرابع: التمكن المتقدم (Senior)",
    description: "تقنيات المستقبل والمشروع النهائي.",
    isLocked: false,
    courses: [
        { 
            id: "c4-cloud", 
            title: "CS401: أمن الحوسبة السحابية", 
            description: "AWS/Azure Security.", 
            isLocked: false, 
            modules: [
                {
                    id: "m1-cloud-concepts",
                    title: "الوحدة 1: مفاهيم السحابة",
                    description: "المسؤولية المشتركة و IAM.",
                    lessons: [
                        {
                            id: "l1-shared-resp",
                            title: "1.1 نموذج المسؤولية المشتركة",
                            xpReward: 50,
                            bookReference: "CCSP Official Study Guide",
                            content: `
# من يحمي ماذا؟

في السحابة (Cloud)، الأمن مشترك بينك وبين المزود (AWS/Azure).

* **المزود (Provider):** مسؤول عن أمن **السحابة نفسها** (المباني، السيرفرات المادية، الكابلات).
* **العميل (Customer):** مسؤول عن أمن **ما بداخل السحابة** (بياناتك، تحديث نظام التشغيل، إعدادات الجدار الناري، حسابات المستخدمين).

خطأ شائع: أن تظن أن رفع بياناتك على السحابة يعني أنها محمية تلقائياً.
                            `,
                            summary: "في السحابة، أمازون تحمي المبنى، لكنك أنت المسؤول عن قفل باب شقتك.",
                            questions: []
                        }
                    ]
                }
            ]
        },
        { id: "c4-iot", title: "CS402: أمن الموبايل وإنترنت الأشياء", description: "Android/iOS Security, IoT Protocols.", isLocked: true, modules: [] },
        { id: "c4-capstone", title: "CS499: مشروع التخرج", description: "بناء نظام دفاعي متكامل.", isLocked: true, modules: [] },
    ]
  }
];
