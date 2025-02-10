import { Link } from "react-router-dom";

export default function Login() {
    return (
      <>

        <div className="flex min-h-[100vh] flex-1 flex-col justify-center text-[#C19D60] px-6 py-12 lg:px-8 bg-[#292929]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#C19D60] ">
                Sign In 
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
            
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-[#C19D60] ">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#000] font-semibold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#C19D60] sm:text-sm/6"
                    />
                    </div>
                </div>
    
                <div className="password">
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-[#C19D60] ">
                        Password
                    </label>
                
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#000] font-semibold  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2  focus:outline-[#C19D60] sm:text-sm/6"
                    />
                    </div>
                </div>
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#303030] px-3 py-1.5 text-sm/6 font-semibold text-[#C19D60] shadow-xs hover:cursor-pointer hover:bg-[#252525] focus-visible:outline-2 focus-visible:outline-offset-2 "
                    >
                    Register
                    </button>
                </div>
                </form>
    
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                First Time?{' '}
                <Link to="/register" className="font-semibold text-[#C19D60] hover:text-[#f8cb78]">
                    Register
                </Link>
                </p>
            </div>
        </div>
      </>
    )
  }
  