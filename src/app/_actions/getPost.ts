export const getData = async( id: string )=>{
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
      next: { revalidate: 5, tags: ["POSTS"] },
    });
    const post = await response.json();
    return post
  }