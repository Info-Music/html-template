$(function() {

    var contextMenu = $("#contextMenu");

    $("body").on("contextmenu", ".editable", function(e) {
        contextMenu.css({
            display: "block",
            left: e.pageX,
            top: e.pageY
        });
        contextMenu.attr("data-key", $(this).find("a").data("key"));
        return false;
    });

    $("body").click(function(e) {
        contextMenu.hide();
    });

    $("body").on("click", ".frameLink", function(e) {
        var link = $(this).attr("href");
        if($("iframe[src='" + link + "']")[0] == null) {
            $("iframe").each(function(i, el) {
                $(el).hide();
            });
            $(".fullFrameWrapper").append("<iframe class='fullFrame' src='" + link + "' class='frameLink'></iframe>")
        } else {
            $("iframe").each(function(i, el) {
                $(el).hide();
            });
            $("iframe[src='" + link + "']").show();
        }
        $(".navmenu").offcanvas("hide");
        return false;
    });

    $("body").on("click", ".removeLink", function(e) {
        var data = {
            "action": "delete",
            "id": $("#contextMenu").attr("data-key")
        }
        $.ajax({
            type: "POST",
            dataType: "JSON",
            url: "./process.php",
            data: data,
            success: function(data) {
                if(data.result === true) {
                    setTimeout(getLinks(), 1000);
                } else {
                    $(".navmenu-nav").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                    console.log(data);
                }
            },
            error: function(jqXHR, textStatus) {
                $(".navmenu-nav").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                console.log(jqXHR, textStatus);
            }
        });
    });

    $("body").on("click", ".editLink", function(e) {
        var id = $("#contextMenu").attr("data-key")
        $("#editTitleInput").val($("a[data-key=" + id + "]").html());
        $("#editLinkInput").val($("a[data-key=" + id + "]").attr("href"));
        $("#editIDInput").val(id);
        $("#editLinkModal").modal();
    });

    $(".addLinkForm").submit(function() {
        var data = {
            "action": "add"
        };

        data = $(this).serialize() + "&" + $.param(data);

        $.ajax({
            type: "POST",
            dataType: "JSON",
            url: "./process.php",
            data: data,
            success: function(data) {
                if(data.result === true) {
                    $("#addLinkModal").modal("hide");
                    setTimeout(getLinks(), 1000);
                } else {
                    $("#addLinkModal .modal-body").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                    console.log(data);
                }
            },
            error: function(jqXHR, textStatus) {
                $("#addLinkModal .modal-body").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                console.log(jqXHR, textStatus);
            }
        });
        return false;
    });

    $(".editLinkForm").submit(function() {
        var data = {
            "action": "edit"
        };

        data = $(this).serialize() + "&" + $.param(data);

        $.ajax({
            type: "POST",
            dataType: "JSON",
            url: "./process.php",
            data: data,
            success: function(data) {
                if(data.result === true) {
                    $("#editLinkModal").modal("hide");
                    setTimeout(getLinks(), 1000);
                } else {
                    $("#editLinkModal .modal-body").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                    console.log(data);
                }
            },
            error: function(jqXHR, textStatus) {
                $("#addLinkModal .modal-body").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                console.log(jqXHR, textStatus);
            }
        });
        return false;
    });

    getLinks();
    $(".navmenu-nav").sortable({
        containment: $(".navmenu"),
        cursor: "move",
        opacity: 0.8,
        update: function(event, ui) {
            var data = {
                "action": "order",
                "order": $(this).sortable('serialize')
            };
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "./process.php",
                data: data,
                success: function(data) {
                    if(data.result !== true) {
                        $(".navmenu").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                        console.log(data);
                    }
                    getLinks();
                },
                error: function(jqXHR, textStatus) {
                    $(".navmenu").append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>That did not went very well... Check the console for more...</div>');
                    console.log(jqXHR, textStatus);
                }
            });
        }
    });
    $(".navmenu-nav").disableSelection();
});

function getLinks() {
    $.getJSON("array.json", function(data) {
        var html = "";
        $.each(data, function(key, val) {
            html += "<li class='editable' id='item_" + key + "'><a href='" + val.link + "' data-key='" + key + "' class='frameLink'>" + val.title + "</a></li>";
        });
        $(".navmenu-nav").html(html);
    });
}
