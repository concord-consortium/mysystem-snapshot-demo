var snapshots = [];

function getMySystemJSON() {
  return $("#mysystem").contents().find("#my_system_state").text();
}

function setMySystemJSON(jsonString) {
  $("#mysystem").contents().find("#my_system_state").text(jsonString);
}

$(function () {
  
  $("#snapshot-button").click(function () {
    var snapshot = getMySystemJSON(),
        index = snapshots.length,
        now = new Date(),
        timeString = now.toLocaleTimeString();
        
    snapshots.push(snapshot);

    $("#snapshot-select").append("<option value='"+index+"'>"+timeString+"</option>");
    $("#snapshot-select").val(index);
  });
  
  $("#snapshot-select").change( function () {
    var index = parseInt(jQuery(this).val(), 10);
    console.log("setting mysystem state to %d", index);
    setMySystemJSON(snapshots[index]);
  });
  
});