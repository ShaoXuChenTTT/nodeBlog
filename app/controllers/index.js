var Article = require('../models/article')

var pageSize = 5
// index page
exports.index = function(req, res) {
	var pageNum = parseInt(req.query.page)
	if(!pageNum) {
		pageNum = 1
	}
	var _user = req.session.user

	Article.fetch(function(err, articles) {
		if (err) {
			console.log(err)
		}
		var pageCount = parseInt((articles.length-1)/pageSize + 1)
		if (pageCount == 0) {
			pageCount = 1
		}
		if(pageNum > pageCount){
			res.redirect('/')
		}
		var newArticles = articles.slice(0,8)
		var prePageNum = pageNum - 1
		var nextPageNum = pageNum + 1
		Article.find({"recommend":true}).exec(function(err, recommendArticles) {
			if (err) {
				console.log(err)
			}
			var reArticles = recommendArticles.slice(0,8)
			res.render('index', {
				title: '',
				articles: articles.slice(pageSize*(pageNum-1),pageSize*pageNum),
				newArticles: newArticles,
				reArticles: reArticles,
				pageCount: pageCount,
				pageNum: pageNum,
				prePageNum: prePageNum,
				nextPageNum: nextPageNum
			})
		})
		
	})
}
