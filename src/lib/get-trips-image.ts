import axios from "axios";

type imageType = {
    src : {
        original : string
    }
};

/**
 * Fetches a list of trip-related images from the Pexels API based on a given category.
 *
 * @param {string} category - The category or keyword to search for images.
 * 
 * @example
 * // Example usage:
 * const images = await generateTripImages("beach");
 * console.log(images);
 * // Output:
 * // [
 * //   { image: "https://images.pexels.com/photos/.../pexels-photo-1.jpeg" },
 * //   { image: "https://images.pexels.com/photos/.../pexels-photo-2.jpeg" },
 * // ]
 *
 * @returns {Promise<{image: string}[] | null>} A promise that resolves to an array of image objects or null on error.
 */

export const generateTripImages = async (category: string, ) => {

    try {
        const result = await axios.get(`https://api.pexels.com/v1/search?query=${category}/curated?page=1&per_page=10` , {
                headers : {
                    Authorization : '6IbW3ijJPUoqve0Cl8lWbnp9ChnqATUcHqctZPwtW1BaSvyhACWQddcH',
                }
            })

        return result.data.photos.map(({src} : imageType) => ({
            image : src.original
        }))
    } catch (error) {
        console.log("getting error from the the gen image" , error);
        return null
    }
}