$('.fileupload').change(function(event) {
        /* Act on the event */
        if ($('.fileupload').val().length) {
            var fileName = $('.fileupload').val();
            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            if (extension == ".jpg" || extension == ".png") {
                    var data = new FormData();
                    data.append('upload', $('#fileToUpload')[0].files[0]);
                    $.ajax({
                        url: 'apply/upload',
                        type: 'POST',
                        data: data,
                        cache: false,
                        contentType: false, //不可缺参数
                        processData: false, //不可缺参数
                        success: function(data) {
                            $("#headImg").attr("src",data.msg)
                        },
                        error: function() {
                            console.log('error');
                        }
                    });
            } 
        }
    });