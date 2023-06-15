import ClassAvailableTimeSlots from "@/backend/time-slots/class-available-time-slots.model";
import { getTimeSlots } from "@/backend/time-slots/class-available-time-slots.service";
import Container from "@/components/Container";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from "react";
import Classes from "@/backend/classes/classes.model";
import { getClassDetails } from "@/backend/classes/classes.service";
import ClassHead from "@/components/ClassHead";
import ClassInfo from "@/components/ClassInfo";
import Calendar from "@/components/Calendar";



interface ClassDetails {
  slots: any;
  classDetails: any;
}

export default function ClassDetailsPage({ slots, classDetails }: ClassDetails) {
  const loginModal = useLoginModal();
  const router = useRouter();
  let classes = JSON.parse(classDetails);
  let parsedSlots = JSON.parse(slots);

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
          mb-16 
        "
      >
        <div className="flex flex-col gap-4">
          <ClassHead
            title={classes.name}
            imageSrc={classes.image}
            locationValue={classes.locationFilter}
            id={classes.id}
            currentUser={null}
          /> 
          <div 
          >
            <ClassInfo
              gymName={classes.name}
              description={classes.description}
              category={classes.exerciseType}
              info={classes.info}
              businessHours={classes.businessHours}
              requirements={classes.requirements}
              duration={classes.duration}
              hasShower={classes.hasShower} 
              price={classes.price} 
              originalPrice={classes.originalPrice}/> 
            <Calendar slots={parsedSlots}/>
            <div className="flex justify-center mt-10">
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded" onClick={()=>{}}>
                예약하기
              </button>
            </div>

            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
            </div>
          </div>
        </div>
      </div>
    </Container>
    
   );
  
}

export async function getServerSideProps({ query }: any) {
  console.log("query: ", query);

  let slots_ = await getTimeSlots(String(query.id));
  let slots = JSON.stringify(slots_);
  let classDetails_ = await getClassDetails(query.id);
  let classDetails = JSON.stringify(classDetails_);
  return {
    props: { slots, classDetails },
  };
}
