// "use client"
// import {useUser} from "@clerk/nextjs";
// import {useState} from "react";

// export default function UnSafePage() {
//   const { user } = useUser();
//   const [role, setRole] = useState("");

//   return(
//     <div>
//       <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
//       <button onClick={() => {
//         user.update({
//           unsafeMetadata: {
//             role
//           }
//         })
//       }}>Update Birthday</button>
//     </div>
//   )
// }