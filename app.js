const express = require('express')
const app = express()

const parsePasswdFile = require("./parse_passwd.js");
const parseGroupFile = require("./parse_group.js");

app.get('/users', (req, res, next) => {
	parsePasswdFile.parsePasswd().then((response) => {
		res.send(response);
	}).catch((err) =>{
		next(err);
	});
});

app.get('/users/query', (req, res, next) => {
	parsePasswdFile.parsePasswd().then((response) => {
		const {name, uid, gid, comment, home, shell} = req.query;
		let filter = {
			name: name,
	 		uid: uid,
			gid: gid,
			comment: comment,
			home: home,
			shell: shell
		};
		response = response.filter(entry => {
			for (var parameter in filter){
				if (filter[parameter] !== undefined && filter[parameter] !== entry[parameter]) return false;
			}
			return true;
		});
		res.send(response);
	}).catch((err) =>{
		next(err);
	});
});

app.get('/users/:uid', (req, res, next) => {
	parsePasswdFile.parsePasswd().then((response) => {
		let uid = req.params.uid;
		response = response.find((entry) => {
			return entry['uid'] === uid;
		});
		if (response === undefined){
			res.sendStatus(404);
		} else {
			res.send(response);
		}
	}).catch((err) =>{
		next(err);
	});
});

app.get('/users/:uid/groups', (req, res, next) => {
	let name;
	parsePasswdFile.parsePasswd().then((response) => {
		let uid = req.params.uid;
		response = response.find((entry) => {
			return entry['uid'] === uid;
		});
		if (response != undefined){
				name = response['name'];
		}
	}).catch((err) =>{
		next(err);
	});

	parseGroupFile.parseGroup().then((response) => {
			console.log(response);
			response = response.filter((entry) => {
				return entry['members'].includes(name)
			});
			res.send(response);
	}).catch((err) =>{
		next(err);
	});
});


app.get('/groups', (req, res, next) => {
	parseGroupFile.parseGroup().then((response) => {
		res.send(response);
	}).catch((err) =>{
		next(err);
	});
});

app.get('/groups/query', (req, res, next) => {
	parseGroupFile.parseGroup().then((response) => {
		const {name, gid, member} = req.query;
		let filter = {
			name: name,
			gid: gid,
		};
		response = response.filter(entry => {
			for (var parameter in filter){
				if (filter[parameter] !== undefined && filter[parameter] !== entry[parameter]) return false;
			}
			return true;
		});

		if (Array.isArray(member)){
			response = response.filter(entry => {
				let arr = entry['members'].split(',');
				for (let entry of member){
					if(!arr.includes(entry)){
						return false;
					}
				}
				return true;
			});
		} else {
			response = response.filter(entry => {
				return member === undefined || entry['members'].includes(member);
			});
		}
		res.send(response);
	}).catch((err) =>{
		next(err);
	});
});

app.get('/groups/:gid', (req, res, next) => {
	parseGroupFile.parseGroup().then((response) => {
		let gid = req.params.gid;
		response = response.find((entry) => {
			return entry['gid'] === gid;
		});
		if (response === undefined){
			res.sendStatus(404);
		} else {
			res.send(response);
		}
	}).catch((err) =>{
		next(err);
	});
});

//custom error handling
app.use(function (err, req, res, next){
	let errorString = "Error code: " + err.code + "\nError message: " + err.message;
	console.log(errorString);
  res.end(errorString);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))
