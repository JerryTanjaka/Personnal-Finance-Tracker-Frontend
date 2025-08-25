import { useEffect } from 'react';

export default function ErrorMessage({ message, onClose }: { message: string; onClose: () => void }) {
   useEffect(() => {
      const timer = setTimeout(() => {
         onClose();
      }, 4000); 

      return () => clearTimeout(timer);
   }, [onClose]);

   return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto max-w-md rounded-lg bg-red-600 px-4 py-2 text-white shadow-lg animate-fade-in">
         <div className="flex items-center space-x-2">
            <i className="bx bxs-error-circle text-xl"></i>
            <span className="text-sm">{message}</span>
         </div>
      </div>
   );
}
