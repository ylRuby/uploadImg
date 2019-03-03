<?php
$myFile = $_FILES['file'];
$myName = $myFile['name'];
$myPath = './upload/'.$myName;

// 【仅供测试】 真实上传功能更加严谨

move_uploaded_file($myFile['tmp_name'],$myPath)

?>