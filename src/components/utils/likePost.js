export default async function likePost(id, setLikeCount){
    const token = localStorage.getItem("userToken");
    const config = {
        method: 'POST',
        headers: {
          "projectID": 'f104bi07c490',
          "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/like/${id}`, config)
        const result = await response.json();
        if(localStorage.getItem(id)){
            localStorage.removeItem(id)
            setLikeCount(n=>n-1)
        }
        else{
            localStorage.setItem(id, true);
            setLikeCount(n=>n+1)
        }
    } catch (error) {
        console.log(error);
    }
}
