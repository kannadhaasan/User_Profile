export class IProfile {
    firstName: string;
    lastName: string;
    username: string;
    age: number;
    email: string;

    constructor(users?: IProfile | any ){
        if(users){
        this.firstName = users.firstName;
        this.lastName = users.lastName;
        this.username = users.username;
        this.age = users.age;
        this.email = users.email;
        }
    }
}
