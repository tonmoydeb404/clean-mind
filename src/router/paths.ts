const paths = {
  root: "/",
  thoughts: {
    root: "/thoughts",
    details: (id: string) => `/thoughts/${id}`,
  },
};

export default paths;
