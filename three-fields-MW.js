            $(document).ready(async () => {
              let res = await fetch(
                "https://cdn.jsdelivr.net/gh/autoapi0/autodata@main/scrape_data.json"
              );

              $("#year").change(function () {
                $(".focused").removeClass("focused");
                $(".focused-input").removeClass("focused-input");
                let selectedYear = $("#year").val();
                let makeOptions = jsonData[selectedYear];

                $("#make").removeAttr("disabled");
                $("#make").attr("aria-disabled", "false");

                $("#model").removeAttr("disabled");
                $("#model").attr("aria-disabled", "false");

                $("#make").empty();
                $("#model").empty();
                $("#modelSelect").empty();

                $("#make").append('<option value="selectMake"></option>');
                $("#model").append('<option value="selectModel"></option>');

                for (let make in makeOptions) {
                  if (makeOptions.hasOwnProperty(make)) {
                    $("#make").append(`<option value=${make}>${make}</option>`);
                  }
                }
              });

              $("#make").change(function () {
                $("#modelSelect.focused").removeClass("focused");
                $("#model.focused-input").removeClass("focused-input");
                let selectedYear = $("#year").val();
                let selectedMake = $(this).val();
                let modelOptions = jsonData[selectedYear][selectedMake];

                $("#model").empty();
                $("#modelSelect").empty();

                $("#model").append('<option value="selectModel"></option>');

                modelOptions.forEach((modelObj) => {
                  $("#model").append(
                    `<option value=${modelObj.value}>${modelObj.text}</option>`
                  );
                });
              });

              let jsonData = await res.json();
              console.log(jsonData);
            });
            $(".re_input").click(function () {
              $(this).addClass("selected");
              let lab = $(this).children("label").addClass("focused");
              let fi = $(this).children("select").addClass("focused-input");
            });
