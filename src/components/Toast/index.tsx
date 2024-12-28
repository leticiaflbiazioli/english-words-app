interface IToast {
  message: string;
  className?: string;
}

export const Toast = ({ message, className }: IToast) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2  text-white px-6 py-3 rounded-lg shadow-lg opacity-90 ${className}`}
    >
      {message}
    </div>
  );
};
