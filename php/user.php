<?php
header("content-type:text/html;charset=uft-8");
$db = new PDO("mysql:host=127.0.0.1;dbname=zhao","root","123456");

$sql = "select * from aiqiyi where username = '".$_POST['username']."'";
$res = $db->query($sql);

$ret = $res->fetchAll(PDO::FETCH_ASSOC);

echo JSON_encode($ret);

//if($res === false){
//    echo json_encode(['msg'=>"执行${$sql}失败，失败原因：".$db->errorInfo()[2],"code"=>0,"url"=>""]);
//}else{
//    //整理
//    $data = $res->fetch(PDO::FETCH_ASSOC);
//    //语句执行成功后是否查到了数据
//    if($data === false){
//        echo json_encode(['msg'=>"没有查到数据","code"=>1,"url"=>""]);
//
//    }else{
//        echo json_encode(['msg'=>"查到数据","code"=>2,"url"=>""]);
//    }
//
//}