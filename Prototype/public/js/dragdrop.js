$(init);
function init()
{
    zValue = 100;
    $(".dragMe").draggable({revert:false});
    $("#target").droppable();

    $("#target").bind("drop", highlightTarget);
    $("#target").bind("dropout", resetTarget);

    $("div").addClass("ui-widget")
            .addClass("ui-widget-content")
            .addClass("ui-corner-all");
    $(":header").addClass("ui-widget-header")
                .addClass("ui-corner-all");

}

function highlightTarget(event, ui)
{
    $("#"+ui.draggable.attr("id")).clone().appendTo("big-graph")
    $("#target").addClass("ui-state-highlight")
                .html("Dropped ")
                .append(ui.draggable.text());

    ui.draggable.prop('class', 'overlap');
    ui.draggable.css("left", $("#target").position().left)
                .css("top", $("#target").position().top)
                .css("z-index", zValue);
    ui.draggable.resizable();
    zValue = zValue+100;
    console.log(zValue);
} 

function resetTarget(event, ui)
{
    $("#target").removeClass("ui-state-highlight")
                .html("Drop on me");
}