const crypto = require('crypto');

class encryptAlgorithm {
    encrypt() {
        throw new Error('concrete implementation should be used');
    }

    decrypt() {
        throw new Error('concrete implementation should be used');
    }
}


class tripleDes extends encryptAlgorithm {
    /**
     * @memberof GoogleCloudStorageSystem
     * @name Upload
     * @params filename, destination
     * @description Serves as General Upload SDK for GCLOUD Storage
     */
   async encrypt(sharedKey, plainText) {
        try {
            const bufferedKey = Buffer.from(sharedKey, "utf16le");

            const key = crypto
                .createHash("md5")
                .update(bufferedKey)
                .digest();
            const newKey = Buffer.concat([key, key.slice(0, 8)]);
            const IV = Buffer.alloc(8, "\0");

            const cipher = crypto
                .createCipheriv("des-ede3-cbc", newKey, IV)
                .setAutoPadding(true);
            return cipher.update(plainText, "utf8", "base64") + cipher.final("base64");
        } catch (err) {
            throw new Error(err);
        }
    }


    /**
     * @memberof GoogleCloudStorageSystem
     * @name Download
     * @params filename, destination
     * @description Serves as General Download SDK for GCLOUD Storage
     */
    async decrypt(sharedKey, cipherText) {
        try {
            const bufferedKey = Buffer.from(sharedKey, "utf16le");

            const key = crypto
                .createHash("md5")
                .update(bufferedKey)
                .digest();
            const newKey = Buffer.concat([key, key.slice(0, 8)]);
            const IV = Buffer.alloc(8, "\0");
            const cipher = crypto
                .createDecipheriv("des-ede3-cbc", newKey, IV)
                .setAutoPadding(true);
            return cipher.update(cipherText, "base64", "utf8") + cipher.final("utf8");
        } catch (err) {
            throw new Error(err);
        }
    }
}
module.exports = tripleDes;

