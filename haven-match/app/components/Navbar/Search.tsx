"use client";

import useCountries from "@/app/hooks/UseCountries";
import useSearchModal from "@/app/hooks/UseSearchModal";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Search = () => {
   const searchModal = useSearchModal();
   const params = useSearchParams();
   const { getByValue } = useCountries();

   const locationValue = params?.get("locationValue");
   const startDate = params?.get("startDate");
   const endDate = params?.get("endDate");
   const guestCount = params?.get("guestCount");

   const locationLabel = useMemo(() => {
      if (locationValue) {
         return getByValue(locationValue as string)?.label;
      }
      return "Anywhere";
   }, [getByValue, locationValue]);

   const durationLabel = useMemo(() => {
      if (startDate && endDate) {
         const start = new Date(startDate as string);
         const end = new Date(endDate as string);
         let diff = differenceInDays(end, start);

         if (diff === 0) {
            diff = 1;
         }
         return `${diff} days`;
      }
      return "Any week";
   }, [startDate, endDate]);

   const guestLabe = useMemo(() => {
      if (guestCount) {
         return `${guestCount} guests`;
      }
      return "Add Guests";
   }, [guestCount]);

   return (
      <div
         onClick={searchModal.onOpen}
         className="bg-white border-[1px] w-full md:w-auto py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer"
      >
         <div className="flex flex-row items-center justify-between">
            <div className="text-lg font-semibold px-8">{locationLabel}</div>
            <div className="hidden sm:block text-lg font-semibold px-8 border-x-[1px] flex-1 text-center">
               {durationLabel}
            </div>
            <div className="text-lg pl-8 pr-4 text-gray-600 flex flex-row items-center gap-3">
               <div className="hidden sm:block">{guestLabe}</div>

               <div className="p-3 bg-[#22313f] rounded-full text-white">


                  <BiSearch size={18} />
               </div>
            </div>
         </div>
      </div>
   );
};
export default Search;