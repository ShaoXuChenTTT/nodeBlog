var Article = require('../app/controllers/article')
var User = require('../app/controllers/user')
var Index = require('../app/controllers/index')
var Comment = require('../app/controllers/comment')
var File = require('../app/controllers/file')

module.exports = function(app) {

	// pre handle user
	app.use(function(req, res, next) {
		var _user = req.session.user

		app.locals.user = _user
		next()
	})

	// Index 
	app.get('/', Index.index)

	// Upload
	app.post('/apply/upload', File.upload)

	// User
	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
	app.get('/signin', User.showSignin)
	app.get('/signup', User.showSignup)
	app.get('/logout', User.logout)
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)
	app.get('/my', User.signinRequired, User.my)

	// Article
	app.get('/article/:id', Article.detail)
	app.get('/admin/article/new', User.signinRequired, User.adminRequired, Article.new)
	app.get('/admin/article/update/:id', User.signinRequired, User.adminRequired, Article.update)
	app.post('/admin/article', User.signinRequired, User.adminRequired, Article.save)
	app.get('/admin/article/list', User.signinRequired, User.adminRequired, Article.list)
	app.delete('/admin/article/list', User.signinRequired, User.adminRequired, Article.del)

	//Comment
	app.post('/user/comment', User.signinRequired, Comment.save)
	app.delete('/user/comment', User.signinRequired, User.adminRequired, Comment.del)
}