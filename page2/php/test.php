<?php
include "mysqlPDOManage.php";

$db = new mysqlPDOManage("127.0.0.1","test","123456");

$sql = "select * from test";

$res = $db->getMoreData("$sql");
//$arr = $res->fetchAll(PDO::FETCH_ASSOC);

echo JSON_encode($res);