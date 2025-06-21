import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
        <div>
              <button
            type="button"
            className="w-full border px-4 py-2 flex items-center justify-center gap-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            <FcGoogle size={20} />
            Login with Google
          </button>
        </div>
    );
};

export default SocialLogin;