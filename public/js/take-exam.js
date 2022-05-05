$(document).ready(() => {

    $('#test-observation').submit(function (e) {
        e.preventDefault();
        if ($(this).valid()) {

            if ($("input[name=OverAllResult]:checked").val()) {

                $.post("/api/save-test-observations", {
                    ExamineeId: $("#ExamineeId").val(),
                    AppointmentId: $("#AppointmentId").val(),
                    LeftTurn: $("#LeftTurn").prop("checked"),
                    RightTurn: $("#RightTurn").prop("checked"),
                    ThreePointTurn: $("#ThreePointTurn").prop("checked"),
                    UpHillParking: $("#UpHillParking").prop("checked"),
                    DownHillParking: $("#DownHillParking").prop("checked"),
                    ParellelParking: $("#ParellelParking").prop("checked"),
                    CheckingBackMirror: $("#CheckingBackMirror").prop("checked"),
                    SpeedLimit: $("#SpeedLimit").prop("checked"),
                    OverAllResult: $("input[name=OverAllResult]:checked").val(),
                    Comment: $("#Comment").val(),
                }).then((rs) => {
                    if (rs.Status == '1') {
                        alert("data is saved");
                        $("#Savefeedback").prop("disabled", true);
                        $("#ExamneeNoShow").prop("disabled", true);
                    } else {
                        alert(rs.Message);
                    }
                })
            }
        }
    });

    $("#ExamneeNoShow").click(function () {
        $.post("/api/update-appointment-no-show", {
            AppointmentId: $("#AppointmentId").val()
        }, function (rs) {
            if (rs.Status == '1') {
                alert("data is saved");
                $("#Savefeedback").prop("disabled", true);
                $("#ExamneeNoShow").prop("disabled", true);
            } else {
                alert(rs.Message);
            }
        });

    });

})