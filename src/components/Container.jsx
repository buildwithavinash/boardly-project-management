const Container = ({ children, classname = "" }) => {
  return (
    <div
      className={`bg-background max-w-4xl mx-auto px-2 ${classname}`}
    >
      {children}
    </div>
  );
};

export default Container;
