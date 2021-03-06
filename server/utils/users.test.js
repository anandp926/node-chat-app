const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Anand',
            room: 'ethereal'
        },{
            id: 2,
            name: 'Harsh',
            room: 'Machines'
        },{
            id: 3,
            name: 'Rahul',
            room: 'ethereal'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Anand',
            room: 'ethereal'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = 1;
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = 4;
        var user = users.removeUser(userId);
        
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = 2;
        var user = users.getUser(userId);
        expect(user.id).toBe(userId)
    })

    it('should not find user', () => {
        var userId = 4;
        var user = users.getUser(userId);

        expect(user).toNotExist();
    })

    it('should return names for ethereal room', () => {
        var userList = users.getUserList('ethereal');

        expect(userList).toEqual(['Anand', 'Rahul'])
    });

    it('should return names for Machine room', () => {
        var userList = users.getUserList('Machines');

        expect(userList).toEqual(['Harsh'])
    });
})