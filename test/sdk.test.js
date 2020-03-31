const assert = require('assert');
const { expect }= require('chai');
const Encryption = require('../index');

describe('Simple Storage Test', () => {

    //First stage Unit Test
    it('should run encrypt', () => {
        const data =  Encryption.encrypt('834y9yuhjsdjfdsjfbk++', 'testing');
          console.log(data);
    });

    it('should run decrypt', () => {
        const data =  Encryption.decrypt('834y9yuhjsdjfdsjfbk++', 'c3TvyddmZAE=');
          console.log(data);
    });

});
