var httphead = gethttphead();
var basic_address = getRelativeURL() + "/";
console.log(basic_address);
var wait_time_long = 3000;
var wait_time_middle = 1000;
var wait_time_short = 500;
var cycle_time = 60000;
var show_time = 15000;
var request_head = basic_address + "request.php";
var jump_url = basic_address + "jump.php";
var upload_url = basic_address + "upload.php";
var screen_saver_address = basic_address + "screensaver/screen.html";
var show_image_url = basic_address + "imageshow/ImageShow.html";
var weather_info = "";
var alarm_interval = null;
var alarm_interval_tab = null;

function logout() {
    delCookie("Environmental.inspection.session");
    window.location = httphead + "//" + window.location.host + basic_address + "login.html";
}

function video_windows(videoid) {
    window.open(httphead + "//" + window.location.host + basic_address + "/video/video.html?id=" + videoid, '监控录像', "height=284, width=340, top=0, left=400,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function screen_windows() {
    window.open(httphead + "//" + window.location.host + screen_saver_address + "?id=" + usr.id + "&StatCode=" + monitor_selected.StatCode, '屏幕保护', "height=auto, width=auto");
}

var ifPPTshow = false;
var usr;
usr = "";
var admin = "";
var keystr = "";
var table_row = 5;
var usr_msg = "";
var usr_ifdev = "true";
var usr_img = [];
var usr_favorate_city = "";
var current_table;
var table_head;
var map_MPMonitor;
var map_AlarmMonitor;
var mark_MPMonitor_List = [];
var map_initialized = false;
var usr_faverate_list = [];
var user_initial = false;
var user_start = 0;
var user_total = 0;
var project_pg_list = null;
var user_table = null;
var user_selected;
var user_selected_auth;
var user_selected_key;
var NewUserAuthDual2;
var user_module_status;
var pg_initial = false;
var pg_start = 0;
var pg_total = 0;
var pg_table = null;
var pg_selected;
var pg_selected_proj;
var NewPGProjDual2;
var pg_module_status;
var project_list = null;
var project_initial = false;
var project_start = 0;
var project_total = 0;
var project_table = null;
var project_selected;

var project_module_status;
var parameter_initial = false;

var if_update_table_initialize = false;
var point_initial = false;
var point_start = 0;
var point_total = 0;
var point_table = null;
var point_selected;
var point_selected_device;
var point_selected_picture;
var project_selected_point;
var project_selected_key;
var point_module_status;
var point_list = null;
var device_initial = false;
var device_start = 0;
var device_total = 0;
var device_table = null;
var device_selected;
var device_selected_sensor;
var device_module_status;

var key_initial = false;

var monitor_map_list = null;

var monitor_selected = null;

var monitor_map_handle = null;
var Monitor_table_initialized = false;
var Monitor_table_start = 0;
var Monitor_table_total = 0;
var Monitor_Static_table_initialized = true;
var if_static_table_initialize = false;
var Key_History_table_initialized = false;
var if_key_history_table_initialize = false;
var Key_auth_initialized = false;
var alarm_map_list = null;
var alarm_type_list = null;
var alarm_map_initialized = false;
var alarm_selected = null;
var alarm_map_handle = null;
var Warning_Handle_table_initialized = false;
var if_Warning_Handle_table_initialize = false;

var if_table_initialize = false;

var if_audit_stability_table_initialized = false;
var sensor_list = null;

var select_sensor = null;
var select_key_auth = null;
var camera_unit_h;
var camera_unit_v;

var Longitude = null;
var Latitude = null;

var global_key_word = "";
getLocation();
var CURRENT_URL = "desktop";


function getLocation() {
    console.log("正在获取位置！");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("无法获得当前位置！");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
}

function camera_status(){

}

function clear_window() {
    $("#UserManageView").css("display", "none");
    $("#PGManageView").css("display", "none");
    $("#ProjManageView").css("display", "none");
    $("#ParaManageView").css("display", "none");
    $("#MPManageView").css("display", "none");
    $("#DevManageView").css("display", "none");
    $("#MPMonitorView").css("display", "none");
    $("#MPMonitorTableView").css("display", "none");
    $("#MPMonitorCardView").css("display", "none");
    $("#MPMonitorStaticTableView").css("display", "none");
    $("#WarningCheckView").css("display", "none");
    $("#WarningHandleView").css("display", "none");
    $("#Desktop").css("display", "none");
    $("#Undefined").css("display", "none");
    $("#KeyManageView").css("display", "none");
    $("#KeyHistoryView").css("display", "none");
    $("#KeyAuthView").css("display", "none");
    $("#AuditStabilityView").css("display", "none");
}

function show_searchbar() {
    global_key_word = "";
    $("#CommonQueryInput").val("");
    $("#QueryBar").css("display", "block");
}

function hide_searchbar(){
    $("#QueryBar").css("display","none");
}

function Data_export_Normal(title, tablename, condition, filter) {
    $("#TableQueryCondition").css("display", "none");
    $("#ExportTable").empty();
    $("#TableExportTitle").text(title);
    var body = {
        TableName: tablename,
        Condition: condition,
        Filter: filter
    };
    var map = {
        action: "TableQuery",
        body: body,
        type: "query",
        user: usr.id
    };
    var Data_export_Normal_callback = function (result) {
        if (result.status == "false") {
            show_expiredModule();
            return;
        }
        ColumnName = result.ret.ColumnName;
        TableData = result.ret.TableData;
        var txt = "<thead> <tr>";
        var i;
        for (i = 0; i < ColumnName.length; i++) {
            txt = txt + "<th>" + ColumnName[i] + "</th>";
        }
        txt = txt + "</tr></thead>";
        txt = txt + "<tbody>";
        for (i = 0; i < TableData.length; i++) {
            txt = txt + "<tr>";
            for (var j = 0; j < TableData[i].length; j++) {
                txt = txt + "<td>" + TableData[i][j] + "</td>";
            }
            txt = txt + "</tr>";
        }
        txt = txt + "</tbody>";
        $("#ExportTable").append(txt);
        if (if_table_initialize) $("#ExportTable").DataTable().destroy();
        var show_table = $("#ExportTable").DataTable({
            "scrollY": 200,
            "scrollCollapse": true,
            "scrollX": true,
            "searching": false,
            "autoWidth": true,
            "lengthChange": false,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    text: '导出到excel',
                    filename: title + (new Date()).Format("yyyy-MM-dd_hhmmss")
                }
            ]

        });
        if_table_initialize = true;
        modal_middle($('#TableExportModule'));
        $('#TableExportModule').modal('show');
    };
    JQ_get(request_head, map, Data_export_Normal_callback);
}

function JQ_get(url, request, callback) {
    if (request.user != "null") {
        if (usr.userauth[request.type] == "false") {
            show_alarm_module(true, "您没有进行此操作的权限", null);
            return;
        }
    }
    jQuery.get(url, request, function (data) {
        log(data);
        var result = JSON.parse(data);
        if (result.status == "false") {
            show_expiredModule();
            return;
        }
        if (result.auth == "false") {
            show_alarm_module(true, "您没有进行此操作的权限：" + result.msg, null);
            return;
        }
        callback(result);
    });
}

var Person=function () {
    console.log("My name is Jerry");
};
