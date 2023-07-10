import EmptyState from "../components/EmptyState";
import { getCurrentUser } from "../actions/getCurrentUser";
import Heading from "../components/Heading";
import ClientOnly from "../components/ClientOnly";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const Favorites = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No favorites found"
                    subtitle="Look like you have no favorite listings"
                />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <FavoritesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default Favorites;