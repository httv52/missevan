var currRevenue = 0;
$.ajaxSettings.async = false;

function curr() {
    $.getJSON("https://fm.missevan.com/api/v2/chatroom/rank/" + roomId + "?type=1&p=1", function (data) {
        var d = data.info.Datas;
        for (var i = 0, l = d.length; i < l; i++) {
            currRevenue = currRevenue + d[i].revenue;
        }
    });
    console.log(currRevenue);
}

curr();
