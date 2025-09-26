// اسکریپت مدیریت تصاویر ویژگی ها
document.addEventListener('DOMContentLoaded', function() {
    const featureItems = document.querySelectorAll('.circle1-extra-left-content');
    const featureImages = document.querySelectorAll('.circle1-feature-image');
    const defaultImage = document.querySelector('.circle1-feature-image.circle1-default');
    
    // تابع برای تغییر تصویر
    function changeFeatureImage(imageName) {
        // مخفی کردن همه تصاویر
        featureImages.forEach(img => {
            img.classList.remove('active');
            img.classList.add('hidden');
        });
        
        // نمایش تصویر مورد نظر
        if (imageName === 'default') {
            defaultImage.classList.remove('hidden');
            defaultImage.classList.add('active');
        } else {
            const targetImage = document.querySelector(`.circle1-feature-image[data-target="${imageName}"]`);
            if (targetImage) {
                targetImage.classList.remove('hidden');
                targetImage.classList.add('active');
            }
        }
    }
    
    // افزودن event listener برای هر آیتم ویژگی
    featureItems.forEach(item => {
        const imageName = item.getAttribute('data-image');
        
        // هاور ماوس
        item.addEventListener('mouseenter', function() {
            changeFeatureImage(imageName);
        });
        
        // خروج ماوس
        item.addEventListener('mouseleave', function() {
            // تاخیر کوچک برای جلوگیری از پرش سریع
            setTimeout(() => {
                const isHovering = Array.from(featureItems).some(item => 
                    item.matches(':hover')
                );
                
                if (!isHovering) {
                    changeFeatureImage('default');
                }
            }, 100);
        });
    });
    
    // مدیریت زمانی که ماوس از کل بخش خارج می‌شود
    const featuresSection = document.querySelector('.circle1-extra-features-content');
    featuresSection.addEventListener('mouseleave', function() {
        changeFeatureImage('default');
    });
});