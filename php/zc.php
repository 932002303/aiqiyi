<?php
header("content-type:text/html;charset:utf-8");

$db = new PDO("mysql:host=127.0.0.1;dbname=zhao","root","123456");

$sql = "insert into aiqiyi (id,username,pasword,name,head_img) values (null,'".$_POST['username']."','".md5($_POST['pwd'])."','user:".$_POST['username']."','".$_POST['head_img']."')";
//$sqll = "create table personage (id int(11) not null auto_increment,name varchar(23) character set utf8 collate utf8_general_ic not comment "

$res = $db->query($sql);



if($res === false){
    echo json_encode(['msg'=>"执行${$sql}失败，失败原因：".$db->errorInfo()[2],"code"=>0,"url"=>""]);
   }else{
       //语句执行成功后是否查到了数据
       if($data === 0){
           echo json_encode(['msg'=>"注册失败","code"=>1,"url"=>""]);

       }else{
           echo json_encode(['msg'=>"注册成功","code"=>2,"url"=>""]);
       }

   }