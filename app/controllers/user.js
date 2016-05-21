var User = require('../models/user')
var Comment = require('../models/comment')

// signup
// signup page
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面'
	})
}
// signin page
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录页面'
	})
}
exports.signup = function(req, res){
	var _user = req.body.user
	User.findOne({name: _user.name}, function(err, user) {
		if (err) {
			console.log(err)
		}

		if(user) {
			// return res.redirect('/signin')
			res.json({status: 0, code: "FAILED", message: "user already exists", errorCode: "E_1001"})
		}
		else {
			var user = new User(_user)
			user.save(function(err, user) {
				if (err){
					console.log(err)
				}
				res.json({status: 1, code: "OK"})
				// res.redirect('/')
			})
		}
	})
	
}

// signin
exports.signin = function(req ,res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({name: name}, function(err, user) {
		if(err) {
			console.log(err)
		}

		if(!user) {
			res.json({status: 0, code: "FAILED", message: "user not exists", errorCode: "E_1002"})
			// return res.redirect('/signup')
		}

		user.comparePassword(password, function(err, isMatch) {
			if(err) {
				console.log(err)
			}

			if (isMatch) {
				req.session.user = user
				res.json({status: 1, code: "OK"})
			}
			else {
				res.json({status: 0, code: "FAILED", message: "user or password does not match", errorCode: "E_1003"})
				// return res.redirect('/signin')
			}
		})
	})
}

// logout
exports.logout = function(req, res) {
	delete req.session.user
	// delete app.locals.user
	res.redirect('/')
}

// userlist page
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err)
		}
		
		res.render('userlist', {
			title: '用户列表页',
			users: users
		})
	})
}

// my page
exports.my = function(req, res) {
	var _user = req.session.user
	Comment.find({from:_user._id}).populate('article', 'title').exec(function(err, comments) {
		if (err) {
			console.log(err)
		}
		console.log(comments)
		res.render('my', {
			title: '个人中心',
			comments: comments
		})
	})
}

// midware for user
exports.signinRequired = function(req, res, next) {
	var user = req.session.user

	if (!user) {
		return res.redirect('/signin')
	}

	next()
}

exports.adminRequired = function(req, res, next) {
	var user = req.session.user

	if (user.role < 1) {
		return res.redirect('/signin')
	}

	next()
}