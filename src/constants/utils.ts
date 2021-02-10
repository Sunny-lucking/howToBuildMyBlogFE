/**
 * @Purpose 监听滚动事件
 * @param distance 滚动距离
 * @param fnOfMore 滚动大于distance触发的函数
 * @param fnOfLess 滚动小于distance触发的函数
 */
export function onWatchScroll(distance: number, fnOfMore: Function, fnOfLess: Function) {
    const listener = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > distance) {
            fnOfMore()
        } else {
            fnOfLess()
        }
    }
    window.addEventListener('scroll', listener)
    return function () {
        window.removeEventListener('scroll', listener)
    }

}


// 节流函数
export function throttle(fn: Function) {
    let timer: any = null;
    return function (config?:any) {
        if (!timer) {
            timer = setTimeout(function () {
                fn(config);
                timer = null;
            }, 1000)
        }
    }
}

// 防抖函数
export function deBounce() {
    let timer = 0;
    return function (callback: Function, ms: number) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
}

// 根据categoty和tagvalue的值，从category字典里获取对应的tagName
export function getTagNameFromCategoryList(categoryList: any, categoryValue: string, tagValue: string) {
    if (!categoryValue || !tagValue) {
        return;
    }
    const category = categoryList.filter((item: any) => item?._id === categoryValue)
    const tag = category && category[0] && category[0].tags.filter((item: any) => item?._id === tagValue)[0]
    return tag?.label
}


// 根据一个具体时间获得距离现在的时间
export function getDistanceSpecifiedTime(dateTime: string) {
    // 指定日期和时间
    var EndTime = new Date(dateTime);
    // 当前系统时间
    var NowTime = new Date();
    var t = NowTime.getTime() - EndTime.getTime();
    var d = Math.floor(t / 1000 / 60 / 60 / 24);
    var h = Math.floor(t / 1000 / 60 / 60 % 24);
    var html = d + " 天" + h + " 时";
    if(d){
        html = d + " 天"+ "前"
    }else if(h){
        html = h + " 小时"+ "前"
    }else{
        html ="刚刚"
    }
    return html 
}