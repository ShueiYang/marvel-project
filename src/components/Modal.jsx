


const Modal = ({ setVisible }) => {


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
        className="modal bg-neutral-100"
        onClick={(event) => {event.stopPropagation()}}
      >
        <div className="flex w-full justify-end">
          <button
            onClick={() => {setVisible(false)}}
            className="w-8"
          >
            X
          </button>
        </div>
        <div className="flex flex-col h-full items-center justify-around">
          <h3>REGISTER</h3>
          <button 
              className="border border-zinc-300 py-3 px-6"
              onClick={googleSignIn} 
          >
              Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
