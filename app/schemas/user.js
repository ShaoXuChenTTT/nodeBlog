var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTORY = 10

var UserSchema = new mongoose.Schema({
	name: {	//用户名，唯一
		unique: true,
		type: String
	},
	headImg: String,
	password: String,	//密码，后续做了哈希加密，存入数据库的是哈希后的值，防止数据库泄漏导致密码曝光
	// 权限
	// 0: normal user 登录后的游客，可以发表和回复评论
	// 1: admin	系统管理员，可以增删改文章，可以发表和回复评论
	role: {
		type: Number,
		default : 0
	},
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

UserSchema.pre('save', function(next) {
	var user = this
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}

	bcrypt.genSalt(SALT_WORK_FACTORY,function(err, salt) {
		if (err) return next(err)

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err)

			user.password = hash
			next()
		})
	})

})

UserSchema.methods = {
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if(err) return cb(err)

			cb(null, isMatch)
		})
	}
}

UserSchema.statics = {
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
module.exports = UserSchema