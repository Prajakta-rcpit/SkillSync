// "use client"
// import useGetCallById from '@/components/hooks/useGetCallById';
// import LoaderUI from '@/components/LoaderUI';
// import MeetingRoom from '@/components/MeetingRoom';
// import MeetingSetup from '@/components/MeetingSetup';
// import { useUser } from '@clerk/nextjs';
// import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
// import { useParams } from 'next/navigation'
// import React, { useState } from 'react'

// const MeetingPage = () => {
//   const {id} = useParams();
//   const {isLoaded} = useUser();
//   const [isSetupComplete, setIsSetupComplete] = useState(false);
//   const {call,isCallLoading} = useGetCallById(id);

//   if(!isLoaded || isCallLoading) return <LoaderUI/>

//  if (!call) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-2xl font-semibold">Meeting not found</p>
//       </div>
//     );
//   }

//   return (
//     <StreamCall call={call}>
//       <StreamTheme>
//         {!isSetupComplete? (<MeetingSetup onSetupComplete={()=> setIsSetupComplete}/>) : (<MeetingRoom/>)}
//       </StreamTheme>
//     </StreamCall>
//   )
// }

// export default MeetingPage



// // "use client";

// // import useGetCallById from "@/components/hooks/useGetCallById";
// // import LoaderUI from "@/components/LoaderUI";
// // import MeetingRoom from "@/components/MeetingRoom";
// // import MeetingSetup from "@/components/MeetingSetup";
// // import { useUser } from "@clerk/nextjs";
// // import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
// // import { useParams } from "next/navigation";
// // import React, { useState } from "react";

// // const MeetingPage = () => {
// //   const params = useParams<{ id: string }>();
// //   const id = params.id;

// //   const { isLoaded } = useUser();
// //   const [isSetupComplete, setIsSetupComplete] = useState(false);

// //   const { call, isCallLoading } = useGetCallById(id);

// //   if (!isLoaded || isCallLoading) return <LoaderUI />;

// //   if (!call) {
// //     return (
// //       <div className="h-screen flex items-center justify-center">
// //         <p className="text-2xl font-semibold">Meeting not found</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <StreamCall call={call}>
// //       <StreamTheme>
// //         {!isSetupComplete ? (
// //           <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
// //         ) : (
// //           <MeetingRoom />
// //         )}
// //       </StreamTheme>
// //     </StreamCall>
// //   );
// // };

// // export default MeetingPage;


"use client";

import { useEffect, useState } from "react";
import {
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import MeetingSetup from "@/components/MeetingSetup";
import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";

export default function MeetingPage() {
  const { id } = useParams();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<any>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    if (!client || !id) return;

    const initCall = async () => {
      const newCall = client.call("default", id as string);

      await newCall.getOrCreate();

      setCall(newCall);
    };

    initCall();
  }, [client, id]);

  if (!call) return <LoaderUI />;

  return (
    <StreamCall call={call}>
      <StreamTheme>
       {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}
