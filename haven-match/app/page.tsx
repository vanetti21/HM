export const dynamic = "force-dynamic";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
   searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
   const params = await Promise.resolve(searchParams || {}); // ✅ Asegurar que searchParams está disponible

   const listings = await getListings({
      userId: params.userId,
      roomCount: params.roomCount ? Number(params.roomCount) : undefined,
      guestCount: params.guestCount ? Number(params.guestCount) : undefined,
      bathroomCount: params.bathroomCount ? Number(params.bathroomCount) : undefined,
      startDate: params.startDate,
      endDate: params.endDate,
      locationValue: params.locationValue,
      category: params.category,
   });

   const currentUser = await getCurrentUser();

   if (listings.length === 0) {
      return (
         <ClientOnly>
            <EmptyState showReset />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
         <Container>
            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
               {listings.map((listing) => (
                  <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
               ))}
            </div>
         </Container>
      </ClientOnly>
   );
};

export default Home;
