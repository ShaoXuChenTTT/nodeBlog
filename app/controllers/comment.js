var _ = require('underscore')
var Comment = require('../models/comment')

// comment
exports.save = function(req, res) {
	var _comment = req.body.comment
	var articleId = _comment.article
	// console.log(_comment)
	if (_comment.cid) {
		Comment.findById(_comment.cid, function(err, comment) {
			var reply = {
				from: _comment.from,
				to: _comment.tid,
				content: _comment.content
			}

			comment.reply.push(reply)

			comment.save(function(err, comment) {
				if (err) {
					console.log(err)
				}

				res.redirect('/article/' + articleId)	
			})
		})
	}
	else {
		var comment = new Comment(_comment)

		comment.save(function(err, comment) {
			if (err) {
				console.log(err)
			}

			res.redirect('/article/' + articleId)
		})
	}
	
}
// delete comment 
exports.del = function(req, res) {
	var id = req.query.id

	if (id) {
		Comment.remove({_id: id}, function(err, comment){
			if (err) {
				console.log(err)
			}
			else {
				res.json({status: 1, code: "OK"})
			}
		})
	}
}
