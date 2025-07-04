import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({ title, slug, content, featuredImage, status, userId, userName }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status, userId, userName
            })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error)
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status
            })
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error)
        }
    }
    // Check if the user has liked the post
    async hasUserLiked(postId, userId) {
        const post = await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, postId);
        return post.likedBy?.includes(userId);
    }

    // Like or unlike post
    async likePost(postId, userId) {
        const post = await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, postId);

        if (post.likedBy?.includes(userId)) {
            // Unlike
            const updatedLikedBy = post.likedBy.filter(id => id !== userId);
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, postId, {
                likedBy: updatedLikedBy,
            });
        } else {
            // Like
            const updatedLikedBy = [...(post.likedBy || []), userId];
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, postId, {
                likedBy: updatedLikedBy,
            });
        }
    }

    async deletePost({ slug }) {
        let documentId = slug
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error)
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error)
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error)
            return false;
        }
    }
    //file upload 
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error)
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile  Q :: error", error)
            return false
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId, fileId
        )
    }

}



const service = new Service();
export default service;