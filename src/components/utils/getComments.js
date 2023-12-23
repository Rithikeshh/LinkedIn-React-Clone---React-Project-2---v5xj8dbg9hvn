export default async function getComments(id, setComments){
    const token = localStorage.getItem("userToken");
    const config = {
        method: 'GET',
        headers: {
          "projectID": 'f104bi07c490',
          "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/post/${id}/comments`, config)
        const result = await response.json();
        result.data.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
        setComments(result.data);
        
    } catch (error) {
        console.log(error);
    }
}

