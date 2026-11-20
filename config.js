/* إعدادات يمكن تعديلها بدون لمس الكود */
window.CFG={
  dataUrl:"data/items.json",   /* نسخة احتياطية عامة تعمل لو الشيت غير متاح */
  apiUrl:"https://script.google.com/macros/s/AKfycbzVnUpEy1c57hz3oyRYYTLkwzHZDYEhe1VJAVKSVq1ljC4ZnQlc1Xi6qGV6nsuqoouF/exec",                   /* رابط Google Apps Script (ينتهي بـ /exec) - يجعل التحديث والإضافة والحذف والتعديل لحظية لكل الأجهزة */
  logoDir:"logos/",
  imgDir:"images/",             /* صور الأصناف: images/الكود-1.jpg ، الكود-2.jpg ... (اللون الأول، الثاني...) */            /* شعارات الماركات: samsung.svg honor.svg xiaomi.svg ... */
  pollSec:30,                  /* كل كم ثانية يتحقق التطبيق من تغيير الشيت */
  contact:{whatsapp:""}        /* مثال: whatsapp:"966500000000" */
};
