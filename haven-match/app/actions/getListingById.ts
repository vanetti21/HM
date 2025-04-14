import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string; // Asegúrate de que 'listingId' esté presente
}

export default async function getListingById(
    params: IParams
) {
    const { listingId } = params;

    if (!listingId) {
        throw new Error("Invalid listingId");
    }

    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            },
        };
    } catch (error: any) {
        throw new Error(error);
    }
}