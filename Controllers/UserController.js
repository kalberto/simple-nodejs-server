const fs = require('fs');

class UserController {
    static listUsers(req, res) {
        const users = UserController.getUsers();
        let response = '<html><head><title>My First page</title></head><body>';

        let list = '<ul>';
        users.forEach(user => {
            const dateBirth = UserController.convertDate(user.date_of_birth);
            list += `<li>Name: ${user.name}, Idade: ${UserController.calculateYearsOld(dateBirth)}</li>`;
        });

        response += `${list}</li></ul>${UserController.getForm()}</body></html>`;
        res.setHeader('Content-Type', 'text/html');
        res.write(response);
        res.end();
    }

    static createUser(req, res)
    {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const data = Buffer.concat(body).toString();
            const params = new URLSearchParams(data);
            let users = UserController.getUsers();
            users.push({name: params.get('name'), date_of_birth: params.get('date_of_birth')});

            fs.writeFile('./Data/users.json', JSON.stringify(users), (err) => {
                res.writeHead(302, {'Location': '/users'});
                return res.end();
            });
        });
    }

    static getUsers()
    {
        const rawData = fs.readFileSync('./Data/users.json');
        return JSON.parse(rawData.toString());
    }

    static convertDate(date){
        const d = date.split('/');

        return new Date(d[2], d[1], d[0]);
    }

    static calculateYearsOld(date) {
        const today = new Date();
        const diff = today - date;

        // Convert it to years
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    static getForm()
    {
        return '<form action="/create-user" method="post"><input placeholder="name" type="text" name="name"><input placeholder="30/03/1990" type="text" name="date_of_birth"><button type="submit">Send</button></form>';
    }
}

module.exports = {
    UserController
}