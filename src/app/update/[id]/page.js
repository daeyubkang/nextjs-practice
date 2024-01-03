"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTitle(result.title);
        setAuthor(result.author);
      });
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = e.target.body.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, author }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + id, options)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.push(`/read/${lastid}`);
            router.refresh();
          });
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        name="body"
        placeholder="body"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      ></textarea>
      <br />

      <input type="submit" value="update" />
      <br />
    </form>
  );
}
