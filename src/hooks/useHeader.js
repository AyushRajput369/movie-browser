import { useMemo } from "react";

export const useHeaders = () => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDI5YjY2NWRjYjI1M2ZiMzM0NTNmNGFkYWI5ZTVjZCIsIm5iZiI6MTcyMzE0ODAyNC45MDc4NzQsInN1YiI6IjY2YjUyNDRhMzVmMjdhYTc5ZWU5Mzk4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U5aTu8zJI3j5-rj7sl9mpqlvyBnqlkntBfTRiSiTyKc';

  const headers = useMemo(() => {

    const commonHeaders = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    return commonHeaders;
  }, [token]);

  return headers;
};
