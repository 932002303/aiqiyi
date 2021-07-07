<?php
include "mysqlPDOManage.php";

$db = new mysqlPDOManage("127.0.0.1","zhao","123456");

$sql = "update aiqiyi set state = 0 where username = ".$_POST['username'];

$res = $db->exec($sql);

echo $db->msg;