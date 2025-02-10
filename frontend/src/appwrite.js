import { Client, Databases, ID, Query } from 'appwrite'
const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);


export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use Appwrite SDK to check if search term is in the DB
    try {
        const result = await database.listDocuments(DB_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ])

        // if it does update the count
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DB_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            })
        }
        // else: create new document with search term and count and set count = 1
        else {
            await database.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movieID: movie.id,
                posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            })
        }
    } catch (err) {
        console.error(err)
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DB_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;
    } catch (error) {
        console.error(error)
    }
}