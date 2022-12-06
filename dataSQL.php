<?php

$pillar=$_POST['pillar'];

switch($pillar){
	case 1:
		$pA = $_POST['metal1'];
		$sname="sql9.freemysqlhosting.net";
        $uname="sql9579295";
        $password="zgArdgdCCJ";
        $database="sql9579295";
        $connection = new mysqli($sname,$uname,$password, $database);
        $sql = "SELECT * FROM DespMetales"; 
      	$res = $connection->query($sql) ;
   			 while ($row = $res->fetch_assoc()) {
   			 		 if ($row['name']==$pA){
             			 printf ($row['K']);
            }
    			}
    		$res->free();
		break;


	case 2: 
		$pA = $_POST['metal1'];
		$sname="sql9.freemysqlhosting.net";
        $uname="sql9579295";
        $password="zgArdgdCCJ";
        $database="sql9579295";
        $connection = new mysqli($sname,$uname,$password, $database);
        $sql = "SELECT * FROM DespMetales"; 
      	$res = $connection->query($sql) ;
   			 while ($row = $res->fetch_assoc()) {
   			 		 if ($row['name']==$pA){
             			 printf ($row['Hex']);
            }
    			}
    		$res->free();

		break;

		case 3: 
		$pB = $_POST['metal2'];
		$sname="sql9.freemysqlhosting.net";
        $uname="sql9579295";
        $password="zgArdgdCCJ";
        $database="sql9579295";
        $connection = new mysqli($sname,$uname,$password, $database);
        $sql = "SELECT * FROM DespMetales"; 
      	$res = $connection->query($sql) ;
   			 while ($row = $res->fetch_assoc()) {
   			 		 if ($row['name']==$pB){
             			 printf ($row['K']);
            }
    			}
    		$res->free();

		break;

		case 4: 
		$pB = $_POST['metal2'];
		$sname="sql9.freemysqlhosting.net";
        $uname="sql9579295";
        $password="zgArdgdCCJ";
        $database="sql9579295";
        $connection = new mysqli($sname,$uname,$password, $database);
        $sql = "SELECT * FROM DespMetales"; 
      	$res = $connection->query($sql) ;
   			 while ($row = $res->fetch_assoc()) {
   			 		 if ($row['name']==$pB){
             			 printf ($row['Hex']);
            }
    			}
    		$res->free();

		break;

		case 5: 
		$pC = $_POST['metal3'];
		$sname="sql9.freemysqlhosting.net";
        $uname="sql9579295";
        $password="zgArdgdCCJ";
        $database="sql9579295";
        $connection = new mysqli($sname,$uname,$password, $database);
        $sql = "SELECT * FROM DespMetales"; 
      	$res = $connection->query($sql) ;
   			 while ($row = $res->fetch_assoc()) {
   			 		 if ($row['name']==$pC){
             			 printf ($row['K']);
            }
    			}
    		$res->free();

		break;

		case 6: 
		$pC = $_POST['metal3'];
		$sname="sql9.freemysqlhosting.net";
        $uname="sql9579295";
        $password="zgArdgdCCJ";
        $database="sql9579295";
        $connection = new mysqli($sname,$uname,$password, $database);
        $sql = "SELECT * FROM DespMetales"; 
      	$res = $connection->query($sql) ;
   			 while ($row = $res->fetch_assoc()) {
   			 		 if ($row['name']==$pC){
             			 printf ($row['Hex']);
            }
    			}
    		$res->free();

		break;
}

?>
