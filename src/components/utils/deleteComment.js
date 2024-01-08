export default async function deleteComment(id){
    const token = localStorage.getItem("userToken");
    const config = {
        method: 'DELETE',
        headers: {
          "projectID": 'f104bi07c490',
          "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/comment/${id}`, config)
        
    } catch (error) {
        console.log(error);
    }
      
}