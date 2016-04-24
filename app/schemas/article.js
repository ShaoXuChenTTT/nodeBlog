var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ArticleSchema = new mongoose.Schema({
	title: String,	//文章标题
	introduce: String,	//文章简介
	content: String,	//文章内容
	labels: [String],	//文章标签数组
	author: {type: ObjectId, ref: 'User'},	
	pv: {	//文章访问量，默认为0
		type: Number,
		default: 0
	},
	recommend: {	//是否推荐到首页推荐区，默认为否
		type: Boolean,
		default: false
	},
	meta: {
		createAt: {	//新建文章日期，默认为当前日期
			type: Date,
			default: Date.now()
		},
		updateAt: {	//修改文章日期，默认为当前日期
			type: Date,
			default: Date.now()
		}
	} 
})

ArticleSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}

	next()
})

ArticleSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort({'meta.createAt':-1})
			.populate('author', 'name')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.populate('author', 'name')
			.exec(cb)
	}
}
module.exports = ArticleSchema