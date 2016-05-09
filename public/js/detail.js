$(function() {
	$('.comment').click(function(e) {
		$('#commentForm textarea').focus();
		var target = $(this)
		var toId = target.data('tid')
		var commentId = target.data('cid')
		if ($('#toId').length > 0) {
			$('#toId').val(toId)
		}
		else {
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm')
		}
		if ($('#commentId').length > 0) {
			$('#commentId').val(commentId)
		}
		else {
			$('<input>').attr({
				type: 'hidden',
				id: 'commentId',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm')	
		}	
	})

	$('.delete').click(function(e) {
		var target = $(this)
		var toId = target.data('tid')
		var commentId = target.data('cid')
		var comment = $(this).parents(".media")
		$.ajax({
			type: 'DELETE',
			url: '/user/comment?id=' + commentId
		})
		.done(function(results) {
			if (results.status === 1) {
				if (comment.length > 0) {
					comment.remove()
					alert("删除成功")
				}
			}
		})
	})
})