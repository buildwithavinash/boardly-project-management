const Container = ({ children, classname = "" }) => {
  return (
    <div
      className={`bg-background max-w-4xl mx-auto px-2 py-2 pb-20 md:pb-6 ${classname}`}
    >
      {children}
    </div>
  );
};

export default Container;
