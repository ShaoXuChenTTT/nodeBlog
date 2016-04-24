var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
	article: {type: ObjectId, ref: 'Article'}, //评论对应的文章，通过Article的id和Article表相连
	from: {type: ObjectId, ref: 'User'},	//评论者，通过User的id和User表相连
	reply: [{	//评论回复
		from: {type: ObjectId, ref: 'User'},	//回复者，通过User的id和User表相连
		to: {type: ObjectId, ref: 'User'},	//回复给谁，通过User的id和User表相连
		content: String	//回复内容
	}],
	content: String,	//评论内容
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	} 
})

CommentSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}

	next()
})

CommentSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}
module.exports = CommentSchema