$(document).ready(() => {
    $("#g-form").validate({
        rules: {
            "Address.HouseNo": {
                required: true,
            },
            "Address.Street": {
                required: true,
                minlength: 4,
            },
            "Address.City": {
                required: true,
                minlength: 4,
                pattern: /^[a-z ]+$/i
            },
            "Address.Province": {
                required: true,
                minlength: 4,
                pattern: /^[a-z ]+$/i
            },
            "Address.PostalCode": {
                required: true,
                pattern: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
            },
            "CarDetail.Make": {
                required: true,
            },
            "CarDetail.Model": {
                required: true,
            },
            "CarDetail.Year": {
                required: true,
                digits: true,
            },
            "CarDetail.PlatNumber": {
                required: true,
            }

        },
        messages: {
            "Address.HouseNo": {
                required: "House Number is required.",
            },
            "Address.Street": {
                required: "Street is required.",
            },
            "Address.City": {
                required: "City is required",
                pattern: "Only Alfabets are allowed"
            },
            "Address.Province": {
                required: "Province is required.",
                pattern: "Only Alfabets are allowed"
            },
            "Address.PostalCode": {
                required: "Postal code is required",
                pattern: "Invalid format. Eg. N2H 3H5,N2H3H5,N2H-3H5"
            },
            "CarDetail.Make": {
                required: "Make is required.",
            },
            "CarDetail.Model": {
                required: "Model is required",
            },
            "CarDetail.Year": {
                required: "Year is required",
            },
            "CarDetail.PlatNumber": {
                required: "Plat number is required",
            }


        }
    });
    $('#g-form').submit(function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            $.post("/api/update-user-detail", {
                Slot: $("#user-selected-slot").val(),
                UserFilter: $("#user-id").val(),
                Address: {
                    HouseNo: $("#house-number").val(),
                    Street: $("#street").val(),
                    City: $("#city").val(),
                    Province: $("#province").val(),
                    PostalCode: $("#postal-code").val(),
                },
                CarDetail: {
                    Make: $("#make").val(),
                    Model: $("#model").val(),
                    Year: $("#year").val(),
                    PlatNumber: $("#plat-number").val()
                }

            }).then(() => {
                alert("data is saved");
            })
        } 
    });

    function GetAvailibltiesByDate() {
        var date = $("#slot").val().split(" ")[0];
        availabileSlots = [];
        $("#user-selected-datetime").val("");
        $("#user-selected-slot").val("");
        $.post("/api/get-availabile-slots-by-date", {
            Date: date
        }).then((rs) => {
            let avialableTimeSlots = null;

            if (rs.Data.length > 0) {
                availabileSlots = rs.Data;
                avialableTimeSlots = [];
                rs.Data.forEach(slot => {
                    avialableTimeSlots.push(slot.Time);
                });
            }
            $('#slot').datetimepicker('setOptions', { allowTimes: avialableTimeSlots });
        })
    }
    $('#slot').datetimepicker({
        inline: true,
        step: 30,
        format: 'Y-m-d H:i',
        disabledDates: [],
        allowTimes: null,
        minDate: (new Date()).toISOString(),
        disabledWeekDays: [0],
        onSelectDate: function (d, e, e2, e3) {
            GetAvailibltiesByDate();
        },
        onSelectTime: function () {
            let selectedDate = availabileSlots.filter(x => x.Date == $("#slot").val().split(" ")[0] && x.Time == $("#slot").val().split(" ")[1]);

            if (selectedDate.length > 0) {
                $("#user-selected-datetime").val($("#slot").val());
                $("#user-selected-slot").val(selectedDate[0]._id);
            }
        },
    });
    GetAvailibltiesByDate();
});