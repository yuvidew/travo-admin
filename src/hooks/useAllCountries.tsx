import { Country, CountryListType } from '@/types/type';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

/**
 * Custom React hook to fetch and manage a list of all countries from a public API.
 *
 * Fetches data from the REST Countries API and returns it in a structured format including:
 * - Country name
 * - Flag information
 * - Coordinates
 * - OpenStreetMap link
 *
 * @returns {{
 *   allCountries: CountryListType[]; // Array of country data
 *   loading: boolean;                // Indicates if the fetch is in progress
 * }}
 */

export const useAllCountries = () => {
    const [allCountries , setAllCountries] = useState<CountryListType[]>([]);
    const [loading , setLoading] = useState<boolean>(false);

    /**
     * Fetches all country data from the REST Countries API
     * and transforms it into the expected format.
     */

    const getAllCountries = async () => {
        setLoading(true)
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,latlng,maps")

            const data = result.data.map((country : Country) => ({
                name :  country.name.common,
                flag : country.flags,
                coordinates : country.latlng,
                value : country.name.common,
                openStreetMap : country.maps?.openStreetMaps
            }))

            setAllCountries(data)
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch country data")
            alert("error")
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllCountries()
    } , [])

    return {allCountries , loading}
}
