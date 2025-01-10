import { Button } from "@/components/ui/button"

import { auth, googleProvider } from "../../firebase"
import { signInWithPopup } from "firebase/auth"



export default function Login() {
    async function handleOnClick() {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken();
        console.log(token);
        const response = await fetch("http://localhost:3000/taskbuddy/api/user/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        const responseData = await response.json();
        console.log(responseData);
    }
    return (
        <div className="flex min-h-screen overflow-hidden">
            <div className="flex w-full flex-col justify-center gap-6 p-8 relative z-10 bg-white md:w-1/2 lg:w-2/5">
                <div className="space-y-2 max-w-sm mx-auto w-full">
                    <div className="flex items-center gap-2 text-xl font-semibold text-[#AA00FF]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M7 10h10" />
                            <path d="M7 14h10" />
                            <path d="m14 7-4 4 4 4" />
                        </svg>
                        TaskBuddy
                    </div>
                    <p className="text-sm text-gray-500 leading-normal">
                        Streamline your workflow and track progress effortlessly with our all-in-one task management app.
                    </p>
                </div>
                <Button
                    onClick={handleOnClick}
                    variant="outline"
                    className="flex w-full items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 max-w-sm mx-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                    >
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Continue with Google
                </Button>
            </div>
            <div className="hidden md:block relative flex-1 bg-black">
                <div className="circle-1" />
                <div className="circle-2" />
                <div className="circle-3" />
            </div>
            <style jsx>{`
        .circle-1,
        .circle-2,
        .circle-3 {
          position: absolute;
          border-radius: 50%;
          border: 1px solid #AA00FF;
          opacity: 0.3;
        }

        .circle-1 {
          width: 600px;
          height: 600px;
          right: -150px;
          top: 50%;
          transform: translateY(-50%);
        }

        .circle-2 {
          width: 450px;
          height: 450px;
          right: -75px;
          top: 50%;
          transform: translateY(-50%);
        }

        .circle-3 {
          width: 300px;
          height: 300px;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        @media (max-width: 768px) {
          .circle-1,
          .circle-2,
          .circle-3 {
            display: none;
          }
        }
      `}</style>
        </div>
    )
}