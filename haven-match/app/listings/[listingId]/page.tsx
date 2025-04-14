import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId: string;
}

// La función ListingPage es asíncrona
const ListingPage = async ({ params }: { params: IParams }) => {
  // ✅ Espera los parámetros de forma asíncrona
  const { listingId } = await params; // ✅ Usar await para asegurar que los parámetros estén disponibles

  if (!listingId) {
    throw new Error("Invalid listingId");
  }

  // Llamadas a las funciones que dependen del listingId
  const listing = await getListingById({ listingId });
  const reservations = await getReservations({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
