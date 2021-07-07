<?php
include "mysqlPDOManage.php";

$db = new mysqlPDOManage("127.0.0.1","zhao","123456");

$sql = "insert into pinglun(id,username,name,movie,content,head_img) values(null,'".$_POST['username']."','".$_POST['name']."','".$_POST['movie']."','".$_POST['content']."','".$_POST['head_img']."')";

$res = $db->exec($sql);

echo $db->msg;