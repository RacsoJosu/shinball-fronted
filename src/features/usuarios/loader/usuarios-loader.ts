const validateSearchParams = (searchParams: URLSearchParams) => {
  const id = searchParams.get("id");
  if (!id || isNaN(Number(id))) {
    throw new Response("Invalid ID", { status: 400 });
  }
  return { id: Number(id) };
};
export function loaderUsers({ request }: { request: Request }) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search);

  return validateSearchParams(searchParams)

}
