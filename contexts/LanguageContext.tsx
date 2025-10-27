"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Homepage
    'hero.title': 'skip the line & shop smart!',
    'hero.description': 'Satocci makes shopping seamless by letting you scan and pay instantly so you skip the line and enjoy faster smarter sustainable shopping.',
    'hero.freeDemo': 'Free demo',
    
    // Navbar
    'nav.home': 'HOME',
    'nav.about': 'ABOUT',
    'nav.product': 'PRODUCT',
    'nav.signup': 'SIGN UP',
    'nav.blogs': 'BLOGS',
    'nav.freeDemo': 'FREE DEMO',
    'nav.businessLogin': 'BUSINESS LOGIN',
    'nav.achievements': 'ACHIEVEMENTS',
    'nav.partnership': 'PARTNERSHIP',
    'nav.boardMembers': 'BOARD MEMBERS',

    // App Showcase Section
    'app.title': 'CHOOSE YOUR FAVORITE ITEMS. SCAN & PAY VIA MOBILE. IT\'S THAT SIMPLE!',
    'app.description': 'With Satocci you scan and pay in seconds and skip the line so shopping becomes faster smarter and easier using only your mobile.',
    'app.button': 'SEE HOW IT WORKS',

    // Features Section
    'features.title': 'SAY GOODBYE TO STRESSFUL SHOPPING',
    'features.description': 'Imagine shopping without the stress of waiting in line. No crumpled receipts. No missing out on rewards. With Satocci™ every shopping trip feels smoother lighter and more rewarding.',
    'features.freedom.title': 'Freedom from Waiting',
    'features.freedom.description': 'Walk out as soon as you finish. No lines. No wasted time. Just freedom to enjoy your day.',
    'features.receipts.title': 'Smart Receipts',
    'features.receipts.description': 'Digital receipts that never fade or get lost. Organize, share, and track your purchases effortlessly.',
    'features.rewards.title': 'Instant Rewards',
    'features.rewards.description': 'Automatically earn and track rewards with every purchase. Never miss a point again.',
    'features.budget.title': 'Budget Tracking',
    'features.budget.description': 'Track your spending in real-time. Stay on budget with smart insights and alerts.',
    'features.security.title': 'Secure Payments',
    'features.security.description': 'Bank-level security for every transaction. Your payment data is always protected.',
    'features.history.title': 'Shopping History',
    'features.history.description': 'Access your complete purchase history anytime. Reorder favorites with one tap.',

    // Reviews Section
    'reviews.title': 'WHAT OUR CUSTOMERS SAY',
    'reviews.description': 'Real voices. Real experiences. Hear how Satocci is transforming shopping for people and businesses around the world.',
    'reviews.loading': 'Loading reviews...',
    'reviews.noReviews': 'No reviews available yet.',

    // FAQ Section
    'faq.title': 'FREQUENTLY ASKED QUESTIONS',
    'faq.description': 'Got questions? We\'ve got answers. Explore the most common queries about Satocci, how it works, and how it makes your shopping experience easier.',
    'faq.consumers': 'FOR CONSUMERS',
    'faq.retailers': 'FOR RETAILERS',
    
    // Consumer FAQ Questions
    'faq.consumer.q1': 'HOW DO I USE SATOCCI TO SCAN AND PAY FOR ITEMS IN-STORE?',
    'faq.consumer.a1': 'With Satocci, paying for your shopping is instantaneous—no waiting in lines or fumbling with cash. The moment you check out in the app, your payment is processed and a digital receipt is issued instantly, securely stored in your account. Unlike traditional paper receipts that fade, tear, or get lost, your Satocci receipts are always safe, accessible, and trackable. Need to share one? Do it in a single tap—no more awkwardly photographing long, oddly sized receipts that never fit properly in the camera frame. With Satocci you enjoy a frictionless, eco-friendly, and clutter-free shopping experience, where your payments are faster and your receipts never disappear.',
    
    'faq.consumer.q2': 'HOW DOES PAYMENT WORK — WHICH PAYMENT METHODS ARE SUPPORTED?',
    'faq.consumer.a2': 'Satocci supports all major payment methods including credit cards, debit cards, digital wallets, and bank transfers for a seamless checkout experience.',
    
    'faq.consumer.q3': 'WHEN I PAY WITH SATOCCI, HOW DO I SHOW PROOF OF PURCHASE IF ASKED BY STORE STAFF?',
    'faq.consumer.a3': 'Your digital receipt is instantly available in the app and can be shown to store staff at any time. The receipt contains all necessary purchase information and is legally valid.',
    
    'faq.consumer.q4': 'IS MY PAYMENT INFORMATION SECURE IN THE SATOCCI APP?',
    'faq.consumer.a4': 'Yes, Satocci uses bank-level encryption and security protocols to protect your payment information. Your data is never stored on our servers and all transactions are processed through secure payment gateways.',
    
    'faq.consumer.q5': 'CAN I STILL COLLECT LOYALTY POINTS, COUPONS, OR DISCOUNTS WHEN USING SATOCCI?',
    'faq.consumer.a5': 'Absolutely! Satocci integrates with store loyalty programs and automatically applies your coupons and discounts during checkout, ensuring you never miss out on savings.',
    
    'faq.consumer.q6': 'DO I NEED AN INTERNET CONNECTION IN-STORE TO USE SATOCCI?',
    'faq.consumer.a6': 'Yes, a stable internet connection is required for real-time payment processing and receipt generation. Most stores provide free WiFi for customers.',
    
    // Retailer FAQ Questions
    'faq.retailer.q1': 'HOW DOES SATOCCI INTEGRATION WORK WITH MY EXISTING POS SYSTEM?',
    'faq.retailer.a1': 'Satocci seamlessly integrates with most modern POS systems through our API. The integration process is straightforward and our technical team provides full support during setup. Your existing inventory and pricing systems remain unchanged while gaining the benefits of scan-and-pay technology.',
    
    'faq.retailer.q2': 'WHAT ARE THE COSTS ASSOCIATED WITH IMPLEMENTING SATOCCI?',
    'faq.retailer.a2': 'Our pricing model is transparent and scalable based on your store size and transaction volume. We offer flexible plans with no hidden fees, including setup support, ongoing maintenance, and customer support. Contact our sales team for a customized quote that fits your business needs.',
    
    'faq.retailer.q3': 'HOW DOES SATOCCI HELP REDUCE CHECKOUT LINES AND IMPROVE CUSTOMER FLOW?',
    'faq.retailer.a3': 'Satocci eliminates traditional checkout bottlenecks by allowing customers to scan and pay as they shop. This reduces checkout line wait times by up to 80%, improves customer satisfaction, and enables your staff to focus on customer service rather than operating cash registers.',
    
    'faq.retailer.q4': 'HOW DO YOU PREVENT THEFT OR FRAUD WITH SCAN-AND-PAY TECHNOLOGY?',
    'faq.retailer.a4': 'Satocci employs advanced security measures including AI-powered monitoring, random verification checks, and secure digital receipts. Our system actually reduces theft compared to traditional methods, with real-time alerts for suspicious activity and comprehensive audit trails for every transaction.',
    
    'faq.retailer.q5': 'WHAT ANALYTICS AND INSIGHTS DOES SATOCCI PROVIDE FOR MY BUSINESS?',
    'faq.retailer.a5': 'Our comprehensive dashboard provides real-time analytics on customer behavior, popular products, peak shopping times, and transaction trends. These insights help you optimize inventory, staffing, and marketing strategies to increase revenue and improve operational efficiency.',
    
    'faq.retailer.q6': 'HOW LONG DOES IT TAKE TO IMPLEMENT SATOCCI IN MY STORE?',
    'faq.retailer.a6': 'Most retailers can implement Satocci within 2-4 weeks, depending on store size and complexity. This includes system integration, staff training, and a soft launch period. Our dedicated onboarding team ensures a smooth transition with minimal disruption to your operations.',

    // Footer Section
    'footer.newsletter.title': 'SUBSCRIBE TO SATOCCI NEWSLETTER',
    'footer.newsletter.placeholder': 'ENTER EMAIL',
    'footer.newsletter.button': 'SUBSCRIBE',
    'footer.newsletter.description': 'Got questions? We\'ve got answers. Explore the most common queries about Satocci, how it works, and how it makes your shopping experience easier.',
    'footer.playStore': 'PLAY STORE',
    'footer.appStore': 'APP STORE',
    'footer.landingPages': 'Landing Pages',
    'footer.home': 'Home',
    'footer.about': 'About Us',
    'footer.join': 'Join Us',
    'footer.news': 'News',
    'footer.faqs': 'FAQs',
    'footer.legal': 'Legal',
    'footer.retailerTerms': 'Retailer T&Cs',
    'footer.privacy': 'Privacy',
    'footer.contact': 'Contact Us',
    'footer.address': 'Address:',
    'footer.addressText': 'Swedenborgsgatan 12, 753 34 Uppsala, Sweden.',

    // About Page
    'about.hero.badge': 'About Satocci',
    'about.hero.title': 'Revolutionizing Retail\nThrough Innovation\nand Technology',
    'about.hero.description': 'We\'re transforming the retail experience with cutting-edge scan-and-pay technology,\ncreating seamless shopping experiences for customers worldwide.',
    
    'about.identity.whoWeAre': 'WHO WE ARE',
    'about.identity.whoWeAreDesc': 'We\'re driven by the everyday challenges shoppers and retailers face, turning technology into trust and ease, one payment at a time.',
    'about.identity.whatWeBelieve': 'WHAT WE BELIEVE',
    'about.identity.whatWeBelieveDesc': 'Our mission is to revolutionize the way people engage in transactions, simplifying the payment process through cutting-edge technology.',
    'about.identity.ourMission': 'OUR MISSION',
    'about.identity.ourMissionDesc': 'To simplify shopping by delivering faster, smarter, and greener checkout experiences for consumers and retailers worldwide.',
    'about.identity.ourVision': 'OUR VISION',
    'about.identity.ourVisionDesc': 'To create a future where every store offers seamless shopping without lines, delays, or waste.',
    
    'about.story.badge': 'Our Journey',
    'about.story.title': 'From Sweden to the World',
    'about.story.paragraph1': 'Satocci™ began as a vision to revolutionize retail technology. Despite initial challenges,\nincluding a "no" on Sweden\'s Dragon\'s Den, we persevered and transformed rejection into\nglobal success.',
    'about.story.paragraph2': 'Today, we\'re scaling our retail tech solution across the Middle East and beyond,\nhelping retailers create seamless, contactless shopping experiences that delight\ncustomers and drive business growth.',
    'about.story.button': 'Learn More About Our Journey',
    
    'about.ceo.greeting': 'HELLO!',
    'about.ceo.name': 'I\'M MELODI ASKELÖF',
    'about.ceo.title': 'CEO & CO-FOUNDER, SATOCCI',
    'about.ceo.quote1': '"With over 15+ years of experience across banking, finance, sales, marketing, and telecommunications,\nI\'ve always believed in the power of trust, relationships, and innovation to transform industries."',
    'about.ceo.quote2': '"That\'s why I co-founded Satocci – to create a smarter, simpler, and more sustainable\nway to shop. We\'re eliminating the friction that has plagued traditional shopping experiences for decades."',
    'about.ceo.quote3': '"For me, technology is about freedom. Satocci\'s mission is to make checkout lines obsolete\nand make paying as easy as a single scan."',
    'about.ceo.experience': '15+ Years of Experience',
    'about.ceo.experienceDesc': 'Across Banking, Finance, Sales, Marketing & Telecommunications.',
    'about.ceo.global': 'Global Mission',
    'about.ceo.globalDesc': 'Building a shopping experience that connects customers and retailers worldwide.',
    'about.ceo.future': 'Future-Ready Retail',
    'about.ceo.futureDesc': 'On a mission to make checkout lines obsolete with Scan & Pay.',
    
    'about.team.title': 'MEET OUR TEAM',
    'about.team.description': 'Behind Satocci is a passionate team of innovators, designers, and problem-solvers who believe shopping should be faster, smarter, and more enjoyable.',
    'about.team.loading': 'Loading team members...',
    'about.team.empty': 'No team members to display.',

    // Signup Page
    'signup.hero.badge': 'Are you a retailer?',
    'signup.hero.title': 'Reimagine checkout with\nSatocci and bring\ninnovation to retail.',
    'signup.hero.description': 'Satocci makes shopping seamless by letting you scan and pay\ninstantly so you skip the line and enjoy faster smarter\nsustainable shopping.',
    
    'signup.step1.title': 'Contact Us',
    'signup.step1.description': 'Fill in the form below to tell us more about your store, your\ncustomers, and how you operate. This helps our team design a\ntailor‑made solution that best fits your business.',
    'signup.step1.button': 'Contact us',
    
    'signup.step2.title': 'Onboarding Process',
    'signup.step2.description': 'Team Satocci will ensure that your inventories are in sync and\nthat your team is trained to start accepting shoppers using\nSatocci in less than two weeks.',
    
    'signup.step3.title': 'Continuous Improvement',
    'signup.step3.description': 'We work closely with you even after launch - gathering feedback,\nupdating features, and ensuring Satocci keeps making checkout\nsmoother for all.',
    
    'signup.form.title': 'Let\'s Get Started',
    'signup.form.description': 'Fill in the following details, and we will get in touch with you.',
    'signup.form.fullName': 'Full Name',
    'signup.form.storeName': 'Store Name',
    'signup.form.address': 'Address',
    'signup.form.email': 'Email',
    'signup.form.phone': 'Phone',
    'signup.form.companyUrl': 'Company URL',
    'signup.form.pos': 'What POS Do You Use?',
    'signup.form.dailyCustomers': 'Range of Daily Customers',
    'signup.form.submit': 'Submit',
    'signup.form.submitting': 'Submitting...',
    'signup.form.success': 'Form submitted successfully! We will get in touch with you soon.',
    'signup.form.error': 'Error submitting form. Please try again.',

    // Product Page
    'product.hero.badge': 'Products & Features',
    'product.hero.title': 'SATOCCI PRODUCTS &\nFEATURES FOR MODERN\nRETAIL SOLUTIONS',
    'product.hero.description': 'Revolutionize your shopping experience with our innovative payment solutions and smart features designed to make every transaction seamless and effortless.',
    
    'product.feature1.title': 'Offer Your Shoppers Flexible Payments with Tabby & Satocci',
    'product.feature1.point1': 'Enable customers to split payments into manageable installments.',
    'product.feature1.point2': 'Enhance shopping convenience and improve the overall customer experience.',
    'product.feature1.point3': 'Boost sales conversions by offering a more accessible payment option.',
    'product.feature1.cardTitle': 'SPLIT PAYMENT OPTIONS',
    'product.feature1.cardPoint1': 'Real-time tracking',
    'product.feature1.cardPoint2': 'Secure payments',
    'product.feature1.cardPoint3': 'Instant notifications',
    
    'product.feature2.title': 'Skip The Line and Shop Smart',
    'product.feature2.point1': 'Skip the line and shop smart with our streamlined online shopping experience.',
    'product.feature2.point2': 'Avoid the hassle of queues and crowded stores.',
    'product.feature2.point3': 'Enjoy fast, easy, and secure purchasing.',
    'product.feature2.point4': 'Get your products delivered right to you, saving time and effort.',
    'product.feature2.cardTitle': 'SMART SHOPPING',
    'product.feature2.cardPoint1': 'Store locator',
    'product.feature2.cardPoint2': 'Real-time inventory',
    'product.feature2.cardPoint3': 'Quick checkout',
    
    'product.feature3.title': 'Latest Transactions',
    'product.feature3.point1': 'Manage and view the latest transactions on behalf of Satocci in real-time.',
    'product.feature3.point2': 'Stay up-to-date with customer payments and purchase history.',
    'product.feature3.point3': 'Easily track sales, refunds, and payment status through an intuitive dashboard.',
    'product.feature3.point4': 'Ensure smooth transaction flow and customer satisfaction with detailed reporting.',
    'product.feature3.cardTitle': 'REAL-TIME TRACKING',
    'product.feature3.cardPoint1': 'Transaction history',
    'product.feature3.cardPoint2': 'Payment analytics',
    'product.feature3.cardPoint3': 'Dashboard insights',
    
    'product.feature4.title': 'Scan & Pay',
    'product.feature4.point1': 'Simplify payments with Scan & Pay for a seamless shopping experience.',
    'product.feature4.point2': 'Customers can quickly complete transactions by scanning a QR code.',
    'product.feature4.point3': 'Eliminate the need for cash or cards, offering secure and contactless payments.',
    'product.feature4.point4': 'Speed up checkout processes, enhancing customer convenience and satisfaction.',
    'product.feature4.cardTitle': 'QUICK QR PAYMENTS',
    'product.feature4.cardPoint1': 'QR code scanning',
    'product.feature4.cardPoint2': 'Contactless payments',
    'product.feature4.cardPoint3': 'Instant processing',
    
    'product.downloadButton': 'DOWNLOAD APP',
  },
  ar: {
    // Homepage
    'hero.title': 'تخطى الطابور وتسوق بذكاء!',
    'hero.description': 'ساتوتشي يجعل التسوق سلسًا من خلال السماح لك بالمسح والدفع فورًا حتى تتخطى الطابور وتستمتع بتسوق أسرع وأذكى وأكثر استدامة.',
    'hero.freeDemo': 'عرض تجريبي مجاني',
    
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.about': 'حولنا',
    'nav.product': 'المنتج',
    'nav.signup': 'التسجيل',
    'nav.blogs': 'المدونات',
    'nav.freeDemo': 'عرض تجريبي مجاني',
    'nav.businessLogin': 'تسجيل دخول الأعمال',
    'nav.achievements': 'الإنجازات',
    'nav.partnership': 'الشراكة',
    'nav.boardMembers': 'أعضاء مجلس الإدارة',

    // App Showcase Section
    'app.title': 'اختر العناصر المفضلة لديك. امسح وادفع عبر الهاتف المحمول. الأمر بهذه البساطة!',
    'app.description': 'مع ساتوتشي تمسح و تدفع في ثوانٍ وتتخطى الطابور حتى يصبح التسوق أسرع وأذكى وأسهل باستخدام هاتفك المحمول فقط.',
    'app.button': 'شاهد كيف يعمل',

    // Features Section
    'features.title': 'قل وداعًا للتسوق المجهد',
    'features.description': 'تخيل التسوق دون إجهاد انتظار الطابور. لا إيصالات مجعدة. لا تفويت مكافآت. مع ساتوتشي™ كل رحلة تسوق تشعر بأنها أكثر سلاسة وخفيفة ومجزية.',
    'features.freedom.title': 'الحرية من الانتظار',
    'features.freedom.description': 'اخرج بمجرد انتهائك. لا طوابير. لا وقت ضائع. فقط حرية للاستمتاع بيومك.',
    'features.receipts.title': 'إيصالات ذكية',
    'features.receipts.description': 'إيصالات رقمية لا تتلاشى أو تضيع أبدًا. نظم وشارك وتتبع مشترياتك بسهولة.',
    'features.rewards.title': 'مكافآت فورية',
    'features.rewards.description': 'اكسب وتتبع المكافآت تلقائيًا مع كل عملية شراء. لا تفوت نقطة مرة أخرى.',
    'features.budget.title': 'تتبع الميزانية',
    'features.budget.description': 'تتبع إنفاقك في الوقت الفعلي. ابق ضمن الميزانية مع رؤى وتنبيهات ذكية.',
    'features.security.title': 'مدفوعات آمنة',
    'features.security.description': 'أمان على مستوى البنوك لكل معاملة. بيانات الدفع الخاصة بك محمية دائمًا.',
    'features.history.title': 'تاريخ التسوق',
    'features.history.description': 'الوصول إلى تاريخ الشراء الكامل في أي وقت. أعد طلب المفضلة بنقرة واحدة.',

    // Reviews Section
    'reviews.title': 'ماذا يقول عملاؤنا',
    'reviews.description': 'أصوات حقيقية. تجارب حقيقية. استمع إلى كيف يحول ساتوتشي التسوق للأشخاص والشركات حول العالم.',
    'reviews.loading': 'جاري تحميل المراجعات...',
    'reviews.noReviews': 'لا توجد مراجعات متاحة بعد.',

    // FAQ Section
    'faq.title': 'الأسئلة الشائعة',
    'faq.description': 'لديك أسئلة؟ لدينا إجابات. استكشف الاستفسارات الأكثر شيوعًا حول ساتوتشي، وكيف يعمل، وكيف يجعل تجربة التسوق أسهل.',
    'faq.consumers': 'للمستهلكين',
    'faq.retailers': 'للتجار',
    
    // Consumer FAQ Questions
    'faq.consumer.q1': 'كيف أستخدم ساتوتشي لمسح ودفع العناصر في المتجر؟',
    'faq.consumer.a1': 'مع ساتوتشي، دفع مشترياتك فوري - لا انتظار في الطوابير أو التعامل مع النقود. لحظة الدفع في التطبيق، يتم معالجة دفعتك وإصدار إيصال رقمي فورًا، محفوظ بأمان في حسابك. على عكس الإيصالات الورقية التقليدية التي تتلاشى أو تتمزق أو تضيع، إيصالات ساتوتشي آمنة دائمًا ويمكن الوصول إليها وتتبعها. تحتاج لمشاركة واحد؟ افعل ذلك بنقرة واحدة - لا مزيد من تصوير الإيصالات الطويلة ذات الأحجام الغريبة التي لا تناسب إطار الكاميرا بشكل صحيح. مع ساتوتشي تستمتع بتجربة تسوق سلسة وصديقة للبيئة وخالية من الفوضى، حيث تكون مدفوعاتك أسرع وإيصالاتك لا تختفي أبدًا.',
    
    'faq.consumer.q2': 'كيف يعمل الدفع - ما هي طرق الدفع المدعومة؟',
    'faq.consumer.a2': 'ساتوتشي يدعم جميع طرق الدفع الرئيسية بما في ذلك بطاقات الائتمان والخصم والمحافظ الرقمية والتحويلات المصرفية لتجربة دفع سلسة.',
    
    'faq.consumer.q3': 'عندما أدفع باستخدام ساتوتشي، كيف أظهر إثبات الشراء إذا طلب موظفو المتجر ذلك؟',
    'faq.consumer.a3': 'إيصالك الرقمي متاح فورًا في التطبيق ويمكن إظهاره لموظفي المتجر في أي وقت. الإيصال يحتوي على جميع معلومات الشراء اللازمة وهو قانوني صالح.',
    
    'faq.consumer.q4': 'هل معلومات الدفع الخاصة بي آمنة في تطبيق ساتوتشي؟',
    'faq.consumer.a4': 'نعم، ساتوتشي يستخدم تشفير على مستوى البنوك وبروتوكولات أمان لحماية معلومات الدفع الخاصة بك. بياناتك لا تُحفظ أبدًا على خوادمنا وجميع المعاملات تتم معالجتها عبر بوابات دفع آمنة.',
    
    'faq.consumer.q5': 'هل يمكنني جمع نقاط الولاء أو القسائم أو الخصومات عند استخدام ساتوتشي؟',
    'faq.consumer.a5': 'بالطبع! ساتوتشي يتكامل مع برامج الولاء للمتاجر ويطبق تلقائيًا قسائمك وخصوماتك أثناء الدفع، مما يضمن عدم تفويت أي توفير.',
    
    'faq.consumer.q6': 'هل أحتاج اتصال إنترنت في المتجر لاستخدام ساتوتشي؟',
    'faq.consumer.a6': 'نعم، اتصال إنترنت مستقر مطلوب لمعالجة الدفع في الوقت الفعلي وإصدار الإيصالات. معظم المتاجر توفر واي فاي مجاني للعملاء.',
    
    // Retailer FAQ Questions
    'faq.retailer.q1': 'كيف يعمل تكامل ساتوتشي مع نظام نقاط البيع الحالي؟',
    'faq.retailer.a1': 'ساتوتشي يتكامل بسلاسة مع معظم أنظمة نقاط البيع الحديثة عبر واجهة برمجة التطبيقات الخاصة بنا. عملية التكامل مباشرة وفريقنا التقني يوفر دعم كامل أثناء الإعداد. أنظمة المخزون والأسعار الحالية تبقى دون تغيير مع الحصول على فوائد تقنية المسح والدفع.',
    
    'faq.retailer.q2': 'ما هي التكاليف المرتبطة بتطبيق ساتوتشي؟',
    'faq.retailer.a2': 'نموذج التسعير الخاص بنا شفاف وقابل للتوسع حسب حجم متجرك وحجم المعاملات. نقدم خطط مرنة بدون رسوم مخفية، تشمل دعم الإعداد والصيانة المستمرة ودعم العملاء. اتصل بفريق المبيعات للحصول على عرض مخصص يناسب احتياجات عملك.',
    
    'faq.retailer.q3': 'كيف يساعد ساتوتشي في تقليل طوابير الدفع وتحسين تدفق العملاء؟',
    'faq.retailer.a3': 'ساتوتشي يلغي الاختناقات التقليدية في الدفع من خلال السماح للعملاء بالمسح والدفع أثناء التسوق. هذا يقلل أوقات انتظار طوابير الدفع بنسبة تصل إلى 80%، ويحسن رضا العملاء، ويمكن موظفيك من التركيز على خدمة العملاء بدلاً من تشغيل صناديق النقود.',
    
    'faq.retailer.q4': 'كيف تمنعون السرقة أو الاحتيال مع تقنية المسح والدفع؟',
    'faq.retailer.a4': 'ساتوتشي يستخدم تدابير أمان متقدمة تشمل المراقبة بالذكاء الاصطناعي والتحقق العشوائي والإيصالات الرقمية الآمنة. نظامنا يقلل فعليًا من السرقة مقارنة بالطرق التقليدية، مع تنبيهات فورية للنشاط المشبوه ومسارات تدقيق شاملة لكل معاملة.',
    
    'faq.retailer.q5': 'ما هي التحليلات والرؤى التي يوفرها ساتوتشي لعملي؟',
    'faq.retailer.a5': 'لوحة التحكم الشاملة الخاصة بنا توفر تحليلات في الوقت الفعلي حول سلوك العملاء والمنتجات الشائعة وأوقات التسوق الذروة واتجاهات المعاملات. هذه الرؤى تساعدك في تحسين المخزون والموظفين واستراتيجيات التسويق لزيادة الإيرادات وتحسين الكفاءة التشغيلية.',
    
    'faq.retailer.q6': 'كم من الوقت يستغرق تطبيق ساتوتشي في متجري؟',
    'faq.retailer.a6': 'معظم التجار يمكنهم تطبيق ساتوتشي خلال 2-4 أسابيع، حسب حجم المتجر والتعقيد. هذا يشمل تكامل النظام وتدريب الموظفين وفترة إطلاق تدريجي. فريق الإعداد المخصص لدينا يضمن انتقال سلس مع أقل تعطيل لعملياتك.',

    // Footer Section
    'footer.newsletter.title': 'اشترك في نشرة ساتوتشي الإخبارية',
    'footer.newsletter.placeholder': 'أدخل البريد الإلكتروني',
    'footer.newsletter.button': 'اشترك',
    'footer.newsletter.description': 'لديك أسئلة؟ لدينا إجابات. استكشف الاستفسارات الأكثر شيوعًا حول ساتوتشي، وكيف يعمل، وكيف يجعل تجربة التسوق أسهل.',
    'footer.playStore': 'متجر جوجل',
    'footer.appStore': 'متجر آبل',
    'footer.landingPages': 'الصفحات الرئيسية',
    'footer.home': 'الرئيسية',
    'footer.about': 'حولنا',
    'footer.join': 'انضم إلينا',
    'footer.news': 'الأخبار',
    'footer.faqs': 'الأسئلة الشائعة',
    'footer.legal': 'قانوني',
    'footer.retailerTerms': 'شروط التجار',
    'footer.privacy': 'الخصوصية',
    'footer.contact': 'اتصل بنا',
    'footer.address': 'العنوان:',
    'footer.addressText': 'Swedenborgsgatan 12, 753 34 Uppsala, Sweden.',

    // About Page
    'about.hero.badge': 'حول ساتوتشي',
    'about.hero.title': 'ثورة في التجزئة\nمن خلال الابتكار\nوالتكنولوجيا',
    'about.hero.description': 'نقوم بتحويل تجربة التجزئة من خلال تقنية المسح والدفع المتطورة،\nخلق تجارب تسوق سلسة للعملاء حول العالم.',
    
    'about.identity.whoWeAre': 'من نحن',
    'about.identity.whoWeAreDesc': 'نحن مدفوعون بالتحديات اليومية التي يواجهها المتسوقون والتجار، نحول التكنولوجيا إلى ثقة وسهولة، دفعة واحدة في كل مرة.',
    'about.identity.whatWeBelieve': 'ما نؤمن به',
    'about.identity.whatWeBelieveDesc': 'مهمتنا هي إحداث ثورة في طريقة تعامل الناس مع المعاملات، وتبسيط عملية الدفع من خلال التكنولوجيا المتطورة.',
    'about.identity.ourMission': 'مهمتنا',
    'about.identity.ourMissionDesc': 'تبسيط التسوق من خلال تقديم تجارب دفع أسرع وأذكى وأكثر خضرة للمستهلكين والتجار في جميع أنحاء العالم.',
    'about.identity.ourVision': 'رؤيتنا',
    'about.identity.ourVisionDesc': 'خلق مستقبل حيث يقدم كل متجر تجربة تسوق سلسة بدون طوابير أو تأخير أو هدر.',
    
    'about.story.badge': 'رحلتنا',
    'about.story.title': 'من السويد إلى العالم',
    'about.story.paragraph1': 'بدأت ساتوتشي™ كرؤية لإحداث ثورة في تكنولوجيا التجزئة. على الرغم من التحديات الأولية،\nبما في ذلك رفض في برنامج Dragon\'s Den السويدي، صمدنا وحولنا الرفض إلى\nنجاح عالمي.',
    'about.story.paragraph2': 'اليوم، نوسع حلولنا التكنولوجية للتجزئة عبر الشرق الأوسط وما بعده،\nنساعد التجار على إنشاء تجارب تسوق سلسة ولاسلكية تسعد\nالعملاء وتدفع نمو الأعمال.',
    'about.story.button': 'تعرف على المزيد عن رحلتنا',
    
    'about.ceo.greeting': 'مرحباً!',
    'about.ceo.name': 'أنا ميلودي أسكلوف',
    'about.ceo.title': 'الرئيس التنفيذي والمؤسس المشارك، ساتوتشي',
    'about.ceo.quote1': '"مع أكثر من 15 عامًا من الخبرة عبر البنوك والمالية والمبيعات والتسويق والاتصالات،\nلطالما آمنت بقوة الثقة والعلاقات والابتكار لتحويل الصناعات."',
    'about.ceo.quote2': '"لهذا السبب شاركت في تأسيس ساتوتشي – لخلق طريقة أذكى وأبسط وأكثر استدامة\nللتسوق. نحن نقضي على الاحتكاك الذي أزعج تجارب التسوق التقليدية لعقود."',
    'about.ceo.quote3': '"بالنسبة لي، التكنولوجيا تتعلق بالحرية. مهمة ساتوتشي هي جعل طوابير الدفع عتيقة\nوجعل الدفع سهلاً مثل مسح واحد."',
    'about.ceo.experience': '15+ سنة من الخبرة',
    'about.ceo.experienceDesc': 'في البنوك والمالية والمبيعات والتسويق والاتصالات.',
    'about.ceo.global': 'المهمة العالمية',
    'about.ceo.globalDesc': 'بناء تجربة تسوق تربط العملاء والتجار في جميع أنحاء العالم.',
    'about.ceo.future': 'تجارة المستقبل',
    'about.ceo.futureDesc': 'في مهمة لجعل طوابير الدفع عتيقة مع المسح والدفع.',
    
    'about.team.title': 'تعرف على فريقنا',
    'about.team.description': 'وراء ساتوتشي فريق شغوف من المبتكرين والمصممين وحل المشاكل الذين يؤمنون بأن التسوق يجب أن يكون أسرع وأذكى وأكثر متعة.',
    'about.team.loading': 'جاري تحميل أعضاء الفريق...',
    'about.team.empty': 'لا يوجد أعضاء فريق للعرض.',

    // Signup Page
    'signup.hero.badge': 'هل أنت تاجر؟',
    'signup.hero.title': 'أعد تصور الدفع باستخدام\nساتوتشي واجلب\nالابتكار إلى التجزئة.',
    'signup.hero.description': 'ساتوتشي يجعل التسوق سلسًا من خلال السماح لك بالمسح والدفع\nفورًا حتى تتخطى الطابور وتستمتع بتسوق أسرع وأذكى\nوأكثر استدامة.',
    
    'signup.step1.title': 'اتصل بنا',
    'signup.step1.description': 'املأ النموذج أدناه لإخبارنا بالمزيد عن متجرك وعملائك\nوكيف تعمل. يساعد هذا فريقنا في تصميم حل مخصص\nيناسب عملك بشكل أفضل.',
    'signup.step1.button': 'اتصل بنا',
    
    'signup.step2.title': 'عملية الدمج',
    'signup.step2.description': 'سينتظم فريق ساتوتشي لضمان مزامنة المخزونات الخاصة بك\nوتدريب فريقك لبدء قبول المتسوقين باستخدام\nساتوتشي في أقل من أسبوعين.',
    
    'signup.step3.title': 'التحسين المستمر',
    'signup.step3.description': 'نعمل معًا عن كثب حتى بعد الإطلاق - جمع الملاحظات\nوتحديث الميزات وضمان استمرار ساتوتشي في جعل الدفع\nأكثر سلاسة للجميع.',
    
    'signup.form.title': 'لنبدأ',
    'signup.form.description': 'املأ التفاصيل التالية، وسنتواصل معك.',
    'signup.form.fullName': 'الاسم الكامل',
    'signup.form.storeName': 'اسم المتجر',
    'signup.form.address': 'العنوان',
    'signup.form.email': 'البريد الإلكتروني',
    'signup.form.phone': 'الهاتف',
    'signup.form.companyUrl': 'رابط الشركة',
    'signup.form.pos': 'ما هو نظام نقاط البيع الذي تستخدمه؟',
    'signup.form.dailyCustomers': 'نطاق العملاء اليوميين',
    'signup.form.submit': 'إرسال',
    'signup.form.submitting': 'جاري الإرسال...',
    'signup.form.success': 'تم إرسال النموذج بنجاح! سنتواصل معك قريبًا.',
    'signup.form.error': 'خطأ في إرسال النموذج. يرجى المحاولة مرة أخرى.',

    // Product Page
    'product.hero.badge': 'المنتجات والميزات',
    'product.hero.title': 'منتجات وميزات ساتوتشي\nلحلول البيع بالتجزئة الحديثة',
    'product.hero.description': 'أحدث ثورة في تجربة التسوق الخاصة بك مع حلول الدفع المبتكرة والميزات الذكية المصممة لجعل كل معاملة سلسة وبلا جهد.',
    
    'product.feature1.title': 'قدم لعملائك مدفوعات مرنة مع تابي و ساتوتشي',
    'product.feature1.point1': 'تمكين العملاء من تقسيم المدفوعات إلى أقساط قابلة للإدارة.',
    'product.feature1.point2': 'تحسين راحة التسوق وتحسين تجربة العملاء الشاملة.',
    'product.feature1.point3': 'زيادة تحويلات المبيعات من خلال تقديم خيار دفع أكثر سهولة.',
    'product.feature1.cardTitle': 'خيارات الدفع المقسم',
    'product.feature1.cardPoint1': 'تتبع في الوقت الفعلي',
    'product.feature1.cardPoint2': 'مدفوعات آمنة',
    'product.feature1.cardPoint3': 'إشعارات فورية',
    
    'product.feature2.title': 'تخطى الطابور وتسوق بذكاء',
    'product.feature2.point1': 'تخطى الطابور وتسوق بذكاء مع تجربة التسوق عبر الإنترنت المبسطة.',
    'product.feature2.point2': 'تجنب إزعاج الطوابير والمتاجر المزدحمة.',
    'product.feature2.point3': 'استمتع بالشراء السريع والسهل والآمن.',
    'product.feature2.point4': 'احصل على منتجاتك مُسلمة إليك مباشرة، مما يوفر الوقت والجهد.',
    'product.feature2.cardTitle': 'تسوق ذكي',
    'product.feature2.cardPoint1': 'موقع المتجر',
    'product.feature2.cardPoint2': 'مخزون في الوقت الفعلي',
    'product.feature2.cardPoint3': 'دفع سريع',
    
    'product.feature3.title': 'أحدث المعاملات',
    'product.feature3.point1': 'إدارة وعرض أحدث المعاملات نيابة عن ساتوتشي في الوقت الفعلي.',
    'product.feature3.point2': 'ابق محدثًا مع مدفوعات العملاء وتاريخ الشراء.',
    'product.feature3.point3': 'تتبع بسهولة المبيعات والاستردادات وحالة الدفع من خلال لوحة تحكم بديهية.',
    'product.feature3.point4': 'ضمان تدفق المعاملات السلس ورضا العملاء مع التقارير التفصيلية.',
    'product.feature3.cardTitle': 'تتبع في الوقت الفعلي',
    'product.feature3.cardPoint1': 'تاريخ المعاملات',
    'product.feature3.cardPoint2': 'تحليلات الدفع',
    'product.feature3.cardPoint3': 'رؤى لوحة التحكم',
    
    'product.feature4.title': 'امسح وادفع',
    'product.feature4.point1': 'تبسيط المدفوعات مع امسح وادفع لتجربة تسوق سلسة.',
    'product.feature4.point2': 'يمكن للعملاء إكمال المعاملات بسرعة عن طريق مسح رمز QR.',
    'product.feature4.point3': 'إلغاء الحاجة للنقود أو البطاقات، وتقديم مدفوعات آمنة ولا تلامس.',
    'product.feature4.point4': 'تسريع عمليات الدفع، مما يعزز راحة العملاء ورضاهم.',
    'product.feature4.cardTitle': 'مدفوعات QR سريعة',
    'product.feature4.cardPoint1': 'مسح رمز QR',
    'product.feature4.cardPoint2': 'مدفوعات لا تلامس',
    'product.feature4.cardPoint3': 'معالجة فورية',
    
    'product.downloadButton': 'تحميل التطبيق',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return (currentTranslations as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
