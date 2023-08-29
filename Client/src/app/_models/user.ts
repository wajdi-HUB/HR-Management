export class User {
    id?: number;
    username!: string;
    password!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    address!: string;
    blocked!: boolean;
    verificationCode!: string;
    verified!: boolean;
    roles!: Role[];
    formations!: Formation[];

    // constructor(username: string, email: string, password: string) {
    //   this.username = username;
    //   this.email = email;
    //   this.password = password;
    // }
}

export interface Role {
    id: number;
    name: string;
}

export interface Formation {
    id: number;
    name: string;
}
