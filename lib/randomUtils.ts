// @ts-check

export class randomUtils {

    // utils/randomUtils.ts

    /**
     * Generate a random number within a given range.
     * @param min - Minimum value (inclusive)
     * @param max - Maximum value (inclusive)
     * @returns Random number between min and max
     */
    getRandomNumber(min: number, max: number) :string{
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(randomNum.toString())
        return randomNum.toString();
    }

    /**
     * Generate a random string of specified length (letters only).
     * @param length - Length of the string
     * @returns Random alphabetic string
     */
    getRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    }

    /**
     * Generate a random alphanumeric string.
     * @param length - Length of the string
     * @returns Random alphanumeric string
     */
    getRandomAlphaNumeric(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    }

    /**
     * Generate a random email address (useful for signup tests).
     * @param domain - Optional domain name (default: example.com)
     * @returns Random email string
     */
    getRandomEmail(domain: string = 'example.com') {
        const randomPart = this.getRandomAlphaNumeric(8);
        return `${randomPart}@${domain}`;
    }


}