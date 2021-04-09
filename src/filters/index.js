export function getStatus(data) {
    switch (data) {
        case "2":
            return "代提交";
        case "1":
            return "已提交";
        case "3":
            return "初审通过";
        case "4":
            return "初审拒接";
        case "5":
            return "终审通过";
        case "6":
            return "终审拒接";
        default:
            return data;
    }
}

// 转化 createTime 至 nowTime
export function createNow(data){
    var nowTime = new Date();
    var createTime = new Date(data)
    var time = Date.parse(nowTime) - Date.parse(createTime)
    if(0 > time){
        return ''
    }else if(30 > time/1000){
        return '刚刚'
    }else if(60 > time/1000){
        return (time/1000).toFixed(0) + ' 秒前'     
    }else if(60 > time/1000/60){
        return (time/1000/60).toFixed(0) + ' 分钟前'
    }else if(24 > time/1000/60/60){
        return (time/1000/60/60).toFixed(0) + ' 小时前'
    }else if(31 > time/1000/60/60/24){
        return (time/1000/60/60/24).toFixed(0) + ' 天前'
    }else if(12 > time/1000/60/60/24/31){
        return (time/1000/60/60/24/31).toFixed(0) + ' 个月前'
    }else {
        return (time/1000/60/60/24/31/12).toFixed(0) + ' 年前'
    }
}

// 转化标签
export function tabFormatter(post){
    if(post.good == true){
        return '精华'
    }else if(post.top == true){
        return '置顶'
    }else if(post.tab == 'share'){
        return '分享'
    }else if(post.tab == 'ask'){
        return '­问答'
    }else if(post.tab == 'job'){
        return '招聘'
    }else {
        return '其他'
    }
}

// 转化标签(非置顶、精华)
export function tabFormat(post){
    if(post.tab == 'share'){
        return '分享'
    }else if(post.tab == 'ask'){
        return '­问答'
    }else if(post.tab == 'job'){
        return '招聘'
    }else {
        return '其他'
    }
}

// 转化标签(置顶、精华)
export function tabFormatTop(post){
    if(post.good == true){
        return '精华'
    }else if(post.top == true){
        return '置顶'
    }else {
        return ''
    }
}