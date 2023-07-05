const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
    const menuHeader = document.querySelector('.menu__header');
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuHeader.classList.toggle('_active');
    });
};

$(document).ready(function(){
    $('.slider').slick({
        arrows:false,
        dots: true,
        adaptiveHeight:true,
        slidesToShow:3,
        slidesToScroll:1,
        speed:300,
        easing:'linear',
        infinite:true,
        initialSlide:0,
        autoplay:false,
        autoplaySpeed:3000,
        pauseOnFocus:true,
        pauseOnHover:true,
        pauseOnDotsHover:true,
        draggable:true,
        swipe:true,
        touchThreshold:5,
        touchMove:true,
        waitForAnimate:true,
        centerMode:false,
        variableWidth:false,
        rows:1,
        slidesPerRow:1,
        vertical:false,
        verticalSwiping:false,
        responsive:[
            {
                breakpoint: 992,
                settings:{
                    slidesToShow:2
                }
            },{
                breakpoint: 650,
                settings:{
                    slidesToShow:1
                }
            }
        ],
        mobileFisrt:false,
    });
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        console.log(nextSlide);
    });
    $('.slider').on('afterChange', function(evnt, slick, currentSlide, nextSlide){
        console.log(currentSlide);
    });
});




"use strict"

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Получение обычных споллеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных спойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }
    // Получение слайдеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(",")[0];
    });

    // Инициализация слайдеров с медиа запросами
    if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        // Получение уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });

        // Работаем с каждым брейкпоинтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

        // Объекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
                return true;
            }
            });

          // Событие
            matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }

         // Инициализация 
            function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
            });
    }
    // Работа с контенотом 
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1');
                    spollerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spoller]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock/querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUP(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}


// Slide Toggle 
    let _slideUP = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.classList.transitionProperty = 'height, margin, padding';
            target.classList.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if(target.hidden) {
                target.hidden = false;
            }
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionProperty = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUP(target, duration);
        }
    }

