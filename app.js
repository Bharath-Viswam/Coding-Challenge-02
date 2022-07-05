const express = require('express');
const app = new express();
const path = require('path');
var nodemailer = require('nodemailer');
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

app.post('/submit', (req, res) => {
	res.render('greetings', { uname: req.body.uname, wname: req.body.wname, email: req.body.email });
	console.log(req.body.uname);
	console.log(req.body.wname);
	console.log(req.body.email);
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'newyearwishmaster@gmail.com',
			pass: 'iukqdonsjxlwwxdp'
		}
	});

	var mailOptions = {
		from: 'newyearwishmaster@gmail.com',
		to: req.body.email,
		subject: 'Happy New Year 2022',
		text: ` Hi ${req.body.wname}, ${req.body.uname} wishes you a happy new year 2022`,
		html: `<h1 style="color:orange;">Hi ${req.body.wname}, ${req.body.uname} wishes you a happy new year 2022</h1>
		<h1 style="color:orange;">Happy 2022</h1>`
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
});

app.listen(port, () => {
	console.log(`Server Ready on ${port}`);
});
