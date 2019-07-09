$(".newProfilePhoto").change(function () {
    var image = this.files[0];

    if (image["type"] != "image/jpeg" && image["type"] != "image/png" && image["type"] != "image/jpg") {
        $(".newProfilePhoto").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Image has to be JPEG or PNG!",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });
    } else if (image["size"] > 2000000) {

        $(".newProfilePhoto").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Please upload an image lesser than 2Mb.",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });

    } else {

        var imgData = new FileReader;
        imgData.readAsDataURL(image);

        $(imgData).on("load", function (event) {

            var routeImg = event.target.result;

            $(".preview").attr("src", routeImg);

        });

    }
})

$(".editProfilePhoto").change(function () {
    var image = this.files[0];

    if (image["type"] != "image/jpeg" && image["type"] != "image/png" && image["type"] != "image/jpg") {
        $(".editProfilePhoto").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Image has to be JPEG or PNG!",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });
    } else if (image["size"] > 2000000) {

        $(".editProfilePhoto").val("");

        swal({
            type: "error",
            title: "Error uploading image",
            text: "Please upload an image lesser than 2Mb.",
            showConfirmButton: true,
            confirmButtonText: "Close"
        });

    } else {

        var imgData = new FileReader;
        imgData.readAsDataURL(image);

        $(imgData).on("load", function (event) {

            var routeImg = event.target.result;

            $(".preview").attr("src", routeImg);

        });

    }
})