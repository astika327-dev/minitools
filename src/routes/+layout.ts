// src/routes/+layout.ts
export const load = ({ url }) => {
  return {
    pathname: url.pathname
  };
};
