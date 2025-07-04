import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

console.log(conf.appwriteUrl,conf.appwriteProjectId);
export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            let userAccount = await this.account.create(ID.unique(),email,password,name);
             return userAccount
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error",error);
            throw error;
        }
    }
    async login({email,password}){
        return await this.account.createEmailPasswordSession(email,password)
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return null;
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
            throw error;
        }
    }
    async sendVerificationEmail(redirectUrl) {
        try {
            return await this.account.createVerification(redirectUrl);
        } catch (error) {
            console.log("Appwrite service :: sendVerificationEmail :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;