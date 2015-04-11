<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    switch(filter_input(INPUT_POST, "action", FILTER_SANITIZE_FULL_SPECIAL_CHARS)) {
        case "add":
            $linkTitle = filter_input(INPUT_POST, "linkTitle", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $linkHref = filter_input(INPUT_POST, "linkHref", FILTER_SANITIZE_URL);
            $previousLinks = json_decode(file_get_contents('array.json'), true);
            $previousLinks[] = array(
                "title" => $linkTitle,
                "link" => $linkHref
            );
            file_put_contents("array.json", json_encode($previousLinks));
            die(json_encode(array("result" => true)));
        case "delete":
            $linkID = filter_input(INPUT_POST, "id", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $links = json_decode(file_get_contents('array.json'), true);
            if (isset($links[$linkID]) !== false) {
                unset($links[$linkID]);
                file_put_contents("array.json", json_encode($links));
                die(json_encode(array("result" => true)));
            } else {
                die(json_encode(array("result" => false, "error" => "not found", "Link id" => $linkID, "All links" => $links)));
            }

        case "edit":
            $linkID = filter_input(INPUT_POST, "id", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $linkTitle = filter_input(INPUT_POST, "linkTitle", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $linkHref = filter_input(INPUT_POST, "linkHref", FILTER_SANITIZE_URL);
            $previousLinks = json_decode(file_get_contents('array.json'), true);
            $previousLinks[$linkID] = array(
                "title" => $linkTitle,
                "link" => $linkHref
            );
            file_put_contents("array.json", json_encode($previousLinks));
            die(json_encode(array("result" => true)));

        case "order":
            $order = filter_input(INPUT_POST, "order", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $order = explode("item[]=", $order);
            array_shift($order);

            $old = json_decode(file_get_contents('array.json'), true);
            $newOrder = array();

            $i = 0;
            foreach($order as $item) {
                $item = substr($item, 0, 1);
                $newOrder[$i] = $old[$item];
                $i++;
            }
            file_put_contents("array.json", json_encode($newOrder));
            die(json_encode(array("result" => true)));

        default:
            die(json_encode(array("result" => false)));
    }

} else {
    echo "Not permitted";
}

?>
