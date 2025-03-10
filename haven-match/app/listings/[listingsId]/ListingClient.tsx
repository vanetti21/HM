import { SafeListing, SafeUser } from "@/app/types";

import { Reservation } from "@prisma/client";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing, 
    currentUser
}) => {
    return ( 
        <div>
            listing client
        </div>
    );
}

export default ListingClient;