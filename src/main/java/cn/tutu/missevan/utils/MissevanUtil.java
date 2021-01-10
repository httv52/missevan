package cn.tutu.missevan.utils;

import org.testng.annotations.Test;

/**
 * 猫耳数据工具
 *
 * @author tao.tao
 * @date 2021-01-10
 **/
public class MissevanUtil {
    private static String msg = "var importJs = document.createElement('script');importJs.setAttribute(\"type\", \"text/javascript\");importJs.setAttribute(\"src\", 'https://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js');document.getElementsByTagName(\"head\")[0].appendChild(importJs);roomId = _hex(roomId);/**********************************定制化数据*/ function _hex(hexCharCodeStr) {const trimStr = hexCharCodeStr.trim();const rawStr = trimStr.substr(0, 2).toLowerCase() === \"0x\" ? trimStr.substr(2) : trimStr;const len = rawStr.length;if (len % 2 !== 0) {return \"\";}let curCharCode;const resultStr = [];for (let i = 0; i < len; i = i + 2) {curCharCode = parseInt(rawStr.substr(i, 2), 16);resultStr.push(String.fromCharCode(curCharCode));}return resultStr.join(\"\");}function beautify(num) {return (num || 0).toString().replace(/(\\d)(?=(?:\\d{3})+$)/g, '$1,')}function createDiv() {if ($(\".info-row\").size() > 1) {$($(\".info-row\")[0]).remove();}$(\"#statisticsDiv\").remove();var div = \"<div id='statisticsDiv'>\" + \"\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66累计人数:<span id='accumulation' style='color: #f5bfb6'>9999</span>\" + \"　\uD83C\uDFC6总流水:<span id='revenue' style='color: #e89997'>999,9999</span>\" + \"　\uD83D\uDC96关注:<span id='attention' style='color: #ff8383'>9999</span>\" + \"　\uD83D\uDD25热度:<span id='score' style='color: #f1727f '>9999</span>\" + \"　\uD83E\uDDDA\u200D♂贵宾:<span id='vip' style='color: #c06b85'>9999</span>\" + \"　\uD83E\uDDDD\u200D♀在线:<span id='online' style='color: #f9b193'>9999</span>\" + \"　\uD83D\uDCB0本场:<span id='currRevenue' style='color: #ffc98b'>9,9999</span>\" + \"　\uD83E\uDD47时榜:<span id='rank' style='color: #ffeb70'>1</span>\" + \"　⏳<span id='rankUpDes'>差值:</span><span id='rankUp' style='color: #ffd600'>999</span>\" + \"</div>\";$($(\".room-info\")[0]).append(div);}var lastRank = 0;var lastScore = 0;var lastAttention = 0;var lastOnline = 0;var lastVip = 0;function reDiv() {$.ajaxSettings.async = false;var attention = 9999;var revenue = \"999,9999\";var currRevenue = \"9,9999\";var vip = 0;var score = 0;var online = 0;var accumulation = 0;var rank = 0;var rankUpDes = \"\";var rankUp = 999;var name = \"xxx\";$.getJSON(\"https://fm.missevan.com/api/v2/live/\" + roomId, function (data) {var v = data.info.room.statistics;attention = v.attention_count;revenue = beautify(v.revenue);vip = v.vip;score = v.score;online = v.online;accumulation = v.accumulation;name = data.info.room.creator_username;var diffScoreDes = \"\";if (score > lastScore) {diffScoreDes = \"↗\";} else if (score < lastScore) {diffScoreDes = \"↘\";}var diffAttentionDes = \"\";if (attention > lastAttention) {diffAttentionDes = \"↗\";} else if (attention < lastAttention) {diffAttentionDes = \"↘\";}var diffOnlineDes = \"\";if (online > lastOnline) {diffOnlineDes = \"↗\";} else if (online < lastOnline) {diffOnlineDes = \"↘\";}var diffVipDes = \"\";if (vip > lastVip) {diffVipDes = \"↗\";} else if (vip < lastVip) {diffVipDes = \"↘\";}$(\"#attention\").html(attention + diffAttentionDes);$(\"#revenue\").html(revenue);$(\"#vip\").html(vip + diffVipDes);$(\"#score\").html(score + diffScoreDes);$(\"#online\").html(online + diffOnlineDes);$(\"#accumulation\").html(accumulation);lastScore = score;lastAttention = attention;lastOnline = online;lastVip = vip;});var currRevenueCount = 0;$.getJSON(\"https://fm.missevan.com/api/v2/chatroom/rank/\" + roomId + \"?type=1&p=1\", function (data) {var d = data.info.Datas;for (var i = 0, l = d.length; i < l; i++) {currRevenueCount = currRevenueCount + d[i].revenue;}currRevenue = beautify(currRevenueCount);$(\"#currRevenue\").html(currRevenue);});$.getJSON(\"https://fm.missevan.com/api/v2/chatroom/meta?room_id=\" + roomId, function (data) {var h = data.info.hour_rank;rank = h.rank;rankUp = beautify(h.rank_up);if (rank === 0) {rankUpDes = \"距离上榜:\";} else if (rank === 1) {rankUpDes = \"领先后一名:\";} else {rankUpDes = \"落后上一名:\";}var diffRankDes = \"\";if (rank === 0) {if (lastRank > 0) {diffRankDes = \"↘\";}} else {if (lastRank === 0) {diffRankDes = \"↗\";} else if (rank < lastRank) {diffRankDes = \"↗\";} else if (rank > lastRank) {diffRankDes = \"↘\";}}rank = rank === 0 ? '无' : rank;$(\"#rank\").html(rank + diffRankDes);$(\"#rankUpDes\").html(rankUpDes);$(\"#rankUp\").html(rankUp);lastRank = rank;});console.clear();console.log(\"%c%s\", \"color: red; background: yellow; font-size: 16px;\", \"获取直播间数据 --- By 猫耳-钉钉官方旗舰店(QQ：204859003).\");var table = [{\"\uD83D\uDC68\u200D\uD83C\uDFA4姓名\": name, \"\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66\uD83D\uDC67总在线\": accumulation, \"\uD83C\uDFC6总流水\": revenue, \"\uD83D\uDC96关注\": attention, \"\uD83D\uDD25热度\": score, \"\uD83E\uDDDA\u200D♂贵宾\": vip, \"\uD83E\uDDDD\u200D♀在线\": online, \"\uD83D\uDCB0本场\": currRevenue, \"\uD83E\uDD47时榜\": rank, \"⏳时榜差值\": rankUpDes + rankUp}];console.table(table);}function reDivInterval() {setInterval(reDiv, 1000 * 6);}setTimeout(function () {$.ajaxSettings.async = false;createDiv();reDiv();reDivInterval();}, 2 * 1000);\n";

    public static String getEncryptData(String roomId) {
        roomId = strToHex(roomId);
        return "var roomId = \"" + roomId + "\";" + msg;
    }

    public static String strToHex(String code) {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < code.length(); i++) {
            int ch = code.charAt(i);
            String s4 = Integer.toHexString(ch);
            str.append(s4);
        }
        return "0x" + str.toString();
    }

    @Test
    public void strToHex() {
        System.out.println(strToHex("195024530"));
    }

    @Test
    public void getEncryptData() {
        System.out.println(getEncryptData("230604872"));
    }

}