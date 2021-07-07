<?php
//header("content-type:text/html;charset:utf-8");
//$db = new PDO("mysql:host=127.0.0.1;dbname=zhao","root","123456");
include "mysqlPDOManage.php";
$db = new mysqlPDOManage("127.0.0.1","zhao","123456");
$sql = "select * from aiqiyi where username = '".$_POST['username']."'";
$res = $db->getOneData($sql);
echo json_encode($res);
                //echo $db->msg;