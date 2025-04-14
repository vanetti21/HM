import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Definir los parámetros correctamente
interface IParams {
   listingId: string;
}

export async function DELETE(request: Request, context: { params: IParams }) {
   const { params } = context;
   const { listingId } = params;

   // Obtener al usuario actual
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return NextResponse.error();
   }

   // Validación de la Id
   if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
   }

   // Eliminar el listado
   const listing = await prisma.listing.deleteMany({
      where: {
         id: listingId,
         userId: currentUser.id,
      },
   });

   return NextResponse.json(listing);
}
