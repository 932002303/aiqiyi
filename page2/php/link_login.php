<?php
include "mysqlPDOManage.php";

$db = new mysqlPDOManage("127.0.0.1","zhao","123456");

$sql = "select * from aiqiyi where state = 1";

$res = $db->getOneData("$sql");

echo JSON_encode($res);