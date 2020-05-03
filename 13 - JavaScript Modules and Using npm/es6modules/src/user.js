import slug from 'slug';
import base64 from 'base-64';
import { url as baseUrl} from './config';

export default function User(name, email, website) {
    return {
        name,
        email,
        website
    }
}

export function createURL(name) {
    return `${baseUrl}/${slug(name)}`;
}

export function gravatar(email) {
    const hash = base64.encode(email);
    const photoURL = `https://www.gravatar.com/avatar/${hash}`;

    return photoURL;
}