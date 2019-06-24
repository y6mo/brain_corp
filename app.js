const express = require('express')
const app = express()

var parsePasswdFile = require("./parse_passwd.js");
var parseGroupFile = require("./parse_group.js");


app.get('/users', (req,res) => {
	parsePasswdFile.parsePasswd().then((response) => {
		res.send(response);
	}).catch((err) =>{
		console.log("error test");
	})
});

app.get('/users/query', (req,res) => {
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

		//console.log(response);
		response = response.filter(x => {
			for (var parameter in filter){
				if (filter[parameter] !== undefined && filter[parameter] !== x[parameter]) return false;
			}
			return true;
		});
		res.send(response);
	}).catch((err) =>{
		console.log("error test");
	});
});

app.get('/users/:id', (req,res) => {
	parsePasswdFile.parsePasswd().then((response) => {
		let id = req.params.id;
		//console.log(id);
		if (typeof id !== 'undefined'){
			console.log("inside");
			response = response.find((x) => {
				return x['uid'] === id;
			});
			res.send(response);
		} else {
			console.log("error :id");
		}
	}).catch((err) =>{
		console.log("error test");
	})
});


app.get('/users/:id/groups', (req,res) => {

	let name;

	parsePasswdFile.parsePasswd().then((response) => {
		let id = req.params.id;
		if (typeof id !== 'undefined'){
			console.log("inside");
			response = response.find((x) => {
				return x['uid'] === id;
			});
			name = response['name'];
			console.log(name);
		} else {
			console.log("error :id");
		}
	}).catch((err) =>{
		console.log("error test");
	})

	let test;
	parseGroupFile.parseGroup().then((response) => {
		if (name !== undefined){
			response = response.filter((x) => {
				return x['members'].includes(name)
			});
			res.send(response);
		} else {
			console.log("error :id 2");
		}
	}).catch((err) =>{
		console.log("error test");
	})

});

app.get('/groups', (req,res) => {
	parseGroupFile.parseGroup().then((response) => {
		res.send(response);
	}).catch((err) =>{
		console.log("error test");
	})
});

app.get('/groups/query', (req,res) => {
	parseGroupFile.parseGroup().then((response) => {

		const {name, gid, member} = req.query;
		let filter = {
			name: name,
			gid: gid,
		};
		response = response.filter(x => {
			for (var parameter in filter){
				if (filter[parameter] !== undefined && filter[parameter] !== x[parameter]) return false;
			}
			return true;
		});

		if (Array.isArray(member)){
			console.log("array");
			console.log("member:" + member)

			response = response.filter(x => {
				let arr = x['members'].split(',');
				let bool = true;

				for (let x of member){
					if(!arr.includes(x)){
						return false;
					}
				}
				/*
				member.forEach(x => {
					if(!arr.includes(x)){
						bool = false;
					}
				});
				*/
				return true;
			});

		} else {
			console.log("not array");
			response = response.filter(x => {
				console.log(member);
				return member === undefined || x['members'].includes(member)
			});
			console.log("after");
			console.log(response);
		}

		res.send(response);
	}).catch((err) =>{
		console.log("error test");
	});
});


app.get('/groups/:gid', (req,res) => {
	parseGroupFile.parseGroup().then((response) => {
		let gid = req.params.gid;
		if (typeof gid !== 'undefined'){
			response = response.find((x) => {
				return x['gid'] === gid;
			});
			res.send(response);
		} else {
			console.log("error :id");
		}
	}).catch((err) =>{
		console.log("error test");
	})
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))
