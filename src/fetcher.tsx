import { client } from "client";

export function fetcher(url: string) {
  return client.get(url).then((res) => res.data);
}
