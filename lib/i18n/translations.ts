export type Language = 'en' | 'ar';

export interface Translations {
  // Navbar
  nav: {
    home: string;
    generator: string;
    contact: string;
  };

  // Article Input
  input: {
    placeholder1: string;
    placeholder2: string;
    placeholder3: string;
    placeholder4: string;
    validationError: string;
    infoText: string;
  };

  // Processing Progress
  progress: {
    pondering: string;
    analyzing: string;
    crafting: string;
    almostThere: string;
    complete: string;
  };

  // Toggle Switch
  toggle: {
    show: string;
    hide: string;
  };

  // Summary Display
  summary: {
    arabicHeading: string;
    englishHeading: string;
  };

  // Article Display
  article: {
    originalHeading: string;
  };

  // Main Page
  page: {
    tagline: string;
    interactiveHighlighting: string;
    newArticle: string;
    error: string;
  };

  // Processing Phases
  phases: {
    initializing: string;
    extractingUrl: string;
    articleLoaded: string;
    extractingKeyInfo: string;
    keyInfoExtracted: string;
    generatingSummary: string;
    summaryGenerated: string;
    translatingArabic: string;
    translationComplete: string;
    matchingSentences: string;
    complete: string;
    error: string;
  };

  // Footer
  footer: {
    home: string;
    generator: string;
    contact: string;
    articlesGenerated: string;
    developedBy: string;
    copyright: string;
  };

  // Contact
  contact: {
    label: string;
    heading: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      generator: 'Generator',
      contact: 'Contact',
    },
    input: {
      placeholder1: 'https://techcrunch.com/article-about-ai',
      placeholder2: 'Scientists at MIT developed a new AI system that can predict protein structures...',
      placeholder3: 'https://www.nature.com/articles/science-breakthrough',
      placeholder4: 'Researchers discovered a quantum algorithm for complex optimization...',
      validationError: 'Only one URL is allowed at a time',
      infoText: 'Paste an article (130+ words) or URL to generate an AI-powered summary with Arabic translation',
    },
    progress: {
      pondering: 'Pondering, stand by...',
      analyzing: 'Analyzing your article...',
      crafting: 'Crafting the summary...',
      almostThere: 'Almost there...',
      complete: '% complete',
    },
    toggle: {
      show: 'Show Highlighting',
      hide: 'Hide Highlighting',
    },
    summary: {
      arabicHeading: 'ARABIC SUMMARY',
      englishHeading: 'English Summary',
    },
    article: {
      originalHeading: 'ORIGINAL ARTICLE',
    },
    page: {
      tagline: 'Know exactly where your summary comes from—with',
      interactiveHighlighting: 'interactive highlighting',
      newArticle: 'New Article',
      error: 'Error:',
    },
    phases: {
      initializing: 'Initializing...',
      extractingUrl: 'Extracting article from URL...',
      articleLoaded: 'Article loaded',
      extractingKeyInfo: 'Extracting key information...',
      keyInfoExtracted: 'Key information extracted',
      generatingSummary: 'Generating summary...',
      summaryGenerated: 'Summary generated',
      translatingArabic: 'Translating to Arabic...',
      translationComplete: 'Translation complete',
      matchingSentences: 'Matching sentences for highlighting...',
      complete: 'Complete!',
      error: 'Error',
    },
    footer: {
      home: 'Home',
      generator: 'Generator',
      contact: 'Contact',
      articlesGenerated: 'Articles Generated',
      developedBy: 'Developed by Musaed',
      copyright: '2024 News AI',
    },
    contact: {
      label: '[Contact]',
      heading: 'Drop Me a Message',
      description: "Have questions or feedback? I'd love to hear from you. Fill out the form and I'll get back to you as soon as possible.",
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your.email@example.com',
      messagePlaceholder: 'Your message...',
      sendButton: 'Send Message',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      generator: 'المولّد',
      contact: 'تواصل',
    },
    input: {
      placeholder1: 'https://techcrunch.com/article-about-ai',
      placeholder2: 'طور علماء في معهد MIT نظام ذكاء اصطناعي جديد يمكنه التنبؤ ببنية البروتينات...',
      placeholder3: 'https://www.nature.com/articles/science-breakthrough',
      placeholder4: 'اكتشف الباحثون خوارزمية كمومية للتحسين المعقد...',
      validationError: 'يُسمح برابط واحد فقط في كل مرة',
      infoText: 'الصق مقالاً (130+ كلمة) أو رابط لإنشاء ملخص بتقنية الذكاء الاصطناعي مع ترجمة عربية',
    },
    progress: {
      pondering: 'جاري التفكير، انتظر قليلاً...',
      analyzing: 'جاري تحليل مقالك...',
      crafting: 'جاري صياغة الملخص...',
      almostThere: 'أوشكنا على الانتهاء...',
      complete: '% مكتمل',
    },
    toggle: {
      show: 'إظهار التمييز',
      hide: 'إخفاء التمييز',
    },
    summary: {
      arabicHeading: 'الملخص العربي',
      englishHeading: 'الملخص الإنجليزي',
    },
    article: {
      originalHeading: 'المقال الأصلي',
    },
    page: {
      tagline: 'اعرف بالضبط من أين أتى ملخصك—مع',
      interactiveHighlighting: 'التمييز التفاعلي',
      newArticle: 'مقال جديد',
      error: 'خطأ:',
    },
    phases: {
      initializing: 'جاري التهيئة...',
      extractingUrl: 'جاري استخراج المقال من الرابط...',
      articleLoaded: 'تم تحميل المقال',
      extractingKeyInfo: 'جاري استخراج المعلومات الرئيسية...',
      keyInfoExtracted: 'تم استخراج المعلومات الرئيسية',
      generatingSummary: 'جاري إنشاء الملخص...',
      summaryGenerated: 'تم إنشاء الملخص',
      translatingArabic: 'جاري الترجمة إلى العربية...',
      translationComplete: 'اكتملت الترجمة',
      matchingSentences: 'جاري مطابقة الجمل للتمييز...',
      complete: 'اكتمل!',
      error: 'خطأ',
    },
    footer: {
      home: 'الرئيسية',
      generator: 'المولّد',
      contact: 'تواصل',
      articlesGenerated: 'المقالات المُنشأة',
      developedBy: 'Developed by Musaed',
      copyright: '2024 News AI',
    },
    contact: {
      label: '[تواصل]',
      heading: 'أرسل لي رسالة',
      description: 'هل لديك أسئلة أو ملاحظات؟ يسعدني سماعك منك. املأ النموذج وسأرد عليك في أقرب وقت ممكن.',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      messageLabel: 'الرسالة',
      namePlaceholder: 'اسمك',
      emailPlaceholder: 'your.email@example.com',
      messagePlaceholder: 'رسالتك...',
      sendButton: 'إرسال الرسالة',
    },
  },
};
