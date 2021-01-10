var roomId = "0x313435383931393339";

var importJs = document.createElement('script');
importJs.setAttribute("type", "text/javascript");
importJs.setAttribute("src", 'https://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js');
document.getElementsByTagName("head")[0].appendChild(importJs);

roomId = _hex(roomId);

//*********************************定制化数据

function _hex(hexCharCodeStr) {
    const trimStr = hexCharCodeStr.trim();
    const rawStr = trimStr.substr(0, 2).toLowerCase() === "0x" ? trimStr.substr(2) : trimStr;
    const len = rawStr.length;
    if (len % 2 !== 0) {
        return "";
    }
    var curCharCode;
    const resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}

function beautify(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

function createDiv() {
    if ($(".info-row").size() > 1) {
        $($(".info-row")[0]).remove();
    }
    $("#statisticsDiv").remove();
    $(".changeImg").remove();

    var div = "<div id='statisticsDiv'>"
        + "👨‍👩‍👧‍👦累计人数:<span id='accumulation' style='color: #f5bfb6'>9999</span>"
        + "　🏆总流水:<span id='revenue' style='color: #e89997'>999,9999</span>"
        + "　💖关注:<span id='attention' style='color: #ff8383'>9999</span>"
        + "　🔥热度:<span id='score' style='color: #f1727f '>9999</span>"
        + "　🧚‍♂贵宾:<span id='vip' style='color: #c06b85'>9999</span>"
        + "　🧝‍♀在线:<span id='online' style='color: #f9b193'>9999</span>"
        + "　💰本场:<span id='currRevenue' style='color: #ffc98b'>9,9999</span>"
        + "　🥇时榜:<span id='rank' style='color: #ffeb70'>1</span>"
        + "　⏳<span id='rankUpDes'>差值:</span><span id='rankUp' style='color: #ffd600'>999</span>"
        + "</div>";
    $($(".room-info")[0]).append(div);

    var btn = "<button onclick = \"changeImg()\" class=\"btn changeImg\" style=\" background-color: #e89997; width: 60px; height: 24px; margin-left: 20px; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; font-weight: 800;\">默认背景</button>";
    $($(".info-row")[0]).append(btn);
    var btn = "<button onclick = \"changeAnimeImg(26)\" class=\"btn changeImg\" style=\" background-color: #f1727f; width: 60px; height: 24px; margin-left: 20px; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; font-weight: 800;\">动漫背景</button>";
    $($(".info-row")[0]).append(btn);
    var btn = "<button onclick = \"changeAnimeImg(5)\" class=\"btn changeImg\" style=\" background-color: #c06b85; width: 60px; height: 24px; margin-left: 20px; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; font-weight: 800;\">游戏背景</button>";
    $($(".info-row")[0]).append(btn);
    var removeBtn = "<button onclick = \"removeImg()\" class=\"btn changeImg\" style=\" background-color: #cc9b2d; width: 60px; height: 24px; margin-left: 20px; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; font-weight: 800;\">去除背景</button>";
    $($(".info-row")[0]).append(removeBtn);

    $($(".room-info")[0]).css({
        "padding": "6px 8px",
        "-webkit-border-radius": "4px 4px 0 0",
        "-moz-border-radius": "4px 4px 0 0",
        "border-radius": "4px 4px 0 0",
        "background": "hsla(0,0%,100%,.2)",
        "font-size": "14px",
        "line-height": "24px"
    });
}

var lastRank = 0;
var lastScore = 0;
var lastAttention = 0;
var lastOnline = 0;
var lastVip = 0;

function reDiv() {
    $.ajaxSettings.async = false;
    var attention = 9999;
    var revenue = "999,9999";
    var currRevenue = "9,9999";
    var vip = 0;
    var score = 0;
    var online = 0;
    var accumulation = 0;
    var rank = 0;
    var rankUpDes = "";
    var rankUp = 999;
    var name = "xxx";
    $.getJSON("https://fm.missevan.com/api/v2/live/" + roomId, function (data) {
        var v = data.info.room.statistics;
        attention = v.attention_count;
        revenue = beautify(v.revenue);
        vip = v.vip;
        score = v.score;
        online = v.online;
        accumulation = v.accumulation;
        name = data.info.room.creator_username;

        var diffScoreDes = "";
        if (score > lastScore) {
            diffScoreDes = "↗";
        } else if (score < lastScore) {
            diffScoreDes = "↘";
        }

        var diffAttentionDes = "";
        if (attention > lastAttention) {
            diffAttentionDes = "↗";
        } else if (attention < lastAttention) {
            diffAttentionDes = "↘";
        }

        var diffOnlineDes = "";
        if (online > lastOnline) {
            diffOnlineDes = "↗";
        } else if (online < lastOnline) {
            diffOnlineDes = "↘";
        }

        var diffVipDes = "";
        if (vip > lastVip) {
            diffVipDes = "↗";
        } else if (vip < lastVip) {
            diffVipDes = "↘";
        }

        $("#attention").html(attention + diffAttentionDes);
        $("#revenue").html(revenue);
        $("#vip").html(vip + diffVipDes);
        $("#score").html(score + diffScoreDes);
        $("#online").html(online + diffOnlineDes);
        $("#accumulation").html(accumulation);
        lastScore = score;
        lastAttention = attention;
        lastOnline = online;
        lastVip = vip;
    });

    var currRevenueCount = 0;
    $.getJSON("https://fm.missevan.com/api/v2/chatroom/rank/" + roomId + "?type=1&p=1", function (data) {
        var d = data.info.Datas;
        for (var i = 0, l = d.length; i < l; i++) {
            currRevenueCount = currRevenueCount + d[i].revenue;
        }
        currRevenue = beautify(currRevenueCount);
        $("#currRevenue").html(currRevenue);
    });


    $.getJSON("https://fm.missevan.com/api/v2/chatroom/meta?room_id=" + roomId, function (data) {
        var h = data.info.hour_rank;
        rank = h.rank;
        rankUp = beautify(h.rank_up);
        if (rank === 0) {
            rankUpDes = "距离上榜:";
        } else if (rank === 1) {
            rankUpDes = "领先后一名:";
        } else {
            rankUpDes = "落后上一名:";
        }

        var diffRankDes = "";
        if (rank === 0) {
            if (lastRank > 0) {
                diffRankDes = "↘";
            }
        } else {
            if (lastRank === 0) {
                diffRankDes = "↗";
            } else if (rank < lastRank) {
                diffRankDes = "↗";
            } else if (rank > lastRank) {
                diffRankDes = "↘";
            }
        }
        rank = rank === 0 ? '无' : rank;
        $("#rank").html(rank + diffRankDes);
        $("#rankUpDes").html(rankUpDes);
        $("#rankUp").html(rankUp);
        lastRank = rank;
    });


    console.log("%c%s", "color: red; background: yellow; font-size: 16px;", "获取直播间数据 --- By 猫耳-钉钉官方旗舰店(QQ：204859003).");
    var table = [{
        "👨‍🎤姓名": name,
        "👨‍👩‍👧‍👦👧总在线": accumulation,
        "🏆总流水": revenue,
        "💖关注": attention,
        "🔥热度": score,
        "🧚‍♂贵宾": vip,
        "🧝‍♀在线": online,
        "💰本场": currRevenue,
        "🥇时榜": rank,
        "⏳时榜差值": rankUpDes + rankUp
    }];
    console.table(table);
}

function reDivInterval() {
    setInterval(reDiv, 1000 * 6);
}

var changeOrder = 0;

function changeImg() {
    try {
        var imgs = ['https://pic1.zhimg.com/80/v2-b7e38e1bf7c09610f17152ef32388fec_720w.jpg'
            , 'https://pic2.zhimg.com/80/v2-a862735c06feb9edce4369859daf5c12_720w.jpg'
            , 'https://pic2.zhimg.com/80/v2-d95644b7a8f361e86ba17555891666dc_720w.jpg'
            , 'https://pic4.zhimg.com/80/v2-8b8f8ca4a9d791130ed4a6310d7edb4c_720w.jpg'
            , 'https://pic1.zhimg.com/80/v2-b404bf99e42d16401720918a3aa3d228_720w.jpg'
            , 'https://pic4.zhimg.com/80/v2-527b50f8650cd17bd85841f4ab87c982_720w.jpg'
            , 'https://pic4.zhimg.com/80/v2-d659abc09f5de4757ee94fd4c9176a90_720w.jpg'
            , 'https://pic1.zhimg.com/80/v2-dc1c7828139e0d0861f2582f19892436_720w.jpg'
            , 'https://pic2.zhimg.com/80/v2-500005cfb3ad527dc582c5ba5fb11fa8_720w.jpg'
            , 'https://pic3.zhimg.com/80/v2-e0e61335137011282a5dd33aba33d2c7_720w.jpg'
            , 'https://pic2.zhimg.com/80/v2-a6b7f9b53257df8ad432e04aae334503_720w.jpg'
        ];
        var background = 'url(' + imgs[changeOrder % imgs.length] + ') center/cover no-repeat';
        changeOrder++;
        $("#Room").css({
            "background": background,
            "object-fit": "cover",
            "background-size": "cover",
            "-webkit-background-size": "cover",
            "-o-background-size": "cover",
            "background-position": "center 0"
        });
    } catch (err) {
        console.error(err);
    }
}

function changeAnimeImg(cid) {
    try {
        var random = Math.floor(Math.random() * (10000));
        $.getJSON("https://api.muxiaoguo.cn/api/360bizhi?cid=" + cid + "&count=1&start=" + random, function (imgs) {
            var img = imgs.data[0].imgurl;
            var background = 'url(' + img + ') center/cover no-repeat';
            $("#Room").css({
                "background": background,
                "object-fit": "cover",
                "background-size": "cover",
                "-webkit-background-size": "cover",
                "-o-background-size": "cover",
                "background-position": "center 0"
            });
        });
    } catch (err) {
        console.error(err);
    }
}

function changeScapeImg() {
    try {
        var background = 'url(https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&t=' + new Date().getTime() + ') center/cover no-repeat';
        $("#Room").css({
            "background": background,
            "object-fit": "cover",
            "background-size": "cover",
            "-webkit-background-size": "cover",
            "-o-background-size": "cover",
            "background-position": "center 0"
        });
    } catch (err) {
        console.error(err);
    }
}

function removeImg() {
    try {
        $("#Room").removeAttr("style");
    } catch (err) {
        console.error(err);
    }
}

function start() {
    setTimeout(function () {
        $.ajaxSettings.async = false;
        createDiv();
        reDiv();
        reDivInterval();
    }, 2 * 1000);
}

start();
