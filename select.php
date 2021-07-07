<?php
include "mysqlPDOManage.php";

$db = new mysqlPDOManage('127.0.0.1','zhao',"123456");

//$res = $db->exec("update hero set name='泽泽' where id = 1");
//$res = $db->exec("delete from hero where id = 11");
//$res = $db->exec("insert into hero(id,name,se,img) value(null,'盾山','男','images/ds.jpg')");
//var_dump($res);

$arr = $db->getMoreData("select * from hero");

echo $db->msg;

