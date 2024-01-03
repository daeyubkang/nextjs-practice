"use client";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = e.target.body.value;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, author }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + "topics", options)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.push(`/read/${lastid}`);
            router.refresh();
          });
      }}
    >
      <input type="text" name="title" placeholder="title" />
      <br />
      <textarea name="body" placeholder="body"></textarea>
      <br />

      <input type="submit" value="create" />
      <br />
    </form>
  );
}
