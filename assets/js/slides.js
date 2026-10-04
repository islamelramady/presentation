/* ============================================================
   slides.js — Deck content
   Installing & Exploring Peachtree Complete Accounting (PCA)
   Source: official course manual, Lab "Installing Peachtree on a
   Single / Stand-Alone Computer" (steps 1 → 16).

   HOW TO EDIT: every slide is one object inside SLIDES.
   Strings are bilingual: t("English text", "النص العربي").
   `shot(...)` = a place where your own screenshot goes.
   ============================================================ */

/* English string + Arabic string */
const t = (en, ar) => ({ en: en, ar: ar });

/* Screenshot slot.
   file: file name WITHOUT extension inside assets/img/
   cap : caption shown under the picture
   hint: exactly what to capture on screen                    */
const shot = (file, capEn, capAr, hintEn, hintAr, detailEn, detailAr) => ({
  file: file,
  cap: t(capEn, capAr),
  hint: t(hintEn, hintAr),
  detail: detailEn ? t(detailEn, detailAr) : null
});

/* ---------- deck meta ---------- */
const DECK = {
  title: t("Peachtree Complete Accounting", "برنامج Peachtree Complete Accounting"),
  subtitle: t("Lab Presentation", "عرض عملي"),
  student: t("Your Name", "اسمك"),
  sections: {
    intro:    { name: t("Introduction", "مقدمة"),                        color: "#10b981" },
    install:  { name: t("Phase 1 — Installation", "المرحلة ١ — التثبيت"), color: "#38bdf8" },
    start:    { name: t("Phase 2 — Starting PCA", "المرحلة ٢ — تشغيل البرنامج"), color: "#f59e0b" },
    tour:     { name: t("Phase 3 — Exploring the program", "المرحلة ٣ — استكشاف البرنامج"), color: "#a78bfa" },
    uninstall:{ name: t("Phase 4 — Backup & removal", "المرحلة ٤ — النسخ الاحتياطي والإزالة"), color: "#fb7185" },
    wrap:     { name: t("Summary & Resources", "الخلاصة والمصادر"),        color: "#10b981" }
  }
};

