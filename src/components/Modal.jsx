const Modal = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full sm:w-2/3 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h3 id="modal-title" className="text-xl font-bold">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-3xl"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
