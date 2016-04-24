$(function() {
	var labels = '';
	$.each($('#articleLabelBox .articleLabel'),function(i){
		if(i != 0){
			labels += ','
		}
		labels += $(this).text()
	})
	$('#hiddenLabels').val(labels);
	$('.commonLabel').on('click',function(){
		var labelStr = $(this).text();
		if(labels.indexOf(labelStr) < 0){
			if(labels != ''){
				labels += ','
			}
			labels += labelStr
			$('#hiddenLabels').val(labels)
			var labelNode = '<span class="label label-info articleLabel">' + labelStr + '<i class="glyphicon glyphicon-remove"></i></span>'
			$('#articleLabelBox').append(labelNode)
		}
		else{
			alert('该标签已存在')
		}
	})
	var deleteLabel = function($label){
		$label.remove()
		var labelStr = $label.text()
		if(labels.indexOf(','+labelStr) > 0){
			labels = labels.replace(','+labelStr,'')
		}
		else{
			labels = labels.replace(labelStr,'')
		}
		$('#hiddenLabels').val(labels)
	}
	$(document).on('click', '.articleLabel i', function(){
		deleteLabel($(this).parent(".articleLabel"))
	})
})