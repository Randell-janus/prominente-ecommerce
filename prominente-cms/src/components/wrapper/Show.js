const Show = ({ children, when }) => {
  return <>{when && children}</>;
};

export default Show;
