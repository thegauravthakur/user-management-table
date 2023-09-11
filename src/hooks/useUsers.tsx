import { useEffect, useState } from "react";

const endpoint =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
export function useUsers() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const res = await fetch(endpoint, { signal: abortController.signal });
      const data = (await res.json()) as User[];
      const updatedData = data.map((user) => ({ ...user, selected: false }));
      setData(updatedData);
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  return [data, setData] as const;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  selected: boolean;
}
