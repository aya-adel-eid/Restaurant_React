const EASE = [0.22, 1, 0.36, 1];

// مدة واحدة موحّدة لكل أنواع الحركة، عشان الإيقاع يبقى متناسق
const DURATION = 0.8;

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION, ease: EASE },
  },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -6, scale: 0.88 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: DURATION, ease: EASE },
  },
};

// نفس فاصل التتابع في كل مكان في الصفحة (function عشان تقدري تغيّري الفاصل عند الاستخدام)
export const stagger = (staggerTime = 0.15, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerTime, delayChildren: delay },
  },
});

export const viewportSettings = { once: true, amount: 0.25, margin: "-60px" };
