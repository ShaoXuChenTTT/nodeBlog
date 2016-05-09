var _ = require('underscore')
var Article = require('../models/article')
var Comment = require('../models/comment')

// detail page
exports.detail = function(req, res) {
	var id = req.params.id
	Article.update({_id: id}, {$inc: {pv: 1}}, function(err) {
	    if (err) {
	        console.log(err)
	    }
	})
	Article.fetch(function(err, articles) {
		if (err) {
			console.log(err)
		}
		var newArticles = articles.slice(0,8)
		Article.find({"recommend":true}).exec(function(err, recommendArticles) {
			if (err) {
				console.log(err)
			}
			var reArticles = recommendArticles.slice(0,8)
			Article.findById(id, function(err, article) {
				Comment
					.find({article: id})
					.populate('from', 'name headImg')
					.populate('reply.from reply.to', 'name headImg')
					.exec(function(err, comments) {
						// console.log(comments)
						res.render('detail', {
							title: article.title,
							article: article,
							comments: comments,
							newArticles: newArticles,
							reArticles: reArticles
						})
					})
			})
		
		})
		
	})
}

// admin new page
exports.new = function(req, res) {
	res.render('admin', {
		title: '写文章页面',
		article: {
			content: '',
			introduce: '',
			title: '',
			labels: [],
			recommend: false
		}
	})
}

// admin update movie
exports.update = function(req, res){
	var id =req.params.id

	if(id) {
		Article.findById(id, function(err, article){
			res.render('admin', {
				title: '文章更新页',
				article: article
			})
		})
	}
}

// admin post article
exports.save = function(req, res) {
	var id = req.body.article._id
	var articleObj = req.body.article
	var _article
	console.log(articleObj)
	if (id !== 'undefined') {
		Article.findById(id, function(err, article) {
			if (err) {
				console.log(err)
			}
			articleObj.labels = articleObj.labels.split(',')
			if(articleObj.recommend) {
				articleObj.recommend = true
			}
			else {
				articleObj.recommend = false
			}
			_article = _.extend(article, articleObj)
			_article.save(function(err, article){
				if(err) {
					console.log(err)
				}
				console.log('update success')
				res.redirect('/article/' + article.id)
			})
		})
	}
	else {
		_article = new Article({
			author: req.session.user,
			title: articleObj.title,
			introduce: articleObj.introduce,
			labels: articleObj.labels.split(','),
			content: articleObj.content
		})
		if(articleObj.recommend) {
			_article.recommend = true
		}
		// console.log(articleObj)
		_article.save(function(err, movie){
			if(err) {
				console.log(err)
			}

			res.redirect('/')
		})
	}
}

// list page
exports.list = function(req, res) {
	Article.fetch(function(err, articles) {
		if (err) {
			console.log(err)
		}
		
		res.render('list', {
			title: '文章列表页',
			articles: articles
		})
	})
}

// list delete movie
exports.del = function(req, res) {
	var id = req.query.id

	if (id) {
		Article.remove({_id: id}, function(err, article){
			if (err) {
				console.log(err)
			}
			else {
				res.json({success: 1})
			}
		})
	}
}