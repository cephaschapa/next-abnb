import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import Container from "../components/container/Container";
import Heading from "../components/Heading";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const Properties = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getListings({
        userId: currentUser?.id
    });

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    if(listings.length === 0){
        return(
            <ClientOnly>
                <EmptyState 
                    title="No properties found"
                    subtitle="Please add a property"
                />
            </ClientOnly>
        )
    }
    return(
        <Container>                 
            <PropertiesClient
                key={currentUser.id} 
                currentUser={currentUser}
                listings={listings}
            />
        </Container>
    )
}

export default Properties;