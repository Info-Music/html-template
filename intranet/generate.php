<?php
$arr = array(
    array(
        "title" => "Test link 1",
        "link" => "http://testlink.org/"
    ),
    array(
        "title" => "Test link 2",
        "link" => "http://testlink.org/2"
    )
);
file_put_contents("array.json", json_encode($arr));
echo "Done";
