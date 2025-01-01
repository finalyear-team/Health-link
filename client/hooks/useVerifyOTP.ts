// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import useUserStore from "@/store/userStore";
// import { REGISTER_DOCTOR, REGISTER_USER } from "@/graphql/mutations/userMutations";
// import { useMutation } from "@apollo/client";
// import { confrimEmailOTP } from "@/Services/authService";

// export const useVerifyOTP = () => {
//   const { toast } = useToast();
//   // const { isLoaded, signUp, setActive } = useSignUp();
//   const [error, setError] = useState("");
//   const [completed, setCompleted] = useState(false);
//   const router = useRouter();
//   const userInformation = useUserStore((state) => state.user);
//   const setUserInformation = useUserStore((state) => state.setUserInformation);

//   const onPressVerify = async (e: any) => {


//     try {

//       const signedInUser = await confrimEmailOTP(userInformation?.email as string, e.code)



//       if (signedInUser)
//         setTimeout(() => {
//           toast({
//             title: "Welcome to HealthLink!",
//             description: "We're excited to have you on board. Let's get started on your journey to better health!",
//             variant: "success",
//           });

//         }, 1000);




//       setCompleted(true);
//       if (signedInUser)
//         router.push("/dashboard");
//     }
//     catch (err: any) {
//       console.log(err)
//       console.error(JSON.stringify(err, null, 2));
//       setError(err.message);
//       toast({
//         title: "Error Creating Your Account!",
//         description: "Please try Again!",
//         variant: "error",
//       });
//     }
//   };

//   return { onPressVerify, error, completed };
// };
