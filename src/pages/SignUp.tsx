import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         if (res.status === 201) {
            alert(' Compte créé avec succès !');
            setEmail('');
            setPassword('');
         } else {
            const errorData = await res.json();
            alert(` Erreur: ${errorData.message || res.statusText}`);
         }
      } catch (err) {
         console.error(err);
         alert(' Erreur de connexion au serveur');
      }
   };

   return (
      <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
         <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
               Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
               Or{' '}
               <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
               >
                  sign in to your existing account
               </Link>
            </p>
         </div>

         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow-2xl sm:rounded-lg sm:px-10">
               <form className="space-y-6" onSubmit={handleSignUp}>
                  <div>
                     <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Full name
                     </label>
                     <div className="mt-1">
                        <input
                           id="name"
                           name="name"
                           type="text"
                           autoComplete="name"
                           required
                           className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                           placeholder="John Doe"
                        />
                     </div>
                  </div>

                  <div>
                     <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Email address
                     </label>
                     <div className="mt-1">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                           placeholder="you@example.com"
                        />
                     </div>
                  </div>

                  <div>
                     <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Password
                     </label>
                     <div className="mt-1">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="new-password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                           placeholder="••••••••"
                        />
                     </div>
                  </div>

                  <div>
                     <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Confirm Password
                     </label>
                     <div className="mt-1">
                        <input
                           id="confirm-password"
                           name="confirm-password"
                           type="password"
                           autoComplete="new-password"
                           required
                           className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                           placeholder="••••••••"
                        />
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                     >
                        Sign up
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
