import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import { apiKey } from './src/config';

import User, { createURL, gravatar } from './src/user';

const wes = new User('Wes Bos', 'wes@wesbos.com', 'https://wesbos.com');
const profile = createURL(wes.name);
const profilePic = gravatar(wes.email);

console.log(profilePic);
console.log(wes);
console.log(profile);