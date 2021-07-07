<?php
include "mysqlPDOManage.php";

$db = new mysqlPDOManage("127.0.0.1","zhao","123456");

$sql = "select * from pinglun";

$res = $db->getMoreData("select * from pinglun");

//echo $db->msg;

echo JSON_encode($res);
