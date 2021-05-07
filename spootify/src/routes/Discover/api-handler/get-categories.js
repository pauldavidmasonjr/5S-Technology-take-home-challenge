import axios from 'axios';
import qs from 'querystring';
import config from '../../../config';

const { api } = config;

export default async function getCategories() {
    //first need to authenticate and get access token
    const authToken = await axios.post(
        'https://accounts.spotify.com/api/token',
        qs.stringify({'grant_type': 'client_credentials'}),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${api.clientId}:${api.clientSecret}`)}`
            }
        }
    );

    //next I need to use the token to get categories
    const result = await axios.get(
        `${api.baseUrl}/browse/${'categories'}?locale=en_US`,
        {
            headers: {
                Authorization: `Bearer ${authToken.data.access_token}`
            }
        }
    );

    return result.data['categories'].items;
}