/* ---------- the deck ---------- */
const ALL_SLIDES = [

  /* ========== 1 · COVER ========== */
  {
    id: "cover",
    layout: "cover",
    section: "intro",
    badge: t("Faculty of Commerce · Business Information System", "كلية التجارة · نظم المعلومات المحاسبية"),
    title: t("Peachtree Accounting", "برنامج Peachtree المحاسبي"),
    sub: t("Installation · Sample company · Main menus", "التثبيت · الشركة التجريبية · القوائم الرئيسية"),
    meta: [
      { icon: "i-list", text: t("Lab: Installing & Exploring PCA", "المعمل: تثبيت واستكشاف البرنامج") }
    ],
    shots: [
      shot("19-main-window",
        "Illustrative Peachtree accounting dashboard",
        "تصميم توضيحي للوحة برنامج Peachtree المحاسبي",
        "Illustration of an accounting workspace with sales, customers, and navigation.",
        "تصميم توضيحي لواجهة محاسبية تعرض المبيعات والعملاء وأدوات التنقل.")
    ],
    note: t("<p><b>Presenter 1 of 6 · Opening and installation</b></p><p>Welcome everyone. Today we will introduce Peachtree Complete Accounting and follow its practical journey: how it is installed, how we open a sample company, what we see in the program, and how we protect or remove it when needed. The image is an illustration to help us picture an accounting workspace.</p><p>Transition: Let’s begin with the two ways the program can be installed.</p>",
            "<p><b>المتحدث ١ من ٦ · الافتتاح والتثبيت</b></p><p>أهلًا بيكم. النهارده هنتعرف على برنامج Peachtree Complete Accounting وناخد جولة عملية: إزاي بيتثبت، وإزاي نفتح شركة تجريبية، وإيه اللي بنشوفه جوه البرنامج، وإزاي نحافظ على بياناتنا أو نزيل البرنامج عند الحاجة. الصورة هنا توضيحية لفكرة مساحة العمل المحاسبية.</p><p>انتقال: نبدأ بطريقتَي تثبيت البرنامج.</p>")
  },

  /* ========== 2 · LEARNING OBJECTIVES ========== */
  {
    id: "objectives",
    layout: "objectives",
    section: "intro",
    kicker: t("Learning objectives", "أهداف التعلم"),
    title: t("What you will be able to do", "ماذا ستتمكن من accomplishing"),
    sub: t("By the end of this lab you must master the five objectives below — they are exactly the exam requirements.",
           "في نهاية هذا المعمل يجب أن تتقن الأهداف الخمسة التالية وهي نفس متطلبات الامتحان."),
    objectives: [
      { n: "I",   en: "Install Peachtree Complete Accounting",              ar: "تثبيت برنامج Peachtree Complete Accounting",  note: { en: "Steps 1 → 14 of the installer", ar: "الخطوات ١ إلى ١٤ من برنامج التثبيت" } },
      { n: "II",  en: "Starting the Peachtree",                            ar: "تشغيل برنامج Peachtree",                    note: { en: "Finishing the setup correctly", ar: "إنهاء خطوات التثبيت بشكل صحيح" } },
      { n: "III", en: "Explore a sample company",                          ar: "استكشاف شركة تجريبية",                       note: { en: "Bellwether Garden Supply", ar: "شركة Bellwether Garden Supply" } },
      { n: "IV",  en: "The Navigating Bar and the Navigating Center",      ar: "شريط التنقل ومركز التنقل",                    note: { en: "The two tool bars of PCA", ar: "شريطا الأدوات في البرنامج" } },
      { n: "V",   en: "Uninstall Peachtree Complete Accounting",           ar: "إزالة تثبيت البرنامج",                       note: { en: "Through Windows Add / Remove", ar: "من خلال إضافة / إزالة البرامج" } }
    ],
    note: t("Read the five objectives aloud and tell the class these are the exam questions. Keep this slide on screen while you explain the plan.",
            "اقرأ الأهداف الخمسة بصوت واضح واذكر أنها أسئلة الامتحان. اترك هذه الشريحة على الشاشة أثناء شرح الخطة.")
  },

  /* ========== 3 · ROADMAP + BEFORE YOU START ========== */
  {
    id: "roadmap",
    layout: "roadmap",
    section: "intro",
    kicker: t("Roadmap", "خطة العرض"),
    title: t("Our route today", "مسار العرض اليوم"),
    phases: [
      { n: "01", en: "Install PCA on a single / stand-alone computer", ar: "تثبيت البرنامج على جهاز واحد", ico: "i-disk" },
      { n: "02", en: "Start the program & open the sample company",   ar: "تشغيل البرنامج وفتح الشركة التجريبية", ico: "i-play" },
      { n: "03", en: "Explore the window, menus & navigating tools", ar: "استكشاف النافذة والقوائم وأدوات التنقل", ico: "i-list" },
    ],
    bullets: [
      t("This lab is for users installing Peachtree on only one computer, where the same computer holds both the Peachtree program files and the Peachtree company data files.",
        "هذا المعمل مخصص لمن يثبّت البرنامج على جهاز واحد فقط، حيث يحتوي نفس الجهاز على ملفات البرنامج وملفات بيانات الشركات."),
      t("For help as you go, click the Help button on any of the windows you see during installation.",
        "للحصول على المساعدة أثناء العمل، اضغط زر Help الموجود في أي نافذة تظهر أثناء التثبيت."),
      t("Be sure to follow the directions for any notifications regarding your firewall or anti-virus programs.",
        "تأكد من اتباع التعليمات الخاصة بالإشعارات المتعلقة بجدار الحماية أو برامج مكافحة الفيروسات.")
    ],
    callout: {
      kind: "warn",
      text: t("Certain Peachtree files may trigger your firewall or anti-virus software — you must ALLOW those program files to run.",
              "قد تقوم بعض ملفات Peachtree بتنبيه جدار الحماية أو برنامج مكافحة الفيروسات — يجب السماح بتشغيل هذه الملفات.")
    },
    note: t("Explain the difference between program files and company data files: the program is the engine, the company files are your accounting database. Also warn students never to click “Cancel” or “Disagree” during the firewall screens.",
            "وضّح الفرق بين ملفات البرنامج وملفات بيانات الشركات: البرنامج هو المحرك، وملفات الشركات هي قاعدة بياناتك المحاسبية. وحذّر الطلاب عدم الضغط على Cancel أو Disagree في شاشات جدار الحماية.")
  },

  /* ========== 4 · DIVIDER — INSTALL ========== */
  {
    id: "div-install",
    layout: "divider",
    section: "install",
    num: "01",
    title: t("Installing Peachtree on a Single / Stand-Alone Computer", "تثبيت البرنامج على جهاز واحد"),
    sub: t("16 steps from the CD to the Installation Completed window. Every screen you will meet, in order.",
           "١٦ خطوة من القرص حتى نافذة اكتمال التثبيت — كل شاشة ستقابلها بالترتيب."),
    note: t("Announce the shift to the practical part. Remind the class to follow along on their own machines.",
            "أعلن الانتقال للجزء العملي. ذكّر الطلاب بالمتابعة على أجهزتهم.")
  },

  /* ========== 5 · STEP 1 ========== */
  {
    id: "s01",
    layout: "install-methods",
    section: "install",
    title: t("Install Peachtree: CD or Internet?", "تثبيت Peachtree: بالقرص أم بالإنترنت؟"),
    methods: [
      {
        ico: "i-disk",
        h: t("The traditional way", "الطريقة التقليدية"),
        label: t("CD-ROM", "قرص CD"),
        intro: t("For computers with a disc drive", "للأجهزة التي بها مشغل أقراص"),
        steps: [
          t("Insert the CD", "أدخل القرص"),
          t("Start / Install", "اختر Start / Install"),
          t("Yes · OK · Agree", "وافق بالضغط على Yes · OK · Agree"),
          t("Finish", "اضغط Finish")
        ]
      },
      {
        ico: "i-download",
        h: t("The modern way", "الطريقة الحديثة"),
        label: t("Online", "عبر الإنترنت"),
        intro: t("When there is no CD drive", "عند عدم توفر مشغل أقراص"),
        steps: [
          t("Get the download link + Product Key", "استلم رابط التحميل + Product Key"),
          t("Download Peachtree", "حمّل Peachtree"),
          t("Install & activate", "ثبّت البرنامج وفعّله")
        ]
      }
    ],
    note: t("<p><b>Presenter 1 of 6 · Opening and installation</b></p><p>There are two installation routes. On a computer with a disc drive, insert the CD, start the installer, and follow the prompts such as Yes, OK, or Agree until Finish. On a newer computer without a disc drive, use the authorized download link and Product Key, then download and install the program and complete activation.</p><p>Ask the audience which route fits a computer without a CD drive. Close by handing over to Presenter 2, who will show what to choose when Peachtree opens.</p>",
            "<p><b>المتحدث ١ من ٦ · الافتتاح والتثبيت</b></p><p>قدامنا طريقتين للتثبيت. لو الجهاز فيه مشغل أقراص، بندخل الـCD ونبدأ التثبيت ونتابع النوافذ، زي Yes وOK وAgree، لحد Finish. أما لو مفيهوش مشغل أقراص، بنستخدم رابط التحميل المعتمد ومفتاح المنتج، وبعدها ننزّل البرنامج ونثبته ونكمل التفعيل.</p><p>اسألوا الحضور: لو الجهاز مفيهوش CD، نستخدم أنهي طريقة؟ وفي النهاية سلّموا الكلام للمتحدث الثاني عشان يشرح اختيارات بداية البرنامج.</p>")
  },

  /* ========== 6 · STEP 1 (ALT) ========== */
  {
    id: "s01b",
    layout: "split",
    section: "install",
    step: "Step 1 — if needed",
    kicker: t("Step 01 · alternative", "الخطوة ٠١ · بديل"),
    title: t("If the Autorun window does not appear", "إذا لم تظهر نافذة Autorun"),
    sub: t("This happens when AutoPlay is disabled — start the setup manually.", "يحدث ذلك عند تعطيل التشغيل التلقائي — شغّل برنامج التثبيت يدويًا."),
    steps: [
      t("From the Windows Start menu, select Run.", "من قائمة Start في ويندوز، اختر Run."),
      t("Type “D:\\SETUP” and click OK.", "اكتب “D:\\SETUP” ثم اضغط OK."),
      t("Substitute the appropriate drive letter for your CD-ROM drive.", "استبدل حرف القرص بالحرف الصحيح لمحرك الأقراص لديك.")
    ],
    callout: { kind: "info", text: t("The letter D: is only an example — it may be E:, F:, G: … depending on your machine.", "الحرف D: مجرد مثال — قد يكون E: أو F: أو G: حسب جهازك.") },
    shots: [
      shot("02-run-setup",
        "Start ▸ Run with the command D:\\SETUP",
        "Start ▸ Run مع كتابة الأمر D:\\SETUP",
        "Capture the Run dialog box with D:\\SETUP typed in the Open / Command box.",
        "التقط نافذة Run بعد كتابة D:\\SETUP في خانة Open.")
    ],
    note: t("Ask the class: who saw the Autorun window and who did not? This is a very common situation in the lab, so make sure they know the manual method.",
            "اسأل الطلاب: من رأى نافذة Autorun ومن لم يرها؟ هذه حالة شائعة جدًا في المعمل، لذا تأكد من فهم الطلاب للطريقة اليدوية.")
  },

  /* ========== 7 · STEPS 2 – 3 ========== */
  {
    id: "s02",
    layout: "stack",
    section: "install",
    step: "Steps 2 – 3",
    kicker: t("Steps 02 – 03", "الخطوات ٠٢ – ٠٣"),
    title: t("Choose “Peachtree Accounting”, then Next", "اختر “Peachtree Accounting” ثم Next"),
    sub: t("The setup menu lists the products on the disc — pick the accounting program, not anything else.",
           "تظهر قائمة القرص بالبرامج المتاحة — اختر برنامج المحاسبة وليس أي برنامج آخر."),
    bullets: [
      t("Click the Peachtree Accounting install option.", "اضغط على خيار تثبيت Peachtree Accounting."),
      t("Read the information and instructions on the window, and then select Next.", "اقرأ المعلومات والتعليمات الظاهرة في النافذة، ثم اختر Next.")
    ],
    shots: [
      shot("03-install-option",
        "Setup menu with the Peachtree Accounting option",
        "قائمة التثبيت مع خيار Peachtree Accounting",
        "Capture the setup / Autorun menu showing all available products with Peachtree Accounting highlighted.",
        "التقط قائمة التثبيت التي تعرض كل البرامج مع تظليل Peachtree Accounting."),
      shot("04-welcome-next",
        "Welcome / information window with the Next button",
        "نافذة الترحيب والمعلومات وزر Next",
        "Capture the welcome screen after the product is chosen, with the Next button clearly visible.",
        "التقط شاشة الترحيب بعد اختيار البرنامج مع ظهور زر Next بوضوح.")
    ],
    note: t("Emphasise reading the instruction screen: it tells you which version you are about to install (Complete Accounting vs Premium).",
            "أكّد على قراءة شاشة التعليمات—she تحدد النسخة التي ستقوم بتثبيتها (Complete Accounting أم Premium).")
  },

  /* ========== 8 · STEP 4 ========== */
  {
    id: "s04",
    layout: "split",
    visual: true,
    section: "install",
    title: t("License & security", "الترخيص والحماية"),
    bullets: [
      t("Read the License Agreement and, if you accept the terms, select the Agree option.", "اقرأ اتفاقية الترخيص، وإذا قبلت الشروط اختر Agree."),
      t("Select Next. Choosing Disagree exits the installer.", "اضغط Next؛ اختيار Disagree ينهي التثبيت."),
      t("Read firewall and antivirus instructions and allow the installer when prompted.", "اقرأ تعليمات جدار الحماية ومكافحة الفيروسات واسمح للمثبت عند ظهور الطلب.")
    ],
    callout: { kind: "warn", text: t("Security notices are normal; follow the instructions shown on your computer.", "رسائل الحماية طبيعية؛ اتبع التعليمات الظاهرة على جهازك.") },
    shots: [
      shot("05-license-agree",
        "Agree",
        "موافقة",
        "Capture the license screen showing the radio buttons and “Agree” selected.",
        "التقط شاشة الترخيص مع تحديد زر Agree.")
    ],
    note: t("This is a good moment to explain what a license agreement is and why we never install software we do not have a licence for.",
            "هذه فرصة جيدة لشرح ما هي اتفاقية الترخيص ولماذا لا-install أي برنامج بدون ترخيص.")
  },

  /* ========== 9 · STEP 5 ========== */
  {
    id: "s05",
    layout: "split",
    section: "install",
    step: "Step 5",
    kicker: t("Step 05", "الخطوة ٠٥"),
    title: t("The Windows firewall warning — answer Yes", "تحذير جدار حماية ويندوز — اختر Yes"),
    sub: t("Peachtree needs network access to communicate with its licence service and to serve data on the network.",
           "يحتاج البرنامج إلى وصول للشبكة للتواصل مع خدمة الترخيص وخدمة البيانات."),
    bullets: [
      t("At this time you may receive a warning that the Microsoft Windows firewall has been detected.", "في هذه اللحظة قد يظهر تحذير يفيد اكتشاف جدار حماية ويندوز."),
      t("If so, we recommend that you select Yes.", "إذا ظهر التحذير فننصحك باختيار Yes."),
      t("This helps to ensure that Peachtree installs and runs correctly on your computer.", "وهذا يساعد على تثبيت البرنامج وتشغيله بشكل صحيح على جهازك.")
    ],
    shots: [
      shot("06-firewall-detected",
        "“Microsoft Windows firewall has been detected” warning",
        "تحذير “تم اكتشاف جدار حماية ويندوز”",
        "Capture the firewall warning screen exactly as it appears on your machine.",
        "التقط شاشة تحذير جدار الحماية كما تظهر على جهازك.")
    ],
    note: t("Ask the class what they think the warning means, then reveal the answer: the installer needs permission to open ports so the program can run.",
            "اسأل الطلاب عمّا يعني التحذير، ثم اكشف الإجابة: برنامج التثبيت يحتاج إذنًا لفتح منافذ حتى يعمل البرنامج.")
  },

  /* ========== 10 · STEPS 6 – 7 ========== */
  {
    id: "s06",
    layout: "stack",
    section: "install",
    step: "Steps 6 – 7",
    kicker: t("Steps 06 – 07", "الخطوات ٠٦ – ٠٧"),
    title: t("Third-party firewall & anti-virus notices", "إشعارات جدار الحماية ومكافحة الفيروسات"),
    sub: t("If you run extra security software, the installer pauses twice more so you can adjust it.",
           "إذا كان لديك برنامج حماية إضافي، سيتوقف برنامج التثبيت مرتين أخريين لتعديله."),
    bullets: [
      t("Read the firewall notice carefully and follow any directions.", "اقرأ إشعار جدار الحماية بعناية واتبع التعليمات."),
      t("For detailed step-by-step help see peachtree.com/support/firewall_install_tips.cfm", "للمساعدة التفصيلية راجع peachtree.com/support/firewall_install_tips.cfm"),
      t("Click OK when you have finished modifying your firewall setup.", "اضغط OK بعد الانتهاء من تعديل جدار الحماية."),
      t("An anti-virus message will name the software running on your computer — read it and follow the directions.", "ستظهر رسالة تذكر اسم برنامج مكافحة الفيروسات لديك — اقرأها واتبع التعليمات."),
      t("Click OK when you have completed the instructions.", "اضغط OK عند الانتهاء من التعليمات.")
    ],
    callout: { kind: "good", text: t("These screens are normal — they appear on almost every office computer. They are not errors.", "هذه الشاشات طبيعية — تظهر على أغلب أجهزة العمل وليست أخطاء.") },
    shots: [
      shot("07-firewall-software",
        "Notice about third-party firewall software running",
        "إشعار بوجود برنامج جدار حماية خارجي",
        "Capture the screen that names the firewall product installed on the machine.",
        "التقط الشاشة التي تذكر اسم برنامج جدار الحماية الموجود على الجهاز."),
      shot("08-antivirus-warning",
        "Anti-virus software message during installation",
        "رسالة برنامج مكافحة الفيروسات أثناء التثبيت",
        "Capture the screen naming the anti-virus product, before you press OK.",
        "التقط الشاشة التي تذكر برنامج مكافحة الفيروسات قبل الضغط على OK.")
    ],
    note: t("Point out the support URL on screen. If a student is stuck here, this is the page the manual refers to.",
            "أشر إلى رابط الدعم الظاهر على الشاشة. إذا تعثّر أحد الطلاب هنا فهذا هو الرابط المشار إليه في الكتاب.")
  },

  /* ========== 11 · STEP 8 ========== */
  {
    id: "s08",
    layout: "split",
    visual: true,
    section: "install",
    title: t("Serial number", "الرقم التسلسلي"),
    shots: [
      shot("09-serial-number",
        "Serial number",
        "الرقم التسلسلي",
        "Capture the serial field, but cover the number before sharing the image.",
        "التقط خانة الرقم، مع تغطية الرقم نفسه قبل مشاركة الصورة.")
    ],
    note: t("Keep the serial number visible in the printed manual — do not write it on the disc itself.",
            "احتفظ بالرقم التسلسلي ظاهرًا في كتيّب Instruction — لا تكتبه على القرص نفسه.")
  },

  /* ========== 12 · STEP 9 ========== */
  {
    id: "s09",
    layout: "split",
    visual: true,
    section: "install",
    title: t("Standalone", "تثبيت مستقل"),
    shots: [
      shot("10-standalone-network",
        "Standalone",
        "تثبيت مستقل",
        "Capture this decision window — it is the classic screenshot of the lab.",
        "التقط نافذة الاختيار هذه — فهي أشهر صورة في المعمل.")
    ],
    note: t("This is the most important conceptual question of the installation: standalone = the program AND the data live on one computer.",
            "هذا أهم سؤال مفاهيمي في التثبيت: standalone يعني أن البرنامج والبيانات معًا على جهاز واحد.")
  },

  /* ========== 13 · STEP 10 ========== */
  {
    id: "s10",
    layout: "split",
    section: "install",
    step: "Step 10",
    kicker: t("Step 10", "الخطوة ١٠"),
    title: t("Store the company data on this computer?", "هل تريد حفظ بيانات الشركات على هذا الجهاز؟"),
    sub: t("Company data = your customers, vendors, invoices, chart of accounts …",
           "بيانات الشركات = عملاءك ومورديك وفواتيرك ودليل الحسابات …"),
    bullets: [
      t("Select Yes to the question “Will you store Peachtree company data on this computer?”", "اختر Yes على السؤال: هل ستخزن بيانات شركات Peachtree على هذا الجهاز؟"),
      t("Click Next.", "ثم اضغط Next.")
    ],
    callout: { kind: "good", text: t("Answering Yes is what makes this a single-computer installation, exactly as our lab requires.", "اختيار Yes هو ما يجعل التثبيت على جهاز واحد تمامًا كما يتطلب المعمل.") },
    shots: [
      shot("11-store-data",
        "Question about storing Peachtree company data on this computer",
        "شاشة سؤال حفظ بيانات الشركات على هذا الجهاز",
        "Capture the question screen with Yes selected and Next visible.",
        "التقط شاشة السؤال مع تحديد Yes وظهور زر Next.")
    ],
    note: t("Link back to the introduction: this is where you promised that program files and company data stay on the same computer.",
            "اربط بما قلته في المقدمة: هنا وعدت أن ملفات البرنامج وبيانات الشركات تبقى على نفس الجهاز.")
  },

  /* ========== 14 · STEP 11 ========== */
  {
    id: "s11",
    layout: "split",
    visual: true,
    section: "install",
    title: t("Program & data folders", "مجلدا البرنامج والبيانات"),
    shots: [
      shot("12-program-files-path",
        "Program files",
        "ملفات البرنامج",
        "Capture the path box (showing the folder path) with the Next button.",
        "التقط خانة المسار ومعها مسار المجلد وزر Next."),
      shot("13-company-data-path",
        "Company data",
        "بيانات الشركة",
        "Capture the company data location and Browse button.",
        "التقط موقع بيانات الشركات وزر Browse.")
    ],
    note: t("Point out that the program and company data use separate folders.",
            "وضّح أن البرنامج وبيانات الشركة يستخدمان مجلدين منفصلين.")
  },

  /* ========== 15 · STEP 12 ========== */
  {
    id: "s12",
    layout: "split",
    section: "install",
    step: "Step 12",
    kicker: t("Step 12", "الخطوة ١٢"),
    title: t("Choose where the company data files go", "اختر مكان ملفات بيانات الشركات"),
    sub: t("Accept the default location, or click Browse and pick a different one.",
           "اترك الموقع الافتراضي، أو اضغط Browse واختر موقعًا آخر."),
    bullets: [
      t("Accept the default location for your Peachtree company data files …", "اقبل الموقع الافتراضي لملفات بيانات شركات Peachtree …"),
      t("… or click Browse and select a different location.", "… أو اضغط Browse واختر موقعًا مختلفًا."),
      t("Click Next to continue.", "اضغط Next للمتابعة.")
    ],
    callout: { kind: "info", text: t("Ask your instructor before changing this location — the lab usually keeps the default.", "اسأل المدرب قبل تغيير هذا الموقع — المعمل عادةً يترك الموقع الافتراضي.") },
    shots: [
      shot("13-company-data-path",
        "Company data files location with the Browse button",
        "موقع ملفات بيانات الشركات مع زر Browse",
        "Capture the folder window / Browse button used to change the data location.",
        "التقط نافذة المجلد أو زر Browse المستخدم لتغيير موقع البيانات.")
    ],
    note: t("Explain that the data folder is the one you must back up regularly — it holds every transaction you enter.",
            "اشرح أن مجلد البيانات هو ما يجب نسخه احتياطيًا بانتظام لأنه يحتوي على كل الحركات التي تدخلها.")
  },

  /* ========== 16 · STEP 13 ========== */
  {
    id: "s13",
    layout: "split",
    section: "install",
    step: "Step 13",
    kicker: t("Step 13", "الخطوة ١٣"),
    title: t("Components — Premium Accountants’ Edition only", "المكونات — نسخة Premium للمحاسبين فقط"),
    sub: t("This window appears only if you are installing Peachtree Premium – Accountants’ Edition.",
           "تظهر هذه النافذة فقط عند تثبيت نسخة Peachtree Premium – Accountants’ Edition."),
    bullets: [
      t("The Components window lets you select certain Peachtree components for installation.", "تتيح لك نافذة Components تحديد مكونات Peachtree التي سيتم تثبيتها."),
      t("Follow the on-screen instructions.", "اتبع التعليمات الظاهرة على الشاشة."),
      t("Then select Next to continue.", "ثم اختر Next للمتابعة.")
    ],
    callout: { kind: "info", text: t("Complete Accounting users skip this step entirely — mention it so nobody panics when they do not see the window.", "مستخدمو Complete Accounting يتخطون هذه الخطوة — اذكر ذلك حتى لا يرتبك أحد لعدم ظهورها.") },
    shots: [
      shot("14-components",
        "Components selection window (Premium Accountants’ Edition)",
        "نافذة اختيار المكونات (Premium Accountants’ Edition)",
        "Only if you have the Premium edition — capture the list of components with its check boxes.",
        "فقط إذا كانت لديك نسخة Premium — التقط قائمة المكونات مع مربعات الاختيار.")
    ],
    note: t("Keep this slide short for Complete Accounting students; expand on it only for the Accountants’ Edition group.",
            "اجعل هذه الشريحة سريعة لطلاب Complete Accounting، ووسّعها فقط مع مجموعة المحاسبين.")
  },

  /* ========== 17 · STEP 14 ========== */
  {
    id: "s14",
    layout: "split",
    visual: true,
    section: "install",
    title: t("Install & finish", "التثبيت والإنهاء"),
    shots: [
      shot("15-review-install",
        "Install",
        "تثبيت",
        "Capture the review screen showing both paths and the Install button.",
        "التقط شاشة المراجعة التي تعرض المسارين وزر Install."),
      shot("16-installation-completed",
        "Finish",
        "إنهاء",
        "Capture the final installer screen with its options and Finish button.",
        "التقط شاشة المثبت الأخيرة مع الخيارات وزر Finish.")
    ],
    note: t("Read the two paths aloud so students hear a real folder structure: program folder vs company folder.",
            "اقرأ المسارين بصوت عالٍ ليستمع الطلاب لبنية مجلدات حقيقية: مجلد البرنامج مقابل مجلد الشركة.")
  },

  /* ========== 18 · STEPS 15 – 16 ========== */
  {
    id: "s15",
    layout: "stack",
    section: "install",
    step: "Steps 15 – 16",
    kicker: t("Steps 15 – 16", "الخطوات ١٥ – ١٦"),
    title: t("Installation Completed — choose your options and Finish", "اكتمل التثبيت — اختر الخيارات واضغط Finish"),
    sub: t("Three check boxes decide what happens the moment you finish.",
           "ثلاثة مربعات اختيار تحدد ما سيحدث فور إنهائك."),
    bullets: [
      { en: "Start Peachtree — check this box if you want Peachtree to start as soon as you click Finish.", ar: "Start Peachtree — ضع علامة إذا أردت تشغيل البرنامج فور الضغط على Finish." },
      { en: "View Network Setup Tips — you can uncheck this for a single-user installation.", ar: "View Network Setup Tips — يمكن إلغاء تحديده في التثبيت على جهاز واحد." },
      { en: "View the Release Notes — check to read about the new features of this version.", ar: "View the Release Notes — ضع علامة لقراءة الميزات الجديدة في هذه النسخة." }
    ],
    callout: { kind: "good", text: t("Check or uncheck as desired, then select the Finish button to complete the installation.", "اضبط المربعات كما تريد، ثم اضغط Finish لإنهاء التثبيت.") },
    shots: [
      shot("16-installation-completed",
        "Installation Completed window with its three options",
        "نافذة Installation Completed بخياراتها الثلاثة",
        "Capture the final installer window with all three check boxes visible, just before you press Finish.",
        "التقط نافذة التثبيت الأخيرة مع ظهور مربعات الاختيار الثلاثة قبل الضغط على Finish.")
    ],
    note: t("Point out the three options one by one, and mention that Release Notes is a good place to find what is new in the version you installed.",
            "أشر إلى الخيارات الثلاثة واحدًا تلو الآخر، واذكر أن Release Notes مكان جيد لمعرفة الجديد في النسخة التي ثبّتها.")
  },

  /* ========== 19 · DIVIDER — START ========== */
  {
    id: "div-start",
    layout: "divider",
    section: "start",
    num: "02",
    title: t("Starting the Peachtree", "تشغيل برنامج Peachtree"),
    sub: t("The program is installed. Now we open it and work with a training company so nothing you do can break real data.",
           "تم تثبيت البرنامج. الآن نفتحه ونعمل على شركة تدريبية حتى لا تتأثر بيانات حقيقية."),
    note: t("Transition slide — use it to remind the class that the installation part is finished.",
            "شريحة انتقال — استخدمها لتذكير الطلاب بأن جزء التثبيت قد انتهى.")
  },

  /* ========== 20 · SAMPLE COMPANY ========== */
  {
    id: "sample",
    layout: "welcome-options",
    section: "start",
    title: t("Four ways to start", "أربع اختيارات للبداية"),
    options: [
      {
        ico: "i-book",
        h: t("Open an Existing Company", "فتح شركة موجودة"),
        p: t("Continue with company data you already have.", "تكمل العمل على بيانات شركة موجودة عندك.")
      },
      {
        ico: "i-disk",
        h: t("Create a New Company", "إنشاء شركة جديدة"),
        p: t("Set up a company from scratch.", "تجهز شركة جديدة من البداية.")
      },
      {
        ico: "i-play",
        h: t("Explore a Sample Company", "استكشاف شركة تجريبية"),
        p: t("Learn inside a ready-made company.", "تتعلم باستخدام شركة جاهزة."),
        selected: true
      },
      {
        ico: "i-help",
        h: t("Learn about Peachtree", "التعرّف على Peachtree"),
        p: t("View information about the program.", "تتعرف على معلومات عن البرنامج.")
      }
    ],
    note: t("<p><b>Presenter 2 of 6 · Starting and exploring</b></p><p>When Peachtree opens, it offers four choices: open an existing company, create a new company, explore a sample company, or learn about Peachtree. Each serves a different purpose. For today’s demonstration we choose <i>Explore a Sample Company</i>, because it lets us learn from ready-made data without setting up a company from scratch.</p><p>Transition: Let’s open the sample company together.</p>",
            "<p><b>المتحدث ٢ من ٦ · تشغيل البرنامج واستكشافه</b></p><p>لما Peachtree يفتح، بيظهر لنا أربع اختيارات: نفتح شركة موجودة، أو ننشئ شركة جديدة، أو نستكشف شركة تجريبية، أو نقرأ معلومات عن البرنامج. كل اختيار له غرض. في عرضنا هنختار <i>Explore a Sample Company</i>، لأنها بتخلينا نتعلم من بيانات جاهزة من غير ما نجهّز شركة من الصفر.</p><p>انتقال: تعالوا نفتح الشركة التجريبية.</p>")
  },

  {
    id: "sample-focus",
    layout: "sample-path",
    section: "start",
    title: t("Let’s explore a sample company", "يلا نستكشف شركة تجريبية"),
    steps: [
      { n: "01", ico: "i-play", h: t("Choose Explore", "اختر Explore"), p: t("Start with the ready-made sample.", "ابدأ بالشركة الجاهزة.") },
      { n: "02", ico: "i-list", h: t("Select Bellwether", "اختر Bellwether"), p: t("Bellwether Garden Supply", "Bellwether Garden Supply") },
      { n: "03", ico: "i-globe", h: t("Look around", "ابدأ الاستكشاف"), p: t("See how the program works.", "اتعرف على إمكانيات البرنامج.") }
    ],
    shots: [
      shot("17-peachtree-welcome",
        "Choose Explore a Sample Company",
        "اختر Explore a Sample Company",
        "Capture the welcome screen and highlight the Explore a Sample Company choice.",
        "التقط شاشة البداية وحدد اختيار Explore a Sample Company."),
      shot("18-sample-company-list",
        "Select Bellwether Garden Supply",
        "اختر Bellwether Garden Supply",
        "Capture Bellwether Garden Supply selected and the Okay button visible.",
        "التقط نافذة الشركات مع تحديد Bellwether Garden Supply وظهور زر Okay.")
    ],
    note: t("<p><b>Presenter 2 of 6 · Starting and exploring</b></p><p>First, select <i>Explore a Sample Company</i>. From the sample-company list, choose <i>Bellwether Garden Supply</i> and continue. Bellwether is a prepared example company, so we can look around and understand the program before entering information for a real business.</p><p>Point to both screenshots as you describe the sequence. Then hand over to Presenter 3 for a tour of the main window.</p>",
            "<p><b>المتحدث ٢ من ٦ · تشغيل البرنامج واستكشافه</b></p><p>أول حاجة نختار <i>Explore a Sample Company</i>. بعد كده من قائمة الشركات التجريبية نحدد <i>Bellwether Garden Supply</i> ونكمل. دي شركة مجهزة مسبقًا، فنقدر نستكشف البرنامج ونتعلم عليه قبل إدخال بيانات شركة حقيقية.</p><p>أشر للصورتين بالترتيب وأنت بتشرح. بعد كده سلّم للمتحدث الثالث عشان ياخدنا في جولة داخل النافذة الرئيسية.</p>")
  },

  /* ========== 21 · CREATE YOUR OWN COMPANY ========== */
  {
    id: "own-company",
    layout: "cards",
    section: "start",
    kicker: t("Next step for you", "الخطوة التالية لك"),
    title: t("Create your own company with your data", "أنشئ شركتك الخاصة ببياناتك"),
    sub: t("Once you are comfortable with the sample, set up a real company file — it takes three decisions.",
           "بعد أن تتقن التعامل مع الشركة التجريبية، أنشئ ملف شركة حقيقي — يحتاج ذلك لثلاثة اختيارات."),
    cards: [
      { ico: "i-book", h: t("Company information", "بيانات الشركة"), p: t("Name, address, phone, e-mail and the fiscal year your books will cover.", "الاسم والعنوان والتليفون والبريد الإلكتروني والسنة المالية التي ستغطيها الحسابات.") },
      { ico: "i-list", h: t("Chart of accounts", "دليل الحسابات"), p: t("Load the chart that matches your business type, then adjust it if needed.", "اختر دليلًا يناسب نوع نشاطك ثم عدّله عند الحاجة.") },
      { ico: "i-globe", h: t("Sales taxes & defaults", "ضرائب المبيعات والإعدادات"), p: t("Set the tax handling and the default information used on every transaction.", "اضبط التعامل مع الضرائب والمعلومات الافتراضية المستخدمة في كل عملية.") }
    ],
    callout: { kind: "good", text: t("Create the company before you start entering real transactions — the file structure is built once, at the start.", "أنشئ الشركة قبل إدخال أي عمليات حقيقية — يتم بناء هيكل الملف مرة واحدة في البداية.") },
    note: t("This slide is your bridge from the manual to real practice. Ask the class which of the three steps they think is the hardest.",
            "هذه الشريحة هي الجسر بين الكتاب والتطبيق الحقيقي. اسأل الطلاب أي الخطوات الثلاث برأيهم الأصعب.")
  },

  /* ========== 22 · DIVIDER — TOUR ========== */
  {
    id: "div-tour",
    layout: "divider",
    section: "tour",
    num: "03",
    title: t("Exploring the Peachtree window", "استكشاف نافذة البرنامج"),
    sub: t("Two tool bars, one menu bar, and the menus that hold every command in the program.",
           "شريطا أدوات، شريط قوائم، والقوائم التي تحتوي على كل أوامر البرنامج."),
    note: t("Say that from here on the presentation is a visual tour — keep the screenshots large and click through them one by one.",
            "قل إن العرض من هنا فصاعدًا هو جولة بصرية — اجعل الصور كبيرة ومرر عليها واحدة واحدة.")
  },

  /* ========== 23 · WINDOW ANATOMY ========== */
  {
    id: "interface-full",
    layout: "stack",
    visual: true,
    section: "tour",
    title: t("Peachtree program window", "واجهة برنامج Peachtree"),
    shots: [
      shot("20-full-interface",
        "The complete program interface",
        "واجهة البرنامج كاملة",
        "Full Peachtree window showing the title bar, menus, navigation and work area.",
        "واجهة Peachtree كاملة وتظهر شريط العنوان والقوائم والتنقل ومساحة العمل.")
    ],
    note: t("<p><b>Presenter 3 of 6 · The program interface</b></p><p>Take a moment to look at the complete Peachtree window. It brings together the company we opened, the menus and navigation tools, and the central work area where accounting tasks are handled. This is the overall map; next we will zoom in on two landmarks at the top.</p>",
            "<p><b>المتحدث ٣ من ٦ · واجهة البرنامج</b></p><p>خلّونا نبص لحظة على نافذة Peachtree كاملة. هنلاقي فيها الشركة اللي فتحناها، والقوائم وأدوات التنقل، ومساحة العمل اللي بننفذ فيها المهام المحاسبية. دي الخريطة العامة للبرنامج؛ وبعدها هنركز على علامتين مهمتين في أعلى النافذة.</p>")
  },

  {
    id: "anatomy",
    layout: "stack",
    visual: true,
    section: "tour",
    title: t("Title Bar & Menu Bar", "شريط العنوان وشريط القوائم"),
    shots: [
      shot("20-title-bar",
        "Title bar",
        "شريط العنوان",
        "Crop the screenshot to the top strip of the window only.",
        "قص لقطة الشاشة لتظهر شريط العنوان فقط في أعلى النافذة.",
        "Shows the open company name.",
        "يعرض اسم الشركة المفتوحة."),
      shot("21-menu-bar",
        "Menu bar",
        "شريط القوائم",
        "Crop the screenshot to the menu row only, under the title bar.",
        "قص لقطة الشاشة لتظهر صف القوائم فقط أسفل شريط العنوان.",
        "Main program commands.",
        "أوامر البرنامج الرئيسية.")
    ],
    note: t("<p><b>Presenter 3 of 6 · The program interface</b></p><p>The title bar identifies the company currently open, so check it before working with data. Directly below it, the menu bar groups the program’s commands. A useful way to remember the difference is: the title bar tells us <i>which company</i> we are in; the menu bar tells us <i>what actions</i> are available.</p><p>Transition: Presenter 4 will walk us through the menus and show examples.</p>",
            "<p><b>المتحدث ٣ من ٦ · واجهة البرنامج</b></p><p>شريط العنوان بيعرّفنا اسم الشركة المفتوحة، فنتأكد منه قبل ما نشتغل على البيانات. وتحته مباشرة شريط القوائم، اللي بيرتب أوامر البرنامج. افتكروا الفرق ببساطة: شريط العنوان بيقول لنا <i>إحنا شغالين على أنهي شركة</i>، وشريط القوائم بيقول لنا <i>نقدر نعمل إيه</i>.</p><p>انتقال: المتحدث الرابع هيشرح القوائم ويعرض أمثلة عليها.</p>")
  },

  {
    id: "menu-overview",
    layout: "cards",
    section: "tour",
    title: t("What’s in the menu bar?", "ماذا يوجد في شريط القوائم؟"),
    cards: [
      { ico: "i-disk", h: t("File & Edit", "File و Edit"), p: t("Open, create, print, back up; correct and find entries.", "فتح وإنشاء وطباعة ونسخ احتياطي؛ تصحيح البيانات والبحث.") },
      { ico: "i-list", h: t("List & Maintain", "List و Maintain"), p: t("View customer, sales, purchase and account lists; add or edit customers and vendors.", "عرض قوائم العملاء والمبيعات والمشتريات والحسابات؛ إضافة العملاء والموردين أو تعديلهم.") },
      { ico: "i-globe", h: t("Analysis", "Analysis"), p: t("Financial analysis tools, including Cash Flow Management.", "أدوات التحليل المالي، ومنها إدارة التدفقات النقدية.") },
      { ico: "i-help", h: t("Options, Reports & Forms, Services, Help", "Options و Reports & Forms و Services و Help"), p: t("Settings, reports, online services and support.", "الإعدادات والتقارير والخدمات الإلكترونية والمساعدة.") }
    ],
    note: t("<p><b>Presenter 4 of 6 · Menu tour, part one</b></p><p>Before opening each menu, let’s group them by purpose. File and Edit handle company files and corrections; List and Maintain help us view and manage records; Analysis offers financial tools; the remaining menus provide settings, reports, services, and help. We’ll now look at the actual menu examples.</p>",
            "<p><b>المتحدث ٤ من ٦ · جولة القوائم، الجزء الأول</b></p><p>قبل ما نفتح كل قائمة، خلّونا نقسمها حسب وظيفتها. File وEdit لملفات الشركة والتصحيح؛ وList وMaintain لعرض السجلات وإدارتها؛ وAnalysis للأدوات المالية؛ وباقي القوائم للإعدادات والتقارير والخدمات والمساعدة. دلوقتي هنشوف أمثلة القوائم نفسها.</p>")
  },

  /* ========== 24 · MENU MAP ========== */
  {
    id: "menu-core",
    layout: "menu-gallery",
    columns: 2,
    section: "tour",
    title: t("File & Edit", "File و Edit"),
    shots: [
      shot("menu-file", "File", "File", "Open the File menu.", "افتح قائمة File.",
        "New Ctrl+N · Open Ctrl+O · Print · Backup", "جديد Ctrl+N · فتح Ctrl+O · طباعة · نسخة احتياطية"),
      shot("menu-edit", "Edit", "Edit", "Open the Edit menu.", "افتح قائمة Edit.",
        "Correction · Find Ctrl+F", "تصحيح · بحث Ctrl+F")
    ],
    note: t("<p><b>Presenter 4 of 6 · Menu tour, part one</b></p><p>The File menu contains company-level actions such as creating or opening a company, printing, and making a backup. Edit is for working with entered information: it includes correction tools and Find, which can be opened with Ctrl+F. These menus help us manage the company and locate or correct its entries.</p>",
            "<p><b>المتحدث ٤ من ٦ · جولة القوائم، الجزء الأول</b></p><p>قائمة File فيها أوامر على مستوى الشركة، زي إنشاء شركة أو فتحها والطباعة وعمل نسخة احتياطية. أما Edit فبتساعدنا نتعامل مع المعلومات اللي دخلناها، ومنها التصحيح والبحث Find، واختصاره Ctrl+F. يعني الأولى لإدارة ملف الشركة، والتانية للبحث عن البيانات وتصحيحها.</p>")
  },

  {
    id: "menu-more",
    layout: "menu-gallery",
    columns: 2,
    section: "tour",
    title: t("List & Maintain", "List و Maintain"),
    shots: [
      shot("22-list-menu", "List", "List", "Open the List menu.", "افتح قائمة List.",
        "Customers · Sales · Purchases · Chart of Accounts", "العملاء · المبيعات · المشتريات · دليل الحسابات"),
      shot("23-maintain-menu", "Maintain", "Maintain", "Open the Maintain menu.", "افتح قائمة Maintain.",
        "Add/edit Customers and Vendors", "إضافة وتعديل العملاء والموردين")
    ],
    note: t("<p><b>Presenter 4 of 6 · Menu tour, part one</b></p><p>List is where we browse organized records—for example customers, sales, purchases, and the Chart of Accounts. Maintain is where we create or update key records, such as customer and vendor details. Put simply: use List to look through information, and Maintain to add or change it.</p><p>Pass to Presenter 5 for the other menu groups.</p>",
            "<p><b>المتحدث ٤ من ٦ · جولة القوائم، الجزء الأول</b></p><p>قائمة List بنستعرض منها السجلات المرتبة، زي العملاء والمبيعات والمشتريات ودليل الحسابات. أما Maintain فنستخدمها لإنشاء أو تحديث البيانات الأساسية، زي بيانات العميل والمورد. باختصار: List لعرض المعلومات، وMaintain لإضافتها أو تعديلها.</p><p>سلّموا للمتحدث الخامس عشان يكمل باقي مجموعات القوائم.</p>")
  },

  /* ========== ANALYSIS & OPTIONS ========== */
  {
    id: "list-menu",
    layout: "menu-gallery",
    columns: 2,
    section: "tour",
    title: t("Analysis & Options", "Analysis و Options"),
    shots: [
      shot("menu-analysis", "Analysis", "Analysis", "Analysis menu: financial tools and business analysis.", "قائمة Analysis: أدوات مالية وتحليل الأعمال.",
        "Cash Flow · Collections · Payments · Business analysis", "التدفقات النقدية · التحصيلات · المدفوعات · تحليل الأعمال"),
      shot("menu-options", "Options", "Options", "Options menu: program and company settings.", "قائمة Options: إعدادات البرنامج والشركة.",
        "Global · System date · Internet · Defaults", "عام · تاريخ النظام · الإنترنت · الإعدادات الافتراضية")
    ],
    note: t("<p><b>Presenter 5 of 6 · Menu tour, part two</b></p><p>Analysis gathers tools for understanding business finances, including cash-flow information. Options is different: it contains settings that affect the program or company. When demonstrating, point to the menu names and connect each to its purpose—Analysis to review, Options to configure.</p>",
            "<p><b>المتحدث ٥ من ٦ · جولة القوائم، الجزء الثاني</b></p><p>قائمة Analysis فيها أدوات تساعدنا نفهم الوضع المالي للنشاط، ومنها معلومات التدفقات النقدية. أما Options فوظيفتها مختلفة: فيها إعدادات تخص البرنامج أو الشركة. وأنت بتشرح، أشر لاسم كل قائمة واربطه بغرضها: Analysis للمراجعة والتحليل، وOptions للضبط والإعداد.</p>")
  },

  {
    id: "other-menus",
    layout: "menu-gallery",
    columns: 3,
    section: "tour",
    title: t("Reports, Services & Help", "Reports و Services و Help"),
    shots: [
      shot("menu-reports-forms", "Reports & Forms", "Reports & Forms", "Reports & Forms menu with its report categories.", "قائمة Reports & Forms وفئات التقارير.",
        "Financial · Inventory · Payroll · Company reports", "تقارير مالية · مخزون · مرتبات · الشركة"),
      shot("menu-services", "Services", "Services", "Services menu with update and online service options.", "قائمة Services وبها خيارات التحديث والخدمات الإلكترونية.",
        "Updates · My account · Online services", "التحديثات · حسابي · خدمات إلكترونية"),
      shot("menu-help", "Help", "Help", "Help menu with manuals and support options.", "قائمة Help وبها الأدلة وخيارات الدعم.",
        "Help · What’s new · Guides · Manuals", "المساعدة · الجديد · أدلة الاستخدام")
    ],
    note: t("<p><b>Presenter 5 of 6 · Menu tour, part two</b></p><p>Reports & Forms is where we go to find reports and forms, such as financial or inventory reports. Services provides online services and update options. Help gives access to guidance and support when we need instructions. That completes our tour of the main menu groups; next we’ll see how to protect company data.</p>",
            "<p><b>المتحدث ٥ من ٦ · جولة القوائم، الجزء الثاني</b></p><p>لما نحتاج تقرير أو نموذج، نروح إلى Reports & Forms، زي التقارير المالية أو تقارير المخزون. Services فيها الخدمات الإلكترونية وخيارات التحديث. وHelp بنرجع لها عشان الإرشادات والدعم. كده خلصنا جولة القوائم الرئيسية؛ والجزء الجاي عن حماية بيانات الشركة.</p>")
  },

  /* ========== 26 · MAINTAIN MENU ========== */
  {
    id: "maintain-menu",
    layout: "menu-detail",
    section: "tour",
    kicker: t("Menu 04", "القائمة ٠٤"),
    title: t("The Maintain menu — master data", "قائمة Maintain — البيانات الأساسية"),
    sub: t("This is where every list is created and kept up to date.",
           "هنا يتم إنشاء كل قائمة والحفاظ على تحديثها."),
    items: [
      t("Customers / prospects", "العملاء / العملاء المحتملون"),
      t("Vendors", "الموردون"),
      t("Employees / sales reps", "الموظفون / مندوبو المبيعات"),
      t("Payroll", "المرتبات"),
      t("Chart of accounts", "دليل الحسابات"),
      t("Budgets", "الميزانيات"),
      t("Inventory items", "أصناف المخزون"),
      t("Item prices", "أسعار الأصناف"),
      t("Job costs", "تكلفة المشاريع"),
      t("Fixed assets", "الأصول الثابتة"),
      t("Company information", "بيانات الشركة"),
      t("Memorized transactions", "العمليات المحفوظة"),
      t("Default information", "المعلومات الافتراضية"),
      t("Sales tax users", "مستخدمو ضريبة المبيعات")
    ],
    callout: { kind: "warn", text: t("Entering customers, vendors and inventory correctly here saves you hours later — bad master data breaks every report.", "إدخال العملاء والموردين والمخزون بشكل صحيح هنا يوفر عليك ساعات لاحقًا — البيانات الأساسية الخاطئة تفسد كل التقارير.") },
    shots: [
      shot("23-maintain-menu",
        "The Maintain menu open with all fourteen entries",
        "قائمة Maintain مفتوحة بكل العناصر الأربعة عشر",
        "Capture the opened Maintain menu — keep the whole drop-down inside the frame.",
        "التقط قائمة Maintain المفتوحة — يجب أن تظهر القائمة المنسدلة كاملة داخل الإطار.")
    ],
    note: t("Group the fourteen items for the class: people (customers, vendors, employees, payroll), structure (chart, budgets), stock (items, prices, jobs, fixed assets), and settings (company info, memorized, defaults, tax users).",
            "اجمع العناصر الأربعة عشر للطلاب: الأشخاص (العملاء، الموردون، الموظفون، المرتبات)، الهيكل (الدليل، الميزانيات)، المخزون (الأصناف، الأسعار، المشاريع، الأصول الثابتة)، والإعدادات (بيانات الشركة، المحفوظات، الافتراضيات، الضرائب).")
  },

  /* ========== 27 · NAVIGATING BAR & CENTER ========== */
  {
    id: "navigate",
    layout: "stack",
    visual: true,
    section: "tour",
    title: t("Navigation", "التنقل"),
    shots: [
      shot("24-navigating-bar",
        "Navigating Bar",
        "شريط التنقل",
        "Crop the screenshot to the icon strip, or circle it with a tool.",
        "قص لقطة الشاشة على شريط الأيقونات، أو استخدم أداة رسم لتمييزه."),
      shot("25-navigating-center",
        "Navigating Center",
        "مركز التنقل",
        "Capture the Navigating Center window opened from the program.",
        "التقط نافذة مركز التنقل المفتوحة من البرنامج.")
    ],
    note: t("Demonstrate live if possible: click Customers on the navigating bar, then close it and reach the same window through Maintain ▸ Customers — the comparison teaches both routes.",
            " نفّذ ذلك عمليًا إن أمكن: اضغط العملاء في شريط التنقل، ثم أغلق النافذة وافتح نفس النافذة من Maintain ▸ Customers — المقارنة تعلّم الطريقتين.")
  },

  /* ========== 28 · DIVIDER — UNINSTALL ========== */
  {
    id: "div-uninstall",
    layout: "divider",
    section: "uninstall",
    num: "04",
    title: t("Uninstalling Peachtree Complete Accounting", "إزالة تثبيت البرنامج"),
    sub: t("The last learning objective — and the one students forget on a lab machine.",
           "الهدف الأخير — وهو الهدف الذي ينساه الطلاب على جهاز المعمل."),
    note: t("Short transition. Warn the class: do not uninstall on the lab machine unless the instructor asks you to.",
            "انتقال قصير. حذّر الطلاب: لا تزل البرنامج من جهاز المعمل إلا إذا طلب منك المدرب ذلك.")
  },

  /* ========== 29 · BACKUP ========== */
  {
    id: "backup",
    layout: "backup-path",
    section: "uninstall",
    title: t("Back up your company data", "أنشئ نسخة احتياطية لبيانات الشركة"),
    method: {
      ico: "i-disk",
      h: t("Protect your company data", "احمِ بيانات الشركة"),
      label: t("BACKUP", "نسخة احتياطية"),
      intro: t("A quick safety copy before you close.", "احفظ نسخة آمنة قبل إغلاق الشركة."),
      steps: [
        t("Open File", "افتح File"),
        t("Choose Back up", "اختر Back up"),
        t("Choose a location", "حدد مكان الحفظ")
      ]
    },
    shots: [
      shot("menu-file", "Choose Back up from File", "اختر Back up من قائمة File",
        "The File menu with Back up highlighted in the list.", "قائمة File وبداخلها خيار Back up.",
        "Choose Back up to start the backup.", "اختر Back up لبدء النسخ الاحتياطي.")
    ],
    note: t("<p><b>Presenter 6 of 6 · Backup, uninstall, and closing</b></p><p>A backup is a separate copy of the company data that we can keep in case we need to restore it. From the open company, choose File, then Back up; select a suitable save location and confirm. Do this before closing, and make sure you know where the backup was saved.</p><p>Transition: The final practical topic is removing the program from Windows.</p>",
            "<p><b>المتحدث ٦ من ٦ · النسخ الاحتياطي والإزالة والختام</b></p><p>النسخة الاحتياطية هي نسخة منفصلة من بيانات الشركة نحتفظ بها لو احتجنا نسترجع البيانات بعدين. من داخل الشركة نختار File ثم Back up، ونحدد مكان مناسب للحفظ ونؤكد العملية. اعمل النسخة قبل الإغلاق، واتأكد إنك عارف اتحفظت فين.</p><p>انتقال: آخر موضوع عملي هو إزالة البرنامج من Windows.</p>")
  },

  /* ========== 30 · UNINSTALL STEPS ========== */
  {
    id: "uninstall",
    layout: "uninstall-route",
    section: "uninstall",
    title: t("A clean exit: uninstall Peachtree", "إنهاء مرتب: إزالة تثبيت Peachtree"),
    routeLabel: t("THE REMOVAL ROUTE", "خطوات الإزالة"),
    finishLabel: t("FINAL STEP", "الخطوة الأخيرة"),
    steps: [
      { n: "01", ico: "i-grid", h: t("Control Panel", "Control Panel"), p: t("Open it from the Windows Start menu.", "افتحها من قائمة Start في Windows.") },
      { n: "02", ico: "i-list", h: t("Programs", "Programs"), p: t("Go to Programs and Features.", "انتقل إلى Programs and Features.") },
      { n: "03", ico: "i-close", h: t("Choose Peachtree", "اختر Peachtree"), p: t("Select Uninstall to remove it.", "اختر Uninstall لإزالة البرنامج.") }
    ],
    note: t("<p><b>Presenter 6 of 6 · Backup, uninstall, and closing</b></p><p>To remove Peachtree, open Control Panel in Windows, go to Programs and Programs and Features, select Peachtree, and choose Uninstall. The exact wording can vary slightly between Windows versions, but the route is through the installed-programs list. Only do this on your own computer or when the instructor asks.</p><p>Then thank the audience and invite questions.</p>",
            "<p><b>المتحدث ٦ من ٦ · النسخ الاحتياطي والإزالة والختام</b></p><p>لإزالة Peachtree، نفتح Control Panel في Windows، وندخل على Programs ثم Programs and Features، ونحدد Peachtree ونختار Uninstall. ممكن تختلف التسمية شوية حسب إصدار Windows، لكن المسار بيكون من قائمة البرامج المثبتة. ما تعملش ده إلا على جهازك الشخصي أو لو المدرّس طلب.</p><p>بعدها اشكروا الحضور وافتحوا المجال للأسئلة.</p>")
  },

  /* ========== 32 · RESOURCES ========== */
  {
    id: "resources",
    layout: "resources",
    section: "wrap",
    kicker: t("For more information", "لمزيد من المعلومات"),
    title: t("Video references & support", "مراجع فيديو ودعم فني"),
    sub: t("The manual points to these two videos — watch them at home before the next lab.",
           "يشير الكتاب إلى الفيديوهان التاليين —شاهدهما قبل المعمل القادم."),
    links: [
      { ico: "i-play", h: t("Installation walk-through (video 1)", "شرح التثبيت (فيديو ١)"), url: "https://www.youtube.com/watch?v=aRrhT4aU2x4" },
      { ico: "i-play", h: t("Peachtree course playlist (video 2)", "قائمة تشغيل كورس Peachtree (فيديو ٢)"), url: "https://www.youtube.com/watch?v=KZtwUqLFoRU&list=PLGhE0Z1kFNv0-_j2-GPj77lYSQrh6JyhM" },
      { ico: "i-globe", h: t("Firewall installation tips", "نصائح جدار الحماية"), url: "http://www.peachtree.com/support/firewall_install_tips.cfm" }
    ],
    callout: { kind: "info", text: t("Tip: take a backup of the company folder before every practical session — reinstalling is easier than rebuilding data.", "نصيحة: خذ نسخة احتياطية من مجلد الشركة قبل كل معمل — إعادة التثبيت أسهل من إعادة بناء البيانات.") },
    note: t("Open the first video live for five seconds to prove the links work, then move on. Do not play the whole video in class.",
            "افتح الفيديو الأول لحظات للتأكد من عمل الروابط ثم تابع. لا تشغّل الفيديو كاملًا داخل الفصل.")
  },

  /* ========== 32 · THANKS ========== */
  {
    id: "thanks",
    layout: "thanks",
    section: "wrap",
    title: t("Thank you", "شكرًا لكم"),
    sub: t("Questions?", "أسئلة؟"),
    points: [
      t("Peachtree Complete Accounting", "برنامج Peachtree Complete Accounting"),
      t("Install · Start · Explore", "تثبيت · تشغيل · استكشاف")
    ],
    note: t("<p><b>Presenter 6 of 6 · Backup, uninstall, and closing</b></p><p>That brings us to the end of our presentation. We covered installation, starting with a sample company, the main parts of the interface and menus, and protecting or removing the program. Thank you for listening—what questions do you have?</p>",
            "<p><b>المتحدث ٦ من ٦ · النسخ الاحتياطي والإزالة والختام</b></p><p>وبكده نكون وصلنا لنهاية العرض. اتكلمنا عن التثبيت، وبدء العمل بشركة تجريبية، وأجزاء الواجهة والقوائم الرئيسية، وحماية البيانات أو إزالة البرنامج. شكرًا لحسن استماعكم، عندكم أي أسئلة؟</p>")
  },

  /* ========== 34 · APPENDIX · SCREENSHOT CHECKLIST ========== */
  {
    id: "checklist",
    layout: "checklist",
    section: "wrap",
    appendix: true,
    kicker: t("Appendix", "ملحق"),
    title: t("Screenshot checklist", "قائمة لقطات الشاشة المطلوبة"),
    sub: t("Save these pictures in <b>assets/img/</b> using the exact file name — the slide replaces its placeholder automatically.",
           "احفظ هذه الصور في مجلد <b>assets/img/</b> بنفس اسم الملف بالضبط — وستستبدل الشريحة الإطار الفارغ تلقائيًا."),
    groups: [
      { h: t("Starting Peachtree", "تشغيل Peachtree"), items: [
        { f: "17-peachtree-welcome", d: t("Explore a sample company", "استكشاف شركة تجريبية") },
        { f: "18-sample-company-list", d: t("Bellwether selected", "تحديد Bellwether") }
      ]},
      { h: t("Main menus", "القوائم الرئيسية"), items: [
        { f: "20-full-interface", d: t("Complete program interface", "واجهة البرنامج كاملة") },
        { f: "20-title-bar", d: t("Title bar", "شريط العنوان") },
        { f: "21-menu-bar", d: t("Menu bar", "شريط القوائم") },
        { f: "menu-file", d: t("File", "File") },
        { f: "menu-edit", d: t("Edit", "Edit") },
        { f: "22-list-menu", d: t("List", "List") },
        { f: "23-maintain-menu", d: t("Maintain", "Maintain") },
        { f: "menu-analysis", d: t("Analysis", "Analysis") },
        { f: "menu-options", d: t("Options", "Options") },
        { f: "menu-reports-forms", d: t("Reports & Forms", "Reports & Forms") },
        { f: "menu-services", d: t("Services", "Services") },
        { f: "menu-help", d: t("Help", "Help") }
      ]}
    ],
    note: t("Not for presentation — this slide is your own checklist while you collect the pictures. Toggle “Show appendix” in the overview, or press A.",
            "هذه الشريحة ليست للعرض — هي قائمتك الخاصة لجمع الصور. فعّل “Show appendix” من نظرة عامة أو اضغط A.")
  }
];

const COMPACT_SLIDE_IDS = new Set([
  "cover", "s01", "sample", "sample-focus", "interface-full", "anatomy", "menu-overview", "menu-core", "menu-more", "list-menu", "other-menus",
  "backup", "uninstall",
  "thanks", "checklist"
]);
const SLIDES = ALL_SLIDES.filter((slide) => COMPACT_SLIDE_IDS.has(slide.id));
