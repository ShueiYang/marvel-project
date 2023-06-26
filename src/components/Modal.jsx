import { useContext } from "react";
import { UserContext } from "./marvelContext/UserProvider";



const Modal = () => {

    const { setVisible } = useContext(UserContext);

    function googleSignIn () {
        window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self")
    }

  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible(false);
      }}
    >
      <div
        className="modal bg-gradient-to-r from-red-900 to-red-700"
        onClick={(event) => {event.stopPropagation()}}
      >
        <div className="flex w-full justify-end">
          <button
            onClick={() => {setVisible(false)}}
            className="w-8"
          >
            <img src="/close.svg" alt="close icone" />
          </button>
        </div>
        <div className="flex flex-col h-full items-center justify-around text-slate-50">
          <h3>Sign up to bookmark your favorite character or comic !</h3>
          <button 
              className="flex items-center gap-2 bg-zinc-100 py-3 px-6"
              onClick={googleSignIn} 
          >
            <img className="w-7" src="/google.svg" alt="google logo" />
            <p className="text-lg text-zinc-800 font-medium my-1">
              Sign In with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
