module.exports = function(app, passport, User, Answer) {
    app.get('/', function(req, res){
        var data = {};
        if (req.isAuthenticated()) {
            res.redirect('/golf');
        }
        res.render('index');
    });

    app.get('/auth', function(req, res) {
        res.render('auth');
    });

    app.get('/golf', ensureAuthenticated, function(req, res){
        User.findById(req.session.passport.user, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                res.render('golf', { user: user});
            }
        });
    });

    app.get('/apply', ensureAuthenticated, function(req, res){
        User.findById(req.session.passport.user, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log('applied', req);

                var answer = new Answer({
                    oauthID: user.oauthID,
                    answer: req.query.answer
                });
                answer.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("saved answer ...");
                        res.end(req.query.answer);
                    }
                });

            }
        });
    });

    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res){
        });

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {
            res.redirect('/golf');
        });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
    }
};