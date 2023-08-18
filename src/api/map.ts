export const PostRest = async (
  lat: number,
  lng: number,
  name: string,
  description: string,
  type: string
) => {
  return await fetch("https://api.layover.store/map/markers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lat,
      lng,
      name,
      description,
      type,
    }),
  }).then((res) => res.json());
};

export const GetRest = async () => {
  return await fetch(`https://api.layover.store/map/markers/`, {
    method: "GET",
  }).then((res) => res.json());
};

export const GetRestDetail = async (id: number) => {
  return await fetch(`https://api.layover.store/map/markers/${id}`, {
    method: "GET",
  }).then((res) => res.json());
};
