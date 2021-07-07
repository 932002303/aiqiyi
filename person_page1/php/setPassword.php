<?php
include "mysqlPDOManage.php";

$db = new mysqlPDOManage("127.0.0.1","zhao","123456");

$sql = "update aiqiyi set pasword = '".md5($_POST['password'])."' where username = '".$_POST['username']."'";

$res = $db->exec($sql);

echo $db->msg;