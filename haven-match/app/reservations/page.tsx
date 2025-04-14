import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  // Si no hay un usuario logueado, mostramos un mensaje de "No autorizado"
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="No autorizado" subtitle="Por favor inicie sesión" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser?.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservaciones encontradas"
          subtitle="No hay reservaciones en sus propiedades."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser} // Pasamos currentUser a ReservationsClient
      />
    </ClientOnly>
  );
};

export default ReservationsPage;