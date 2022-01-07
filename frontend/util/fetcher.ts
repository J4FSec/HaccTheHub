import useSWR from 'swr';
import { API_ENDPOINT } from './consts';

const fetcher = (url) => fetch(url).then((res) => res.json());

const getData = (endpoint: string) => {
    try {
        const { data, error } = useSWR(`${API_ENDPOINT}${endpoint}`, fetcher)
        return data
    } catch (error) {
        console.log("error: ", error)
        throw error
    }
}

export const getLessons = () => getData("/lessons");