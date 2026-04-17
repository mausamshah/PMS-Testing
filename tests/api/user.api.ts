import { APIRequestContext } from '@playwright/test';
import { getHeaders } from '../../utils/apiHelper';

export class UserAPI {

    constructor(private request: APIRequestContext) { }

    async createUser(data: any) {
        return await this.request.post('/users', {
            headers: getHeaders(),
            data
        });
    }

    async getUser(userId: number) {
        return await this.request.get(`/users/${userId}`, {
            headers: getHeaders()
        });
    }

    async getUsers() {
        return await this.request.get('/users', {
            headers: getHeaders()
        });
    }

}