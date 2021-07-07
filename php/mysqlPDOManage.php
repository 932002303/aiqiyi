<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2020/7/24 0024
 * Time: 11:14
 *///设置PHP文件编码
header("content-type:text/html;charset=utf-8");
//设置错误级别
error_reporting(E_ALL);
class mysqlPDOManage
{
    public $msg = "";    //操作信息
    public $conn = null; //数据库连接

    /*
     * 方法名：getMessage()
     * 功能：创建报错系统
     * 参数：@string $msg 信息 ， @bool $flag 标志：如果是true表示成功信息，如果是false表示失败信息
     * 返回值：无
     */
    public function getMessage($msg, $flag = false)
    {
        if ($flag) {
            $this->msg .= "<div style='font-size:12px;color:green'>{$msg}</div>";
        } else {
            $this->msg .= "<div style='font-size:12px;color:red'>{$msg}</div>";
        }
    }

    /*
    * 方法名：__construct();
    * 功能：构造方法，初始化数据库连接，pdo链接可以链接任意数据库比如sql server .....
    * 参数：
     *  @string $type 数据库类型
     *  @int    $port 端口号
    *   @string $host 主机地址
    *   @string $username 用户名
    *   @string $password 密码
    *   @string $dbName 数据库名称
    *   @string $charset 编码
    * 返回值：失败返回false ，成功无返回值
    */
    public function __construct($host, $dbName, $password='root',$username='root',  $charset = 'utf8', $type = 'mysql',$port=3306)
    {
        try{
            $this->conn = @new PDO("{$type}:host={$host};dbname={$dbName};port={$port};charset={$charset}",$username,$password);
            $this->getMessage("连接数据库服务器{$host}:{$port}成功，选择数据库{$dbName}成功，设置连接编码{$charset}成功。",true);
        }catch(PDOException $e){
            $err = iconv('gbk','utf-8',$e->getMessage());
            $this->getMessage("连接数据库{$host}:{$port}失败，失败原因：".$err);
            return false;
        }
    }
    /*
     * 方法名：exec();
     * 功能：执行增删改操作
     * 参数：@string $sql 语句
     * 返回值：执行成功返回true，执行失败返回false
     */
    public function exec($sql){
        //01 判断是否是增删改操作
        if(preg_match('/^(insert|update|delete)/i',trim($sql))) {
            //02 执行增删改操作,成功返回true，失败返回false
            $res = $this->conn->exec($sql);
            //03 判断增删改操作是否成功
            if($res !== false){
                $this->getMessage("执行\"{$sql}\"成功，".$res."行数据受到影响",true);
                return true;
            }else{
                $err = "[".$this->conn->errorCode()."] ".$this->conn->errorInfo()[2];
                $err = iconv('gbk','utf-8',$err);
                $this->getMessage("执行\"{$sql}\"失败。失败原因：".$err);
                return false;
            }
        }else{
            $this->getMessage("执行\"{$sql}\"失败。失败原因：".__function__."()方法只能执行增删改操作，请检查您的SQL语句，调整后再试。");
            return false;
        }
    }
    /*
     * 方法名：getOneData();
     * 功能：获得单条数据
     * 参数：@string $sql 语句
     * 返回值：执行成功返回一维数组，执行失败返回false
     */
    public function getOneData($sql){
        //检测SQL语句是否是查询语句
        if(preg_match('/^(select)/i',trim($sql))){
            //执行SQL语句
            $res = $this->conn->query($sql);
            if($res !== false){
                //整理数据
                $arr = $res->fetch(PDO::FETCH_ASSOC);
                if( $res->fetch(PDO::FETCH_ASSOC)){
                    $this->getMessage("执行\"{$sql}\"失败。失败原因：".__function__."()方法只能执行查询一条数据的操作，如想查询多条数据请使用getMoreData()实现，请检查您的SQL语句，调整后再试。");
                    return false;
                }else{
                    $this->getMessage("执行\"{$sql}\"成功。",true);
                    $res = null;
                    return $arr;
                }
            }else{
                $err = "[".$this->conn->errorCode()."] ".$this->conn->errorInfo();
                $err = iconv('gbk','utf-8',$err);
                $this->getMessage("执行\"{$sql}\"失败。失败原因：".$err);
                return false;
            }
        }else{
            $this->getMessage("执行\"{$sql}\"失败。失败原因：".__function__."()方法只能执行查询操作,请检查您的SQL语句，调整后再试。");
            return false;
        }
    }

    /*
     * 方法名：getMoreData();
     * 功能：获得多条数据
     * 参数：@string $sql 语句
     * 返回值：执行成功返回二维数组，执行失败返回false
     */
    public function getMoreData($sql){
        //检测SQL语句是否是查询语句
        if(preg_match('/^(select)/i',trim($sql))){
            //执行SQL语句
            $res = $this->conn->query($sql);
            if($res !== false){
                //整理数据
                $arr = $res->fetchAll(PDO::FETCH_ASSOC);

                $this->getMessage("执行\"{$sql}\"成功。",true);
                unset($res);
                return $arr;

            }else{
                $err = "[".$this->conn->errorCode()."] ".$this->conn->errorInfo();
                $err = iconv('gbk','utf-8',$err);
                $this->getMessage("执行\"{$sql}\"失败。失败原因：".$err);
                return false;
            }
        }else{
            $this->getMessage("执行\"{$sql}\"失败。失败原因：".__function__."()方法只能执行查询操作,请检查您的SQL语句，调整后再试。");
            return false;
        }
    }
    /*
     * 方法名：getTabelRows();
     * 功能：获取指定数据的行数
     * 参数：@string $table 表名 ，$where 条件
     * 返回值：执行成功返回行数（int），执行失败返回false
     */
    public function getTableRows($table,$where = true){
        $sql ="select count(*) as c from {$table} where {$where}";
        $res = $this->conn->query($sql);
        if($res !== false){
            $count =$res->fetch(PDO::FETCH_ASSOC);
            $this->getMessage("执行\"{$sql}\"成功",true);
            unset($res);
            return $count['c'];
        }else{
            $err = "[".$this->conn->errorCode()."] ".$this->conn->errorInfo();
            $err = iconv('gbk','utf-8',$err);
            $this->getMessage("执行\"{$sql}\"失败。失败原因：".$err);
            return false;
        }
    }
    /*
     * 方法名：closeDB();
     * 功能：关闭数据库
     * 参数：无
     * 返回值：无
     */
    public function closeDB(){
        $this->getMessage("关闭数据库成功",true);
        unset($this->conn);
    }
    /*
     * 方法名：__destruct();
     * 功能：释放资源
     * 参数：无
     * 返回值：无
     */
    public function __destruct(){
        unset($this->msg);
    }
}
