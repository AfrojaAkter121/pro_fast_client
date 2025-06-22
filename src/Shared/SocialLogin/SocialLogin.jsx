import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';

const SocialLogin = () => {
  const { loginWithGoogle} = useContext(AuthContext)
    return (
        <div>
              <button
              onClick={loginWithGoogle}
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