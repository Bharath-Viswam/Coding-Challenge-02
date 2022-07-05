const express = require('express');
const app = new express();
const path = require('path');
const favicon = require('serve-favicon');
const port = process.env.PORT || 4000;
app.use(favicon(path.join('public', 'new-year.png')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	res.render('index', {});
});
//! Design Modification - landing page send email button add, along with submit button
//! Design Modification -on submit only redirect to the greetings page where the actual greeting is
//! Design Modification - and when you click send email button in landing page, it should send the wishes on
//! greetings page (the link with wish)
//TODO 1.) Greetings page with animation,iframes research and create a beautiful greetings page
//TODO 2.)email setup email button page click link redirect link should send wishes
app.post('/submit', (req, res) => {
	res.render('greetings', { uname: req.body.uname, wname: req.body.wname, email: req.body.email });
	console.log(req.body.uname);
	console.log(req.body.wname);
	console.log(req.body.email);
});

app.listen(port, () => {
	console.log(`Server Ready on ${port}`);
});
