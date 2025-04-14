export const dynamic = "force-dynamic";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";
import ImageSlider from "./components/inputs/ImageSlider";
import ListingCard from "./components/listings/ListingCard";
import Search from "./components/navbar/Search";

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

            {/* Image Slider */}
            <div className="max-w-[3000px] h-[780px] w-full m-auto relative mt-6 pb-10">
               {/* ImageSlider */}
               <ImageSlider />
   
               {/* Search sobre la imagen, centrado */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center z-9">
                  <Search  />
               </div>
            </div>
   
            {/* Grid de listados */}
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 gap-y-12">
               {listings.map((listing) => (
                  <div key={listing.id}>
                     <ListingCard data={listing} currentUser={currentUser} />
                  </div>

               ))}
            </div>
         </Container>
         <Footer/>
      </ClientOnly>    
   );
   
   
};

export default Home;
