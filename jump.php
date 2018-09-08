<?php
$http_type = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')) ? 'https://' : 'http://';
function check_session($s){
	if($s == "1234567"){
        return "admin";
    }
    if($s == "7654321"){
        return "user";
    }
    if($s == "1111111"){
            return "黄";
        }
    return "";
}

$session=$_GET["session"];

$if_jump = check_session($session);

if($if_jump!=""){
	$filename = "./scope.html";
    $handle = fopen($filename, "r");
    $contents = fread($handle, filesize ($filename));
    fclose($handle);
    //echo "httphead:".$http_type;
    if($http_type == 'https://'){
        $contents = str_replace("http","https",$contents,$count);
        //echo "replace count:".$count;
    }
	echo $contents;
}else{
	$filename = "./Login.html";
    $handle = fopen($filename, "r");
    $contents = fread($handle, filesize ($filename));
    fclose($handle);
	echo $contents;
}
?>