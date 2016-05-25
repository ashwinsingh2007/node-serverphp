<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
            $con=$_POST["name"];
            $conn=  mysqli_connect("127.0.0.1", "root", "ashwin", "ashwin");
            mysqli_query($conn, "insert into user values('$con')");
        ?>
    </body>
</html>
